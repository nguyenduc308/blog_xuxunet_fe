import { useState, useEffect } from "react";
import Head from "next/head";
import axios from 'axios';
import { Table, Button, Input, Row, Col, Tabs } from 'antd';

import { formatCurrency } from '../../helpers/currency';
import { DefaultLayout } from '../../components/layouts';
import { BarChart } from "../../components/common/chart";


const unit = (price) => {
    return price >= 1000 ? 'tỷ' : 'triệu';
}
const columns = [
    {
        title: 'Năm',
        dataIndex: 'year',
        key: 'year',
        width: '20%'
    },
    {
        title: 'Gốc',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount) => <span>{formatCurrency(amount)} {unit(amount)}</span>
    },
    {
        title: 'Lãi',
        dataIndex: 'interest',
        key: 'interest',
        render: (interest) => <span>{formatCurrency(interest)} {unit(interest)}</span>
    },
    {
        title: 'Tổng',
        dataIndex: 'total',
        key: 'total',
        render: (total) => <span>{formatCurrency(total)} {unit(total)}</span>
    },
];


const RateCaculator = () => {
    const [form, setForm] = useState({
        monthly: 5,
        rate: 15,
        count: 10,
        nav: 0
    });
    const [result, setResult] = useState(null);

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value.replace(/[^0-9\.]/, '')
        })
    }

    const onTabClick = (key) => {
    }

    useEffect(() => {
        onSubmit();
    }, []);

    const onSubmit = () => {
        axios.post('http://localhost:5000/api/rates', Object.entries(form).reduce((acc, [key, value]) => ({
            ...acc, [key]: Number(value)
        }), {}))
            .then(({data}) => {
                setResult(data);
        })
    }

    return (
        <>
        <Head>
            <title>Tính lãi suất kép cộng dồn tích lũy mỗi tháng</title>
        </Head>
        <div>
            <h2 className="text-center">Tính lãi suất kép cộng dồn đầu tư mỗi tháng</h2>
            <div className="mt-2">
                <Row className="rates">
                    <Col span={24} md={{span: 6}} className="controls">
                        <div className="mt-1">
                            <div>Vốn: </div>
                            <Input className="w-100" value={form.nav} onChange={onChange} name="nav" suffix={<span style={{color: '#999'}}>triệu</span>}/>
                        </div>
                        <div className="mt-1">
                            <div>Số tiền mỗi tháng: </div>
                            <Input className="w-100" value={form.monthly} onChange={onChange} name="monthly" suffix={<span style={{color: '#999'}}>triệu</span>}/>
                        </div>
                        <div className="mt-1">
                            <div>Lãi suất năm:</div>
                            <Input className="w-100"  value={form.rate} onChange={onChange} name="rate" suffix={<span style={{color: '#999'}}>%</span>}/>
                        </div>
                        <div className="mt-1">
                            <div> Số năm:</div>
                            <Input className="w-100"  value={form.count} onChange={onChange} name="count"/>
                        </div>
                        <div className="flex-center mt-2">
                            <Button type="primary" size="large" onClick={onSubmit}>Tính toán</Button>
                        </div>
                    </Col>
                    <Col span={24} md={{span: 18}} className="result">
                    <Tabs defaultActiveKey="table" type="card" size="large" onTabClick={onTabClick}>
                        <Tabs.TabPane tab="Bảng" key="table">
                        {result &&
                            <>
                                Bạn sẽ nhận được <strong>{ formatCurrency(result.total) + ' ' + unit(result.total)}</strong> sau <strong>{ result.count } năm</strong> đầu tư cố định <strong>{result.monthly} {unit(result.monthly)}</strong> mỗi tháng {result.nav > 0 && <span>(vốn ban đầu <strong>{formatCurrency(result.nav)} {unit(result.nav)}</strong>)</span>}, lãi suất năm <strong>{result.rate}%/năm</strong>
                                <div className="mt-1">
                                    <Table className="table" scroll={{ y: 600 }} columns={columns} dataSource={result.schema} pagination={false} rowKey="id"/>
                                </div>
                            </>
                        }
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Biểu đồ" key="chart">
                            {result && <div className="charts">
                                <BarChart data={result.schema.map((item) => item.total)}/>
                            </div> }
                        </Tabs.TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        </div>
        </>
    )
}

RateCaculator.Layout = DefaultLayout;


export default RateCaculator;
