import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import MovieBanner from '../components/MovieBanner';
import { useParams } from 'react-router-dom';
import { get } from '../utils/requests';
import styled from 'styled-components';
import { Row, Col, Popover } from 'antd';
import colors from '../resources/colors';
import MoviePosterSeparator from '../components/MoviePosterSeparator';
import IShow from '../interfaces/IShow';
import IMovie from '../interfaces/IMovie';
import Skeleton from 'react-loading-skeleton';
import Container from '../components/Container';
import moment from 'moment';
// @ts-ignore
import movieTrailer from 'movie-trailer';
// @ts-ignore
import YouTube from 'react-youtube';

const DateContainer = styled(Row)`
    margin-top: 24px;
`;

const DateText = styled.p`
    font-size: 24px;
`;

const TimeText = styled.span`
    color: ${colors.primary};
`;

const Underlined = styled.span`
    background-image: linear-gradient(
        transparent 0%,
        transparent 65%,
        #eaeaea 65%,
        #e8e8e8 90%,
        transparent 90%,
        transparent
    );
    display: inline;
    cursor: pointer;
`;

const CastTitle = styled.span`
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 1.2em;
`;

const Actor = styled.div`
    font-family: 'Poppins';
    color: rgba(0, 0, 0, 0.6);
`;

export default function Show(props: {}) {
    const { id } = useParams();
    const [show, setShow]: [IShow, Function] = useState(null);
    const [movie, setMovie]: [IMovie, Function] = useState(null);
    const [trailer, setTrailer] = useState(null);

    let isMounted = false;

    useEffect(() => {
        isMounted = true;
        (async () => {
            const API_RESPONSE = await get('show');
            isMounted && setShow(API_RESPONSE);
            isMounted && setMovie(API_RESPONSE.movie);

            const trailerVideo = await movieTrailer(API_RESPONSE.movie.title);
            isMounted && setTrailer(trailerVideo);
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    const popoverContent = <div>brak danych</div>;

    const DisplayDate = () => {
        return (
            <DateText>
                Data seansu:{' '}
                <Underlined>
                    <Popover content={popoverContent} title="Zobacz inne godziny">
                        <div>
                            {moment(show.dateAndTimeOfShows).format('DD.MM.YYYY')}{' '}
                            <TimeText>{moment(show.dateAndTimeOfShows).format('HH:mm')}</TimeText>
                        </div>
                    </Popover>
                </Underlined>{' '}
            </DateText>
        );
    };

    const DisplayCast = () => {
        return (
            <div>
                <CastTitle>Obsada</CastTitle>
                <Row gutter={[16, 8]}>
                    {movie.cast.map((actor: string, index: Number) => (
                        <Col span={8} key={index.toString()}>
                            <Actor>{actor}</Actor>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    };

    return (
        <div>
            <MovieBanner movie={movie} />
            <NavigationBar fixed={false} absolute={true} transparent={true} />
            <MoviePosterSeparator movie={movie} />

            <Container>
                <DateContainer>
                    <Col>
                        {(show && <DisplayDate />) || (
                            <div style={{ marginBottom: '1em' }}>
                                <Skeleton height={32} width={300} />
                            </div>
                        )}
                    </Col>
                </DateContainer>
                <Row gutter={[0, 32]}>
                    <Col xs={24} md={24} lg={12}>
                        <Row gutter={[0, 24]}>
                            <Col span={24}>{(movie && movie.description) || <Skeleton count={3} />}</Col>
                            <Col span={24}>{(movie && <DisplayCast />) || <Skeleton count={2} />}</Col>
                        </Row>
                    </Col>
                    <Col xs={0} md={0} lg={2} />
                    <Col xs={24} md={24} lg={10}>
                        {(trailer && (
                            <YouTube
                                videoId={trailer.split('?v=')[1]}
                                opts={{
                                    width: '100%',
                                    height: '230px',
                                    playerVars: {
                                        autoplay: 0,
                                    },
                                }}
                            />
                        )) || <Skeleton height={200} />}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
