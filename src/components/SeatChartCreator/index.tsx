import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import Seat from './Seat';

const Container = styled.div`
    background: #f9f9f9;
    padding: 12px;
`;

const Screen = styled.div`
    width: 100%;
    background: #aaa;
    border-radius: 4px;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: white;
    font-family: 'Poppins';
`;

const Info = styled.div`
    margin-top: 12px;
    font-family: 'Poppins';
    font-size: 12px;
    display: flex;
    flex-direction: column;
`;

const CustomRow = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 2% 0;

    &:nth-child(${(props) => props.rows}) {
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

export default forwardRef(function SeatChart(props: { map: string }, ref) {
    const { map } = props;

    const [seatMap, setSeatMap] = useState([]);
    const [columns, setColumns] = useState(0);
    const [seats, setSeats] = useState([]);

    useImperativeHandle(ref, () => ({
        getSeats() {
            return seats;
        },
    }));

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

        generateSeatsObjects(temp);
    }, [map]);

    const generateSeatsObjects = (seatMap: any) => {
        let seats = [];
        for (let row = 0; row < seatMap.length; row++) {
            if (typeof seatMap[row] != 'undefined') {
                for (let col = 0; col < seatMap[row].length; col++) {
                    let character = seatMap[row][col];
                    if (character !== '_') {
                        let seat = {
                            // id: `${row}_${col}`,
                            col: col + 1,
                            row: col + 1,
                            character,
                        };
                        seats.push(seat);
                    }
                }
            }
        }
        setSeats(seats);
        return seats;
    };

    const generateSeatChart = () => {
        let chart: any = [];

        for (let row = 0; row < seatMap.length; row++) {
            let seats: any = [];

            if (typeof seatMap[row] != 'undefined') {
                for (let col = 0; col < seatMap[row].length; col++) {
                    let character = seatMap[row][col];

                    seats.push(
                        <CustomCol columns={columns} width={100 / columns} key={`row-${row}-col-${col}`}>
                            <Seat type={character}></Seat>
                        </CustomCol>,
                    );
                }

                for (let i = 0; i < columns - seatMap[row].length; i++) {
                    seats.push(
                        <CustomCol columns={columns} width={100 / columns} key={`row-${row}-add-${i}`}></CustomCol>,
                    );
                }
            }

            chart.push(
                <CustomRow rows={seatMap.length} gutter={[12, 12]} key={`row-${row}`}>
                    {seats}
                </CustomRow>,
            );
        }

        return chart;
    };

    return (
        <Container>
            <Screen>Ekran</Screen>
            {generateSeatChart()}
            <Info>
                <div>Rzędów: {seatMap.length}</div>
                <div>Kolumn: {columns}</div>
                <div>Miejsc: {seats.length}</div>
            </Info>
        </Container>
    );
});
