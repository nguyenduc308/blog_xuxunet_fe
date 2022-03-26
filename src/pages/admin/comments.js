import { useEffect, useRef, useState } from 'react';
import { AdminLayout } from '../../components/layouts';
import { Button, Table, Modal, Form, Input } from 'antd';
import { format } from 'date-fns'
import http from '../../libs/http';
import Link from 'next/link';

const Comments = (props) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleDestroy = (id) => {
      http.delete('/comments/' + id).then((res) => {
        setComments(comments.filter(({_id}) => {
          return _id !== res.id && !res.children.includes(_id);
        }))
      })
    }

    const columns = [
        {
            title: 'Thời gian',
            dataIndex: 'created_at',
            key: 'created_at',
            width: '20%',
            render(created_at) {
              return <>{format(new Date(created_at), 'mm/dd/yy')}</>
            }
        },
        {
          title: 'Bài viết',
          dataIndex: 'blog',
          key: 'blog',
          width: '20%',
          render(blog) {
            return <Link href={'/bai-viet/' + blog.slug}>
              <a>{blog.title}</a>
            </Link>
          }
      },
        {
            title: 'Người dùng',
            dataIndex: 'user',
            key: 'user',
            width: '20%',
            render(user) {
              return <>{user.last_name || user.last_name ? user.last_name || user.first_name : 'No_name'}</>
            }
        },
        {
          title: 'Nội dung',
          dataIndex: 'content',
          key: 'content',
          width: '40%'
      },
        {
            title: '',
            dataIndex: '',
            render: (author, fields) => (
                <>
                    <Button type="danger" size="small" onClick={() => handleDestroy(fields._id)}>Xóa</Button>
                </>
            )
        },
    ];

    useEffect(() => {
        http.get('/comments')
        .then((res) => {
            setComments(res.data);
        })
        .finally(() => setLoading(false))
    }, []);

    return (
        <div className="admin-categories-wrapper">
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={comments || []}
                loading={loading}
            />
        </div>
    );
};

Comments.Layout = AdminLayout;

export default Comments;
