// src/pages/CongratsPage.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '../assets/Pages/Back2.png';

function CongratsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { time } = location.state || { time: 0 };

    return (
        <div style={styles.container}>
            <h1>🎉 Congratulations!</h1>
            <p>You matched all the cards in <strong>{time} seconds</strong>!</p>
            <div style={styles.buttonGroup}>
               <button
  style={styles.btn}
  onClick={() => {
    const config = JSON.parse(localStorage.getItem('lastGameConfig'));
    if (config) {
      navigate('/game', { state: config });
    }
  }}
>Try Again</button>
                <button style={styles.btn} onClick={() => navigate('/')}>Try Another Level</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        paddingTop: '100px',
        fontFamily: '"Irish Grover", system-ui',
    },
    buttonGroup: {
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    btn: {
        padding: '12px 25px',
        fontSize: '1.1rem',
        borderRadius: '10px',
        background: 'linear-gradient(to right, #f78ca0, #f9748f)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '200px'
    },
};

export default CongratsPage;
