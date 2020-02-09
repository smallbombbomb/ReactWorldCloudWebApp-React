import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    }
});

const databaseURL = "https://wordcloud-5f032.firebaseio.com/";

class Words extends React.Component {
    constructor() {
        super();
        this.state = {
            words: {},
            dialog: false,
            word: '',
            weight: ''
        };
    }

    _get() {
        fetch(`${databaseURL}/words.json`).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(words => this.setState({words: words}));
    }

    _post(word) {
        return fetch(`${databaseURL}/words.json`, {
            method: 'POST',
            body: JSON.stringify(word)
        }).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            let nextState = this.state.words;
            nextState[data.name] = words;
            this.setState({words: nextState});
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.words != this.state.words
    }

    componentDidMount() {
        this._get();
    }

    render() {
        return (
            <div>
                {Object.keys(this.state.words).map(id => {
                    const word = this.state.words[id];
                    return (
                        <div key={id}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        가중치: {word.weight}
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography variant="h5" component="h2">
                                            {word.word}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs = {6}>
                                            <Button variant="contained" color = "primary">삭제</Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Words;