import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import IRoom from '../../../interfaces/IRoom';
import styled from 'styled-components';
import { Row, Col, Descriptions, Spin, Button, Modal, message } from 'antd';
import { get, del } from '../../../utils/requests';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import SeatChart from '../../../components/SeatChart';

export default function Room() {
    const { id } = useParams();
    const [room, setRoom]: [IRoom, Function] = useState(null);
    const history = useHistory();

    const Header = styled.div`
        font-size: 24px;
        font-family: 'Poppins';
    `;

    const Container = styled.div`
        width: 100%;
    `;

    let _isMounted = false;

    useEffect(() => {
        _isMounted = true;

        (async () => {
            if (id) {
                const API_RESPONSE = await get(`room/getone/${id}`);
                if (API_RESPONSE) {
                    _isMounted && setRoom(API_RESPONSE[0]);
                }
            }
        })();

        return () => {
            _isMounted = false;
        };
    }, [id]);

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: 'Jesteś pewny/a, że chcesz usunąć tą salę?',
            icon: <ExclamationCircleOutlined />,
            content: 'Tej operacji nie można cofnąć.',
            okText: 'Tak',
            okType: 'danger',
            cancelText: 'Anuluj',
            onOk: async () => {
                try {
                    const DELETE = await del(`room/delete/${room.id}`);
                    if (DELETE) {
                        history.push('/panel/rooms');
                    } else message.warning('Coś poszło nie tak.');
                } catch (err) {
                    message.warning(err.map ? err.map((error: any) => error) : err.message);
                }
            },
            onCancel() {},
        });
    };

    if (!room) return <Spin />;

    return (
        <Container>
            <Row>
                <Col span={24}>
                    <Row justify="space-between">
                        <Col>
                            <Header>Sala numer {room.id}</Header>
                        </Col>
                        <Col style={{ alignItems: 'center', display: 'flex' }}>
                            {/* <Button
                                type="danger"
                                onClick={() => {
                                    showDeleteConfirm();
                                }}
                            >
                                Usuń
                            </Button> */}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginTop: 24 }} gutter={12}>
                <Col span={12}>
                    <SeatChart map={room.seatMap} />
                </Col>
            </Row>
        </Container>
    );
}
