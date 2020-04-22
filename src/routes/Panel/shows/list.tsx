import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { get } from '../../../utils/requests';
import IMovie from '../../../interfaces/IMovie';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

export default function ShowsList() {
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const columns: any = [
        {
            title: 'Film',
            dataIndex: 'movieId',
            key: 'movieId',
            render: (id: Number) => {
                let movie: IMovie = movies.find((m) => m.id === id);
                if (movie) return movie.title;
                return '-';
            },
        },
        {
            title: 'Sala',
            dataIndex: 'roomId',
            key: 'roomId',
        },
        {
            title: 'Data',
            dataIndex: 'dateAndTimeOfShows',
            key: 'date',
            render: (date: Date) => <span>{moment(date).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
            title: 'Język filmu',
            dataIndex: 'language',
            key: 'language',
        },
        {
            title: 'Język napisów',
            dataIndex: 'subtitles',
            key: 'subtitles',
        },
        {
            title: 'Cena',
            dataIndex: 'price',
            key: 'price',
        },
    ];

    let _isMounted = false;
    useEffect(() => {
        _isMounted = true;
        (async () => {
            const API_RESPONSE = await get('show/getall');
            if (API_RESPONSE) {
                _isMounted &&
                    setShows(
                        API_RESPONSE.map((el: IMovie) => {
                            return { ...el, key: el.id };
                        }),
                    );
                _isMounted && setLoading(false);
            }

            const API_RESPONSE_MOVIES = await get('movies/getall');
            if (API_RESPONSE_MOVIES) {
                _isMounted && setMovies(API_RESPONSE_MOVIES);
            }

            return () => (_isMounted = false);
        })();
    }, []);

    return (
        <Table
            rowClassName="cursor-pointer"
            loading={loading}
            onRow={(record, rowIndex) => {
                return {
                    onClick: () => {
                        history.push(`/panel/shows/${record.id}`);
                    },
                };
            }}
            dataSource={shows}
            columns={columns}
        />
    );
}
