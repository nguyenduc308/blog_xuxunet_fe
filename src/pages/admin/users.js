import { useEffect, useRef, useState } from 'react';
import { AdminLayout } from '../../components/layouts';
import { Button, Table, Modal, Form, Input } from 'antd';
import http from '../../libs/http';
const CATEGORY_EMPTY = {
    name: '',
    image_url: '',
    description: '',
    show_image: true,
    color: '',
    bg_color: '',
};

const Categories = (props) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const formRef = useRef();

    const onCancelModal = () => {
        setIsModalVisible(false);
    }
    const onCreateCategory = (values) => {
        http.post('/users', values)
        .then((res) => {
            setusers([...users, res.data]);

            if (formRef.current) {
                formRef.current.setFieldsValue(CATEGORY_EMPTY)
            }

            setIsModalVisible(false);
        })
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'first_name',
            key: 'first_name',
            render: (first_name, field) => (
                <span>
                    {field.first_name} {field.last_name}
                </span>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '30%'
        },
        {
            title: 'Phân loại',
            dataIndex: 'role',
            key: 'role',
        },
    ];

    useEffect(() => {
        http.get('/users')
        .then((res) => {
            setUsers(res.data);
        })
        .finally(() => setLoading(false))
    }, []);

    return (<Table
        rowKey="_id"
        columns={columns}
        dataSource={users || []}
        loading={loading}
    />);
};

Categories.Layout = AdminLayout;

export default Categories;
