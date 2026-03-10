import type { Kana } from '../data/kana';

interface QuizModeProps {
    script: 'hiragana' | 'katakana';
    kanaData: Kana[];
    quizState: {
        currentIndex: number;
        userAnswer: string;
        score: { correct: number; total: number };
        feedback: string;
    };
    onAnswerSubmit: (e: React.FormEvent) => void;
    onUserAnswerChange: (value: string) => void;
}

export default function QuizMode({ script, kanaData, quizState, onAnswerSubmit, onUserAnswerChange }: QuizModeProps) {
    const currentKana = kanaData[quizState.currentIndex];
    const displayChar = script === 'hiragana' ? currentKana.hiragana : currentKana.katakana;

    const feedbackClass = quizState.feedback
        ? (quizState.feedback.includes('Correct') ? 'correct' : 'incorrect')
        : '';

    return (
        <div className="quiz-container">
            <div className="score-display">
                Score : {quizState.score.correct} / {quizState.score.total}
            </div>

            <div className={`quiz-card ${feedbackClass}`}>
                <div className="kana-character">
                    {displayChar}
                </div>
                {quizState.feedback && <div className="correction">{quizState.feedback}</div>}
            </div>

            <form onSubmit={onAnswerSubmit} className="quiz-form">
                <input
                    type="text"
                    value={quizState.userAnswer}
                    onChange={e => onUserAnswerChange(e.target.value)}
                    placeholder="Rōmaji..."
                    disabled={quizState.feedback !== ''}
                    autoFocus
                />
                <button type="submit" disabled={quizState.feedback !== '' || quizState.userAnswer.trim() === ''}>
                    Valider
                </button>
            </form>
        </div>
    );
}