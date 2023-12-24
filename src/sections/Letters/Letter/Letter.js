import { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import styles from '../Letters.module.css';

const Letter = props => {
    const [isLetterHighlighted, setIsLetterHighlighted] = useState(false);
    const [isLetterVisible, setIsLetterVisible] = useState(false);

    useEffect(() => {
        if (!isLetterVisible && props.unveiledLetters.includes(props.letter.toUpperCase())) {
            setIsLetterHighlighted(true);
            const audio = new Audio('success.mp3');
            audio.play().then(() => {
                setTimeout(() => {
                    setIsLetterVisible(true);
                    const flipAudio = new Audio('letter_flip.mp3');
                    flipAudio.play();
                }, 1200);
            })
        }
    }, [props.unveiledLetters, isLetterVisible]);

    return <ReactCardFlip isFlipped={isLetterVisible} flipDirection="horizontal">
        <div style={isLetterHighlighted ? { backgroundColor: 'rgb(21, 230, 21)', transition: 0.7 } : { backgroundColor: 'white'}} className={`${styles.unveiled} ${styles.letterCard}`} />
        <div className={`${styles.unveiled} ${styles.letterCard}`}>{props.letter}</div>
    </ReactCardFlip>
}

export default Letter;https://github.com/00levandi