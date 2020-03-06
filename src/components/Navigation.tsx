import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

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

    transition: all 0.2s;

    ${({ active }) => {
        if (active) {
            return `
                background: rgba(255, 255, 255, 0.05);
                border-radius: 24px;

                span {
                    color: rgba(255,255,255,0.8) !important;
                }
            `;
        } else {
            return `
                &:hover {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 24px;

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

    return (
        <Container>
            <NavLink to="/" active={(location.pathname === '/').toString()}>
                <NavItem>STRONA GŁÓWNA</NavItem>
            </NavLink>
            <NavLink to="/seanse" active={(location.pathname === '/seanse').toString()}>
                <NavItem>SEANSE</NavItem>
            </NavLink>
        </Container>
    );
}
