import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import userStore from './store/UserStore';
import ArticleStore from './store/ArticleStore';
import SectionStore from './store/SectionStore';
import MessageStore from './store/MessageStore';
import LoaderPage from './store/LoaderPage';
import HomeStore from './store/HomeStore'
import ArticlesLast from './store/ArticlesLast'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( 
    <Context.Provider
        value={{
            user: new userStore(),
            article: new ArticleStore(),
            section: new SectionStore(),
            message: new MessageStore(),
            loaderPage: new LoaderPage(),
            homePage: new HomeStore(),
            articlesLast: new ArticlesLast()
        }}
    >
        <App />
    </Context.Provider>
);

