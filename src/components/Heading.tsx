import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.div`
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 48px;
    color: rgba(0, 0, 0, 0.8);
    margin-top: 24px;
`;

export default function Heading({ children }: { children: any }) {
    return <StyledHeading>{children}</StyledHeading>;
}
