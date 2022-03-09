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
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [category, setCategory] = useState(CATEGORY_EMPTY)
    const formRef = useRef();

    const onCancelModal = () => {
        setIsModalVisible(false);
    }
    const onCreateCategory = (values) => {
        http.post('/categories', values)
        .then((res) => {
            setCategories([...categories, res.data]);

            if (formRef.current) {
                formRef.current.setFieldsValue(CATEGORY_EMPTY)
            }

            setIsModalVisible(false);
        })
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'excerpt',
            width: '30%'
        },
        {
            title: '',
            dataIndex: '',
            render: (author) => (
                <>
                    <Button type="primary" style={{ marginRight: '10px' }}>Sửa</Button>
                    <Button type="danger">Xóa</Button>
                </>
            )
        },
    ];

    useEffect(() => {
        http.get('/categories')
        .then((res) => {
            setCategories(res.data);
        })
        .finally(() => setLoading(false))
    }, []);

    return (
        <div className="admin-categories-wrapper">
            <div className="admin-categories-wrapper__header">
                <Button type="primary" size="large" onClick={() => setIsModalVisible(true)}>
                    Tạo mới
                </Button>
            </div>
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={categories || []}
                loading={loading}
            />

            <Modal
            title="Tạo chủ đề mới"
            visible={isModalVisible}
            footer={null}
            className="admin-categories-create"
            onCancel={onCancelModal}
            >
                <Form ref={formRef} onFinish={onCreateCategory} initialValues={category}>
                    <Form.Item name="name" label="Tên" rules={[{required: true, message: 'Bắt buộc nhập tên'}]}>
                        <Input placeholder="Tên chủ đề"/>
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input placeholder="Mô tả"/>
                    </Form.Item>
                    <Form.Item name="color" label="Màu sắc">
                        <Input placeholder="#Hex"/>
                    </Form.Item>
                    <Form.Item name="bg_color" label="Màu nền">
                        <Input placeholder="#Hex"/>
                    </Form.Item>
                    <div className="flex-center">
                        <Button type="primary" size="large" htmlType="submit">Tạo mới</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

Categories.Layout = AdminLayout;

export default Categories;
