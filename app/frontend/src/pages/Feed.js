import React, { Component } from 'react';
import io from 'socket.io-client';
import "./Feed.css";

import { ReactComponent as More } from "../assets/more.svg";
import { ReactComponent as Like } from "../assets/like.svg";
import { ReactComponent as Comment } from "../assets/comment.svg";
import { ReactComponent as Send } from "../assets/send.svg";
import api from '../services/api';


export class Feed extends Component {
    state = {
        feed: [],
    }

    async componentDidMount() {
        this.registerToSocket();
        const response = await api.get('posts');
        this.setState({ feed: response.data });
    }

    registerToSocket = () => {
        const socket = io('http://localhost:5000');

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] });
        })

        socket.on('like', likedPost => {

            this.setState({
                feed:
                    this.state.feed.map(post => post._id === likedPost._id ? likedPost : post)
            });
        })
    }

    handleLike = id => {
        api.post(`posts/${id}/like`);
    }

    render() {
        return (
            <section id="post-list">
                {
                    this.state.feed.map(post => (<article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>
                            <More />
                        </header>
                        <img src={`http://localhost:5000/files/${post.image}`} alt="post" />
                        <footer>
                            <div className="actions">
                                <button type="button" onClick={() => { this.handleLike(post._id) }} >
                                    <Like className="action" />
                                </button>
                                <Comment className="action" />
                                <Send className="action" />
                                <div>
                                    <strong>{post.likes} curtidas</strong>
                                </div>
                                <p>{post.description}
                                    <span>{post.hashtags}</span>
                                </p>

                            </div>
                        </footer>
                    </article>))
                }
            </section>
        );
    }
}