import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const StyledContainer = styled(Col)`
    padding: 24px 0;
`;

export default function Container(props: { children: any }) {
    return (
        <Row justify="center">
            <StyledContainer lg={18} md={20} xs={22} sm={20}>
                {props.children}
            </StyledContainer>
        </Row>
    );
}
