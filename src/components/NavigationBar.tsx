import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import logoImage from '../resources/logo.png';
import { useLocation } from 'react-router-dom';
import colors from '../resources/colors';

const Container = styled.div`
    display: flex;
    position: ${props => (props.fixed ? 'fixed' : 'relative')};
    top: 0;
    padding: 48px 64px;
    z-index: 10;
    justify-content: space-between;
    align-items: center;
    left: 0;
    right: 0;
    background: ${props =>
        props.transparent
            ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.4864320728291317) 26%, rgba(0, 0, 0, 0) 100%)'
            : colors.dark};
`;

const Logo = styled.img`
    width: 128px;
    height: auto;
`;

export default function NavigationBar(props: { transparent?: boolean; fixed?: boolean }) {
    const location = useLocation();
    const transparent = props.transparent ? props.transparent : false;
    const fixed = props.fixed ? props.fixed : false;

    return (
        <Container transparent={transparent} fixed={fixed} location={location}>
            <Logo src={logoImage} />
            <Navigation />
        </Container>
    );
}
