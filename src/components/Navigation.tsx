import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import AccountDrawer from './AccountModal';
import { useGlobalState } from '../state';
import { removeToken } from '../utils/token';
import { Modal } from 'antd';

const Container = styled.div`
    display: flex;
`;

const NavItem = styled.span`
    color: rgba(255, 255, 255, 0.6);
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 14px;
`;

const NavLink = styled(Link)`
    text-decoration: none;
    padding: 8px 18px;
    margin: 0 12px;
    border-radius: 4px;

    ${(props) => props.style}

    transition: all 0.2s;

    ${({ active }) => {
        if (active === 'true') {
            return `
                background: rgba(255, 255, 255, 0.05);

                span {
                    color: rgba(255,255,255,0.8) !important;
                }
            `;
        } else {
            return `
                &:hover {
                    background: rgba(255, 255, 255, 0.02);

                    span {
                        color: rgba(255, 255, 255, 0.7) !important;
                    }
                }
            `;
        }
    }}
`;

export default function Navigation() {
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    const [user, setUser] = useGlobalState('user');

    const handleLogout = () => {
        Modal.confirm({
            title: 'Jesteś pewny/a że chcesz się wylogować?',
            content: '',
            okText: 'Tak',
            okType: 'danger',
            cancelText: 'Nie',
            onOk() {
                removeToken();
                setUser(null);
            },
            onCancel() {},
        });
    };

    return (
        <Container>
            <NavLink to="/" active={(location.pathname === '/').toString()}>
                <NavItem>STRONA GŁÓWNA</NavItem>
            </NavLink>
            <NavLink to="/seanse" active={(location.pathname === '/seanse').toString()}>
                <NavItem>SEANSE</NavItem>
            </NavLink>
            {user && user.permission === 0 ? (
                <NavLink to="/panel" active={(location.pathname === '/panel').toString()}>
                    <NavItem>PANEL</NavItem>
                </NavLink>
            ) : (
                <div />
            )}
            <NavLink
                style={{ marginRight: 0 }}
                to={user ? '/user' : location.pathname}
                onClick={() => !user && setVisible(true)}
            >
                <NavItem>
                    <UserOutlined />
                </NavItem>
            </NavLink>
            {user && (
                <NavLink style={{ marginLeft: 0 }} to={location.pathname} onClick={() => handleLogout()}>
                    <NavItem>
                        <LogoutOutlined />
                    </NavItem>
                </NavLink>
            )}

            <AccountDrawer setVisible={(value: boolean) => setVisible(value)} visible={visible} />
        </Container>
    );
}
