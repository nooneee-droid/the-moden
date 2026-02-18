import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '../src/assets/data/surah-bakara.json');

try {
    const data = fs.readFileSync(jsonPath, 'utf8');
    const verses = JSON.parse(data);

    const updatedVerses = verses.map(verse => {
        // Format: 002 +VerseNumber (3 digits)
        // Example: Verse 1 -> 002001.mp3
        const verseNum = verse.number.toString().padStart(3, '0');
        const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/002${verseNum}.mp3`;

        return {
            ...verse,
            audio: audioUrl
        };
    });

    fs.writeFileSync(jsonPath, JSON.stringify(updatedVerses, null, 2));
    console.log(`Successfully updated ${updatedVerses.length} verses with audio URLs.`);

} catch (error) {
    console.error('Error updating audio:', error);
}
