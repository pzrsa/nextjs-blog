import Head from "next/head";
import Date from "../../components/Date";
import Layout from "../../components/Layout";
import { getAllPostsSlugs, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.slug);

  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllPostsSlugs();
  return {
    paths,
    fallback: false,
  };
};

const Post = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article></article>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
};

export default Post;
