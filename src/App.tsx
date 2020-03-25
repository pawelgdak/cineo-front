import React from 'react';
import './App.css';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
    return (
        <Router>
            <ParallaxProvider>
                <Routes />
            </ParallaxProvider>
        </Router>
    );
}

export default App;
