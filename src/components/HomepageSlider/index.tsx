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
        {
            id: 2,
            title: 'Bad Boys 4 Life',
            img: 'https://static01.nyt.com/images/2020/01/26/arts/26box/26box-videoSixteenByNineJumbo1600.jpg',
            duration: 105,
            description:
                'Gdy z więzienia ucieka pałająca żądzą zemsty baronowa narkotykowego kartelu, bohaterowie stają przed największym wyzwaniem w swojej dotychczasowej karierze.',
            genre: 'Sensacyjny',
            cast: [
                'Will Smith',
                'Martin Lawrence',
                'Vanessa Hudgens',
                'Alexander Ludwig',
                'Charles Melton',
                'Paola Nuñez',
            ],
            imdbRating: 7.1,
            metacriticRating: 75,
        },
    ];

    const element = data[Math.floor(Math.random() * data.length)];

    return (
        <Container>
            <Slide data={element} />
        </Container>
    );
}
