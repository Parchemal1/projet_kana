import {useEffect, useRef} from 'react';
import type {Kana} from '../data/kana';
import {useQuiz} from '../hooks/useQuiz';

interface QuizModeProps {
    script: 'hiragana' | 'katakana';
    kanaData: Kana[];
}

export default function QuizMode({script, kanaData}: QuizModeProps) {
    const {
        currentIndex,
        userAnswer,
        setUserAnswer,
        score,
        record,
        feedback,
        feedbackClass,
        displayChar,
        handleAnswerSubmit
    } = useQuiz(kanaData, script);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (feedback === '' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentIndex, feedback]);

    return (
        <div className="quiz-container">
            <div className="score-display">
                Score : {score.correct} / {score.total} | Record : {record}
            </div>
            <div className={`quiz-card ${feedbackClass}`}>
                <div className="kana-character">{displayChar}</div>
                {feedback && <div className="correction">{feedback}</div>}
            </div>
            <form onSubmit={handleAnswerSubmit} className="quiz-form">
                <input
                    ref={inputRef}
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Rōmaji..."
                    disabled={feedback !== ''}
                />
                <button type="submit" disabled={feedback !== '' || userAnswer.trim() === ''}>Valider</button>
            </form>
        </div>
    );
}