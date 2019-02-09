import React, { Component } from 'react';
import api from './Api';
import { parseConfigFileTextToJson } from 'typescript';

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

class Series extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            series: []
        }
        this.renderSerie = this.renderSerie.bind(this);
    }

    componentDidMount(){
        this.setState({isLoading: true});
        api.loadSeries(this.props.match.params.genre).then(
            (resp) => {
                this.setState({
                    isLoading: false,
                    series: resp.data
                });
            }
        )
    }

    renderSerie(serie) {
        return (
            <div key={serie.id} className="item  col-xs-4 col-lg-4">
                <div className="thumbnail">
                    <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                    <div className="caption">
                        <h4 className="group inner list-group-item-heading">
                            {serie.name}</h4>
                        <div className="row">
                            <div className="col-xs-12 col-md-6 col-md-offset-3">
                                <p className="lead">{serie.genre} / {statuses[serie.status]}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-6 col-md-offset-3">
                                <a className="btn btn-success" href="">Gerenciar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <section className="intro-section">
                <h1>Series {this.props.match.params.genre}</h1>
                <div id="series" className="row list-group">
                    {
                        !this.state.isLoading &&
                        this.state.series.map(this.renderSerie)
                    }
                </div>
            </section>
        )
    }
}

export default Series;