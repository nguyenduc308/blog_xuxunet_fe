import { useState, useEffect } from "react";
import Head from "next/head";
import { Card, Button, Input, Row, Col, Tabs, Modal } from 'antd';
import { CompactPicker } from 'react-color'
import { FaPlus, FaTimes } from 'react-icons/fa';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { formatCurrency } from '../helpers/currency';
import { DefaultLayout } from '../components/layouts';
import http from '../libs/http';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const unit = (price) => {
    return price >= 1000 ? 'tỷ' : 'triệu';
}

const SHEET_DEFAULT = {
    _id: null,
    name: 'Bảng tạm',
    description: '',
    income: 20,
    index: 0,
    jars: [
        {
            _id: 0,
            name: "Tiêu dùng",
            percent: 55,
            color: '#1890ff',
        },
        {
            _id: 1,
            name: "Đầu tư",
            percent: 10,
            color: '#008b02',
        },
        {
            _id: 2,
            name: "Giáo dục",
            percent: 10,
            color: '#1890ff',
        },
        {
            _id: 3,
            name: "Tiết kiệm",
            percent: 10,
            color: '#1890ff',
        },
        {
            _id: Math.random(),
            name: "Hiếu hỉ",
            percent: 10,
            color: '#1890ff',
        },
        {
            _id: Math.random(),
            name: "Từ thiện",
            percent: 5,
            color: '#1890ff',
        },
    ]
}


