import Header from '../default/header';
import Footer from '../default/footer';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const { SubMenu } = Menu;

function AdminLayout({ children }) {
  const router = useRouter();

  const { user, loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (!loading) {
      if (!user || (user && !['mod', 'admin'].includes(user.role))) {
        router.push('/');
      }
    }
  }, [user, loading]);

  const handleClick = ({key}) => {
    router.push(key);
  }

  return (
    <>
    {loading && <span>Loading......</span>}
    {!loading && <div className='wrapper admin-wrapper'>
        <Header></Header>
            <main>
              <aside>
                <Menu
                    onClick={handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <Menu.Item key="/admin" icon={<SettingOutlined />}>Dashboard</Menu.Item>
                    <SubMenu key="sub1" icon={<SettingOutlined />} title="Blog">
                        <Menu.Item key="/admin/blog/create">Tạo bài đăng</Menu.Item>
                        <Menu.Item key="/admin/blog">Danh sách</Menu.Item>
                        <Menu.Item key="/admin/blog/deleted">Đã xoá</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/admin/comments" icon={<SettingOutlined />}>Bình luận</Menu.Item>
                    <Menu.Item key="/admin/categories" icon={<SettingOutlined />}>Chủ đề</Menu.Item>
                    <Menu.Item key="/admin/users" icon={<SettingOutlined />}>Thành viên</Menu.Item>
                    <Menu.Item key="/admin/tracking" icon={<SettingOutlined />}>Quảng bá</Menu.Item>
                </Menu>
              </aside>
              <div className='content'>
                {children}
              </div>
            </main>
        <Footer></Footer>
    </div>}
    </>
  );
}

export default AdminLayout;
