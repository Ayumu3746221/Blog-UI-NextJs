import { remark } from "remark";
import html from "remark-html";
import BlogContent from "@/components/ui/Blog/BlogContent";

const convertMarkdownToHtml = async (markdown: string) => {
  const processedContent = await remark().use(html).process(markdown);
  return processedContent.toString();
};

const BlogPost = async () => {
  const posts = {
    title: "初めての投稿",
    date: "2023年6月1日",
    image: "/sample.svg?height=400&width=800",
    content: `
      これは私の初めてのブログ投稿です。ここでは、ブログを始めた理由と今後の展望について書いています。

      ブログを始めた主な理由は、自分の学びや経験を共有したいと思ったからです。技術の世界は日々進化しており、私自身も常に新しいことを学んでいます。その過程で得た知識や気づきを、同じ道を歩む人々と共有できればと思います。

      今後は、主に以下のようなトピックについて書いていく予定です：

      - プログラミング言語（特にJavaScriptとPython）
      - ウェブ開発のベストプラクティス
      - 新しい技術トレンドの解説
      - 個人プロジェクトの進捗報告

      このブログを通じて、読者の皆さんと一緒に成長していけることを楽しみにしています。どうぞ、よろしくお願いします！
    `,
  };

  const contentHtml = await convertMarkdownToHtml(posts.content);

  return (
    <BlogContent
      title={posts.title}
      date={posts.date}
      image={posts.image}
      content={contentHtml}
    />
  );
};

export default BlogPost;