const PersonalFinance = () => {
    const [form, setForm] = useState({...SHEET_DEFAULT});
    const [sheets, setSheets] = useState([{...SHEET_DEFAULT}]);
    const [isModalRequiredLoginVisible, setIsModalRequiredLoginVisible] = useState(false);
    const [isModalSaveSheetVisible, setIsModalSaveSheetVisible] = useState(false);
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const { user } = useSelector(s => s.auth || {});
    const router = useRouter();

    const [analytics, setAnalytics] = useState({
        percentCount: 0,
    });

    const onTabClick = (key) => {
        if (key) {
            const currentForm = sheets.find((sheet) => sheet._id === key);

            if (currentForm) {
                setForm(currentForm);
                console.log({currentForm: key})
            }
        }
    }

    const addMoreJar = () => {
        setForm({
            ...form,
            jars: [
                ...form.jars,
                {
                    _id: 'new' + Date.now(),
                    name: "Chiếc lọ thứ " + (form.jars.length + 1),
                    percent: 0,
                    color: '#999',
                },
            ]
        })
    }

    const deleteJar = (idx) => () => {
        setForm({
            ...form,
            jars: form.jars.filter(({ _id }) => _id !== idx)
        })
    }
    const [colorPickerId, setColorPickerId] = useState('');
    const changeJarAttributes = (attr, id) => (event) => {
        setForm({
            ...form,
            jars: form.jars.map(((jar) => {
                if (jar._id == id) {
                    return {
                        ...jar,
                        [attr]: event.target.value
                    }
                }
                return jar;
            }))
        })
    }

    const handleChangeColorJarComplete = (id) => (color) => {
        setForm({
            ...form,
            jars: form.jars.map(((jar, idx) => {
                if (jar._id == id) {
                    return {
                        ...jar,
                        color: color.hex
                    }
                }
                return jar;
            }))
        })
    }

    const showColorPicker = (id) => (event) => {
        event.stopPropagation();
        setColorPickerId(colorPickerId === id ? '' : id);
    }

    useEffect(() => {
        const percentCount = form.jars.reduce((count, jar) => (isNaN(jar.percent) ? 0 : Number(jar.percent)) + count, 0);

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
    }, [form.jars]);

    useEffect(() => {
        if (user) {
            http.get('/jar-sheets', form)
            .then(({ data }) => {
                if (data.length) {
                    setSheets(data);
                    setForm({...data[0]})
                } else {
                    setSheets([{...SHEET_DEFAULT}]);
                    setForm({...SHEET_DEFAULT}) 
                }
            })
        } else {
            setSheets([{...SHEET_DEFAULT}]);
            setForm({...SHEET_DEFAULT})
        }
    }, [user])

    const onSubmit = () => {
        if (!user) {
            setIsModalRequiredLoginVisible(true);
            return;
        }

        setIsModalSaveSheetVisible(true);
    }

    const onEdit = (targetKey, action) => {
        console.log(action,  targetKey)
        if (action === 'remove') {
            if (targetKey !== 'null') {
                Modal.confirm({
                    title: 'Xác nhận',
                    icon: <ExclamationCircleOutlined />,
                    content: 'Sau khi xóa không thể khôi phục, bạn có chắc muốn xóa không ?',
                    okText: 'Đồng ý',
                    cancelText: 'Thoát',
                    okType:"danger",
                    onOk: () => {
                        http.delete('/jar-sheets/' + targetKey).then(() => {
                            // const newList = sheets.filter((sheet) => sheet._id !== targetKey);
                            // setSheets(newList);
                            // if (targetKey === form._id) {
                            //     if (newList.length) {
                            //         setForm({...newList[0]})
                            //     } else {
                            //         setForm(...SHEET_DEFAULT);
                            //     }
                            // }
                            window.location.reload();
                        }).catch(() => {})
                    }
                });
            } else {
                Modal.confirm({
                    title: 'Thông báo',
                    icon: <ExclamationCircleOutlined />,
                    content: 'Bạn chưa lưu bảng này',
                    cancelText: 'Thoát',
                    className: 'confirm-no-ok'
                });
            }
        }
    }

    const onSaveJarSheet = () => {
        if (!form._id) {
            http.post('/jar-sheets', form)
            .then(({ data }) => {
                // setResult(data);
                setIsModalSaveSheetVisible(false);
                window.location.reload();
            })
        } else {
            http.put('/jar-sheets/' + form._id, form)
            .then(({ data }) => {
                // setResult(data);
                setIsModalSaveSheetVisible(false);
                window.location.reload();
            }) 
        }
    }
    
    const clickCard = () => {
        if (colorPickerId) {
            setColorPickerId('');
        }
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
                    <Tabs
                    defaultActiveKey="table" 
                    type={user ? 'editable-card' : 'card'} 
                    size="large" 
                    onTabClick={onTabClick}
                    onEdit={onEdit}
                    >
                        {sheets.map((sheet) => <Tabs.TabPane tab={sheet.name} key={sheet._id}>
                            <Row className="rates">
                                <Col span={24} md={{ span: 6 }} className="controls">
                                    <div className="mt-1">
                                        <div>Thu nhập mỗi tháng: </div>
                                        <Input className="w-100" value={form.income} onChange={onChange} name="income" suffix={<span style={{ color: '#999' }}>triệu</span>} />
                                    </div>
                                    <Card className="board" title="Thống kê">
                                        <p className="bold">Tổng: <span className={analytics.percentCountClassName}>{analytics.percentCount}%</span></p>
                                    </Card>
                                    <Button type="primary" size="large" onClick={onSubmit} style={{marginTop: 20}}>Lưu lại</Button>
                                </Col>
                                <Col span={24} md={{ span: 18 }} className="result">
                                    <div className="pane-wrapper">
                                        {/* <div className="pane-header">
                                            <div className="pane-header-left">
                                            </div>
                                            <div className="panel-header-right">
                                            </div>
                                        </div> */}
                                        <div className="bottles">
                                            {
                                                form.jars.map((jar, index) => {
                                                    return <Card className="bottle" title={
                                                        <div className="bottle-header">
                                                            <Input value={jar.name} className="input-name" onChange={changeJarAttributes('name', jar._id)} />
                                                            <div>
                                                                <div className="color-picked" style={{ backgroundColor: jar.color }} onClick={showColorPicker(jar._id)}></div>
                                                                <div className="color-picker">
                                                                    {colorPickerId === jar._id && <CompactPicker
                                                                        triangle="hide"
                                                                        color={jar.color}
                                                                        onChangeComplete={handleChangeColorJarComplete(jar._id)}
                                                                    />}
                                                                </div>
                                                            </div>
                                                        </div>

                                                    } key={index}>
                                                        <div className="jar" onClick={clickCard}>
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
                                                                    <Input className="percent-input" type="text" style={{ color: jar.color }} value={jar.percent} onChange={changeJarAttributes('percent', jar._id)} suffix={<span>%</span>} />
                                                                </div>
                                                            </div>
                                                            <div className="bottom" style={{ color: jar.color }}>
                                                                {formatCurrency(Math.round(form.income * 1000000 * jar.percent / 100))} đ
                                                            </div>
                                                            <div className="delete" onClick={deleteJar(jar._id)}>
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
                                    </div>
                                </Col>
                            </Row>
                        </Tabs.TabPane>)}
                    </Tabs>
                </div>
            </div>

            <Modal
                title="Yêu cầu đăng nhập"
                visible={isModalRequiredLoginVisible}
                onOk={() => { setIsModalRequiredLoginVisible(false); router.push('/auth/login') }}
                onCancel={() => setIsModalRequiredLoginVisible(false)}
                okText="Đăng nhập"
                cancelText="Để sau"
            >
                <p>Bạn phải đăng nhập để tạo mới 1 kế hoạch riêng</p>
            </Modal>

            <Modal
                title="Lưu bảng"
                visible={isModalSaveSheetVisible}
                onOk={onSaveJarSheet}
                onCancel={() => setIsModalSaveSheetVisible(false)}
                okText="Lưu"
                cancelText="Thoát"
            >
                <div>
                    <div>
                        <div>
                            Tên bảng:
                        </div>
                        <div>
                            <Input name="name" value={form.name} onChange={onChange} />
                        </div>
                    </div>
                    <div>
                        <div>
                            Mô tả:
                        </div>
                        <div>
                            <Input name="description" value={form.description} onChange={onChange} placeholder="Mô tả lưu trữ"/>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

PersonalFinance.Layout = DefaultLayout;


export default PersonalFinance;
