"use client";

import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import { useState, useEffect } from "react";
import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js";

interface NotionRendererProps {
  initialBlocks: BlockObjectResponse[];
}

export default function NotionRenderer({ initialBlocks }: NotionRendererProps) {
  if (initialBlocks.length === 0) {
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
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });

  switch (block.type) {
    case "paragraph":
      console.log("문단 블록 생성");
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
      const codeText = block.code.rich_text[0]?.plain_text || "";
      const codeLang = block.code.language || "text";
      
      // Notion 언어를 highlight.js 언어로 매핑
      const langMap: { [key: string]: string } = {
        "javascript": "javascript",
        "typescript": "typescript",
        "java": "java",
        "python": "python",
        "c": "c",
        "cpp": "cpp",
        "csharp": "csharp",
        "go": "go",
        "ruby": "ruby",
        "php": "php",
        "swift": "swift",
        "kotlin": "kotlin",
        "rust": "rust",
        "shell": "bash",
        "sql": "sql",
        "html": "html",
        "css": "css",
        "json": "json",
        "markdown": "markdown",
        "plain text": "text"
      };

      const mappedLang = langMap[codeLang.toLowerCase()] || "text";
      const lines = codeText.split("\n");
      
      // 코드 강조 적용
      const highlightedCode = mappedLang !== "text" && hljs.getLanguage(mappedLang)
        ? hljs.highlight(codeText, { language: mappedLang }).value
        : codeText;
      
      const line = highlightedCode.split("\n")
        .map((item: string, index: number) =>
          `<tr data-line=${index + 1}>
            <td class="line-number" data-number="${index + 1}">${index + 1}</td>
            <td class="line-code" data-number=${index + 1}>${item}</td>
          </tr>`
        )
        .join("");

      return (
        <div className="codeblock">
          <div className="top">
            <p>{mappedLang.toUpperCase()}</p>
            <div className="controls">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <pre className={`language-${mappedLang}`}>
            <table>
              <tbody dangerouslySetInnerHTML={{ __html: line }} />
            </table>
          </pre>
        </div>
      );
    case "image":
      const imageUrl =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;

      const imageSizeStyles = {
        width: imageSize.width > 768 ? "100%" : imageSize.width,
        height: imageSize.height < 30 ? 30 : imageSize.height,
      };

      return (
        <div
          style={imageSizeStyles}
          className="relative my-4 flex justify-center mx-auto"
        >
          <Image
            src={imageUrl}
            alt={block.image.caption?.[0]?.plain_text || "이미지"}
            fill
            className="object-contain rounded-lg"
            sizes="100%"
            priority={false}
            onLoadingComplete={({ naturalWidth, naturalHeight }) => {
              setImageSize({ width: naturalWidth, height: naturalHeight });
            }}
          />
          {block.image.caption?.[0]?.plain_text && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              {block.image.caption[0].plain_text}
            </p>
          )}
        </div>
      );
    default:
      return null;
  }
}
