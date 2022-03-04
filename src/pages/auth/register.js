import { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined, UserSwitchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Head from 'next/head';
import { Select } from 'antd';
import { DefaultLayout } from '../../components/layouts';

const Register = (props) => {

  const [data, setData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      account_type: 'customer',
  });

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (<>
      <Head>
        <title>Đăng ký</title>
      </Head>

     <div className='auth-wrapper'>
       <h1>Tạo tài khoản mới</h1>
       <p>Bạn đã có tài khoản? &nbsp;
         <Link href='login'>
          <a>Đăng nhập</a>
         </Link>
       </p>
       <div className='auth-box'>
          <Form
            name='normal_login'
            className='login-form'
            initialValues={data}
            onFinish={onFinish}
          >
            <Form.Item
              name='email'
              label='Email'
              rules={[{ required: true, message: 'Bắt buộc điền email!' }]}
              className='auth-form-item'
            >
              <Input prefix={<MailOutlined />} placeholder='Email' />
            </Form.Item>

            <Form.Item
              name='password'
              label='Mật khẩu'
              className='auth-form-item'
              rules={[{ required: true, message: 'Bắt buộc điền mật khẩu!' }]}
            >
              <Input
                prefix={<LockOutlined />}
                type='password'
                placeholder='Mật khẩu'
              />
            </Form.Item>

            <Form.Item
              name='confirmPassword'
              label='Xác nhận mật khẩu'
              className='auth-form-item'
              rules={[{ required: true, message: 'Bắt buộc điền xác nhận mật khẩu' }]}
            >
              <Input
                prefix={<LockOutlined />}
                type='password'
                placeholder='Xác nhận mật khẩu'
              />
            </Form.Item>

            <Form.Item
              label='Vai trò'
              name='account_type'
              className='auth-form-item'
              rules={[{ required: true, message: 'Bắt buộc điền xác nhận mật khẩu' }]}
            >
              <Select size='large'>
                <Select.Option value='customer'>Khách hàng</Select.Option>
                <Select.Option value='freelancer'>Freelancer</Select.Option>
                <Select.Option value='hr'>Nhà tuyển dụng</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item className='form-submit-area'>
              <div className='flex-center w-100'>
                <Button type='primary' htmlType='submit' size='large'>
                  Đăng ký
                </Button>
              </div>
            </Form.Item>
          </Form>
       </div>
     </div>
  </>);
};

Register.Layout = DefaultLayout;

export default Register;
