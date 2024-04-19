import React, { useState } from 'react';
import classes from './adminActions.module.css'
import classesAdmin from '../../../pages/Admin/admin.module.css'
import { observer } from 'mobx-react-lite';
import MyButton from '../../UI/button/MyButton';
import { Link, useLocation } from 'react-router-dom';
import arrow from '../../../assets/arrow-down.png'
import { ADMIN_ARTICLE_CREATE_ROUTE, ADMIN_ARTICLE_LIST_ROUTE, ADMIN_ARTICLES_UPDATE_ROUTE, 
    ADMIN_HOME_ARTICLE_CREATE_ROUTE, ADMIN_HOME_ARTICLE_LIST_ROUTE, ADMIN_HOME_ARTICLES_UPDATE_ROUTE } from '../../../utils/consts';
import AddSection from '../../modals/AddSection/AddSection';
import UpdateSection from '../../modals/UpdateSection/UpdateSection';
import AddRole from '../../modals/AddRole/AddRole';
import UpdateRolesUser from '../../modals/UpdateRolesUser/UpdateRolesUser';

const AdminActions = () => {  

    const location = useLocation()
    const [showAddSection, setShowAddSection] = useState(false)
    const [showUpdateSection, setShowUpdateSection] = useState(false)
    const [showRole, setShowRole] = useState(false)
    const [showRolesUser, setShowRolesUser] = useState(false)

    return (
        <div className={classes.container} >
            <div className={classes.articles}>
                <div className={classes.articlesSign}>
                    <h1>Статьи</h1>
                    <img className={classes.arrow} src={arrow} />
                </div>
                <div className={classes.actions}>
                    <div className={classes.button}>
                        <Link to={ADMIN_ARTICLE_CREATE_ROUTE} className={classes.a}>
                            <MyButton><span className={classes.buttonText}>Добавить статью</span></MyButton>
                        </Link>
                    </div>
                    <div className={classes.button}>
                        <Link to={ADMIN_ARTICLE_LIST_ROUTE} className={classes.a}>
                            <MyButton><span className={classes.buttonText}>Изменить / удалить статью</span></MyButton>
                        </Link>
                    </div>  
                    <div className={classes.button}>
                        <Link to={ADMIN_ARTICLES_UPDATE_ROUTE} className={classes.a}>
                            <MyButton><span className={classes.buttonText}>Изменить порядок статей</span></MyButton>
                        </Link>
                    </div>        
                </div>
            </div>
            <div className={classes.otherActions}>
                <div className={classes.homeSign}>
                    <h1>Другие действия</h1>
                    <img className={classes.arrow} src={arrow} />
                </div>
                <div className={classes.actions}>
                    <div className={classes.button}>
                        <div className={classes.buttonShowModal}>
                            <MyButton onClick={(e) => setShowAddSection(true)}>
                                <span className={classes.buttonText}>Добавить раздел</span>
                            </MyButton>
                            {showAddSection && <AddSection  onHide = {() => setShowAddSection(false)} />}
                        </div>
                    </div>   
                    <div className={classes.button}>
                        <div className={classes.buttonShowModal}>
                            <MyButton onClick={(e) => setShowUpdateSection(true)}>
                                <span className={classes.buttonText}>Изменить / удалить разделы</span>
                            </MyButton>
                            {showUpdateSection && <UpdateSection onHide = {() => setShowUpdateSection(false)} />}
                        </div>
                    </div>    
                    <div className={classes.button}>
                        <div className={classes.buttonShowModal}>
                            <MyButton onClick={(e) => setShowRole(true)}>
                                <span className={classes.buttonText}>Добавить роль</span>
                            </MyButton>
                            {showRole && <AddRole onHide = {() => setShowRole(false)} />}
                        </div>
                    </div>                
                    <div className={classes.button}>
                        <div className={classes.buttonShowModal}>
                            <MyButton onClick={(e) => setShowRolesUser(true)}>
                                <span className={classes.buttonText}>Изменить роли пользователю</span>
                            </MyButton>
                            {showRolesUser && <UpdateRolesUser onHide = {() => setShowRolesUser(false)} />}
                        </div>
                    </div>               
                </div>
            </div>
            <div className={classes.home}>
                <div className={classes.homeSign}>
                    <h1>Домашняя страница</h1>
                    
                    <img className={classes.arrow} src={arrow} />
                </div>
                <div className={classes.actions}>
                    <div className={classes.button}>
                        <Link to={ADMIN_HOME_ARTICLE_CREATE_ROUTE} className={classes.a}>
                            <MyButton><span className={classes.buttonText}>Добавить блок</span></MyButton>
                        </Link>
                    </div>
                    <div className={classes.button}>
                        <Link to={ADMIN_HOME_ARTICLE_LIST_ROUTE} className={classes.a}>
                            <MyButton><span className={classes.buttonText}>Изменить / удалить блок</span></MyButton>
                        </Link>
                    </div>  
                    <div className={classes.button}>
                        <Link to={ADMIN_HOME_ARTICLES_UPDATE_ROUTE} className={classes.a}>
                            <MyButton><span className={classes.buttonText}>Изменить порядок блоков</span></MyButton>
                        </Link>
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default observer(AdminActions)