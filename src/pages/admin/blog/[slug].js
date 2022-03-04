import Link from 'next/link';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { AdminLayout } from '../../../components/layouts';
import { wrapper } from '../../../store';
import { isClient } from '../../../helpers/utils';

let CustomEditor;
if (isClient) {
  CustomEditor = dynamic(() => import('../../../components/common/editor/editor'), {
    ssr: false,
    loading: () => <p>Loading ...</p>
  });
}

const BlogUpdate = (props) => {
  const [blog, setBlog] = useState({
    title: '',
    image_url: '',
    status: 'public',
    excerpt: '',
    category_ids: [],
    blocks: [],
    show_image: true,
  });
  const onContentChange = (editorApi, ouput) => {
    console.log({
      editorApi,
      ouput
    })
  }

  return (
    <>
      <Head>
        <title>Tạo bài viết</title>
      </Head>
      <div className="blog-create-wrapper">
        <div className="blog-create-content">
          <div className="blog-create-content-title">
            <Input placeholder="Tiêu đề" className="blog-create-content-input"/>
          </div>
          <div className="blog-create-content-blocks">
            {CustomEditor && <CustomEditor onChange={onContentChange} />}
          </div>
        </div>
        <div className="blog-create-controls">
          <div className="blog-create-action">
            <Button size="large" type="primary">Đăng bài</Button>
          </div>
        </div>
      </div>
    </>
  );
};

BlogUpdate.Layout = AdminLayout;

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  return {
    props: {}
  };
});

export default BlogUpdate;
