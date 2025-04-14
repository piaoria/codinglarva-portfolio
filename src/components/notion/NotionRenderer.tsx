import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";

interface NotionRendererProps {
  initialBlocks: BlockObjectResponse[];
}

export default function NotionRenderer({ initialBlocks }: NotionRendererProps) {
  console.log(
    "첫 번째 블록:",
    initialBlocks[0]
      ? {
          id: initialBlocks[0].id,
          type: initialBlocks[0].type,
        }
      : "없음"
  );

  if (initialBlocks.length === 0) {
    console.log("블록이 없습니다.");
    return <div className="animate-pulse">로딩 중...</div>;
  }

  return (
    <div className="space-y-4">
      {initialBlocks.map((block) => (
        <NotionBlock key={block.id} block={block} />
      ))}
    </div>
  );
}

function NotionBlock({ block }: { block: BlockObjectResponse }) {
  switch (block.type) {
    case "paragraph":
      console.log("문단 블록:", {
        rich_text_length: block.paragraph.rich_text.length,
        first_text: block.paragraph.rich_text[0]?.plain_text,
      });
      return (
        <p className="mb-4">
          {block.paragraph.rich_text.map((text, index) => (
            <span
              key={index}
              className={`${text.annotations.bold ? "font-bold" : ""} ${
                text.annotations.italic ? "italic" : ""
              } ${text.annotations.strikethrough ? "line-through" : ""} ${
                text.annotations.underline ? "underline" : ""
              } ${text.annotations.code ? "font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded" : ""}`}
            >
              {text.plain_text}
            </span>
          ))}
        </p>
      );
    case "heading_1":
      return (
        <h1 className="text-3xl font-bold mb-4">
          {block.heading_1.rich_text[0]?.plain_text}
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="text-2xl font-bold mb-4">
          {block.heading_2.rich_text[0]?.plain_text}
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="text-xl font-bold mb-4">
          {block.heading_3.rich_text[0]?.plain_text}
        </h3>
      );
    case "bulleted_list_item":
      return (
        <li className="list-disc ml-4 mb-2">
          {block.bulleted_list_item.rich_text[0]?.plain_text}
        </li>
      );
    case "numbered_list_item":
      return (
        <li className="list-decimal ml-4 mb-2">
          {block.numbered_list_item.rich_text[0]?.plain_text}
        </li>
      );
    case "code":
      return (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>{block.code.rich_text[0]?.plain_text}</code>
        </pre>
      );
    case "image":
      const imageUrl =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;
      return (
        <div className="relative w-full aspect-video">
          <Image
            src={imageUrl}
            alt={block.image.caption?.[0]?.plain_text || "이미지"}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      );
    default:
      return null;
  }
}
