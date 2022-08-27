import React from 'react';
import CreatureList from './components/CreatureList'
import { CreatureCalculator } from './logic/CreatureCalculator';

function App() {
    return (
        <CreatureCalculator>
            <CreatureList/>
        </CreatureCalculator>
    )
}

export default App;
