import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {wrapper} from '../../store';

import { checkServerSideCookie, serverSideRedirect } from '../../helpers/auth';
import { DefaultLayout } from '../../components/layouts';
import { Button, Form, Input } from 'antd';
import http from '../../libs/http';

const Profile = (props) => {
  const { user } = useSelector(state => state.auth);
  
  const handleUpdateProfile = (values) => {
    http.put('/users/update-profile', values).then(() => {
      window.location.reload();
    })
  }

  return (<>
    {user && <div className="profile-wrapper">
      <div className="profile-section profile-left">
          <div className="profile-box">            
            {
              (user.first_name || user.first_name) ? <h3>{user.first_name} {user.last_name}</h3> : <h3>Chưa có tên</h3>
            }
          </div>
      </div>
      <div className="profile-section profile-right">
          <div className="profile-box">            
            <Form initialValues={user} className="profile-form" onFinish={handleUpdateProfile}>
              <Form.Item
                label="Tên"
                name="first_name"
              >
                <Input name="first_name"/>
              </Form.Item>

              <Form.Item
                label="Họ"
                name="last_name"
              >
                <Input name="last_name"/>
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
              >
                <Input disabled name="email"/>
              </Form.Item>

              <div className="profile-form-bottom">
                <Button htmlType='submit' type='primary' size="large">Cập nhật</Button>
              </div>
            </Form>
          </div>
      </div>
    </div>}
  </>);
};

Profile.Layout = DefaultLayout;

export const getServerSideProps = wrapper.getServerSideProps(({ store, res, req }) => {
  // const token = checkServerSideCookie(req, store);

  // if (!token) {
  //   return serverSideRedirect(res, '/auth/login');
  // }

  // store.dispatch(END);
  // await store.sagaTask.toPromise();
});

export default Profile;
