import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { get } from '../../../utils/requests';
import IMovie from '../../../interfaces/IMovie';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

export default function ShowsList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const columns: any = [
        {
            title: 'Film',
            dataIndex: 'movie',
            key: 'movieId',
        },
        {
            title: 'Sala',
            dataIndex: 'room',
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
            const API_RESPONSE = await get('shows/getall');
            if (API_RESPONSE) {
                _isMounted &&
                    setMovies(
                        API_RESPONSE.map((el: IMovie) => {
                            return { ...el, key: el.id };
                        }),
                    );
                _isMounted && setLoading(false);
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
                        history.push(`/panel/movies/${record.id}`);
                    },
                };
            }}
            dataSource={movies}
            columns={columns}
        />
    );
}
