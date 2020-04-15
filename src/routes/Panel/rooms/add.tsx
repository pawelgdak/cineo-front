import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import { post } from '../../../utils/requests';
import { useHistory } from 'react-router-dom';

import SeatChart from '../../../components/SeatChartCreator';

const Header = styled.div`
    font-size: 24px;
    font-family: 'Poppins';
`;

const Container = styled.div`
    width: 100%;
`;

const Label = styled.div`
    margin-bottom: 8px;
    font-size: 14px;
`;

const TextArea = styled(Input.TextArea)`
    font-family: 'Courier';
`;

export default function AddRoom() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const seatChartRef: any = useRef();

    const [map, setMap] = useState(`AAAAA__A\nAAAAA__A\nAAAAA__A\nAAAAAAAA`);

    const handleForm = () => {
        console.log(seatChartRef.current.getSeats());
    };

    return (
        <Container>
            <Row>
                <Col span={24}>
                    <Row justify="space-between">
                        <Col>
                            <Header>Dodaj salę</Header>
                        </Col>
                        <Col style={{ alignItems: 'center', display: 'flex' }}>
                            <Button loading={loading} onClick={() => handleForm()}>
                                Dodaj
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginTop: 24 }} gutter={24}>
                <Col md={24} lg={12} sm={24} xs={24} style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={24}>
                            <Label>Mapa</Label>
                            <TextArea onChange={(e: any) => setMap(e.target.value)} value={map} rows={8}></TextArea>
                        </Col>
                    </Row>
                </Col>
                <Col md={24} lg={12} sm={24} xs={24}>
                    <Row>
                        <Col span={24}>
                            <Label>Podgląd</Label>
                            <SeatChart ref={seatChartRef} map={map} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
