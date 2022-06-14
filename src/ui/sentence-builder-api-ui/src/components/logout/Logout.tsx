import {useState} from "react"
import PrimaryButton from "../shared/button/PrimaryButton"
import {useNavigate} from "react-router-dom"
import {logout} from "../../features/auth/auth-slice"
import {useDispatch} from "react-redux"
import './logout.css'
import SecondaryButton from "../shared/button/SecondaryButton"
import {Translate} from "react-i18nify";


const Logout = () => {

    const [showConfirm, setShowConfirm] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        // @ts-ignore
        dispatch(logout())
        navigate('/login')
    }

    return (
        <>
            {
                !showConfirm ?
                    <SecondaryButton
                        onClick={() => setShowConfirm(true)}
                    >
                        <Translate value='logout.logout_button' />
                    </SecondaryButton> :
                    <div className='logout__container'>
                        <h3><Translate value='logout.logout_text' /></h3>
                        <div className="logout__buttons">
                            <PrimaryButton
                                onClick={handleLogout}
                            ><Translate value='logout.logout_confirm_yes' /></PrimaryButton>
                            <SecondaryButton
                                onClick={() => setShowConfirm(false)}
                            ><Translate value='logout.logout_confirm_no' /></SecondaryButton>
                        </div>
                    </div>
            }
        </>
    )
}

export default Logout