import { useEffect, useState } from 'react';
import FakeLetterRow from './FakerLetterRow';
import Letter from './Letter/Letter';
import styles from './Letters.module.css';

const Letters = props => {
    const [currentWordLetters, setCurrentWordLetters] = useState([]);

    useEffect(() => {
        const words = props.word.split(' ');
        setCurrentWordLetters(words);
    }, [props.word]);

    return <div className={styles.lettersContainer}>
            {currentWordLetters.map(word => {
                return <>
                    <div className={styles.lettersRow}>
                    {word.split('').map((letter, index) => <Letter
                        letter={letter}
                        unveiledLetters={props.unveiledLetters}
                        key={index + letter + props.questionIndex}
                    />)}
                    </div>
                </>
            })
            }
    </div>
}

export default Letters;