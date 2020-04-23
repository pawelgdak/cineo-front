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
import SeatSelector from '../components/SeatSelector';

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

const TicketTitle = styled.span`
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
            const API_RESPONSE: Array<IShow> = await get(`show/getone/${id}`);
            if (API_RESPONSE) {
                isMounted && setShow(API_RESPONSE[0]);

                const API_RESPONSE_MOVIES = await get(`movies/getone/${API_RESPONSE[0].movieId}`);
                let movie: IMovie = null;
                if (API_RESPONSE_MOVIES) {
                    movie = API_RESPONSE_MOVIES[0];
                    isMounted && setMovie(movie);

                    if (movie) {
                        try {
                            const trailerVideo = await movieTrailer('szybcy i wsciekli');
                            isMounted && setTrailer(trailerVideo);
                        } catch (err) {
                            isMounted && setTrailer('');
                        }
                    }
                }
            }
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
                        <span>
                            {moment(show.dateAndTimeOfShows).format('DD.MM.YYYY')}{' '}
                            <TimeText>{moment(show.dateAndTimeOfShows).format('HH:mm')}</TimeText>
                        </span>
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
                    {movie.cast &&
                        movie.cast.map((actor: string, index: Number) => (
                            <Col span={8} key={index.toString()}>
                                <Actor>{actor}</Actor>
                            </Col>
                        ))}
                </Row>
            </div>
        );
    };

    const DisplayRoom = () => {
        return (
            <div>
                <TicketTitle>Rezerwuj bilet</TicketTitle>
                <div style={{ marginTop: 12 }}>
                    <SeatSelector roomId={show.roomId} />
                </div>
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
                        {(trailer !== null &&
                            (trailer === '' ? (
                                <div />
                            ) : (
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
                            ))) || <Skeleton height={200} />}
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {(show && <DisplayRoom />) || (
                            <Row gutter={[0, 32]}>
                                <Col xs={24} md={24} lg={12}>
                                    <Skeleton height={100} />
                                </Col>
                                <Col xs={0} md={0} lg={2} />
                                <Col xs={24} md={24} lg={10}>
                                    <Skeleton height={80} />
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
