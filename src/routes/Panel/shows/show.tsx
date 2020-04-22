import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { get, del } from '../../../utils/requests';
import styled from 'styled-components';
import { Row, Col, Descriptions, Spin, Button, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import IShow from '../../../interfaces/IShow';
import IMovie from '../../../interfaces/IMovie';

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

export default function Show(props: any) {
    const { id } = useParams();
    const [show, setShow]: [IShow, Function] = useState(null);
    const [movies, setMovies]: [Array<IMovie>, Function] = useState([]);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            if (id) {
                const API_RESPONSE = await get(`show/getone/${id}`);
                if (API_RESPONSE) {
                    setShow(API_RESPONSE[0]);
                }

                const API_RESPONSE_MOVIES = await get('movies/getall');
                if (API_RESPONSE_MOVIES) {
                    setMovies(API_RESPONSE_MOVIES);
                }
            }
        })();
    }, [id]);

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: 'Jesteś pewny/a, że chcesz usunąć ten seans?',
            icon: <ExclamationCircleOutlined />,
            content: 'Tej operacji nie można cofnąć.',
            okText: 'Tak',
            okType: 'danger',
            cancelText: 'Anuluj',
            onOk: async () => {
                try {
                    const DELETE = await del(`show/delete/${show.id}`);
                    if (DELETE) {
                        history.push('/panel/shows');
                    } else message.warning('Coś poszło nie tak.');
                } catch (err) {
                    message.warning(err.map ? err.map((error: any) => error) : err.message);
                }
            },
            onCancel() {},
        });
    };

    if (!show) return <Spin />;

    return (
        <Container>
            <Row>
                <Col span={24}>
                    <Row justify="space-between">
                        <Col>
                            <Header>Seans numer #{show.id}</Header>
                        </Col>
                        <Col style={{ alignItems: 'center', display: 'flex' }}>
                            <Button
                                style={{ marginRight: 8 }}
                                onClick={() => {
                                    history.push(`/panel/shows/${show.id}/update`);
                                }}
                            >
                                Edytuj
                            </Button>
                            <Button
                                type="danger"
                                onClick={() => {
                                    showDeleteConfirm();
                                }}
                            >
                                Usuń
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginTop: 24 }} gutter={12}>
                <Col md={24}>
                    <Descriptions column={2} bordered>
                        <Descriptions.Item key="movie" label="Film">
                            {movies.find((movie) => movie.id === show.movieId) &&
                                movies.find((movie) => movie.id === show.movieId).title}
                        </Descriptions.Item>
                        <Descriptions.Item key="room" label="Sala">
                            {show.roomId}
                        </Descriptions.Item>
                        <Descriptions.Item key="price" label="Cena biletu" span={2}>
                            {show.price}
                        </Descriptions.Item>
                        <Descriptions.Item key="language" label="Język filmu">
                            {show.language}
                        </Descriptions.Item>
                        <Descriptions.Item key="subtitles" label="Język napisów">
                            {show.subtitles}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </Container>
    );
}
