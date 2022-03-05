import Head from 'next/head';
import { useEffect, useState } from 'react';
import BlockHtml from '../../components/blogs/block';
import { ContentLayout } from '../../components/layouts'
import http from '../../libs/http';
import { wrapper } from '../../store';

const BlogDetail = ({blog}) => {
  return (<>
   <Head>
      <title>{blog.title}</title>
    </Head>
    <article className="blog-detail">
      <h2 className="blog-detail__title">{blog.title}</h2>
      <div className="blog-detail__content">
        {blog.blocks.map(block => {
          return <BlockHtml key={block.id} block={block}/>
        })}
      </div>
    </article>
  </>);
};

BlogDetail.Layout = ContentLayout;

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, res, req, params }) => {
  const blog = await http.get('/blogs/' + params.slug, {
    params: {
      from: 'client'
    }
  });
  
  return {
    props: {
      blog: blog.data
    }
  }
});


export default BlogDetail;
