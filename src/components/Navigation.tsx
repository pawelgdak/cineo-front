import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import AccountDrawer from './AccountModal';

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

    return (
        <Container>
            <NavLink to="/" active={(location.pathname === '/').toString()}>
                <NavItem>STRONA GŁÓWNA</NavItem>
            </NavLink>
            <NavLink to="/seanse" active={(location.pathname === '/seanse').toString()}>
                <NavItem>SEANSE</NavItem>
            </NavLink>
            <NavLink to={location.pathname} onClick={() => setVisible(true)}>
                <NavItem>
                    <UserOutlined />
                </NavItem>
            </NavLink>

            <AccountDrawer setVisible={(value: boolean) => setVisible(value)} visible={visible} />
        </Container>
    );
}
