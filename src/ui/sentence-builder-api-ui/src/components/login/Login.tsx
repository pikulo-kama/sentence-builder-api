import Header from "../header/Header"
import {TextField} from "@mui/material"
import './login.css'
import React, {useState} from "react"
import PrimaryButton from "../shared/button/PrimaryButton"
import {useLoginMutation} from "../../api/auth-api-slice"
import {LoginForm} from "../../types/auth"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {setCredentials} from "../../features/auth/auth-slice"
import {I18n, Translate, translate} from "react-i18nify"
import ApplicationModal from "../shared/modal/ApplicationModal";
import {Response} from "../../types/response";

const Login = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [response, setResponse] = useState<Response<any>>()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login] = useLoginMutation()

    const handleLogin = async () => {
        const loginForm: LoginForm = {
            username,
            password
        }

        setResponse(await login(loginForm).unwrap())

        if (response?.responseType === 'ERROR') {
            setOpen(true)
            return
        }

        dispatch(setCredentials(response?.responseData))

        setUsername('')
        setPassword('')
        navigate('/')
    }

    return (
        // @ts-ignore
        <I18n render={() =>
            <>
                <Header showLogout={false}/>
                <div className='login__container'>
                    <ApplicationModal
                        open={open}
                        setOpen={setOpen}
                        response={response}
                    />
                    <div className="login__form">
                        <TextField
                            label={translate('login.username_field')}
                            autoComplete='off'
                            variant='filled'
                            required={true}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{
                                width: '100%'
                            }}
                        />
                        <TextField
                            label={translate('login.password_field')}
                            type='password'
                            variant='filled'
                            required={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                width: '100%'
                            }}
                        />
                        <PrimaryButton
                            onClick={handleLogin}
                            disabled={!password || !username}
                        >
                            <Translate value='login.login_button'/>
                        </PrimaryButton>
                    </div>
                </div>
            </>
        }/>
    )
}

export default Login