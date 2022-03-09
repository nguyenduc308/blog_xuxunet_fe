import { useState, useEffect } from "react";
import Head from "next/head";
import axios from 'axios';
import { Card, Button, Input, Row, Col, Tabs } from 'antd';
import { CompactPicker } from 'react-color'
import { FaPlus, FaTimes } from 'react-icons/fa';

import { formatCurrency } from '../helpers/currency';
import { DefaultLayout } from '../components/layouts';
import http from '../libs/http';
const unit = (price) => {
    return price >= 1000 ? 'tỷ' : 'triệu';
}


const PersonalFinance = () => {
    const [form, setForm] = useState({
        income: 20,
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

    const [jars, setJars] = useState([
        {
            id: 0,
            name: "Tiêu dùng",
            percent: 55,
            color: '#1890ff',
        },
        {
            id: 1,
            name: "Đầu tư",
            percent: 10,
            color: '#008b02',
        },
        {
            id: 2,
            name: "Giáo dục",
            percent: 10,
            color: '#1890ff',
        },
        {
            id: 3,
            name: "Tiết kiệm",
            percent: 10,
            color: '#1890ff',
        },
        {
            id: Math.random(),
            name: "Hiếu hỉ",
            percent: 10,
            color: '#1890ff',
        },
        {
            id: Math.random(),
            name: "Từ thiện",
            percent: 5,
            color: '#1890ff',
        },
    ]);

    const [analytics, setAnalytics] = useState({
        percentCount: 0,
    });

    const addMoreJar = () => {
        setJars([
            ...jars,
            {
                id: Math.random(),
                name: "Chiếc lọ thứ " + (jars.length + 1),
                percent: 0,
                color: '#999',
            },
        ])
    }

    const deleteJar = (idx) => () => {
        setJars(jars.filter(({id}) => id !== idx))
    }

    const [colorPickerId, setColorPickerId] = useState('');

    const changeJarAttributes = (attr, id) => (event) => {
        setJars(jars.map(((jar, idx) => {
            if (jar.id == id) {
                return {
                    ...jar,
                    [attr]: event.target.value
                }
            }
            return jar;
        })))
    }

    const handleChangeColorJarComplete = (id) => (color) => {
        setJars(jars.map(((jar, idx) => {
            if (jar.id == id) {
                return {
                    ...jar,
                    color: color.hex
                }
            }
            return jar;
        })))
    }

    const showColorPicker = (id) => (event) => {
        event.stopPropagation();
        setColorPickerId(colorPickerId === id ? '' : id);
    }

    useEffect(() => {
        const percentCount = jars.reduce((count, jar) => (isNaN(jar.percent) ? 0 : Number(jar.percent))  + count,0);
        
        let percentCountClassName = 'text-success';
        if (percentCount > 100) {
            percentCountClassName = 'text-danger';
        }
        if (percentCount < 100) {
            percentCountClassName = 'text-warning';
        }

        setAnalytics({
            percentCount,
            percentCountClassName
        });
    }, [jars]);

    const onSubmit = () => {
        http.post('/rates', Object.entries(form).reduce((acc, [key, value]) => ({
            ...acc, [key]: Number(value)
        }), {}))
            .then(({data}) => {
                setResult(data);
        })
    }

    return (
        <>
        <Head>
            <title>
                Phân bổ thu nhập hiệu quả | {process.env.SITE_DOMAIN}
            </title>
            <meta name="description" content={"Quản lí tài chính bằng 6 chiếc lọ, phân bổ thu nhập hiệu quả"} />
            <link rel="canonical" href={`${process.env.SITE_URL || ''}/${'quan-ly-thu-nhap-ca-nhan'}`} />
            <meta property="og:title" content={`${"Phân bổ tài chính bằng những chiếc lọ thông minh"} | ${process.env.SITE_DOMAIN}`} />
            <meta property="og:description" content={"Quản lí tài chính bằng 6 chiếc lọ, phân bổ thu nhập hiệu quả"} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${process.env.SITE_URL || ''}/${'quan-ly-thu-nhap-ca-nhan'}`} />
            <meta property="og:site_name" content={`${process.env.SITE_DOMAIN}`} />

            <meta property="og:image" content={`${'/logo.png'}`} />
            <meta property="og:image:secure_url" content={`${'/logo.png'}`} />
            <meta property="og:image:type" content="image/jpg" />
        </Head>
        <div>
            <h2 className="text-center">Phân bổ thu nhập bằng những chiếc lọ tài chính</h2>
            <div className="mt-2">
                <Row className="rates">
                    <Col span={24} md={{span: 6}} className="controls">
                        <div className="mt-1">
                            <div>Thu nhập mỗi tháng: </div>
                            <Input className="w-100" value={form.income} onChange={onChange} name="income" suffix={<span style={{color: '#999'}}>triệu</span>}/>
                        </div>
                        <Card className="board" title="Thống kê">
                            <p className="bold">Tổng: <span className={analytics.percentCountClassName}>{analytics.percentCount}%</span></p>
                        </Card>
                    </Col>
                    <Col span={24} md={{span: 18}} className="result">
                    <Tabs defaultActiveKey="table" type="card" size="large" onTabClick={onTabClick}>
                        <Tabs.TabPane tab="Bảng 1" key="table">
                            <div className="bottles">
                            {
                                jars.map((jar, index) => {
                                    return <Card className="bottle" title={
                                        <div className="bottle-header">
                                            <Input value={jar.name} className="input-name" onChange={changeJarAttributes('name', jar.id)}/>
                                            <div>
                                                <div className="color-picked" style={{backgroundColor: jar.color}} onClick={showColorPicker(jar.id)}></div>
                                                <div className="color-picker">
                                                    {colorPickerId === jar.id && <CompactPicker
                                                        triangle="hide"
                                                        color={ jar.color }
                                                        onChangeComplete={handleChangeColorJarComplete(jar.id)}
                                                    />}
                                                </div>
                                            </div>
                                        </div>
                          
                                    } key={index}>
                                        <div className="jar">
                                            <div className="top">
                                                <svg className="milk-bottle" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 51">
                                                    <defs>
                                                        <mask id={`milk-mask-${index}`}>
                                                            <rect className="mask-rect" x="477" y="108" width="15" height={`${jar.percent}%`} transform="rotate(-180 247.5 78.5)" fill={jar.color} />
                                                        </mask>
                                                    </defs>
                                                    <path className="bottle" d="M19 21.1L15 8.74V6a2.3 2.3 0 0 0-.14-.9 1.54 1.54 0 0 0 .14-.65V3c0-.85-.35-1.5-1.19-1.5H7.86C7.02 1.5 6 2.15 6 3v1.47a1.55 1.55 0 0 0 .22.79 1.32 1.32 0 0 0-.22.76v2.72L2 21.09a12.12 12.12 0 0 0-.51 3.21v22.1a3.29 3.29 0 0 0 3.15 3.1h12a2.92 2.92 0 0 0 2.85-3.1V24.3a12.14 12.14 0 0 0-.49-3.2zM7.69 3h5.81v1.47a3.12 3.12 0 0 0 .31.08h-.08l-6-.05zM18 46.4a1.63 1.63 0 0 1-1.4 1.58H4.65C3.93 47.98 3 46.85 3 46.4V24.3a11 11 0 0 1 .61-2.73L7.72 9.1l.08-3a3.72 3.72 0 0 1 .88-.06h4.82v2.79l4.06 12.71a10.67 10.67 0 0 1 .44 2.73z" fill={jar.color} />
                                                    <path className="milk" mask={`url(#milk-mask-${index})`} d="M4.5 46.5v-23l4-14h4l4 14v23" fill={jar.color} />
                                                </svg>
                                                <div>
                                                    <Input className="percent-input" type="text" style={{color: jar.color}} value={jar.percent} onChange={changeJarAttributes('percent', jar.id)} suffix={<span>%</span>}/>
                                                </div>
                                            </div>
                                            <div className="bottom" style={{color: jar.color}}>
                                                {formatCurrency(Math.round(form.income * 1000000 * jar.percent / 100))} đ
                                            </div>
                                            <div className="delete" onClick={deleteJar(jar.id)}>
                                                <FaTimes />
                                            </div>
                                        </div>
                                    </Card>
                                })
                            }
                            <Card className="bottle add-more" onClick={addMoreJar}>
                                <div>
                                    <FaPlus />
                                    <span>Tạo thêm</span>
                                </div>
                            </Card>
                            </div>
                        </Tabs.TabPane>
                        {/* <Tabs.TabPane tab="Bảng 2" key="chart">
                            
                        </Tabs.TabPane> */}
                        </Tabs>
                    </Col>
                </Row>
            </div>
        </div>
        </>
    )
}

PersonalFinance.Layout = DefaultLayout;


export default PersonalFinance;
