import React, { useState, useEffect } from 'react';
import SeatChart from './SeatChart';
import { Row, Col } from 'antd';
import styled from 'styled-components';

export default function SeatSelector() {
    const seatsTaken = [
        {
            row: 0,
            col: 2,
        },
        {
            row: 0,
            col: 3,
        },
        {
            row: 2,
            col: 2,
        },
    ];

    const [selectedSeats, setSelectedSeats] = useState([]);
    useEffect(() => {
        console.log(selectedSeats);
    }, [selectedSeats]);

    return (
        <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={12}>
                <SeatChart
                    setSelectedSeats={setSelectedSeats}
                    selectedSeats={selectedSeats}
                    seatsTaken={seatsTaken}
                    map={`AAAAAA__AA\nAAAAAA__AA\nAAAAAA__AA\nAAAAAAAAAA`}
                />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
                opis
                {selectedSeats.map((seat) => (
                    <div key={seat.id}>{seat.id}</div>
                ))}
            </Col>
        </Row>
    );
}
