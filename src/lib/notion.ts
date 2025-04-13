import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DOCS_DATABASE_ID;

export const notion = new Client({
  auth: NOTION_API_KEY,
});

export async function getDocs() {
  try {
    console.log("데이터베이스 ID:", process.env.NOTION_DATABASE_ID);
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    });

    console.log("문서 개수:", response.results.length);
    return response.results;
  } catch (error) {
    console.error("Notion API 에러:", error);
    if (error instanceof Error) {
      console.error("에러 메시지:", error.message);
      console.error("에러 스택:", error.stack);
    }
    throw error;
  }
}

export async function getDocBySlug(slug: string) {
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    throw new Error(
      "Missing Notion environment variables. Please check your .env.local file."
    );
  }

  console.log("Fetching doc by slug:", slug);
  console.log("Database ID:", NOTION_DATABASE_ID);

  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID as string,
    filter: {
      and: [
        {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  });

  console.log("Found document:", response.results[0]);
  return response.results[0] as PageObjectResponse | undefined;
}
