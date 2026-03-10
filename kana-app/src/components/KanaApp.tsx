import { useState } from 'react';
import StudyMode from './StudyMode';
import QuizMode from './QuizMode';
import { kanaData } from '../data/kana';
import '../App.css';

export default function KanaApp() {
    const [script, setScript] = useState<'hiragana' | 'katakana'>('hiragana');
    const [mode, setMode] = useState<'study' | 'quiz'>('study');
    const [quizState, setQuizState] = useState({
        currentIndex: 0,
        userAnswer: '',
        score: { correct: 0, total: 0 },
        feedback: ''
    });

    const switchMode = (newMode: 'study' | 'quiz') => {
        setMode(newMode);
        if (newMode === 'quiz') {
            setQuizState({
                currentIndex: 0,
                userAnswer: '',
                score: { correct: 0, total: 0 },
                feedback: ''
            });
        }
    };

    const handleAnswerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (quizState.feedback !== '') return;

        const currentKana = kanaData[quizState.currentIndex];
        const isCorrect = quizState.userAnswer.toLowerCase().trim() === currentKana.romanji.toLowerCase();

        setQuizState(prev => ({
            ...prev,
            score: {
                correct: prev.score.correct + (isCorrect ? 1 : 0),
                total: prev.score.total + 1
            },
            feedback: isCorrect ? 'Correct !' : `Incorrect. C'était ${currentKana.romanji}`
        }));

        setTimeout(() => {
            setQuizState(prev => ({
                ...prev,
                currentIndex: (prev.currentIndex + 1) % kanaData.length,
                userAnswer: '',
                feedback: ''
            }));
        }, 1500);
    };

    const handleUserAnswerChange = (value: string) => {
        setQuizState(prev => ({ ...prev, userAnswer: value }));
    };

    return (
        <div className="app-container">
            <h1>Apprentissage du Japonais - Kana</h1>

            <nav className="main-nav">
                <button className={mode === 'study' ? 'active' : ''} onClick={() => switchMode('study')}>
                    Mode Étude
                </button>
                <button className={mode === 'quiz' ? 'active' : ''} onClick={() => switchMode('quiz')}>
                    Mode Quiz
                </button>
            </nav>

            <div className="script-selection" style={{ marginBottom: '2rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', fontSize: '1.2rem' }}>
                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                        type="radio"
                        name="script"
                        checked={script === 'hiragana'}
                        onChange={() => setScript('hiragana')}
                    />
                    Hiragana
                </label>
                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                        type="radio"
                        name="script"
                        checked={script === 'katakana'}
                        onChange={() => setScript('katakana')}
                    />
                    Katakana
                </label>
            </div>

            <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {mode === 'study' && <StudyMode script={script} kanaData={kanaData} />}
                {mode === 'quiz' && (
                    <QuizMode
                        script={script}
                        kanaData={kanaData}
                        quizState={quizState}
                        onAnswerSubmit={handleAnswerSubmit}
                        onUserAnswerChange={handleUserAnswerChange}
                    />
                )}
            </main>
        </div>
    );
}