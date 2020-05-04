import React, { useState, useEffect } from 'react';
import SeatChart from './SeatChart';
import { Row, Col, Button, Radio, message, Modal } from 'antd';
import styled from 'styled-components';
import IRoom from '../interfaces/IRoom';
import { get, post } from '../utils/requests';
import IUser from '../interfaces/IUser';
import { useGlobalState } from '../state';
import { Link, useLocation } from 'react-router-dom';
import IShow from '../interfaces/IShow';

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

const BookingCode = styled.div`
    background: rgba(0, 0, 0, 0.04);
    font-family: 'Poppins';
    color: black;
    font-weight: 500;
    padding: 8px 12px;
    margin-right: 6px;
    margin-bottom: 6px;
    display: inline-block;
    cursor: pointer;
`;

export default function SeatSelector(props: { roomId: number; show?: IShow }) {
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
    const [buttonLoading, setButtonLoading] = useState(false);
    const [bookingTicketIds, setBookingTicketIds] = useState([]);
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentSuceed, setPaymentSuceed] = useState(false);

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

    const bookSelectedSeats = async () => {
        setButtonLoading(true);
        let ticketsIds: any = [];

        selectedSeats.forEach(async (seat) => {
            let roomSeat = room.seats.find((x) => x.col === seat.col + 1 && x.row === seat.row + 1);
            // if (typeof roomSeat !== 'undefined') {
            //     try {
            //         const API_RESPONSE = await post('TicketRsvnPch', {
            //             seatId: roomSeat.id,
            //             showId: props.show.id,
            //             type: 2, // 1 - zakup, 2 - rezerwacja
            //         }, {useToken: false});

            //         ticketsIds.push(API_RESPONSE.id);
            //     } catch (err) {
            //         message.warning(err.map ? err.map((error: any) => error) : err.message);
            //         setButtonLoading(false);
            //     }
            // }

            ticketsIds.push(1, 2, 3);
        });

        setBookingTicketIds(ticketsIds);
        setPhase(3);
        setButtonLoading(false);
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
                                    Rząd: {seat.row + 1}, miejsce: {seat.col + 1} (cena: {props.show.price}zł)
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
                    Wybierz co chcesz zrobić
                    <SelectedSeatsInfo>
                        <Row>
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

        if (phase === 2) {
            if (actionType === 1) {
                return (
                    <div>
                        <Header>Podsumowanie</Header>
                        Czy jesteś pewny, że chcesz zarezerwować wybrane miejsca?:
                        <SelectedSeatsInfo>
                            {selectedSeats.map((seat) => {
                                return (
                                    <div key={seat.id}>
                                        Rząd: {seat.row + 1}, miejsce: {seat.col + 1} (cena: {props.show.price}zł)
                                    </div>
                                );
                            })}
                        </SelectedSeatsInfo>
                        <SummaryButtons>
                            <Button style={{ marginRight: 8 }} onClick={() => proceed(1)}>
                                Wróć
                            </Button>
                            <Button loading={buttonLoading} onClick={() => bookSelectedSeats()}>
                                Potwierdź
                            </Button>
                        </SummaryButtons>
                    </div>
                );
            } else if (actionType === 2) {
                return (
                    <div>
                        <Header>Podsumowanie</Header>
                        Czy jesteś pewny, że chcesz kupić wybrane miejsca?:
                        <SelectedSeatsInfo>
                            {selectedSeats.map((seat) => {
                                return (
                                    <div key={seat.id}>
                                        Rząd: {seat.row + 1}, miejsce: {seat.col + 1} (cena: {props.show.price}zł)
                                    </div>
                                );
                            })}
                        </SelectedSeatsInfo>
                        <SummaryButtons>
                            <Button style={{ marginRight: 8 }} onClick={() => proceed(1)}>
                                Wróć
                            </Button>
                            <Button loading={buttonLoading} onClick={() => setPaymentModalVisible(true)}>
                                Przejdź do płatności
                            </Button>
                        </SummaryButtons>
                    </div>
                );
            }
        }

        if (phase === 3) {
            if (actionType === 1) {
                return (
                    <div>
                        <Header>Podsumowanie</Header>
                        Udało się zarezerwować wybrane miejsca. W celu identyfikacji rezerwacji, pracownikowi kina
                        należy okazać następujący kod/kody:
                        <SelectedSeatsInfo>
                            {bookingTicketIds.map((code, index) => {
                                return <BookingCode key={`code-${index}`}>{code + 10000}</BookingCode>;
                            })}
                        </SelectedSeatsInfo>
                    </div>
                );
            } else if (actionType === 2) {
                return (
                    <div>
                        <Header>Podsumowanie</Header>
                        Udało się kupić bilet na wybrane miejsca. Miłego seansu!
                    </div>
                );
            }
        }
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

            <Modal
                title="Płatność"
                visible={paymentModalVisible}
                footer={[
                    <Button key="back" onClick={(e) => setPaymentModalVisible(false)}>
                        Anuluj
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={paymentLoading}
                        onClick={(e) => {
                            setPaymentLoading(true);
                            setTimeout(() => {
                                // selectedSeats.forEach(async (seat) => {
                                //     let roomSeat = room.seats.find(
                                //         (x) => x.col === seat.col + 1 && x.row === seat.row + 1,
                                //     );
                                //     if (typeof roomSeat !== 'undefined') {
                                //         try {
                                //             const API_RESPONSE = await post('TicketRsvnPch', {
                                //                 seatId: roomSeat.id,
                                //                 showId: props.show.id,
                                //                 type: 1, // 1 - zakup, 2 - rezerwacja
                                //             });
                                //         } catch (err) {
                                //             message.warning(err.map ? err.map((error: any) => error) : err.message);
                                //             setButtonLoading(false);
                                //         }
                                //     }
                                // });
                                setPhase(3);

                                setPaymentModalVisible(false);
                                setPaymentSuceed(true);
                                setPaymentLoading(false);
                            }, 1500);
                        }}
                    >
                        Zapłać
                    </Button>,
                ]}
            >
                <p>Łączny koszt: {props.show.price * selectedSeats.length}zł</p>
            </Modal>
        </Row>
    );
}
