import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import Seat from './Seat';

const Container = styled.div`
    background: #f9f9f9;
    padding: 12px;
`;

const Legend = styled.div`
    margin-top: 16px;
`;

const LegendIcon = styled.div`
    width: 16px;
    padding-top: 100%;
    border-radius: 3px;
    background-color: ${(props) => props.color};
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

export default forwardRef(function SeatChart(
    props: { map: string; seatsTaken: Array<any>; selectedSeats: Array<any>; setSelectedSeats: Function },
    ref,
) {
    const { map, seatsTaken, selectedSeats, setSelectedSeats } = props;

    const [seatMap, setSeatMap] = useState([]);
    const [columns, setColumns] = useState(0);

    const seatSelected = (seat: any) => {
        let seatIndex = selectedSeats.findIndex((s) => s.row === seat.row && s.col === seat.col);

        if (seatIndex === -1) {
            setSelectedSeats([...selectedSeats, seat]);
        } else {
            let temp = [...selectedSeats];
            temp.splice(seatIndex, 1);

            setSelectedSeats(temp);
        }
    };

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

            temp[row].push({
                character: map.charAt(i),
                id: `${row}_${i}`,
                col: maxColumnsTemp - 1,
                row,
                taken: false,
            });
        }

        seatsTaken.forEach((seat) => {
            if (typeof temp[seat.row] != 'undefined' && typeof temp[seat.row][seat.col] != 'undefined') {
                if (temp[seat.row][seat.col].character === '_') return;

                temp[seat.row][seat.col].taken = true;
            }
        });

        setSeatMap(temp);
        setColumns(maxColumns);
    }, [map, seatsTaken]);

    const generateSeatChart = () => {
        let chart: any = [];

        for (let row = 0; row < seatMap.length; row++) {
            let seats: any = [];

            if (typeof seatMap[row] != 'undefined') {
                for (let col = 0; col < seatMap[row].length; col++) {
                    let seat = seatMap[row][col];

                    seats.push(
                        <CustomCol columns={columns} width={100 / columns} key={`row-${row}-col-${col}`}>
                            <Seat
                                selected={
                                    props.selectedSeats.findIndex((s) => s.col === seat.col && s.row === seat.row) !==
                                    -1
                                }
                                seatSelected={seatSelected}
                                data={seat}
                            ></Seat>
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
            <Legend>
                <Row align="middle" gutter={8}>
                    <Col>
                        <LegendIcon color="goldenrod"></LegendIcon>
                    </Col>
                    <Col>Miejsce wolne</Col>
                </Row>
                <Row align="middle" gutter={8}>
                    <Col>
                        <LegendIcon color="#006d80"></LegendIcon>
                    </Col>
                    <Col>Miejsce wybrane</Col>
                </Row>
                <Row align="middle" gutter={8}>
                    <Col>
                        <LegendIcon color="#eee"></LegendIcon>
                    </Col>
                    <Col>Miejsce zajęte</Col>
                </Row>
            </Legend>
        </Container>
    );
});
