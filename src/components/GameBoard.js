import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import animalsBG from '../assets/Pages/animals.jpeg';
import fruitsBG from '../assets/Pages/fruits.jpeg';
import sweetsBG from '../assets/Pages/sweets.jpeg';

const animalImages = [
  require('../assets/animals/mouse.jpg'),
  require('../assets/animals/cat.jpg'),
  require('../assets/animals/cow.jpg'),
  require('../assets/animals/elephent.jpg'),
  require('../assets/animals/giraffe.jpg'),
  require('../assets/animals/monkey.jpg'),
  require('../assets/animals/owl.jpg'),
  require('../assets/animals/penguin.jpg'),
  require('../assets/animals/pork.jpg'),
  require('../assets/animals/seal.jpg'),
  require('../assets/animals/tiger.jpg'),
  require('../assets/animals/lion.jpg'),
];

const fruitImages = [
  require('../assets/fruits/avocado.jpg'),
  require('../assets/fruits/banana.jpg'),
  require('../assets/fruits/blueberry.jpg'),
  require('../assets/fruits/cherry.jpg'),
  require('../assets/fruits/corn.jpg'),
  require('../assets/fruits/lemon.jpg'),
  require('../assets/fruits/moshmosh.jpg'),
  require('../assets/fruits/orange.jpg'),
  require('../assets/fruits/pear.jpg'),
  require('../assets/fruits/strawberry.jpg'),
  require('../assets/fruits/tomato.jpg'),
  require('../assets/fruits/waterMellon.jpg'),
];

const sweetImages = [
  require('../assets/sweets/cake1.jpg'),
  require('../assets/sweets/cake2.jpg'),
  require('../assets/sweets/cake3.jpg'),
  require('../assets/sweets/cake4.jpg'),
  require('../assets/sweets/candy.jpg'),
  require('../assets/sweets/coffee.jpg'),
  require('../assets/sweets/cookie.jpg'),
  require('../assets/sweets/corn.jpg'),
  require('../assets/sweets/cupcake.jpg'),
  require('../assets/sweets/donut.jpg'),
  require('../assets/sweets/icecream.jpg'),
  require('../assets/sweets/suger.jpg'),
];

const themeImages = {
  animals: animalsBG,
  fruits: fruitsBG,
  sweets: sweetsBG,
};

const themeCards = {
  animals: animalImages,
  fruits: fruitImages,
  sweets: sweetImages,
};

function GameBoard({ settings }) {
  const { level, theme, numCards } = settings;
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState([]);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const symbols = themeCards[theme].slice(0, numCards / 2);
    const gameCards = shuffle([...symbols, ...symbols]);
    setCards(gameCards);
  }, [theme, numCards]);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, cards[first]]);
        setTimeout(() => setFlipped([]), 800);
      } else {
        setWrongPair([first, second]);
        setTimeout(() => {
          setFlipped([]);
          setWrongPair([]);
        }, 800);
      }
    }
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [theme, numCards]);

  useEffect(() => {
    if (matched.length === numCards / 2 && intervalRef.current) {
      clearInterval(intervalRef.current);
      navigate('/congrats', { state: { time: timer } });
    }
  }, [matched, numCards, timer, navigate]);

  const resetGame = () => {
    const symbols = themeCards[theme].slice(0, numCards / 2);
    const gameCards = shuffle([...symbols, ...symbols]);
    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setTimer(0);
    setWrongPair([]);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
  };

  const getColumns = () => {
    if (numCards === 6) return 3;
    if (numCards === 12) return 4;
    if (numCards === 24) return 6;
    return Math.sqrt(numCards);
  };

  const getCardBackColor = (idx) => {
    const colors = ['#e5fbe5', '#e5e5fb', '#e5fbfb', '#f8f8cf', '#ffc4ad', '#dcd0cb'];
    return colors[idx % colors.length];
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundImage: `url(${themeImages[theme]})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div style={styles.infoBox}>
        <h2 style={styles.header}>Level: {level} | Theme: {theme}</h2>
        <p style={styles.timer}>Time: {timer}s</p>
        <div style={{ marginTop: '10px' }}>
          <button style={styles.button} onClick={resetGame}>Reset</button>
          <button style={{ ...styles.button, backgroundColor: '#f76c6c' }} onClick={() => navigate('/')}>Exit</button>
        </div>
      </div>

      <div style={styles.grid(getColumns())}>
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(card);
          const isWrong = wrongPair.includes(idx);

          return (
            <div
              key={idx}
              style={{
                ...styles.card,
                backgroundColor: isFlipped ? '#fff' : getCardBackColor(idx),
                cursor: isFlipped ? 'default' : 'pointer',
                boxShadow: matched.includes(card)
                  ? '0 0 12px 4px #6dcf6d'
                  : isWrong
                  ? '0 0 12px 4px #f76c6c'
                  : '0 3px 6px rgba(0,0,0,0.2)',
              }}
              onClick={() => handleCardClick(idx)}
            >
              {isFlipped ? (
                <img
                  src={card}
                  alt="card"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                <span style={{ fontSize: '2rem' }}>❓</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: '"Irish Grover", system-ui',
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '15px 30px',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  header: {
    fontSize: '1.6rem',
    color: '#333',
    margin: 0,
  },
  timer: {
    fontSize: '1.3rem',
    margin: '8px 0 0 0',
    color: '#666',
  },
  button: {
    margin: '5px 10px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#6dcf6d',
    color: 'white',
    width: '100px',
  },
  grid: (columns) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 120px)`,
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
  }),
  card: {
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    borderRadius: '12px',
    userSelect: 'none',
    backgroundColor: '#fff',
  },
};

export default GameBoard;
