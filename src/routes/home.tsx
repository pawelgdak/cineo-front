import React from 'react';
import HomepageSlider from '../components/HomepageSlider';
import NavigationBar from '../components/NavigationBar';

export default function Home() {
    return (
        <div>
            <HomepageSlider />
            <NavigationBar fixed={true} transparent={true} />
        </div>
    );
}
