import Link from "next/link";
import { useSelector } from "react-redux";
import Menu from "./menu";

const Header = () => {

    const user = useSelector(state => state.auth?.user);

    return <header className="header">
        <div className="header-content">
            <div className="header-content-left">
                <Link href="/">
                    <a>
                        <h1>Xuxuxet.Com</h1>
                    </a>
                </Link>
            </div>
            <div className="header-content-center">
                <Menu />
            </div>
            {user && <div>
                <Link href="/users/me">
                    <a>
                      Dashboard
                    </a>
                </Link>
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
