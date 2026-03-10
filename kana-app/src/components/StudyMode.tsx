import CharacterCard from './CharacterCard';
import type {Kana} from '../data/kana';

interface StudyModeProps {
    script: 'hiragana' | 'katakana';
    kanaData: Kana[];
}

export default function StudyMode({ script, kanaData }: StudyModeProps) {
    return (
        <div className="kana-grid">
            {kanaData.map((kana) => (
                <CharacterCard
                    key={kana.romanji}
                    character={script === 'hiragana' ? kana.hiragana : kana.katakana}
                    romanji={kana.romanji}
                />
            ))}
        </div>
    );
}