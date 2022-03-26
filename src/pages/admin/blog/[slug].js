import Link from 'next/link';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Button, Input, Form, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UploadOutlined } from '@ant-design/icons';

import { AdminLayout } from '../../../components/layouts';
import { isClient } from '../../../helpers/utils';
import http from '../../../libs/http';

let CustomEditor;
if (isClient) {
  CustomEditor = dynamic(() => import('../../../components/common/editor/editor'), {
    ssr: false,
    loading: () => <p>Loading ...</p>
  });
}

const BlogUpdate = (props) => {
  const [blog, setBlog] = useState(null);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const onContentChange = (editorApi, ouput) => {
    setBlog({
      ...blog,
      blocks: ouput.blocks
    });
  }

  const onFinish = (values) => {
    http.put('/blogs/' + blog._id, {
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
    if (router.query.slug) {
      http.get('/categories')
      .then((res) => {
        setCategories(res.data)
      });

      http.get('/blogs/' + router.query.slug).then((res) => {
        setBlog(res.data.blog);
      })
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Chỉnh sửa bài</title>
      </Head>
      {blog &&
        <Form onFinish={onFinish} defaultValue={blog}>
          <div className="blog-create-wrapper">
              <div className="blog-create-content">
                <div className="blog-create-content-title">
                  <Form.Item
                    name="title"
                    rules={[{required: true, message: ''}]}
                    initialValue={blog.title}
                  >
                    <Input placeholder="Tiêu đề" className="blog-create-content-input"/>
                  </Form.Item>
                </div>
                <div className="blog-create-content-blocks">
                  {CustomEditor && <CustomEditor onChange={onContentChange} data={blog.blocks}/>}
                </div>
              </div>
              <div className="blog-create-controls">
                <div className="blog-create-action">
                  <Button size="large" type="primary" htmlType="submit">Cập nhật</Button>
                </div>
                <div className="blog-create-item">
                  <div className="blog-create-item__header">
                    <h3>Chủ đề</h3>
                  </div>
                  <Form.Item
                    name="categories"
                    rules={[{required: true, message: ''}]}
                    initialValue={blog.categories.map(({_id}) => _id)}
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
                    initialValue={blog.featured_image_url}
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
      }
    </>
  );
};

BlogUpdate.Layout = AdminLayout;

export default BlogUpdate;
