import BlogContent from "@/components/ui/Blog/BlogContent";
import { remark } from "remark";
import html from "remark-html";

interface serverSdideProps {
  title: string;
  imageUrl: string;
  contentUrl: string;
  updatedAt: string;
}

const artileDataFetch = async (id: number) => {
  const baseURL = process.env.NEXT_API_BASE_URL;
  const response: Response = await fetch(
    `${baseURL}/api/public/v1/articles/${id}`
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching data for API server ${response.statusText}`
    );
  }

  const articleData: serverSdideProps = await response.json();
  return articleData;
};

const articleContentFetch = async (contentUrl: string) => {
  const response: Response = await fetch(contentUrl);

  if (!response.ok) {
    throw new Error(
      `Error fetching data for Pass service ${response.statusText}`
    );
  }

  const articleContent: string = await response.text();
  return articleContent;
};

const convertMarkdownToHtml = async (markdown: string) => {
  const processedContent = await remark().use(html).process(markdown);
  return processedContent.toString();
};

const convertTime = (updatedAt: string) => {
  const date = new Date(updatedAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const BlogPost = async ({ params }: { params: { contentId: string } }) => {
  const { contentId } = await params;

  const { title, imageUrl, contentUrl, updatedAt }: serverSdideProps =
    await artileDataFetch(parseInt(contentId, 10));

  const articleContent: string = await articleContentFetch(contentUrl);
  const articleHtml: string = await convertMarkdownToHtml(articleContent);
  const date: string = convertTime(updatedAt);

  return (
    <BlogContent
      title={title}
      imageUrl={imageUrl}
      content={articleHtml}
      date={date}
    ></BlogContent>
  );
};

export default BlogPost;
