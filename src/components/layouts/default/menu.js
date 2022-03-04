import Link from 'next/link';
import { useRouter } from 'next/router';

const Menu = (props) => {
  const menuList = [
    {
      label: 'Blogs',
      path: '/blogs'
    },
    {
      label: 'Rate',
      path: '/tinh-lai-suat-kep-dau-tu-moi-thang'
    },
  ];

  const router = useRouter()
  
  return (
    <nav className="main-menu">
      <ul className="menu-list">
        {
          menuList.map((item) => {
            return <li key={item.path} className={'menu-item' + (router.asPath.indexOf(item.path) > -1 ? ' active' : '')}>
              <Link href={item.path}>
                <a>{item.label}</a>
              </Link>
            </li>
          })
        }
      </ul>
    </nav>
  );
};

export default Menu;
