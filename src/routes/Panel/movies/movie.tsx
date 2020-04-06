import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { get } from '../../../utils/requests';
import styled from 'styled-components';
import IMovie from '../../../interfaces/IMovie';
import { Row, Col, Descriptions, Spin, Button } from 'antd';

const Header = styled.div`
    font-size: 24px;
    font-family: 'Poppins';
`;

const Container = styled.div`
    width: 100%;
`;

const Poster = styled.img`
    width: 100%;
    height: auto;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 24px;
`;

export default function Movie(props: any) {
    const { id } = useParams();
    const [movie, setMovie]: [IMovie, Function] = useState(null);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            if (id) {
                const API_RESPONSE = await get(`movies/getone/${id}`);
                if (API_RESPONSE) {
                    setMovie(API_RESPONSE[0]);
                }
            }
        })();
    }, [id]);

    if (!movie) return <Spin />;

    return (
        <Container>
            <Row>
                <Col span={24}>
                    <Row justify="space-between">
                        <Col>
                            <Header>{movie.title}</Header>
                        </Col>
                        <Col style={{ alignItems: 'center', display: 'flex' }}>
                            <Button
                                onClick={() => {
                                    history.push(`/panel/movies/${movie.id}/update`);
                                }}
                            >
                                Edytuj
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginTop: 24 }} gutter={12}>
                <Col md={6}>
                    <Poster src={movie.smallImage} />
                </Col>
                <Col md={18}>
                    <Descriptions column={2}>
                        <Descriptions.Item key="director" label="Reżyser">
                            {movie.director}
                        </Descriptions.Item>
                        <Descriptions.Item key="genre" label="Gatunek">
                            {movie.genre}
                        </Descriptions.Item>
                        <Descriptions.Item key="description" label="Opis" span={2}>
                            {movie.description}
                        </Descriptions.Item>
                        <Descriptions.Item key="yearOfProduction" label="Rok produkcji">
                            {movie.yearOfProduction}
                        </Descriptions.Item>
                        <Descriptions.Item key="production" label="Produkcja">
                            {movie.production}
                        </Descriptions.Item>
                        <Descriptions.Item key="image" label="Grafika">
                            <a href={movie.image}>Link</a>
                        </Descriptions.Item>
                        <Descriptions.Item key="duration" label="Czas trwania">
                            {movie.duration}
                        </Descriptions.Item>
                        <Descriptions.Item key="metacriticScore" label="Ocena metacritic">
                            {movie.metacriticScore}%
                        </Descriptions.Item>
                        <Descriptions.Item key="imdbScore" label="Ocena IMDb">
                            {movie.imdbScore.toFixed(1)}
                        </Descriptions.Item>
                        <Descriptions.Item key="rottenTomatoesScore" label="Ocena Rotten Tomatoes">
                            {movie.rottenTomatoesScore}%
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </Container>
    );
}
