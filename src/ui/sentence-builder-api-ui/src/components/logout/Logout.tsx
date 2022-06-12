import {useState} from "react"
import PrimaryButton from "../shared/button/PrimaryButton"
import {useNavigate} from "react-router-dom"
import {logout} from "../../features/auth/auth-slice"
import {useDispatch} from "react-redux"
import './logout.css'
import SecondaryButton from "../shared/button/SecondaryButton"


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
                        Log out
                    </SecondaryButton> :
                    <div className='logout__container'>
                        <h3>Do you really want to log out?</h3>
                        <div className="logout__buttons">
                            <PrimaryButton
                                onClick={handleLogout}
                            >Yes</PrimaryButton>
                            <SecondaryButton
                                onClick={() => setShowConfirm(false)}
                            >No</SecondaryButton>
                        </div>
                    </div>
            }
        </>
    )
}

export default Logout