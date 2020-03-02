import React from 'react';
import styled from 'styled-components';
import Slide from './slide';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export default function HomepageSlider() {
    const data = [
        {
            id: 1,
            title: 'La La Land',
            img: 'https://cont5.naekranie.pl/media/cache/amp/2017/02/la-la-land.jpg',
            duration: 126,
            description:
                'Akcja filmu dzieje się w Los Angeles. Pianista jazzowy Sebastian i początkująca aktorka Mia starają się osiągnąć sukces w swoich dziedzinach. Ich losy krzyżują się wielokrotnie. Mimo początkowych animozji schodzą się ze sobą i wspólnie starają się zrealizować swoje marzenia.',
            genre: 'Komediodramat muzyczny',
            cast: ['Ryan Gosling', 'Emma Stone', 'John Legend', 'Rosemarie DeWitt', 'J.K. Simmons', 'Finn Wittrock'],
            imdbRating: 8.0,
            metacriticRating: 93,
        },
    ];

    return (
        <Container>
            <Slide data={data[0]} />
        </Container>
    );
}
