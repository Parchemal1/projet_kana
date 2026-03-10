import { useState, useEffect } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import StudyMode from "./StudyMode";
import QuizMode from "./QuizMode";
import { kanaData } from "../data/kana";
import "../App.css";

export default function KanaApp() {
    const [script, setScript] = useState<"hiragana" | "katakana">(() => {
        const saved = localStorage.getItem("selected-script");
        return (saved === "hiragana" || saved === "katakana") ? saved : "hiragana";
    });

    useEffect(() => {
        localStorage.setItem("selected-script", script);
    }, [script]);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Apprentissage du Japonais — <span>Kana</span></h1>
            </header>

            <nav className="main-nav">
                <NavLink
                    to="/study"
                    className={({ isActive }: { isActive: boolean }) => isActive ? "tab-btn active" : "tab-btn"}
                >
                    Étude
                </NavLink>
                <NavLink
                    to="/quiz"
                    className={({ isActive }: { isActive: boolean }) => isActive ? "tab-btn active" : "tab-btn"}
                >
                    Quiz
                </NavLink>
            </nav>

            <main className="app-content">
                <div className="script-selection">
                    <label>
                        <input
                            type="radio"
                            name="script-toggle"
                            checked={script === "hiragana"}
                            onChange={() => setScript("hiragana")}
                        />
                        Hiragana
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="script-toggle"
                            checked={script === "katakana"}
                            onChange={() => setScript("katakana")}
                        />
                        Katakana
                    </label>
                </div>

                <Routes>
                    <Route path="/" element={<Navigate to="/study" replace />} />
                    <Route path="/study" element={<StudyMode script={script} kanaData={kanaData} />} />
                    <Route path="/quiz" element={<QuizMode script={script} kanaData={kanaData} />} />
                </Routes>
            </main>
        </div>
    );
}