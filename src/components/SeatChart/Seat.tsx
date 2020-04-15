import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background: ${(props) => props.color};
    width: 100%;
    padding-top: 100%;
`;

export default function Seat(props: { type: string }) {
    let color = 'red';
    if (props.type === '_') {
        color = 'transparent';
    }

    return <Container color={color}></Container>;
}
