import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
require('moment/min/locales.min');
moment.locale('pl');

const Container = styled.div`
    background: #ddd;
    width: 102px;
    height: 86px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 18px;

    user-select: none;
    cursor: pointer;

    transition: 0.3s box-shadow;

    ${props => {
        if (props.selected) {
            return `
                background: #b38012;
                color: white;
            `;
        } else {
            return `
                &:hover {
                    box-shadow: inset 1px -100px 0px -94px rgba(0, 0, 0, 0.3);
                }
            `;
        }
    }}
`;

const WeekDay = styled.div`
    font-size: 10px;
`;
const Month = styled.div`
    font-weight: 600;
    font-size: 18px;
`;
const MonthDay = styled.div`
    font-weight: 600;
    font-size: 16px;
`;

export default function Day(props: { day: number; date: moment.Moment | null }) {
    const date = moment().add(props.day, 'days');
    const [selected, setSelected] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (props.date && date.format('YYYY-MM-DD') === props.date.format('YYYY-MM-DD')) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, [props.date]);

    const changeDay = () => {
        history.push(`/seanse?data=${date.format('YYYY-MM-DD')}`);
    };

    return (
        <Container
            onClick={() => {
                changeDay();
            }}
            selected={selected}
        >
            <WeekDay>{date.format('ddd').toLocaleUpperCase()}</WeekDay>
            <Month>{date.format('MMM').toLocaleUpperCase()}</Month>
            <MonthDay>{date.format('D')}</MonthDay>
        </Container>
    );
}
