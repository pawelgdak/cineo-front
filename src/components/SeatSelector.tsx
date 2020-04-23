import React, { useState, useEffect } from 'react';
import SeatChart from './SeatChart';
import { Row, Col, Button } from 'antd';
import styled from 'styled-components';
import IRoom from '../interfaces/IRoom';
import { get } from '../utils/requests';

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

export default function SeatSelector(props: { roomId: number }) {
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
    const [room, setRoom]: [IRoom, Function] = useState(null);
    let isMounted = false;

    useEffect(() => {
        isMounted = true;
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        (async () => {
            const API_RESPONSE_ROOMS = await get(`room/getseats/${props.roomId}`);

            if (API_RESPONSE_ROOMS) {
                isMounted && setRoom(API_RESPONSE_ROOMS[0]);
            }
        })();
    }, [props.roomId]);

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12}>
                <SeatChart
                    selectable={true}
                    setSelectedSeats={setSelectedSeats}
                    selectedSeats={selectedSeats}
                    seatsTaken={seatsTaken}
                    map={room ? room.seatMap : ''}
                />
            </Col>
            <Col xs={0} md={0} lg={2} />
            <Col xs={24} sm={24} md={24} lg={10}>
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
