import React, { useEffect } from 'react';
import styled from 'styled-components';
import Day from './Day';
// @ts-ignore
import useDimensions from 'react-use-dimensions';
import moment from 'moment';

const Container = styled.div`
    overflow: hidden;
`;

const DaysContainer = styled.div`
    display: inline-flex;
    position: relative;
    left: -${props => props.left}px;

    transition: 0.3s all;
`;

export default function DaysRow(props: { left: number; rowWidthChange: Function; date: moment.Moment | null }) {
    const { date, left, rowWidthChange } = props;

    const generateDays = () => {
        let days = [];

        for (let i = 0; i < 14; i++) {
            days.push(<Day date={date} key={i} day={i} />);
        }

        return days;
    };

    const [ref, { width }] = useDimensions();
    useEffect(() => {
        rowWidthChange(width);
    }, [width, rowWidthChange]);

    return (
        <Container ref={ref}>
            <DaysContainer left={left}>{generateDays()}</DaysContainer>
        </Container>
    );
}
