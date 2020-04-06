import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { get } from '../../../utils/requests';
import IMovie from '../../../interfaces/IMovie';
import { useHistory } from 'react-router-dom';

export default function MoviesList() {
    const [movies, setMovies] = useState([]);
    const history = useHistory();

    const columns: any = [
        {
            title: 'Tytuł',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Reżyser',
            dataIndex: 'director',
            key: 'director',
        },
        {
            title: 'Rok produkcji',
            dataIndex: 'yearOfProduction',
            key: 'yearOfProduction',
        },
        {
            title: 'Produkcja',
            dataIndex: 'production',
            key: 'production',
        },
        {
            title: 'Gatunek',
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: 'Ocena IMDb',
            dataIndex: 'imdbScore',
            key: 'imdbScore',
        },
        {
            title: 'Ocena metacritic',
            dataIndex: 'metacriticScore',
            key: 'metacriticScore',
        },
    ];

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
            }

            return () => (_isMounted = false);
        })();
    }, []);

    return (
        <Table
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
