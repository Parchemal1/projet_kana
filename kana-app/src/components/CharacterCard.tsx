interface CharacterCardProps {
    character: string;
    romanji: string;
}

export default function CharacterCard({ character, romanji }: CharacterCardProps) {
    return (
        <div className="kana-card">
            <div className="kana-character">{character}</div>
            <div className="kana-romanji">{romanji}</div>
        </div>
    );
}