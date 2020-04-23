import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import DashboardCard from '../../components/DashboardCard';
import { get } from '../../utils/requests';
import moment from 'moment';
import IShow from '../../interfaces/IShow';

export default function Dashboard() {
    const [shows, setShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [showsToday, setShowsToday] = useState(0);
    const [moviesToday, setMoviesToday] = useState(0);
    const [reservedTicketsToday, setReservedTicketsToday] = useState(0);
    const [boughtTicketsToday, setBoughtTicketsToday] = useState(0);

    let isMounted = false;
    useEffect(() => {
        isMounted = true;

        (async () => {
            const API_RESPONSE_SHOWS = await get(`show/getdate/${moment().format('YYYY-MM-DD')}`);
            if (API_RESPONSE_SHOWS) {
                setShows(API_RESPONSE_SHOWS);
                setShowsToday(API_RESPONSE_SHOWS.length);
            }

            const API_RESPONSE_MOVIES = await get(`movies/getall`);
            if (API_RESPONSE_MOVIES) {
                setMovies(API_RESPONSE_MOVIES);
            }

            const API_RESPONSE_ROOMS = await get(`room/getall`);
            if (API_RESPONSE_ROOMS) {
                setRooms(API_RESPONSE_ROOMS);
            }
        })();

        return () => (isMounted = false);
    }, []);

    useEffect(() => {
        let temp: any = [];
        shows.forEach((show) => {
            if (!temp.find((s: any) => s.id === show.id)) {
                temp.push(show);
            }
        });

        setMoviesToday(temp.length);
    }, [shows]);

    return (
        <div>
            <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={12} lg={8}>
                    <DashboardCard value={showsToday.toString()} description="Seansów dzisiaj" />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                    <DashboardCard value={moviesToday.toString()} description="Różnych filmów dzisiaj" />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                    <DashboardCard
                        value={reservedTicketsToday.toString()}
                        description="Zarezerwowanych biletów na dzisiaj"
                    />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                    <DashboardCard value={boughtTicketsToday.toString()} description="Kupionych biletów na dzisiaj" />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                    <DashboardCard value={movies.length.toString()} description="Filmów w systemie" />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                    <DashboardCard value={rooms.length.toString()} description="Sal w systemie" />
                </Col>
            </Row>
        </div>
    );
}
