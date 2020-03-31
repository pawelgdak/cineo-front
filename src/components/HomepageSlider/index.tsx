import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slide from './slide';
import { get } from '../../utils/requests';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, #141e30, #243b55);
`;

export default function HomepageSlider() {
    const [element, setElement] = useState(null);
    let isMounted = false;

    useEffect(() => {
        isMounted = true;

        (async () => {
            const API_RESPONSE = await get('movies', { useToken: false });
            isMounted && setElement(API_RESPONSE[Math.floor(Math.random() * API_RESPONSE.length)]);
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    if (element) {
        return (
            <Container>
                <Slide data={element} />
            </Container>
        );
    }

    return <Container />;
}
