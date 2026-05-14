const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const URL = 'https://ovishekh.com/wiki';

async function scrapeWiki() {
    console.log(`Fetching latest content from ${URL}...`);
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);
        
        const sections = [];
        const references = [];

        // Scrape Sections
        // Assuming Wikipedia-like structure: h2 for section titles, followed by content
        $('h2').each((i, el) => {
            const title = $(el).text().replace('[edit]', '').trim();
            if (title === 'Contents' || title === 'References' || title === 'Navigation menu') return;

            const id = title.toLowerCase().replace(/\s+/g, '-');
            let content = '';
            let next = $(el).next();

            while (next.length && next[0].tagName !== 'h2') {
                content += $.html(next);
                next = next.next();
            }

            if (content) {
                sections.push({ id, title, content });
            }
        });

        // Scrape References
        $('.references li, #references-list li').each((i, el) => {
            const link = $(el).find('a').first();
            references.push({
                title: $(el).text().trim(),
                url: link.attr('href') || '#'
            });
        });

        const wikiData = {
            lastUpdated: new Date().toISOString(),
            sections,
            references
        };

        fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(wikiData, null, 4));
        console.log('Successfully updated data.json with latest wiki content!');

    } catch (error) {
        console.error('Error scraping wiki:', error.message);
        process.exit(1);
    }
}

scrapeWiki();
