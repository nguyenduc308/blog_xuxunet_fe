import Head from 'next/head';
import { useEffect, useState } from 'react';
import BlogItem from '../../components/blogs/blog-item';
import { ContentLayout } from '../../components/layouts'
import http from '../../libs/http';
import { wrapper } from '../../store';

const Blogs = ({blogs}) => {
  return (<>
    <Head>
      <title>Tất cả các bài viết</title>
    </Head>
    {blogs.length && blogs.map((blog) => {
      return <BlogItem key={blog._id} blog={blog}></BlogItem>
    })}
    {
      !blogs.length && <p>Hiện tại chưa có bài viết nào</p>
    }
  </>);
};

Blogs.Layout = ContentLayout;

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, res, req }) => {
  const blogs = await http.get('/blogs');
  return {
    props: {
      blogs: blogs.data
    }
  }
});


export default Blogs;
