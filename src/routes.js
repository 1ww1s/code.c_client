import AUTH from './pages/Auth/Auth'
import PersonalAccount from './pages/PersonalAccount/PersonalAccount'
import HOME from './pages/Home/Home'
import ADMIN from './pages/Admin/Admin'
import ARTICLES from './pages/Articles/Articles'
import ARTICLE from './pages/Article/Article'
import RootLayout from './components/RootLayout/RootLayout'
import AdminActions from './components/Admin/AdminActions/AdminActions'
import ArticleCreateAndUpdate from './components/Admin/ArticleCreateAndUpdate/ArticleCreateAndUpdate'
import ArticleList from './components/Admin/ArticleList/ArticleList'
import ArticlesUpdate from './components/Admin/ArticlesUpdate/ArticlesUpdate'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import Update from './components/Admin/Update/Update'

const {LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE, ADMIN_ROUTE, ADMIN_ARTICLES_UPDATE_ROUTE, ADMIN_HOME_ARTICLES_UPDATE_ROUTE, ADMIN_ARTICLE_CREATE_ROUTE, 
    ADMIN_ARTICLE_LIST_ROUTE, ADMIN_ARTICLE_UPDATE_ROUTE, ADMIN_HOME_ARTICLE_LIST_ROUTE, ADMIN_HOME_ARTICLE_UPDATE_ROUTE, ADMIN_HOME_ARTICLE_CREATE_ROUTE,
    SECTION_ARTICLES_ROUTE, ARTICLE_ROUTE, PERSONAL_ACCOUNT_ROUTE} = require('./utils/consts')  // PERSONAL_ACCOUNT_ROUTE
    
    
export const publicRouters = [
    {
        path:HOME_ROUTE,
        element: <RootLayout />,
        children: [
            {
                index: true,
                path: HOME_ROUTE,
                element: <HOME />
            },
            {
                path: LOGIN_ROUTE,
                element: <AUTH />
            },
            {
                path: REGISTRATION_ROUTE,
                element: <AUTH />
            },
            {
                path: PERSONAL_ACCOUNT_ROUTE,
                element: <PersonalAccount />
            },
            {
                path: SECTION_ARTICLES_ROUTE,
                element: <ARTICLES />,
            },
            {
                path: ARTICLE_ROUTE,
                element: <ARTICLE />
            }
        ]
    },
    {
        path:"*",
        element: <NotFoundPage />,
    }
]


export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <ADMIN />,
        handle: {
            crumb: (data) => <span>Главная</span>,
        },
        children: [
            {
                index: true,
                path: ADMIN_ROUTE,
                element: <AdminActions />,
            },
            {
                path: ADMIN_ARTICLE_CREATE_ROUTE,
                element: <ArticleCreateAndUpdate />,
                handle: {
                    crumb: (data) => <span>Создание статьи</span>,
                },
            },
            {
                path: ADMIN_HOME_ARTICLE_CREATE_ROUTE,
                element: <ArticleCreateAndUpdate />,
                handle: {
                    crumb: (data) => <span>Создание блока</span>,
                },
            },
            {
                path: ADMIN_ARTICLES_UPDATE_ROUTE,
                element: <ArticlesUpdate />,
                handle: {
                    crumb: (data) => <span>Изменение порядка статей</span>,
                },
            },
            {
                path: ADMIN_HOME_ARTICLES_UPDATE_ROUTE,
                element: <ArticlesUpdate />,
                handle: {
                    crumb: (data) => <span>Изменение порядка блоков</span>,
                },
            },
            {
                path: ADMIN_ARTICLE_LIST_ROUTE,
                element: <Update />,
                handle: {
                    crumb: (data) => <span>Список статей</span>,
                },
                children: [
                    {
                        path: ADMIN_ARTICLE_LIST_ROUTE,
                        element: <ArticleList />,
                    },
                    {
                        path: ADMIN_ARTICLE_UPDATE_ROUTE,
                        element: <ArticleCreateAndUpdate />,
                        handle: {
                            crumb: (data) => <span>Изменение статьи</span>,
                        },
                    },
                ]
            },
            {
                path: ADMIN_HOME_ARTICLE_LIST_ROUTE,
                element: <Update />,
                handle: {
                    crumb: (data) => <span>Список блоков</span>,
                },
                children: [
                    {
                        path: ADMIN_HOME_ARTICLE_LIST_ROUTE,
                        element: <ArticleList />,
                    },
                    {
                        path: ADMIN_HOME_ARTICLE_UPDATE_ROUTE,
                        element: <ArticleCreateAndUpdate />,
                        handle: {
                            crumb: (data) => <span>Изменение блока</span>,
                        },
                    },
                ]
            },
        ]
    }
]