import Link from 'next/link';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Button, Input, Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { AdminLayout } from '../../../components/layouts';
import { wrapper } from '../../../store';
import { isClient } from '../../../helpers/utils';
import http from '../../../libs/http';


let CustomEditor;
if (isClient) {
  CustomEditor = dynamic(() => import('../../../components/common/editor/editor'), {
    ssr: false,
    loading: () => <p>Loading ...</p>
  });
}

const BlogCreate = (props) => {
  const [blog, setBlog] = useState({
    title: '',
    featured_image_url: '',
    status: 'public',
    excerpt: '',
    categories: [],
    blocks: [],
    show_featured_image: true,
  });
  const [imageBase64, setImageBase64] = useState('');
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const onContentChange = (editorApi, ouput) => {
    setBlog({
      ...blog,
      blocks: ouput.blocks
    });
  }

  const onFinish = (values) => {
    http.post('/blogs', {
      ...blog,
      ...values,
    }).then(() => {
      router.push('/admin/blog');
    })
  }

  const uploadImage = ({file, onSuccess}) => {
    const formData = new FormData();
    formData.append('file', file);

    http.post('/upload/images', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      onSuccess('ok');
      setBlog({
        ...blog,
        featured_image_url: res.file.url
      })
    })
  }

  useEffect(() => {
    http.get('/categories')
      .then((res) => {
        setCategories(res.data)
      })
  }, []);

  return (
    <>
      <Head>
        <title>Tạo bài viết</title>
      </Head>
      <Form onFinish={onFinish}>
        <div className="blog-create-wrapper">
            <div className="blog-create-content">
              <div className="blog-create-content-title">
                <Form.Item
                  name="title"
                  rules={[{required: true, message: ''}]}
                >
                  <Input placeholder="Tiêu đề" className="blog-create-content-input"/>
                </Form.Item>
              </div>
              <div className="blog-create-content-blocks">
                {CustomEditor && <CustomEditor onChange={onContentChange} />}
              </div>
            </div>
            <div className="blog-create-controls">
              <div className="blog-create-action">
                <Button size="large" type="primary" htmlType="submit">Đăng bài</Button>
              </div>
              <div className="blog-create-item">
                <div className="blog-create-item__header">
                  <h3>Chủ đề</h3>
                </div>
                <Form.Item
                  name="categories"
                  rules={[{required: true, message: ''}]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Chọn chủ đề"
                    className="categories"
                  >
                    {categories.map((category) => {
                      return <Select.Option value={category._id} key={category._id}>{category.name}</Select.Option>
                    })}
                  </Select>
                </Form.Item>
              </div>

              <div className="blog-create-item">
                <div className="blog-create-item__header">
                  <h3>Ảnh</h3>
                </div>
                <Form.Item
                  name="featured_image_url"
                >
                <Input type="text" placeholder="Nhập link ảnh"/>
                </Form.Item>

                <Upload
                  customRequest={uploadImage}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Tải lên</Button>
                </Upload>
              </div>
            </div>
        </div>
      </Form>
    </>
  );
};

BlogCreate.Layout = AdminLayout;

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  return {
    props: {}
  };
});

export default BlogCreate;
