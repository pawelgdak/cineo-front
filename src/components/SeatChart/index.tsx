import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import Seat from './Seat';

const Container = styled.div`
    background: #f9f9f9;
    padding: 12px;
`;

const CustomRow = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 2% 0;

    &:last-child() {
        margin-bottom: 0;
    }

    &:nth-child(1) {
        margin-top: 0;
    }
`;

const CustomCol = styled.div`
    display: flex;
    margin: 0 2%;

    &:nth-child(${(props) => props.columns}) {
        margin-right: 0;
    }

    &:nth-child(1) {
        margin-left: 0;
    }

    width: ${(props) => props.width}%;
`;

export default function SeatChart(props: { map: string }) {
    const { map } = props;

    const [seatMap, setSeatMap] = useState([]);
    const [columns, setColumns] = useState(0);

    useEffect(() => {
        let temp: any = [];
        let row = 0;
        let maxColumns = 0;
        let maxColumnsTemp = 0;

        for (let i = 0; i < map.length; i++) {
            if (map.charAt(i) === '\n') {
                row++;
                maxColumnsTemp = 0;
                continue;
            }

            maxColumnsTemp++;
            if (maxColumns <= maxColumnsTemp) {
                maxColumns = maxColumnsTemp;
            }

            if (typeof temp[row] === 'undefined') {
                temp[row] = [];
            }

            temp[row].push(map.charAt(i));
        }

        setSeatMap(temp);
        setColumns(maxColumns);
    }, [map]);

    const generateSeatChart = () => {
        let chart: any = [];

        for (let row = 0; row < seatMap.length; row++) {
            let seats: any = [];

            for (let col = 0; col < seatMap[row].length; col++) {
                let character = seatMap[row][col];

                seats.push(
                    <CustomCol columns={columns} width={100 / columns} key={`row-${row}-col-${col}`}>
                        <Seat type={character}></Seat>
                    </CustomCol>,
                );
            }

            for (let i = 0; i < columns - seatMap[row].length; i++) {
                seats.push(<CustomCol columns={columns} width={100 / columns} key={`row-${row}-add-${i}`}></CustomCol>);
            }

            chart.push(
                <CustomRow gutter={[12, 12]} key={`row-${row}`}>
                    {seats}
                </CustomRow>,
            );
        }

        return chart;
    };

    return <Container>{generateSeatChart()}</Container>;
}
