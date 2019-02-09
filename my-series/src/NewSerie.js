import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import api from './Api';

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

class NewSerie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            isLoading: false,
            redirect: false
        };
        this.saveSerie = this.saveSerie.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        api.loadGenres().then(resp => {
            this.setState({ isLoading: false, genres: resp.data });
        });
    }

    saveSerie(){
        const newSerie = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comment.value
        };
        api.saveSerie(newSerie).then(
            (res) => {
                console.log(res); 
                this.setState({redirect : `/series/${this.refs.genre.value}`});
            }
        );
    }

    render(){
        return (
            <section className="intro-section">
                { this.state.redirect && 
                    <Redirect to={this.state.redirect} />
                }
                <h1>Nova Série</h1>
                <form>
                    Nome: <input type="text" ref='name' className="form-control" /><br />
                    Comentários: <textarea ref="comment" className="form-control"></textarea><br />
                    Status: <select ref="status" className="form-control">
                        {Object
                            .keys(statuses)
                            .map(key => <option key={key} value={key}>{statuses[key]}</option>)
                        }
                    </select><br/>
                    Gênero: <select ref="genre" className="form-control">
                        {this.state.genres
                            .map(value => <option key={value} value={value}>{value}</option>)
                        }
                    </select><br/>
                    <button type="button" className="btn btn-primary" onClick={this.saveSerie}>Salvar</button>
                </form>
            </section>
        )
    }
}

export default NewSerie;