import Link from "next/link";
import { useState } from "react";
import { FaHamburger } from 'react-icons/fa';
import Router from 'next/router';

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/auth/actions";
import Menu from "./menu";

const Header = () => {
    const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
    const user = useSelector(state => state.auth?.user);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    }

    Router.events.on('routeChangeStart', () => {
      if (isShowMobileMenu) {
        setIsShowMobileMenu(false);
      }
    });

    return <header className="header">
        <div className="header-content">
            <div className="header-content-left">
                <Link href="/">
                    <a>
                        <h1>Xuxunet.Com</h1>
                    </a>
                </Link>
            </div>
            <div className="header-content-center">
                <Menu />
            </div>
            {user && <div className="header-content-right">
                <div className="pc">
                  {['admin', 'mod'].includes(user.role) && <Link href="/admin">
                      <a>
                        Dashboard
                      </a>
                  </Link>}
                  {!['admin', 'mod'].includes(user.role) && <Link href="/users/me">
                      <a>
                        Profile
                      </a>
                  </Link>}
                  &nbsp;/&nbsp;
                  <span className="logout" onClick={onLogout}>
                      Logout
                  </span>
                </div>
                <FaHamburger className="sp" fontSize={26} onClick={() => setIsShowMobileMenu(!isShowMobileMenu)}/>
            </div>}
            {!user && <div className="header-content-right">
                <div className="pc">
                  <Link href="/auth/login">
                      <a>
                        Đăng nhập
                      </a>
                  </Link>
                  &nbsp;/&nbsp;
                  <Link href="/auth/register">
                      <a>
                        Đăng ký
                      </a>
                  </Link>
                </div>
                <FaHamburger className="sp" fontSize={26} onClick={() => setIsShowMobileMenu(!isShowMobileMenu)}/>
            </div>}
            <div className={"menu-mobile" + (isShowMobileMenu ? ' active' : '')}>
                <div className="menu-mobile-content">
                  <div className="menu-mobile-section">
                    <div className="menu-mobile-item">
                      <Link href="/tinh-lai-suat-kep-dau-tu-moi-thang">
                        <a>Tính lãi suất đầu tư</a>
                      </Link>
                    </div>
                    <div className="menu-mobile-item">
                      <Link href="/bai-viet">
                        <a>Bài viết mới</a>
                      </Link>
                    </div>
                  </div>
                  <div className="menu-mobile-section">
                    {!user &&<>
                      <div className="menu-mobile-item">
                        <Link href="/auth/login">
                          <a>Đăng nhập</a>
                        </Link>
                      </div>
                      <div className="menu-mobile-item">
                        <Link href="/auth/register">
                          <a>Đăng ký</a>
                        </Link>
                      </div>
                    </>}

                    {user &&<>
                      <div className="menu-mobile-item">
                      {['admin', 'mod'].includes(user.role) && <Link href="/admin">
                          <a>
                            Dashboard
                          </a>
                      </Link>}
                      {!['admin', 'mod'].includes(user.role) && <Link href="/users/me">
                          <a>
                            Profile
                          </a>
                      </Link>}
                      </div>
                      <div className="menu-mobile-item">
                        <span className="logout" onClick={onLogout}>
                            Logout
                        </span>
                      </div>
                    </>}

                  </div>
                </div>
            </div>
        </div>
    </header>;
};

export default Header;
