export interface NotionDoc {
  id: string;
  properties: {
    Title: {
      title: Array<{
        plain_text: string;
      }>;
    };
    Category: {
      select: {
        name: string;
      };
    };
    Slug: {
      rich_text: Array<{
        plain_text: string;
      }>;
    };
    Published: {
      checkbox: boolean;
    };
    Order: {
      number: number;
    };
  };
}
