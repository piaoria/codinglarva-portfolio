import fs from "fs";
import path from "path";

export interface WikiHeading {
  level: number;
  text: string;
  slug: string;
}

export interface WikiDoc {
  title: string;
  slug: string;
  headings: WikiHeading[];
}

export interface WikiFile {
  slug: string;
  title: string;
  headings: string[];
}

export interface WikiCategory {
  name: string;
  files: WikiFile[];
}

export async function getWikiCategories(): Promise<WikiCategory[]> {
  const wikiDir = path.join(process.cwd(), "src/content/wiki");
  const categories = fs.readdirSync(wikiDir);

  return Promise.all(
    categories.map(async (category) => {
      const categoryPath = path.join(wikiDir, category);
      const files = fs.readdirSync(categoryPath);

      const categoryFiles = await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(categoryPath, file);
          const source = fs.readFileSync(filePath, "utf8");
          const slug = file.replace(/\.md$/, "");
          const title = source.match(/^#\s+(.+)$/m)?.[1] || slug;
          const headings = Array.from(source.matchAll(/^##\s+(.+)$/gm)).map(
            (match) => match[1]
          );

          return {
            title,
            slug,
            headings,
          };
        })
      );

      return {
        name: category,
        files: categoryFiles,
      };
    })
  );
}
