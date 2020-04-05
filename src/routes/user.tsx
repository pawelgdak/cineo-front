import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Container from '../components/Container';
import Heading from '../components/Heading';

export default function User() {
    return (
        <div>
            <NavigationBar />
            <Heading>Mój profil</Heading>
            <Container></Container>
        </div>
    );
}
