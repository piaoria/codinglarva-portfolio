import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";
import path from "path";

interface WikiDocPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

interface RehypeNode {
  type: string;
  tagName?: string;
  properties?: Record<string, string | undefined>;
  children?: RehypeNode[];
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getWikiDoc(category: string, slug: string) {
  try {
    const cleanSlug = slug.replace(/\.md$/, "");
    const filePath = path.join(
      process.cwd(),
      "src/content/wiki",
      category,
      `${cleanSlug}.md`
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const source = fs.readFileSync(filePath, "utf8");
    const title = source.match(/^#\s+(.+)$/m)?.[1] || cleanSlug;

    const mdxSource = await serialize(source, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
          () => (tree: RehypeNode) => {
            const visit = (node: RehypeNode) => {
              if (
                node.type === "element" &&
                node.tagName &&
                /^h[1-6]$/.test(node.tagName)
              ) {
                const text =
                  node.children
                    ?.filter(
                      (
                        child
                      ): child is RehypeNode & {
                        type: "text";
                        value: string;
                      } => child.type === "text"
                    )
                    .map((child) => child.value)
                    .join("") || "";

                const id = generateSlug(text);
                node.properties = { ...node.properties, id };
              }
              if (node.children) {
                node.children.forEach(visit);
              }
            };
            visit(tree);
            return tree;
          },
        ],
      },
    });

    return {
      title,
      mdxSource,
    };
  } catch (error) {
    console.error("Error reading wiki document:", error);
    throw error;
  }
}

export default async function WikiDocPage(props: WikiDocPageProps) {
  try {
    const resolvedParams = await props.params;
    const { category, slug } = resolvedParams;
    const doc = await getWikiDoc(category, slug);

    return (
      <>
        <h1 className="text-3xl font-bold mb-8">{doc.title}</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <MDXRemote {...doc.mdxSource} />
        </div>
      </>
    );
  } catch {
    return (
      <div className="text-red-500">
        문서를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }
}
