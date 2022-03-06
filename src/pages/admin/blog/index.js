import { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/layouts';
import { Button, Table } from 'antd';
import http from '../../../libs/http';
import Head from 'next/head';

const BlogList = (props) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSoftDelete = (fields) => {
    http.delete(`/blogs/${fields._id}/soft-delete`).then(() => {
      setList(list.filter(({_id}) => _id !== fields._id));
    })
  }

  const columns = [
      {
          title: 'Tiêu đề',
          dataIndex: 'title',
          key: 'title',
          width: '30%'
      },
      {
          title: 'Mô tả',
          dataIndex: 'excerpt',
          key: 'excerpt',
          width: '30%'
      },
      {
          title: 'Tác giả',
          dataIndex: 'author',
          key: 'author',
          render: (author) => <span>{author && author.email}</span>
      },
      {
        title: '',
        dataIndex: '',
        render: (author, fields) => (
          <>
            <Button type="primary" style={{marginRight: '10px'}}>Sửa</Button>
            <Button type="danger" onClick={() => handleSoftDelete(fields)}>Xóa</Button>
          </>
        )
    },
  ];

  useEffect(() => {
    http.get('/blogs')
      .then(({data}) => {
        setList(data);
        setLoading(false);
      })

  }, []);

  return (
    <>
    <Head>
      <title>Danh sách bài đăng</title>
    </Head>
      {<Table
          rowKey="_id"
          columns={columns}
          dataSource={list || []}
          loading={loading}
      />}
    </>
  );
};

BlogList.Layout = AdminLayout;

export default BlogList;
