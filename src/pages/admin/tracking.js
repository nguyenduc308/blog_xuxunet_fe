import { useEffect, useRef, useState } from 'react';
import { Button, Table, Modal, Form, Input } from 'antd';
import Head from 'next/head';

import { AdminLayout } from '../../components/layouts';
import http from '../../libs/http';
const TRACKING_EMPTY = {
    name: '',
    description: '',
};

const Tracking = (props) => {
    const [trackingList, setTrackingList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tracking] = useState(TRACKING_EMPTY)
    const formRef = useRef();

    const onCancelModal = () => {
        setIsModalVisible(false);
    }
    const onCreateTracking = (values) => {
        http.post('/tracking', values)
        .then((res) => {
            setTrackingList([...trackingList, res.data]);

            if (formRef.current) {
                formRef.current.setFieldsValue(TRACKING_EMPTY)
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
          title: 'Mã',
          dataIndex: 'code',
          key: 'code',
        },
        {
          title: 'Click',
          dataIndex: 'clicks',
          key: 'clicks',
        },
        {
            title: '',
            dataIndex: '',
            render: (author) => (
                <>
                    <Button type="danger">Xóa</Button>
                </>
            )
        },
    ];

    useEffect(() => {
        http.get('/tracking')
        .then((res) => {
            setTrackingList(res.data);
        })
        .finally(() => setLoading(false))
    }, []);

    return (
      <>
      <Head>
        <title>Chiến dịch quảng bá</title>
      </Head>
        <div className="admin-categories-wrapper">
            <div className="admin-categories-wrapper__header">
                <Button type="primary" size="large" onClick={() => setIsModalVisible(true)}>
                    Tạo mới
                </Button>
            </div>
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={trackingList || []}
                loading={loading}
            />

            <Modal
            title="Tạo chiến dịch mới"
            visible={isModalVisible}
            footer={null}
            className="admin-categories-create"
            onCancel={onCancelModal}
            >
                <Form ref={formRef} onFinish={onCreateTracking} initialValues={tracking}>
                    <Form.Item name="name" label="Tên" rules={[{required: true, message: 'Bắt buộc nhập tên'}]}>
                        <Input placeholder="Tên chiến dịch"/>
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input placeholder="Mô tả"/>
                    </Form.Item>
                    <div className="flex-center">
                        <Button type="primary" size="large" htmlType="submit">Tạo mới</Button>
                    </div>
                </Form>
            </Modal>
        </div>
        </>
    );
};

Tracking.Layout = AdminLayout;

export default Tracking;
