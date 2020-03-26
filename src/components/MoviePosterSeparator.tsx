import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IMovie from '../interfaces/IMovie';
import { Row, Col } from 'antd';
import colors from '../resources/colors';
import Skeleton from 'react-loading-skeleton';

const Separator = styled(Row)`
    background: ${colors.light};
    width: 100%;
    position: relative;
`;

const ImageContainer = styled.div`
    width: 200px;
`;

const Image = styled.img`
    /* height: 300px; */
    width: 200px;
    position: absolute;
    bottom: 0;
`;

const ImageSkeleton = styled.div`
    width: 200px;
    position: absolute;
    bottom: 0;
    height: 300px;
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
    const { posterImg, duration, imdbRating } = movie || {};

    // if (!movie) return <Separator />;

    return (
        <Separator justify="center">
            <Col lg={18} md={20} xs={22} sm={20}>
                <Row gutter={24}>
                    <Col>
                        <ImageContainer>
                            {posterImg ? (
                                <Image src={posterImg} />
                            ) : (
                                <ImageSkeleton>
                                    <Skeleton width={200} height={300} />
                                </ImageSkeleton>
                            )}
                        </ImageContainer>
                    </Col>
                    <Col>
                        <InfoContainer>
                            {duration ? <InfoElement>{duration}min</InfoElement> : <Skeleton width={42} />}
                            {imdbRating ? (
                                <InfoElement>IMDb: {imdbRating.toFixed(1)}</InfoElement>
                            ) : (
                                <div style={{ display: 'inline-block', marginLeft: 8 }}>
                                    <Skeleton width={42} />
                                </div>
                            )}
                        </InfoContainer>
                    </Col>
                </Row>
            </Col>
        </Separator>
    );
}
