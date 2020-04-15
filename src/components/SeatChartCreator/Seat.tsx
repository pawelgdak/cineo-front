import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background: ${(props) => props.color};
    width: 100%;
    padding-top: 100%;
    border-radius: 4px;
`;

export default function Seat(props: { type: string }) {
    let color = 'goldenrod';
    if (props.type === '_') {
        color = 'transparent';
    }

    return <Container color={color}></Container>;
}
