import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";
import responseHandler from "./api/now-playing";

export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  const songData = await responseHandler();
  return {
    props: {
      allPostsData,
      songData,
    },
  };
};

const Home = ({ allPostsData, songData }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>👋 Hi, I'm Parsa.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        {console.log(songData)}
        {songData?.isPlaying ? (
          <>
            <Image
              priority
              src={songData.albumImageUrl}
              height={250}
              width={250}
              alt={songData.album}
              title={songData.album}
            />
            <p>
              {songData.title} by {songData.artist}
            </p>
          </>
        ) : (
          <p>not playing right now</p>
        )}
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ slug, date, title }) => (
            <li className={utilStyles.listItem} key={slug}>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
