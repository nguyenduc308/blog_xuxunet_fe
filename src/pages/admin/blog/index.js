import { useEffect, useState } from 'react';
import { AdminLayout } from '../../../components/layouts';
import { Button, Table } from 'antd';
import http from '../../../libs/http';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

const BlogList = (props) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSoftDelete = (fields) => {
    http.delete(`/blogs/${fields._id}/soft-delete`).then(() => {
      setList(list.filter(({_id}) => _id !== fields._id));
    })
  }

  const handleEdit = (fields) => {
    router.push('/admin/blog/' + fields.slug);
  }

  const handleView = (fields) => {
    router.push('/bai-viet/' + fields.slug);
  }


  const columns = [
      {
          title: 'Tiêu đề',
          dataIndex: 'title',
          key: 'title',
          width: '30%',
          render: (title, fields) => {
            return <>
              <Link href={'/bai-viet/' + fields.slug}>
                  <a>{title}</a>
              </Link>
            </>
          }
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
            <Button size="small" type="primary" onClick={() => handleEdit(fields)} style={{marginRight: '10px'}}>Sửa</Button>
            <Button size="small" type="danger" onClick={() => handleSoftDelete(fields)} style={{}}>Xóa</Button>
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
