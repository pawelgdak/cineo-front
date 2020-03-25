import React from 'react';
import styled from 'styled-components';
import IMovie from '../interfaces/IMovie';

const Container = styled.div`
    width: 100%;
    z-index: 0;
    height: 400px;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("${props => props.image}");
    background-position: 0 30%;
    background-repeat: no-repeat;
    background-size: cover;
`;

export default function MovieBanner(props: { movie: IMovie }) {
    const { movie } = props;

    if (!movie) {
        return <Container />;
    }

    return <Container image={movie.img}></Container>;
}
