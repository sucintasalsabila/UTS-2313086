import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";

const { blog_folder } = config.settings;

const Article = async ({ params }) => {
  const posts = getSinglePage(`content/${blog_folder}`);

  const post = posts.find(
    (p) => p.slug === params.single
  );

  if (!post) {
    return <div>Post not found</div>;
  }

  const { frontmatter, content } = post;

  return (
    <PostSingle
      frontmatter={frontmatter}
      content={content}
    />
  );
};

export async function generateStaticParams() {
  const posts = getSinglePage(`content/${blog_folder}`);

  return posts.map((post) => ({
    single: post.slug,
  }));
}

export default Article;
