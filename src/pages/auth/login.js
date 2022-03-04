import { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import Link from 'next/link';
import Head from 'next/head';
import { DefaultLayout } from '../../components/layouts';

const Login = (props) => {
  const [data, setData] = useState({
      email: '',
      password: ''
  });

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (<>
      <Head>
        <title>Đăng nhập</title>
      </Head>

     <div className='auth-wrapper'>
       <h1>Chào mừng bạn trở lại</h1>
       <p>Bạn chưa có tài khoản? &nbsp;
         <Link href='register'>
          <a>Đăng ký</a>
         </Link>
       </p>
       <div className='auth-box'>
          <Form
            name='normal_login'
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name='email'
              label='Email'
              className='auth-form-item'
              rules={[{ required: true, message: 'Bắt buộc nhập email' }]}
            >
              <Input prefix={<MailOutlined />} placeholder='Username' />
            </Form.Item>
            <Form.Item
              name='password'
              label='Mật khẩu'
              className='auth-form-item'
              rules={[{ required: true, message: 'Bắt buộc nhập password' }]}
            >
              <Input
                prefix={<LockOutlined />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Ghi nhớ</Checkbox>
              </Form.Item>
              <a className='login-form-forgot' href='forgot'>
                Quên mật khẩu
              </a>
            </Form.Item>

            <Form.Item>
              <div className='flex-center w-100'>
                <Button type='primary' htmlType='submit' size='large'>
                  Đăng nhập
                </Button>
              </div>
            </Form.Item>
          </Form>
       </div>
     </div>
  </>);
};

Login.Layout = DefaultLayout;

export default Login;
