import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { getAllPostIds, getPostsData } from "../../lib/posts";
import homeStyles from "../../styles/Home.module.css";

function Post({
  postData,
}: {
  postData: {
    date: string;
    title: string;
    contentHtml: string;
  };
}) {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={homeStyles.headingXl}>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds(); // return: [{params: {id: 'pre-rendering}}, {params...}]
  return {
    paths,
    fallback: false, // 404 페이지로.
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostsData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};

export default Post;
