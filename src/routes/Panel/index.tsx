import React, { useEffect } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Heading from '../../components/Heading';
import { Layout, Menu } from 'antd';
import { FaFilm, FaTachometerAlt } from 'react-icons/fa';
import { NavLink, useHistory, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import AddMovie from './movies/add';

const Content = styled.div`
    padding: 24px;
`;

const MenuItem = styled.div`
    display: flex;
    align-items: center;
`;

const MenuItemIcon = styled.div`
    display: flex;
    margin-right: 12px;
`;

export default function Panel() {
    const { Sider } = Layout;
    const { SubMenu } = Menu;

    const history = useHistory();
    useEffect(() => {
        console.log(history.location);
    }, [history]);

    return (
        <div>
            <NavigationBar />
            <Heading>Panel administracyjny</Heading>
            <Layout style={{ background: 'transparent' }}>
                <Sider breakpoint="lg" collapsedWidth="0" className="site-layout-background" width={200}>
                    <Menu
                        //@ts-ignore
                        selectedKeys={[history.location.pathname]}
                        mode="inline"
                        defaultOpenKeys={['movies']}
                        style={{ height: '100%' }}
                    >
                        <Menu.Item key="/panel">
                            <NavLink to="/panel" className="nav-text">
                                <MenuItem>
                                    <MenuItemIcon>
                                        <FaTachometerAlt />
                                    </MenuItemIcon>
                                    Panel
                                </MenuItem>
                            </NavLink>
                        </Menu.Item>
                        <SubMenu
                            key="movies"
                            title={
                                <MenuItem>
                                    <MenuItemIcon>
                                        <FaFilm />
                                    </MenuItemIcon>
                                    Filmy
                                </MenuItem>
                            }
                        >
                            <Menu.Item key="/panel/movies">
                                <NavLink to="/panel/movies" className="nav-text">
                                    Lista
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/panel/movies/add">
                                <NavLink to="/panel/movies/add" className="nav-text">
                                    Dodaj
                                </NavLink>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Content>
                    <Switch>
                        <Route path="/panel/movies/add">
                            <AddMovie />
                        </Route>
                        <Route path="/panel/movies">movies list</Route>
                        <Route path="/panel">Panel</Route>
                    </Switch>
                </Content>
            </Layout>
        </div>
    );
}
