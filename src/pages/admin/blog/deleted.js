import { useEffect, useState } from 'react';
import { Button, Table, Popconfirm } from 'antd';
import { format } from 'date-fns';
import Head from 'next/head';

import http from '../../../libs/http';
import { useSelector } from 'react-redux';
import { AdminLayout } from '../../../components/layouts';

const BlogListDeleted = (props) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useSelector(state => state.auth || {});

  const handleDelete = (fields) => {
    http.delete(`/blogs/${fields._id}`).then(() => {
      setList(list.filter(({_id}) => _id !== fields._id));
    })
  }

  const handleUnDelete = (fields) => {
    http.post(`/blogs/${fields._id}/undo-delete`).then(() => {
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
          title: 'Ngày xoá',
          dataIndex: 'deleted_at',
          key: 'deleted_at',
          render: (deleted_at) => <span>{format(new Date(deleted_at), 'mm/dd/yy')}</span>
      },
      {
          title: 'Người xoá',
          dataIndex: 'deleted_by',
          key: 'deleted_by',
          render: (deleted_by) => <span>{deleted_by && ((deleted_by.first_name || '') + ' ' + (deleted_by.last_name || ''))}</span>
      },
      {
        title: '',
        dataIndex: '',
        render: (author, fields) => (
          <>
            <div>
            <Button type="primary" onClick={() => handleUnDelete(fields)} style={{marginRight: '10px'}}>Khôi phục</Button>
            </div>
            {user.role === 'admin' && <div style={{marginTop: '10px'}}><Popconfirm
                title="Bạn muốn xoá vĩnh viễn bài này ?"
                okText="Thoát"
                cancelText="Xoá"
                onCancel={() => handleDelete(fields)}
              >
                <Button type="danger">Xoá vĩnh viễn</Button>
              </Popconfirm> </div>
            }
          </>
        )
    },
  ];

  useEffect(() => {
    http.get('/blogs/deleted')
      .then(({data}) => {
        setList(data);
        setLoading(false);
      })

  }, []);

  return (
    <>
    <Head>
      <title>Các bài đã xoá</title>
    </Head>
      {<Table
          rowKey="_id"
          columns={columns}
          dataSource={list || []}
          loading={loading}
          locale={{
            emptyText: 'Không có bài xoá gần đây'
          }}
      />}
    </>
  );
};

BlogListDeleted.Layout = AdminLayout;

export default BlogListDeleted;
