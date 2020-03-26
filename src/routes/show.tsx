import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import MovieBanner from '../components/MovieBanner';
import { useParams } from 'react-router-dom';
import { get } from '../utils/requests';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import colors from '../resources/colors';
import MoviePosterSeparator from '../components/MoviePosterSeparator';
import IMovie from '../interfaces/IMovie';

export default function Show(props: {}) {
    const { id } = useParams();
    const [movie, setMovie]: [IMovie, Function] = useState(null);

    let isMounted = false;

    useEffect(() => {
        isMounted = true;
        (async () => {
            const API_RESPONSE = await get('movies');
            isMounted && setMovie(API_RESPONSE[0]);
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div>
            <MovieBanner movie={movie} />
            <NavigationBar fixed={true} transparent={true} />
            <MoviePosterSeparator movie={movie} />
        </div>
    );
}
