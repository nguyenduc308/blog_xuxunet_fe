import Header from '../default/header';
import Footer from '../default/footer';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const { SubMenu } = Menu;

function AdminLayout({ children }) {
  const router = useRouter();

  const handleClick = ({key}) => {
    router.push(key);
  }

  return (
    <div className='wrapper admin-wrapper'>
        <Header></Header>
            <main>
              <aside>
                <Menu
                    onClick={handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <SubMenu key="sub1" icon={<SettingOutlined />} title="Blog">
                        <Menu.Item key="/admin/blog/create">Tạo bài đăng</Menu.Item>
                        <Menu.Item key="/admin/blog">Danh sách</Menu.Item>
                    </SubMenu>
                </Menu>
              </aside>
              <div className='content'>
                {children}
              </div>
            </main>
        <Footer></Footer>
    </div>
  );
}

export default AdminLayout;
