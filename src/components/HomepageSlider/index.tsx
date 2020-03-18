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
`;

export default function HomepageSlider() {
    const [element, setElement] = useState({});
    useEffect(() => {
        console.log('aa');

        (async () => {
            const API_RESPONSE = await get('movies');
            setElement(API_RESPONSE.data[Math.floor(Math.random() * API_RESPONSE.data.length)]);

            console.log(API_RESPONSE);
        })();
    });

    if (element != {}) {
        return (
            <Container>
                <Slide data={element} />
            </Container>
        );
    }

    return <Container />;
}
