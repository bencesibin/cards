import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Homepage from './components/Homepage'
import Game from './components/Game'
import Folder from './components/Floder';

import logo from './logo.svg';
import './App.css';


function App() {
  let explorer = {
    name: 'root',
    type: 'folder',
    expand: true,
    child: [
      {
        name: 'src',
        type: 'folder',
        expand: true,
        child: [
          {
            name: 'App.css',
            type: 'file',
          },
          {
            name: 'App.js',
            type: 'file',
          },
        ]
      },
      {
        name: 'public',
        type: 'folder',
        expand: false,
        child: [
          {
            name: 'App.test.js',
            type: 'file',
          },
          {
            name: 'Floder.js',
            type: 'file',
          },
        ]
      },
      {
        name: 'package.json',
        type: 'file',
      },
    ]
  }

  // let i = "s";
  // console.log(i, i.length());

  return (
    <Router>
      {/* <nav>
        <Link to='/'>Home</Link>
        <Link to='/play'>Game</Link>
        <Link to='/folder'>folder</Link>
      </nav> */}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/play' element={<Game />} />
        <Route path='/folder' element={<Folder explorer={explorer} />} />
      </Routes>
    </Router>
  )
}

function Apps() {

  let timer;

  // const [data, setData] = useState([{ }])
  const [cardData, setCardData] = useState([])
  const lineWin = {
    1: 10,
    2: 20,
    3: 30,
  }

  const checkLineWin = (cards) => {
    if (cards[0] == cards[1] && cards[0] == cards[2] && Object.keys(lineWin).indexOf(cards[0]) != -1) {
      return lineWin[cards[0]];
    }
    let count = 0
    cards.forEach(card => {
      console.log(Object.keys(lineWin), card);
      if (Object.keys(lineWin).indexOf(String(card)) != -1) count++
    });
    console.log(count);
    if (count == 3) {
      return 5;
    }
    return 0;
  }

  const onclickStart = () => {
    // setInterval(() => {
    fetchData();
    // }, 1000);
  }

  const fetchData = () => {
    return fetch("/cards").then(
      res => res.json()
    ).then(data => {
      data.cards.lineWin = checkLineWin(data.cards.set);
      const newCardData = [
        ...cardData,
        ...[data.cards]
      ]
      setCardData(newCardData)
      return data
    })
  }

  useEffect(() => {
    // setInterval(() => {
    fetchData()
    // }, 1000);
    // fetchData().then(
    //   res => setData(res)
    // )
  }, [])

  return (
    <div className="App">
      <button onClick={() => onclickStart()}>Add Data</button>
      <div className="flex-container">
        {(cardData) ? (
          cardData.map((card, cardIndex) => (
            <div key={cardIndex} className="">
              {(card) ? (
                <div> {cardIndex} {card.set}  {card.lineWin} </div>
              ) : (
                <hi> Loading ... </hi>
              )}
            </div>
          ))
        ) : (
          <hi> Loading ... </hi>
        )}
      </div>
    </div>
  );

}

export default App;
