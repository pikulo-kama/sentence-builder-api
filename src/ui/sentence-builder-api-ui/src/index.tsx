import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {Provider} from "react-redux"
import {store} from "./store"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./components/login/Login"
import RequireAuth from "./features/auth/RequireAuth"

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                {/*Public Routes*/}
                <Route path='/login' element={<Login/>}/>

                {/*Private Routes*/}
                <Route element={<RequireAuth />}>
                    <Route path='/*' element={<App/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
)
