import Header from "../header/Header"
import {TextField} from "@mui/material"
import './login.css'
import React, {FormEvent, useState} from "react"
import PrimaryButton from "../shared/button/PrimaryButton"
import {useLoginMutation} from "../../api/auth-api-slice"
import {LoginForm} from "../../types/auth"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {setCredentials} from "../../features/auth/auth-slice"

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login] = useLoginMutation()

    const handleSubmit = async (e: FormEvent<any>) => {
        e.preventDefault()

        const loginForm: LoginForm = {
            username,
            password
        }

        const response = await login(loginForm).unwrap()

        if (response.responseType === 'ERROR') {
            return
        }

        dispatch(setCredentials(response?.responseData))

        setUsername('')
        setPassword('')
        navigate('/')
    }

    return (
        <div className='login__container'>
            <Header showLogout={false}/>
            <form className="login__form" onSubmit={handleSubmit}>
                <TextField
                    label='Username'
                    autoComplete='off'
                    variant='filled'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{
                        width: '100%'
                    }}
                />
                <TextField
                    label='Password'
                    type='password'
                    variant='filled'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        width: '100%'
                    }}
                />
                <PrimaryButton type='submit'>
                    Login
                </PrimaryButton>
            </form>
        </div>
    )
}

export default Login