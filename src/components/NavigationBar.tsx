import React, { useState } from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import logoImage from '../resources/logo.png';
import { useLocation } from 'react-router-dom';
import colors from '../resources/colors';
import { HamburgerButton } from 'react-hamburger-button';

const Container = styled.div`
    display: flex;
    position: ${(props) => (props.fixed ? 'fixed' : props.absolute ? 'absolute' : 'relative')};
    top: 0;
    padding: 48px 64px;
    z-index: 10;
    justify-content: space-between;
    align-items: center;
    left: 0;
    right: 0;
    background: ${(props) =>
        props.transparent
            ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.4864320728291317) 26%, rgba(0, 0, 0, 0) 100%)'
            : colors.dark};

    @media (max-width: 576px) {
        padding: 32px 24px;
    }
`;

const BurgerButton = styled.div`
    visibility: hidden;

    @media (max-width: 992px) {
        visibility: visible;
    }
`;

const Logo = styled.img`
    width: 128px;
    height: auto;

    @media (max-width: 576px) {
        width: 82px;
    }
`;

export default function NavigationBar(props: { transparent?: boolean; fixed?: boolean; absolute?: boolean }) {
    const location = useLocation();
    const transparent = props.transparent ? props.transparent : false;
    const fixed = props.fixed ? props.fixed : false;
    const absolute = props.absolute ? props.absolute : false;

    const [burgerState, setBurgerState] = useState(false);

    const burgerClick = () => {
        setBurgerState((state) => !state);
    };

    return (
        <Container transparent={transparent} absolute={absolute} fixed={fixed} location={location}>
            <Logo src={logoImage} />
            <BurgerButton>
                <HamburgerButton color="#aaa" width={28} height={16} open={burgerState} onClick={burgerClick} />
            </BurgerButton>

            <Navigation left={burgerState ? 0 : '-100%'} />
        </Container>
    );
}
