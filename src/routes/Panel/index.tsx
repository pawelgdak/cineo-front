import React, { useEffect } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Heading from '../../components/Heading';
import { Layout, Menu } from 'antd';
import { FaFilm, FaTachometerAlt, FaPlay } from 'react-icons/fa';
import { IoIosKeypad } from 'react-icons/io';
import { NavLink, useHistory, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import AddMovie from './movies/add';
import MoviesList from './movies/list';
import Movie from './movies/movie';
import UpdateMovie from './movies/update';

import RoomsList from './rooms/list';
import AddRoom from './rooms/add';
import SeatSelector from '../../components/SeatSelector';
import AddShow from './shows/add';
import ShowsList from './shows/list';

const Content = styled.div`
    padding: 24px;
    width: 100%;
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
                        <SubMenu
                            key="shows"
                            title={
                                <MenuItem>
                                    <MenuItemIcon>
                                        <FaPlay />
                                    </MenuItemIcon>
                                    Seanse
                                </MenuItem>
                            }
                        >
                            <Menu.Item key="/panel/shows">
                                <NavLink to="/panel/shows" className="nav-text">
                                    Lista
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/panel/shows/add">
                                <NavLink to="/panel/shows/add" className="nav-text">
                                    Dodaj
                                </NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="rooms"
                            title={
                                <MenuItem>
                                    <MenuItemIcon>
                                        <IoIosKeypad />
                                    </MenuItemIcon>
                                    Sale
                                </MenuItem>
                            }
                        >
                            <Menu.Item key="/panel/rooms">
                                <NavLink to="/panel/rooms" className="nav-text">
                                    Lista
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="/panel/rooms/add">
                                <NavLink to="/panel/rooms/add" className="nav-text">
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
                        <Route path="/panel/movies/:id/update">
                            <UpdateMovie />
                        </Route>
                        <Route path="/panel/movies/:id">
                            <Movie />
                        </Route>
                        <Route path="/panel/movies">
                            <MoviesList />
                        </Route>

                        <Route path="/panel/shows/add">
                            <AddShow />
                        </Route>
                        <Route path="/panel/shows">
                            <ShowsList />
                        </Route>

                        <Route path="/panel/rooms/add">
                            <AddRoom />
                        </Route>
                        <Route path="/panel/rooms">
                            <RoomsList />
                        </Route>

                        <Route path="/panel">
                            <SeatSelector />
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </div>
    );
}
