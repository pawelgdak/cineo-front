import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background: ${(props) => props.color};
    width: 100%;
    padding-top: 100%;
    border-radius: 4px;

    ${(props) => {
        if (props.taken) return;
        if (props.character === '_') return;
        if (!props.selectable) return;

        if (props.selected) {
            return `
        
            background: #006d80;
            cursor: pointer;
        
        `;
        }

        return `

            cursor: pointer;
            transition: all .5s;
        
            &:hover {
                background: #b58919;
            }
        
        `;
    }}
`;

export default function Seat(props: { data: any; seatSelected: Function; selected: Boolean; selectable: Boolean }) {
    let color = 'goldenrod';
    if (props.data.character === '_') {
        color = 'transparent';
    }

    if (props.data.taken) {
        color = '#eee';
    }

    const handleClick = () => {
        if (!props.selectable) return;
        if (props.data.taken) return;
        if (props.data.character === '_') return;

        props.seatSelected(props.data);
    };

    return (
        <Container
            selectable={props.selectable}
            character={props.data.character}
            selected={props.selected}
            onClick={handleClick}
            taken={props.data.taken}
            color={color}
        ></Container>
    );
}
