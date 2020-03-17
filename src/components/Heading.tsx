import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

const StyledHeading = styled(Col)`
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 48px;
    color: rgba(0, 0, 0, 0.8);
    margin-top: 24px;
    margin-bottom: 24px;
`;

const StyledRow = styled(Row)`
    background-color: #f9f9f9;
`;

export default function Heading({ children }: { children: any }) {
    return (
        <StyledRow justify="center">
            <StyledHeading lg={18} md={20} xs={22} sm={20}>
                {children}
            </StyledHeading>
        </StyledRow>
    );
}
