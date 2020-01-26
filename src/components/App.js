import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import AppShell from './AppShell';
import Home from './Home';

class App extends React.Component {
render() {
    return (
        <Router>
            <AppShell>
                <div>
                    <Route exact path="/" component={Home}/>
                </div>
            </AppShell>
        </Router>
        );
    }
}

export default App;