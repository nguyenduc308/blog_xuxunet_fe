import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { AdminLayout } from '../../../components/layouts';
import { wrapper } from '../../../store';
import { getBlogs } from '../../../store/blogs/actions';
import { Button, Table } from 'antd';

const BlogList = (props) => {
  const { list, loading } = useSelector(state => state.blogs)
  const dispatch = useDispatch();
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
        render: (author) => (
          <>
            <Button type="primary" style={{marginRight: '10px'}}>Sửa</Button>
            <Button type="danger">Xóa</Button>
          </>
        )
    },
  ];

  useEffect(() => {
    if (!list) {
      dispatch(getBlogs());
    }

  }, [dispatch, list]);

  return (
    <>
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
