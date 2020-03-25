import React, { useState, useEffect } from 'react';
import IMovieShows from '../../interfaces/IMovieShows';
import styled from 'styled-components';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Row, Col, Button } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import colors from '../../resources/colors';
import { ParallaxBanner } from 'react-scroll-parallax';

const MainContainer = styled.div`
    margin: 0 24px;
    margin-bottom: 24px;
    height: ${props => props.height}px;
    min-height: 400px;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url("${props => props.image}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    display: flex;
    align-items: flex-end;
`;

const Container = styled.div`
    padding: 36px 44px;
`;

const Info = styled(Row)`
    display: flex;
    font-family: 'Poppins';
    font-weight: 300;
    font-size: 12px;
    color: white;
    text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
`;

const Title = styled.div`
    display: flex;
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 36px;
    color: white;
    text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
`;

const InfoElement = styled(Col)`
    margin-right: 8px;
    letter-spacing: 1.3px;

    &:after {
        content: '|';
        margin-left: 8px;
    }

    &:nth-last-child(1)::after {
        content: '';
    }
`;

const ShowsContainer = styled(Row)`
    margin-bottom: 12px;
    margin-top: 32px;
`;
const ShowElement = styled(Col)``;

const StyledButton = styled(Button)`
    color: white;

    &:hover {
        color: ${colors.primary};
    }
`;

export default function Show(props: { data: IMovieShows }) {
    const { data } = props;
    const { movie, shows } = data;
    const { height, width } = useWindowDimensions();
    const [containerHeight, setContainerHeight] = useState(height);
    const history = useHistory();

    useEffect(() => {
        setContainerHeight(height - 400);
    }, [height]);

    return (
        <MainContainer image={movie.img} height={containerHeight}>
            <Container>
                <Title>{movie.title}</Title>
                <Info>
                    <InfoElement>{movie.duration} min</InfoElement>
                    <InfoElement>{movie.genre}</InfoElement>
                    <InfoElement>IMDb: {movie.imdbRating.toFixed(1)}</InfoElement>
                </Info>
                <ShowsContainer gutter="18">
                    {shows.map((show, index) => {
                        return (
                            <ShowElement key={`show-${index}`}>
                                <StyledButton
                                    onClick={() => history.push(`/seanse/${show.id}`)}
                                    size="small"
                                    type="ghost"
                                >
                                    {moment.unix(show.date).format('HH:mm')}
                                </StyledButton>
                            </ShowElement>
                        );
                    })}
                </ShowsContainer>
            </Container>
        </MainContainer>
    );
}
