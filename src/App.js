import './App.css';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check } from './http/userAPI';
import LoaderPage from './components/LoaderPage/LoaderPage';
import { getLastArticles, getSection } from './http/SiteAPI';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorHandling from './error/ErrorHandling';
import { adminRoutes, publicRouters } from './routes';


function App() {    

  const {user, section, message, articlesLast} = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)

  async function preload(){
    try{
      const userData = await check();
      user.setIsAuth(true)
      user.setUser(userData)
    }
    catch(e){}
    try{
      const sections = await getSection()
      const articles = await getLastArticles()
      articlesLast.setArticles(articles)
      section.setSections(sections)
    }
    catch(e){ErrorHandling(e, message)}
    finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    preload()
  }, [])


  let Router = [...publicRouters]
  if(user.user.role?.find(value => (value === 'admin' || value === 'moderator'))){
    Router = [...Router, ...adminRoutes]
  }
  const router = createBrowserRouter(Router)


  return (
    <div className="App">
      {
        isLoading ? <LoaderPage /> : <RouterProvider router={router} />
      }
    </div>
  )
}

export default observer(App)
