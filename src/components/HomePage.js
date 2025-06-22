import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import backgroundImage from '../assets/Pages/Background.jpeg';

function HomePage({ onStartGame }) {
    const [level, setLevel] = useState('');
    const [theme, setTheme] = useState('');
    const [errorlevel, setErrorlevel] = useState('');
    const [errortheme, setErrortheme] = useState('');
    const navigate = useNavigate()

    const handleStart = () => {
        let hasError = false;

        if (!theme) {
            setErrortheme("Please select a Theme.");
            hasError = true;
        } else {
            setErrortheme("");
        }

        if (!level) {
            setErrorlevel("Please select a Level.");
            hasError = true;
        } else {
            setErrorlevel("");
        }

        if (hasError) return;

        onStartGame({ level, theme });
        navigate('/game');
    };


    return (
        <div style={styles.container} className="text-center">
            <h1 style={styles.title}>Memory Match for Kids</h1>
            <p style={styles.quote}>“Let’s flip, match, and have fun!”</p>
            <div className="row d-flex justify-content-center gap-4 my-4">
                <div className="col-auto" style={styles.dropdownBox}>
                    <select
                        value={level}
                        onChange={(e) => {
                            setLevel(e.target.value);
                            if (e.target.value) setErrorlevel('');
                        }}
                        style={styles.prettySelect}
                    >
                        <option value="">Choose a Level</option>
                        <option value="easy">🐣 Easy (3x2)</option>
                        <option value="medium">🐥 Medium (4x3)</option>
                        <option value="hard">🦉 Hard (6x4)</option>
                    </select>

                    {errorlevel && (
                        <div style={styles.errorMessage}>{errorlevel}</div>
                    )}
                </div>

                <div className="col-auto" style={styles.dropdownBox}>
                    <select
                        value={theme}
                        onChange={(e) => {
                            setTheme(e.target.value);
                            if (e.target.value) setErrortheme('');
                        }}
                        style={styles.prettySelect}
                    >
                        <option value="">Choose a Theme</option>
                        <option value="animals">🐶 Animals</option>
                        <option value="fruits">🍎 Fruits</option>
                        <option value="sweets">🍬 Sweets</option>
                    </select>

                    {errortheme && (
                        <div style={styles.errorMessage}>{errortheme}</div>
                    )}
                </div>
            </div>
            <div style={styles.Sbutton}>
                <button onClick={handleStart} style={styles.startButton}>
                    Start Game
                </button>
            </div>

        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: '100px',
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        fontFamily: '"Irish Grover", system-ui',
    },
    title: {
        fontSize: '2.5rem',
        color: '#FF6F61',
    },
    quote: {
        fontSize: '1.6rem',
        marginBottom: '30px',
    },
    dropdownBox: {
        marginBottom: '15px',
    },
    prettySelect: {
        appearance: 'none',
        background: 'linear-gradient(to right, #f78ca0, #f9748f)',
        border: 'none',
        borderRadius: '12px',
        padding: '10px 16px',
        fontSize: '1.1rem',
        color: 'white',
        fontFamily: '"Irish Grover", system-ui',
        boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
        width: '180px',
        cursor: 'pointer',
    },


    startButton: {
        fontSize: '1.5rem',
        padding: '12px 30px',
        borderRadius: '12px',
        backgroundColor: '#dbb8a8',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontFamily: '"Irish Grover", system-ui',
        width: '250px',

    },
    Sbutton: {
        paddingTop: '20px'
    },
    label: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: '#333',
        fontFamily: '"Irish Grover", system-ui',
    },
    selectBox: {
        width: '250px',
        fontSize: '1rem',
        padding: '8px 12px',
        borderRadius: '10px',
    }, errorMessage: {
        color: 'red',
        fontSize: '1rem',
        marginTop: '10px',
        fontWeight: 'bold',
    }
};

export default HomePage;
