import { useState } from 'react';
import StudyMode from './components/StudyMode';
import QuizMode from './components/QuizMode';
import { kanaData } from './data/kana';
import './App.css';

function App() {
    const [script, setScript] = useState<'hiragana' | 'katakana'>('hiragana');
    const [mode, setMode] = useState<'study' | 'quiz'>('study');

    const switchMode = (newMode: 'study' | 'quiz') => {
        setMode(newMode);
    };

    return (
        <div className="app-container">
            <h1>Apprentissage du Japonais - Kana</h1>

            <div className="main-nav">
                <button
                    className={mode === 'study' ? 'active' : ''}
                    onClick={() => switchMode('study')}
                >
                    Mode Étude
                </button>
                <button
                    className={mode === 'quiz' ? 'active' : ''}
                    onClick={() => switchMode('quiz')}
                >
                    Mode Quiz
                </button>
            </div>

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

            {mode === 'study' && <StudyMode script={script} kanaData={kanaData} />}
            {mode === 'quiz' && <QuizMode script={script} kanaData={kanaData} />}
        </div>
    );
}

export default App;