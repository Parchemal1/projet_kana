import CharacterCard from './CharacterCard';

interface CharacterItem {
    character: string;
    romanji: string;
}

interface CharacterGridProps {
    title: string;
    characters: CharacterItem[];
}

export default function CharacterGrid({ title, characters }: CharacterGridProps) {
    return (
        <section className="kana-section">
            <h2 className="section-title">{title}</h2>

            <div className="kana-grid">
                {characters.map((item) => (
                    <CharacterCard
                        key={item.romanji}
                        character={item.character}
                        romanji={item.romanji}
                    />
                ))}
            </div>
        </section>
    );
}