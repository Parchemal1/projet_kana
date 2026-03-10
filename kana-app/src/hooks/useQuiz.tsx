import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Kana } from '../data/kana';
import { useLocalStorage } from './useLocalStorage';

export function useQuiz(kanaData: Kana[], script: 'hiragana' | 'katakana') {
    const shuffledKana = useMemo(() => {
        return [...kanaData].sort(() => Math.random() - 0.5);
    }, [kanaData, script]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [feedback, setFeedback] = useState('');

    const [record, setRecord] = useLocalStorage<number>('kana-record', 0);

    useEffect(() => {
        setCurrentIndex(0);
        setScore({ correct: 0, total: 0 });
        setFeedback('');
        setUserAnswer('');
    }, [script]);

    useEffect(() => {
        if (score.correct > record) {
            setRecord(score.correct);
        }
    }, [score.correct, record, setRecord]);

    // Validation de la réponse
    const handleAnswerSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (feedback !== '' || userAnswer.trim() === '') return;

        const currentKana = shuffledKana[currentIndex];
        const isCorrect = userAnswer.toLowerCase().trim() === currentKana.romanji.toLowerCase();

        setScore(prev => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            total: prev.total + 1
        }));
        setFeedback(isCorrect ? 'Correct !' : `Incorrect : ${currentKana.romanji}`);

        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % shuffledKana.length);
            setUserAnswer('');
            setFeedback('');
        }, 1200);
    }, [feedback, userAnswer, shuffledKana, currentIndex]);

    const currentKana = shuffledKana[currentIndex];
    const displayChar = script === 'hiragana' ? currentKana.hiragana : currentKana.katakana;
    const feedbackClass = feedback ? (feedback.includes('Correct') ? 'correct' : 'incorrect') : '';

    return {
        currentIndex,
        userAnswer,
        setUserAnswer,
        score,
        record,
        feedback,
        feedbackClass,
        displayChar,
        handleAnswerSubmit
    };
}