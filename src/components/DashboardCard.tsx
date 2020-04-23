import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
    background: #fcfcfc;
    border-radius: 6px;
    padding: 32px;
    font-family: 'Poppins';

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Number = styled.span`
    font-size: 24px;
    font-family: 'Poppins';
    font-weight: 500;
`;

const Description = styled.span`
    font-size: 12px;
    font-family: 'Poppins';
    font-weight: 300;
`;

export default function DashboardCard(props: { children?: any; value?: string; description?: string }) {
    const Data = () => {
        return (
            <Row>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <Number>{props.value && props.value}</Number>
                </Col>
                {props.description && (
                    <Col span={24} style={{ textAlign: 'center', marginTop: 18 }}>
                        <Description>{props.description}</Description>
                    </Col>
                )}
            </Row>
        );
    };

    return <Container>{props.children ? props.children : <Data />}</Container>;
}
