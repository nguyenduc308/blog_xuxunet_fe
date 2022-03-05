import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/auth/actions";
import Menu from "./menu";

const Header = () => {

    const user = useSelector(state => state.auth?.user);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    }

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
            {user && <div>
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
            </div>}
            {!user && <div>
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
            </div>}
        </div>
    </header>;
};

export default Header;
