import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, message, Spin } from 'antd';
import styled from 'styled-components';
import { put, get } from '../../../utils/requests';
import { useHistory, useParams } from 'react-router-dom';
import IMovie from '../../../interfaces/IMovie';

const Header = styled.div`
    font-size: 24px;
    font-family: 'Poppins';
`;

const Container = styled.div`
    width: 100%;
`;

const Label = styled.div`
    margin-bottom: 8px;
    font-size: 14px;
`;

export default function UpdateMovie() {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [smallImage, setSmallImage] = useState(null);
    const [duration, setDuration] = useState(null);
    const [production, setProduction] = useState(null);
    const [yearOfProduction, setYearOfProduction] = useState(null);
    const [genre, setGenre] = useState(null);
    const [imdbScore, setImdbScore] = useState(null);
    const [metacriticScore, setMetacriticScore] = useState(null);
    const [rottenTomatoesScore, setRottenTomatoesScore] = useState(null);
    const [director, setDirector] = useState(null);

    const [movie, setMovie]: [IMovie, Function] = useState(null);
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleForm = async () => {
        setLoading(true);
        if (
            !title ||
            title.length == 0 ||
            !description ||
            description.length == 0 ||
            !image ||
            image.length == 0 ||
            !smallImage ||
            smallImage.length == 0 ||
            !duration ||
            duration.length == 0 ||
            !production ||
            production.length == 0 ||
            !yearOfProduction ||
            yearOfProduction.length == 0 ||
            !genre ||
            genre.length == 0 ||
            !imdbScore ||
            imdbScore.length == 0 ||
            !metacriticScore ||
            metacriticScore.length == 0 ||
            !rottenTomatoesScore ||
            rottenTomatoesScore.length == 0 ||
            !director ||
            director.length == 0
        ) {
            message.warning('Musisz wypełnić wszystkie pola!');
            setLoading(false);
        }

        try {
            const API_RESPONSE = await put(`movies/edit/${movie.id}`, {
                id: movie.id,
                title,
                yearOfProduction,
                director,
                image,
                smallImage,
                description,
                duration,
                production,
                genre,
                imdbScore,
                metacriticScore,
                rottenTomatoesScore,
            });

            if (API_RESPONSE) {
                message.success('Pomyślnie dodano film.');
                history.push('/panel/movies');
            } else message.warning('Coś poszło nie tak.');
        } catch (err) {
            message.warning(err.map ? err.map((error: any) => error) : err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            if (id) {
                const API_RESPONSE = await get(`movies/getone/${id}`);
                if (API_RESPONSE) {
                    setMovie(API_RESPONSE[0]);

                    let m: IMovie = API_RESPONSE[0];

                    setTitle(m.title);
                    setDescription(m.description);
                    setImage(m.image);
                    setSmallImage(m.smallImage);
                    setDuration(m.duration);
                    setProduction(m.production);
                    setYearOfProduction(m.yearOfProduction);
                    setGenre(m.genre);
                    setImdbScore(m.imdbScore);
                    setMetacriticScore(m.metacriticScore);
                    setRottenTomatoesScore(m.rottenTomatoesScore);
                    setDirector(m.director);
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
                            <Header>Aktualizuj film: {movie.title}</Header>
                        </Col>
                        <Col style={{ alignItems: 'center', display: 'flex' }}>
                            <Button loading={loading} onClick={() => handleForm()}>
                                Zapisz
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginTop: 24 }} gutter={24}>
                <Col md={24} lg={12} sm={24} xs={24} style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={24}>
                            <Label>Tytuł</Label>
                            <Input
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={loading}
                                value={title}
                                placeholder="Szybcy i wściekli"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ marginTop: 16 }}>
                            <Label>Opis</Label>
                            <Input.TextArea
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={loading}
                                value={description}
                                placeholder="Treść opisu"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ marginTop: 16 }}>
                            <Label>Link do grafiki</Label>
                            <Input
                                onChange={(e) => setImage(e.target.value)}
                                disabled={loading}
                                value={image}
                                placeholder="http://"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ marginTop: 16 }}>
                            <Label>Link do plakatu</Label>
                            <Input
                                onChange={(e) => setSmallImage(e.target.value)}
                                disabled={loading}
                                value={smallImage}
                                placeholder="http://"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ marginTop: 16 }}>
                            <Label>Czas trwania w minutach</Label>
                            <Input
                                type="number"
                                onChange={(e) => setDuration(e.target.value)}
                                disabled={loading}
                                value={duration}
                                placeholder="120"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ marginTop: 16 }}>
                            <Label>Reżyser</Label>
                            <Input
                                onChange={(e) => setDirector(e.target.value)}
                                disabled={loading}
                                value={director}
                                placeholder="David Fincher"
                            />
                        </Col>
                    </Row>
                </Col>

                <Col md={24} lg={12} sm={24} xs={24}>
                    <Row>
                        <Col span={24}>
                            <Label>Produkcja</Label>
                            <Input
                                onChange={(e) => setProduction(e.target.value)}
                                disabled={loading}
                                value={production}
                                placeholder="Universal Studio"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ marginTop: 16 }}>
                            <Label>Rok produkcji</Label>
                            <Input
                                onChange={(e) => setYearOfProduction(e.target.value)}
                                type="number"
                                disabled={loading}
                                value={yearOfProduction}
                                placeholder="2020"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ marginTop: 16 }}>
                            <Label>Gatunek</Label>
                            <Input
                                onChange={(e) => setGenre(e.target.value)}
                                disabled={loading}
                                value={genre}
                                placeholder="Komedia"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ marginTop: 16 }}>
                            <Label>Ocena na IMDb</Label>
                            <Input
                                onChange={(e) => setImdbScore(e.target.value)}
                                type="number"
                                disabled={loading}
                                value={imdbScore}
                                placeholder="8.9"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ marginTop: 16 }}>
                            <Label>Ocena na Metacritic</Label>
                            <Input
                                onChange={(e) => setMetacriticScore(e.target.value)}
                                type="number"
                                disabled={loading}
                                value={metacriticScore}
                                placeholder="84"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ marginTop: 16 }}>
                            <Label>Ocena na Rottentomatoes</Label>
                            <Input
                                onChange={(e) => setRottenTomatoesScore(e.target.value)}
                                type="number"
                                disabled={loading}
                                value={rottenTomatoesScore}
                                placeholder="66"
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
