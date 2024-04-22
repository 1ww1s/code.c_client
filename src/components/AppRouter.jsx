
import { useContext, useEffect, useState } from 'react'
import {Route, useLocation} from 'react-router-dom'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import RootLayout from '../components/RootLayout/RootLayout'

const {publicRouters, adminRoutes} = require('../routes')

const AppRouter = () => {

    const {user} = useContext(Context) 
    const location = useLocation()
    const [isAuthPage, setIsAuthPage] = useState(location.pathname === LOGIN_ROUTE || location.pathname === REGISTRATION_ROUTE)
  
    useEffect(() => {
      setIsAuthPage(location.pathname === LOGIN_ROUTE || location.pathname === REGISTRATION_ROUTE)
    }, [location.pathname])


    return (
        <Route path='/' element={<RootLayout />}>
            {user.user.role?.find(value => (value === 'admin' || value === 'moderator')) && adminRoutes.map(router => 
                <Route  
                   exact key={router.path} path={router.path}  Component={router.Component} ></Route> 
            )}
            {publicRouters.map(router => 
                <Route exact key={router.path} path={router.path} Component={router.Component} ></Route>    
            )}
            <Route path='*' Component={NotFoundPage} /> 
        </Route>
    )
}

export default observer(AppRouter)