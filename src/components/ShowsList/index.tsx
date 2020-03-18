import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { get } from '../../utils/requests';
import IMovieShows from '../../interfaces/IMovieShows';
import Show from './Show';
import styled from 'styled-components';

const Container = styled.div`
    margin: 48px 0;
`;

export default function ShowsList() {
    const location = useLocation();
    const [date, setDate]: [moment.Moment, Function] = useState(moment());
    const [shows, setShows]: [Array<IMovieShows>, Function] = useState([]);

    useEffect(() => {
        let query = new URLSearchParams(location.search);
        let tempDate: any = query.get('data');
        if (tempDate) {
            tempDate = moment(tempDate);
        }

        if (tempDate && tempDate >= moment().subtract(1, 'days') && tempDate < moment().add(13, 'days')) {
            setDate(tempDate);
        }
    }, [location]);

    useEffect(() => {
        (async () => {
            try {
                const API_RESPONSE = await get('movieshows');
                setShows(API_RESPONSE.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [date]);

    return (
        <Container>
            <div>
                {shows.map((show, index) => (
                    <Show key={index} data={show} />
                ))}
            </div>
        </Container>
    );
}
