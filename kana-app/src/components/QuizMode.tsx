import { useState } from 'react';
import type {Kana} from '../data/kana';

interface QuizModeProps {
    script: 'hiragana' | 'katakana';
    kanaData: Kana[];
}

export default function QuizMode({ script, kanaData }: QuizModeProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [feedback, setFeedback] = useState('');

    const currentKana = kanaData[currentIndex];

    const displayChar = script === 'hiragana'
        ? currentKana.hiragana
        : currentKana.katakana;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentKana) return;

        const isCorrect = userAnswer.toLowerCase().trim() === currentKana.romanji.toLowerCase();

        setScore({
            correct: score.correct + (isCorrect ? 1 : 0),
            total: score.total + 1
        });

        setFeedback(isCorrect ? 'Correct !' : `Incorrect. C'était ${currentKana.romanji}`);
        setUserAnswer('');

        setTimeout(() => {
            setCurrentIndex((currentIndex + 1) % kanaData.length);
            setFeedback('');
        }, 1500);
    };

    return (
        <div className="quiz-container">
            <div className="score-display">
                Score : {score.correct} / {score.total}
            </div>

            <div className={`quiz-card ${feedback.includes('Correct') ? 'correct' : ''} ${feedback.includes('Incorrect') ? 'incorrect' : ''}`}>
                <div className="kana-character">
                    {displayChar}
                </div>
                {feedback && <div className="correction">{feedback}</div>}
            </div>

            <form onSubmit={handleSubmit} className="quiz-form">
                <input
                    type="text"
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    placeholder="Rōmaji..."
                    disabled={feedback !== ''}
                    autoFocus
                />
                <button type="submit" disabled={feedback !== '' || userAnswer.trim() === ''}>
                    Valider
                </button>
            </form>
        </div>
    );
}