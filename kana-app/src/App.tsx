// src/App.tsx
import CharacterGrid from './components/CharacterGrid';
import { kanaData } from './data/kana';
import './App.css';

function App() {
    return (
        <div className="app-container">
            <h1>Apprentissage du Japonais - Kana</h1>

            <CharacterGrid
                title="Hiragana"
                characters={kanaData.map(k => ({ character: k.hiragana, romanji: k.romanji }))}
            />

            <CharacterGrid
                title="Katakana"
                characters={kanaData.map(k => ({ character: k.katakana, romanji: k.romanji }))}
            />
        </div>
    );
}

export default App;