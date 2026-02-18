import Link from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/en/2.json';
const outputPath = path.join(__dirname, '../src/assets/data/surah-bakara.json');

console.log(`Fetching from ${url}...`);

Link.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            const verses = json.verses.map(v => ({
                number: v.id,
                text: v.transliteration,
                arabic: v.text,
                translation: v.translation
            }));

            fs.writeFileSync(outputPath, JSON.stringify(verses, null, 2));
            console.log(`Successfully wrote ${verses.length} verses to ${outputPath}`);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });

}).on('error', (err) => {
    console.error('Error fetching data:', err);
});
