import { useEffect, useState } from 'react';
import './App.css';
import Category from './sections/Category/Category';
import Letters from './sections/Letters/Letters';
import Score from './sections/Score/Score';

import questionsBase from './questionsBase.json';

const lettersMapping = {
  'A': 'Ą',
  'E': 'Ę',
  'O': 'Ó',
  'S': 'Ś',
  'L': 'Ł',
  'Z': 'Ż',
  'C': 'Ć',
  'N': 'Ń'
}

function App() {
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
  const [ unveiledLetters, setUnveiledLetters ] = useState([]);

  const { category, word } = questionsBase[currentQuestionIndex];

  const switchToNextQuestion = () => {
    setUnveiledLetters([]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  const checkIfPolish = (character, isShiftPressed) => {
    if (lettersMapping[character] && isShiftPressed) {
      return lettersMapping[character];
    }

    return character;
  }

  const unveilAllLetters = () => {
    unveilLetters(word.toUpperCase().trim().split(''))
  }

  const unveilLetters = (letters) => {
    setUnveiledLetters([...unveiledLetters, ...letters]);
  }

  useEffect(() => {
    const playSoundCallback = event => {
      const clickedCharacter = String.fromCharCode(event.keyCode)
      const character = checkIfPolish(clickedCharacter, event.shiftKey);

      if ((/[a-zA-Z]/).test(character) || Object.values(lettersMapping).includes(character)) {
        if (!word.toUpperCase().includes(character)) {
          const audio = new Audio('wrong_answer.mp3');
          audio.play();
        }
  
        unveilLetters([character]);
      }
    };

    window.addEventListener("keydown", playSoundCallback);

    return () => window.removeEventListener("keydown", playSoundCallback)    ;
  }, [word]);

  return (
    <div className="App">
      <Score />
      <Letters word={word} unveiledLetters={unveiledLetters} questionIndex={currentQuestionIndex} />
      <Category name={category}/>
      <button className="nextQuestionButton" onClick={switchToNextQuestion}>{'>'}</button>
      <button className="unveilAllLettersButton" onClick={unveilAllLetters}>{'O'}</button>
    </div>
  );
}

export default App;
