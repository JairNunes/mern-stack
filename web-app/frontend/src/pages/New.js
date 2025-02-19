import React, { Component } from 'react';

import './New.css';
import api from '../services/api';

export class New extends Component {

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleImagehange = e => {
        this.setState({ image: e.target.files[0] });
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log(this.state);
        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

       await api.post('posts', data);

       this.props.history.push('/feed');

    }
    render() {
        return (
            <form id="new-post" onSubmit={this.handleSubmit} >
                <input type="file" name="file" id="file" onChange={this.handleImagehange} />

                <input type="text" name="author" placeholder="Autor" onChange={this.handleChange} value={this.state.author} />
                <input type="text" name="place" placeholder="Local" onChange={this.handleChange} value={this.state.place} />
                <input type="text" name="description" placeholder="Descrição" onChange={this.handleChange} value={this.state.description} />
                <input type="text" name="hashtags" placeholder="Hashtags" onChange={this.handleChange} value={this.state.hashtags} />
                <button type="submit">Enviar</button>
            </form>
        );
    }
}