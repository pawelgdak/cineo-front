import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import { post } from '../../../utils/requests';
import { useHistory } from 'react-router-dom';

import SeatChart from '../../../components/SeatChart';

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

export default function AddRoom() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const [map, setMap] = useState(`AAAAA__AA\nAAAAA__A\nAAAAA__A\nAAAAAAAA`);

    const handleForm = () => {};

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
                            <Input.TextArea
                                onChange={(e) => setMap(e.target.value)}
                                value={map}
                                rows={8}
                            ></Input.TextArea>
                        </Col>
                    </Row>
                </Col>
                <Col md={24} lg={12} sm={24} xs={24}>
                    <Row>
                        <Col span={24}>
                            <Label>Podgląd</Label>
                            <SeatChart map={map} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
