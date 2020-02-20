import TextTruncate from 'react-text-truncate';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'

const styles = theme => ({
    hidden: {
        display: 'none'
    },
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    },
});

const databaseURL = 'https://wordcloud-5f032.firebaseio.com/';

class Texts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            fileContent: null,
            texts: '',
            textName: '',
            dialog: false
        }
    }

    _get() {
        fetch(`${databaseURL}/texts.json`).then(res => {
            if (res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(texts => this.setState({ texts: (texts == null) ? {} : texts }));
    }

    render() {
        return (
            <Card>
                <CardContent>
                    Texts 페이지
                </CardContent>
            </Card>
        );
    }
}

export default Texts;