import React, { useState, useEffect } from 'react';
import DaysRow from './DaysRow';
import styled from 'styled-components';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Container = styled.div`
    display: flex;
    flex-direction: row;

    margin-left: -24px;
    margin-right: -24px;
`;

const Arrow = styled.div`
    padding: 0 12px;
    margin: 0 4px;
    align-items: center;
    display: flex;
    cursor: pointer;
    transition: 0.2s all;
    user-select: none;

    visibility: ${props => (props.visible ? 'visible' : 'hidden')};

    &:hover {
        background: #fcfcfc;
    }
`;

export default function Calendar() {
    const [left, setLeft] = useState(0);
    const [date, setDate] = useState(moment());
    const [maxLeft, setMaxLeft] = useState(1000);
    const [leftArrowVisible, setLeftArrowVisible] = useState(false);
    const [rightArrowVisible, setRightArrowVisible] = useState(true);
    const query = useQuery();
    const location = useLocation();

    useEffect(() => {
        let tempDate: any = query.get('data');
        if (tempDate) {
            tempDate = moment(tempDate);
        }

        if (tempDate && tempDate >= moment().subtract(1, 'days') && tempDate < moment().add(13, 'days')) {
            setDate(tempDate);
        }
    }, [location]);

    useEffect(() => {
        let dayDifference = date.diff(moment(), 'days');
        if (dayDifference > 3) {
            setLeft((dayDifference - 1) * 120);
        }
    }, [date]);

    const checkIfHideArrow = () => {
        if (left === 0) {
            setLeftArrowVisible(false);
        } else setLeftArrowVisible(true);

        if (left >= 1200) {
            setRightArrowVisible(false);
        } else setRightArrowVisible(true);
    };

    useEffect(checkIfHideArrow, [left]);

    const rowWidthChange = (width: number) => {
        let daysVisible = Math.floor(width / 120);
        setMaxLeft((14 - daysVisible) * 120);
    };

    const rightArrowPress = async () => {
        await setLeft(left => (left < maxLeft ? left + 120 : left));
    };

    const leftArrowPress = async () => {
        await setLeft(left => (left > 0 ? left - 120 : left));
    };

    return (
        <Container>
            <Arrow visible={leftArrowVisible} onClick={() => leftArrowPress()}>
                <LeftOutlined />
            </Arrow>
            <DaysRow date={date} rowWidthChange={(width: number) => rowWidthChange(width)} left={left} />
            <Arrow visible={rightArrowVisible} onClick={() => rightArrowPress()}>
                <RightOutlined />
            </Arrow>
        </Container>
    );
}
