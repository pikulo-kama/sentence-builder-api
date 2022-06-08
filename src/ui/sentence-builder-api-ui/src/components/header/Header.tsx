import './header.css'
import Logout from "../logout/Logout";

interface HeaderProps {
    showLogout?: boolean
}

const Header = (props: HeaderProps) => {

    const {
        showLogout = true
    } = props

    return (
        <header>
            <div className="header__logo-box">
                <img src="/logo.svg" alt=""/>
                <h1>Speak Out</h1>
            </div>
            {
                showLogout &&
                <div className="header__logout">
                    <Logout />
                </div>
            }
        </header>
    )
}

export default Header