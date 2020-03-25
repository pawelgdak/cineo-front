import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IMovie from '../interfaces/IMovie';
import { Row, Col } from 'antd';
import colors from '../resources/colors';
// @ts-ignore
import useDimensions from 'react-use-dimensions';

const Separator = styled(Row)`
    background: ${colors.light};
    width: 100%;
    position: relative;
`;

const Image = styled.img`
    height: 300px;
    position: absolute;
    bottom: 0;
`;

const InfoContainer = styled.div`
    padding: 8px 0;
    margin-left: ${props => props.marginLeft}px;
`;

const InfoElement = styled.span`
    font-family: 'Poppins';
    font-weight: 400;
    margin-right: 8px;

    &:after {
        content: '·';
        margin-left: 8px;
    }

    &:nth-last-child(1)::after {
        content: '';
    }
`;

export default function MoviePosterSeparator(props: { movie: IMovie }) {
    const { movie } = props;
    const [marginLeft, setMarginLeft] = useState(0);

    const [ref, { width }] = useDimensions();
    useEffect(() => {
        setMarginLeft(width + 18);
    }, [width]);

    if (!movie) return <Separator />;

    return (
        <Separator justify="center">
            <Col lg={18} md={20} xs={22} sm={20}>
                <Row>
                    <Col>
                        <Image ref={ref} src={movie.posterImg} />
                    </Col>
                    <Col>
                        <InfoContainer marginLeft={marginLeft}>
                            <InfoElement>{movie.duration}min</InfoElement>
                            <InfoElement>IMDb: {movie.imdbRating.toFixed(1)}</InfoElement>
                        </InfoContainer>
                    </Col>
                </Row>
            </Col>
        </Separator>
    );
}
