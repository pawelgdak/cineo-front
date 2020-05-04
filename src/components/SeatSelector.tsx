import React, { useState, useEffect } from 'react';
import SeatChart from './SeatChart';
import { Row, Col, Button, Radio } from 'antd';
import styled from 'styled-components';
import IRoom from '../interfaces/IRoom';
import { get } from '../utils/requests';
import IUser from '../interfaces/IUser';
import { useGlobalState } from '../state';
import { Link, useLocation } from 'react-router-dom';

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
    const location = useLocation();
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
    const [actionType, setActionType] = useState(1);
    const [phase, setPhase] = useState(0);
    const [user] = useGlobalState('user');
    const [loginModalOpened, setLoginModalOpened] = useGlobalState('loginModalOpened');

    let isMounted = false;

    useEffect(() => {
        isMounted = true;
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        (async () => {
            const API_RESPONSE_ROOMS = await get(`room/getseats/${props.roomId}`, { useToken: false });

            if (API_RESPONSE_ROOMS) {
                isMounted && setRoom(API_RESPONSE_ROOMS[0]);
            }
        })();
    }, [props.roomId]);

    const proceed = (phase: number) => {
        setPhase(phase);
    };

    const SummaryContent = () => {
        if (phase === 0)
            return (
                <div>
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
                        <Button onClick={() => proceed(1)}>Przejdź dalej</Button>
                    </SummaryButtons>
                </div>
            );

        if (phase === 1)
            return (
                <div>
                    <Header>Podsumowanie</Header>
                    <SelectedSeatsInfo>
                        Wybierz co chcesz zrobić
                        <Row style={{ marginTop: 12 }}>
                            <Radio.Group value={actionType}>
                                <Col span={24}>
                                    <Radio onClick={(e) => setActionType(1)} value={1}>
                                        Chcę zarezerwować wybrane miejsca
                                    </Radio>
                                </Col>
                                <Col span={24}>
                                    <Radio onClick={(e) => setActionType(2)} disabled={user ? false : true} value={2}>
                                        Chcę kupić bilet dla wybranych miejsc{' '}
                                        {user ? (
                                            ''
                                        ) : (
                                            <a onClick={(e) => setLoginModalOpened(true)}>
                                                - aby kupić bilet, musisz być zalogowany
                                            </a>
                                        )}
                                    </Radio>
                                </Col>
                            </Radio.Group>
                        </Row>
                    </SelectedSeatsInfo>
                    <SummaryButtons>
                        <Button style={{ marginRight: 8 }} onClick={() => proceed(0)}>
                            Wróć
                        </Button>
                        <Button onClick={() => proceed(2)}>Przejdź dalej</Button>
                    </SummaryButtons>
                </div>
            );

        if (phase === 2) return <div></div>;
    };

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12}>
                <SeatChart
                    disabled={phase !== 0}
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
                        <SummaryContent />
                    </Summary>
                ) : (
                    <div>Wybierz miejsca aby kontynować</div>
                )}
            </Col>
        </Row>
    );
}
