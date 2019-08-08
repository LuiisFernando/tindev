import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './Main.css'

import api from '../services/api'

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({ match }) {
    const [users, setUsers] = useState([])

    // every change on match.params.id useEffect is called and 
    // loadUser is declared and called after to setUsers
    useEffect(() => {
        async function loadUser() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            })

            setUsers(response.data)
        }

        loadUser();
    }, [match.params.id])

    async function handleDisLike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers : { user: match.params.id }
        })

        setUsers(users.filter(user => user._id !== id))
    }

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers : { user: match.params.id }
        })

        setUsers(users.filter(user => user._id !== id))
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tin    dev"/>
            </Link>
            
            { users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt=""/>
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>

                            <div className="buttons">
                                <button type="button" onClick={() => handleDisLike(user._id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>
                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="Like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

            ) : (
                <div className="empty">Acabou :(</div>
            ) }
        </div>
    );
}

// hora 1:04 de video