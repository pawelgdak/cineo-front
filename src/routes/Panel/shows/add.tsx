import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form, Input, Button, message, Select, DatePicker } from 'antd';
import styled from 'styled-components';
import { post, get } from '../../../utils/requests';
import { useHistory } from 'react-router-dom';
import IMovie from '../../../interfaces/IMovie';
import IRoom from '../../../interfaces/IRoom';

const { Option } = Select;

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

const TextArea = styled(Input.TextArea)`
    font-family: 'Courier';
`;

export default function AddShow() {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [rooms, setRooms] = useState([]);

    const history = useHistory();

    const [date, setDate] = useState(null);
    const [movie, setMovie] = useState(null);
    const [room, setRoom] = useState(null);
    const [price, setPrice] = useState(null);
    const [language, setLanguage] = useState(null);
    const [subtitles, setSubtitles] = useState(null);

    let _isMounted = false;

    useEffect(() => {
        _isMounted = true;
        (async () => {
            const API_RESPONSE = await get('movies/getall');
            if (API_RESPONSE) {
                _isMounted &&
                    setMovies(
                        API_RESPONSE.map((el: IMovie) => {
                            return { ...el, key: el.id };
                        }),
                    );
                _isMounted && setLoading(false);
            }

            const API_RESPONSE_ROOMS = await get('room/getall');
            if (API_RESPONSE_ROOMS) {
                _isMounted &&
                    setRooms(
                        API_RESPONSE.map((el: IRoom) => {
                            return { ...el, key: el.id };
                        }),
                    );
                _isMounted && setLoading(false);
            }

            return () => (_isMounted = false);
        })();
    }, []);

    const handleForm = async () => {
        setLoading(true);

        if (
            !movie ||
            movie.length == 0 ||
            !room ||
            room.length == 0 ||
            !date ||
            date.length == 0 ||
            !price ||
            price.length == 0
        ) {
            message.warning('Musisz wypełnić wszystkie pola!');
            setLoading(false);
        }

        try {
            const API_RESPONSE = await post('shows/add', {
                movieId: movie,
                roomId: room,
                language: language || '-',
                subtitles: subtitles || '-',
                price,
                dateAndTimeOfShows: date,
            });

            if (API_RESPONSE) {
                message.success('Pomyślnie dodano seans.');
                history.push('/panel/shows');
            } else message.warning('Coś poszło nie tak.');
        } catch (err) {
            message.warning(err.map ? err.map((error: any) => error) : err.message);
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row>
                <Col span={24}>
                    <Row justify="space-between">
                        <Col>
                            <Header>Dodaj seans</Header>
                        </Col>
                        <Col style={{ alignItems: 'center', display: 'flex' }}>
                            <Button loading={loading} onClick={() => handleForm()}>
                                Dodaj
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginTop: 24 }} gutter={24}>
                <Col md={24} lg={12} sm={24} xs={24} style={{ marginBottom: 16 }}>
                    <Row>
                        <Col span={24}>
                            <Label>Film</Label>
                            <Select
                                disabled={loading}
                                onSelect={(val) => setMovie(val)}
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Szybcy i wściekli"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {movies.map((movie: IMovie) => {
                                    return (
                                        <Option value={movie.id} key={`movie-${movie.id}`}>
                                            {movie.title}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Col span={24}>
                            <Label>Sala</Label>
                            <Select
                                disabled={loading}
                                onSelect={(val) => setRoom(val)}
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Sala numer #1"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {rooms.map((room: any) => {
                                    return (
                                        <Option value={room.id} key={`room-${room.id}`}>
                                            Sala numer #{room.id}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Col span={24}>
                            <Label>Język filmu</Label>
                            <Input
                                disabled={loading}
                                style={{ width: '100%' }}
                                placeholder="angielski"
                                onChange={(e) => setLanguage(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col md={24} lg={12} sm={24} xs={24}>
                    <Row>
                        <Col span={24}>
                            <Label>Data</Label>
                            <DatePicker
                                disabled={loading}
                                style={{ width: '100%' }}
                                placeholder="2020-04-20 20:00"
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={(date) => setDate(date)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Col span={24}>
                            <Label>Cena biletu</Label>
                            <Input
                                type="number"
                                disabled={loading}
                                style={{ width: '100%' }}
                                placeholder="18"
                                suffix="zł"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 16 }}>
                        <Col span={24}>
                            <Label>Język napisów</Label>
                            <Input
                                disabled={loading}
                                style={{ width: '100%' }}
                                placeholder="polski"
                                onChange={(e) => setSubtitles(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
