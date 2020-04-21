import React, { useState, useEffect } from 'react';
import SeatChart from './SeatChart';
import { Row, Col, Button } from 'antd';
import styled from 'styled-components';

const Header = styled.div`
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 1.2em;
`;

const Summary = styled.div`
    display: flex;
    flex-direction: column;
`;

const SummaryButtons = styled.div``;

const SelectedSeatsInfo = styled.div`
    padding: 24px 0;
`;

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

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12}>
                <SeatChart
                    selectable={true}
                    setSelectedSeats={setSelectedSeats}
                    selectedSeats={selectedSeats}
                    seatsTaken={seatsTaken}
                    map={`AAAAAA__AA\nAAAAAA__AA\nAAAAAA__AA\nAAAAAAAAAA`}
                />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12}>
                {selectedSeats.length > 0 ? (
                    <Summary>
                        <Header>Podsumowanie</Header>
                        Liczba wybranych miejsc: {selectedSeats.length}
                        <SelectedSeatsInfo>
                            {selectedSeats.map((seat) => {
                                return (
                                    <div key={seat.id}>
                                        Rząd: {seat.row + 1}, miejsce: {seat.col + 1}
                                    </div>
                                );
                            })}
                        </SelectedSeatsInfo>
                        <SummaryButtons>
                            <Button>Przejdź dalej</Button>
                        </SummaryButtons>
                    </Summary>
                ) : (
                    <div>Wybierz miejsca aby kontynować</div>
                )}
            </Col>
        </Row>
    );
}
