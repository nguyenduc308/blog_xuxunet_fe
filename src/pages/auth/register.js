import { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined, UserSwitchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Head from 'next/head';
import { Select } from 'antd';
import { useRouter } from 'next/router';

import { DefaultLayout } from '../../components/layouts';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/auth/actions';
import { checkServerSideCookie, serverSideRedirect } from '../../helpers/auth';
import {wrapper} from '../../store';


const Register = (props) => {

  const [data] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      account_type: 'customer',
  });
  const router = useRouter();
  const user = useSelector(state => state.auth?.user);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(register(values))
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
              name='first_name'
              label='Họ'
              className='auth-form-item'
            >
              <Input placeholder='Họ' />
            </Form.Item>

            <Form.Item
              name='last_name'
              label='Tên'
              className='auth-form-item'
            >
              <Input placeholder='Tên' />
            </Form.Item>

            <Form.Item
              name='email'
              label='Email'
              rules={[
                { required: true, message: 'Bắt buộc điền email!' },
                { type: 'email', message: 'Email không hợp lệ' }
              ]}
              className='auth-form-item'
            >
              <Input placeholder='Email' />
            </Form.Item>

            <Form.Item
              name='password'
              label='Mật khẩu'
              className='auth-form-item'
              rules={[
                { required: true, message: 'Bắt buộc điền mật khẩu!' },
                { min: 6, message: 'Mật khẩu quá ngắn' },
              ]}
            >
              <Input
                type='password'
                placeholder='Mật khẩu'
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name='confirmPassword'
              label='Xác nhận mật khẩu'
              className='auth-form-item'
              rules={[
                { required: true, message: 'Bắt buộc điền xác nhận mật khẩu' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Xác nhận mật khẩu không khớp'));
                  },
                }),
              ]}
            >
              <Input
                type='password'
                placeholder='Xác nhận mật khẩu'
                autoComplete="off"
              />
            </Form.Item>

            {/* <Form.Item
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
            </Form.Item> */}

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


export const getServerSideProps = wrapper.getServerSideProps(({ store, res, req }) => {
  const token = checkServerSideCookie(req, store);

  if (token) {
    return serverSideRedirect(res, '/');
  }
});



export default Register;
