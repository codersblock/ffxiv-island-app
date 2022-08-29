import React from 'react';
import CreatureList from './components/CreatureList'
import { CreatureCalculator } from './logic/CreatureCalculator';
import Layout from './components/Layout';

function App() {
    return (
        <CreatureCalculator>
            <Layout>
                <CreatureList/>
            </Layout>
        </CreatureCalculator>
    )
}

export default App;
