import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import logoImage from '../resources/logo.png';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    position: ${props => (props.location.pathname === '/' ? 'fixed' : 'relative')};
    top: 0;
    padding: 48px 64px;
    z-index: 10;
    justify-content: space-between;
    align-items: center;
    left: 0;
    right: 0;
    background: ${props =>
        props.location.pathname === '/'
            ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.4864320728291317) 26%, rgba(255, 255, 255, 0) 100%)'
            : 'rgba(0, 0, 0, 0.8)'};
`;

const Logo = styled.img`
    width: 128px;
    height: auto;
`;

export default function NavigationBar() {
    const location = useLocation();

    return (
        <Container location={location}>
            <Logo src={logoImage} />
            <Navigation />
        </Container>
    );
}
