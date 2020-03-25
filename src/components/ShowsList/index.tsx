import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { get } from '../../utils/requests';
import IMovieShows from '../../interfaces/IMovieShows';
import Show from './Show';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const Container = styled.div`
    margin: 48px 24px;
`;

export default function ShowsList() {
    const location = useLocation();
    const [contentLoading, setContentLoading] = useState(true);
    const [date, setDate]: [moment.Moment, Function] = useState(moment());
    const [shows, setShows]: [Array<IMovieShows>, Function] = useState([]);

    let isMounted = false;

    useEffect(() => {
        let query = new URLSearchParams(location.search);
        let tempDate: any = query.get('data');
        if (tempDate) {
            tempDate = moment(tempDate);
        }

        if (tempDate && tempDate >= moment().subtract(1, 'days') && tempDate < moment().add(13, 'days')) {
            isMounted && setDate(tempDate);
        }
    }, [location]);

    useEffect(() => {
        (async () => {
            try {
                const API_RESPONSE = await get('movieshows');
                isMounted && setShows(API_RESPONSE.data);
                isMounted && setContentLoading(false);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [date]);

    useEffect(() => {
        isMounted = true;

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Container>
            <div>
                {contentLoading ? (
                    <Skeleton height={500} />
                ) : (
                    shows.map((show, index) => <Show key={index} data={show} />)
                )}
            </div>
        </Container>
    );
}
