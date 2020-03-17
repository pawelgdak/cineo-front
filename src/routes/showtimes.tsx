import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Calendar from '../components/Calendar/index';

export default function Showtimes() {
    return (
        <div>
            <NavigationBar />
            <Heading>Seanse</Heading>
            <Container>
                <Calendar />
            </Container>
        </div>
    );
}
