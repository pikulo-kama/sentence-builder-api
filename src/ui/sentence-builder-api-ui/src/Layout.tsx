import {store} from "./store";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import Login from "./components/login/Login";
import RequireAuth from "./features/auth/RequireAuth";
import App from "./App";
import {Provider} from "react-redux";
import React from "react";

const Layout = () => {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        {/*Public Routes*/}
                        <Route path='/login' element={<Login/>}/>

                        {/*Private Routes*/}
                        <Route element={<RequireAuth/>}>
                            <Route path='/*' element={<App/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    )
}

export default Layout
