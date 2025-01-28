import express from 'express'
import puppeteer from 'puppeteer';
import cors from 'cors';
import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(express.json());
app.use(cors());

const generateAIContent = async (prompt) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const generateSummary = `Can you summarize the following article also give a summary with bullet points: ${prompt}`;

    try {
        const result = await model.generateContent(generateSummary);
        return result.response.text()
    } catch (error) {
        console.error("Error generating image:", error);
    }
}

const fetchTheDailyStarHeadlines = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
        });

        const page = await browser.newPage();

        await page.goto('https://www.thedailystar.net/news/bangladesh', {
            waitUntil: 'networkidle2',
        });

        const headlines = await page.evaluate(() => {
            return Array.from(
                document.querySelectorAll('h3.title.fs-20 a')
            ).map((el) => {
                const headline = el.textContent.trim();
                const link = el.getAttribute('href');
                return {
                    headline,
                    link: link ? `https://www.thedailystar.net${link}` : null,
                };
            }).filter(item => item.headline && item.link);
        });

        await browser.close();

        return headlines;
    } catch (error) {
        console.error('Error fetching headlines:', error.message);
        throw new Error('Failed to fetch headlines');
    }
};

const fetchDailySunHeadlines = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
        });

        const page = await browser.newPage();

        await page.goto('https://www.daily-sun.com/online/national', {
            waitUntil: 'networkidle2',
        });

        const headlines = await page.evaluate(() => {
            return Array.from(
                document.querySelectorAll('a.row.mb-4')
            ).map((el) => {
                const headline = el.querySelector('span.col-8 h4')?.textContent.trim();
                const link = el.getAttribute('href');
                return {
                    headline,
                    link: link ? `https://www.daily-sun.com${link}` : null,
                };
            }).filter(item => item.headline && item.link);
        });

        await browser.close();

        return headlines;
    } catch (error) {
        console.error('Error fetching headlines:', error.message);
        throw new Error('Failed to fetch headlines');
    }
};

const fetchTheIndependentHeadlines = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
        });

        const page = await browser.newPage();

        await page.goto('https://theindependentbd.com/online/bangladesh', {
            waitUntil: 'networkidle2',
        });

        const headlines = await page.evaluate(() => {
            return Array.from(
                document.querySelectorAll('#catHl2 a')
            ).map((el) => {
                const headline = el.textContent.trim();
                const link = el.getAttribute('href');
                return {
                    headline,
                    link: link ? `https://theindependentbd.com${link.replace('./', '/')}` : null,
                };
            }).filter(item => item.headline && item.link);
        });

        await browser.close();

        return headlines;
    } catch (error) {
        console.error('Error fetching headlines:', error.message);
        throw new Error('Failed to fetch headlines');
    }
};

const fetchDhakaTribuneHeadlines = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
        });

        const page = await browser.newPage();

        await page.goto('https://www.dhakatribune.com/bangladesh', {
            waitUntil: 'networkidle2',
        });

        const headlines = await page.evaluate(() => {
            return Array.from(
                document.querySelectorAll('h2.title a.link_overlay')
            ).map((el) => {
                const headline = el.getAttribute('title');
                const link = el.getAttribute('href');
                return {
                    headline,
                    link: link ? `https://www.dhakatribune.com${link}` : null,
                };
            }).filter(item => item.headline && item.link);
        });

        await browser.close();

        return headlines;
    } catch (error) {
        console.error('Error fetching headlines:', error.message);
        throw new Error('Failed to fetch headlines');
    }
};

const fetchTheDailyObserverHeadlines = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
        });

        const page = await browser.newPage();

        await page.goto('https://www.observerbd.com/menu/186', {
            waitUntil: 'networkidle2',
        });

        const headlines = await page.evaluate(() => {
            return Array.from(
                document.querySelectorAll('div.title_inner a')
            ).map((el) => {
                const headline = el.querySelector('b')?.textContent.trim();
                const link = el.getAttribute('href');
                return {
                    headline,
                    link
                };
            }).filter(item => item.headline && item.link);
        });

        await browser.close();

        return headlines;
    } catch (error) {
        console.error('Error fetching headlines:', error.message);
        throw new Error('Failed to fetch headlines');
    }
};

app.post("/", async (req, res) => {
    const { newsPaperName } = req.body;
    switch (newsPaperName) {
        case 'The Daily Star':
            try {
                const headlines = await fetchTheDailyStarHeadlines();
                res.json({ headlines });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;
        case 'The Independent':
            try {
                const headlines = await fetchTheIndependentHeadlines();
                res.json({ headlines });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;
        case 'Dhaka Tribune':
            try {
                const headlines = await fetchDhakaTribuneHeadlines();
                res.json({ headlines });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;
        case 'The Daily Observer':
            try {
                const headlines = await fetchTheDailyObserverHeadlines();
                res.json({ headlines });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;
        case 'The Daily Sun':
            try {
                const headlines = await fetchDailySunHeadlines();
                res.json({ headlines });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;
        default:
            res.status(404).json({ error: 'News paper not found' });
    }
})

app.post("/summarize", async (req, res) => {
    const { newsPaperName, headline, headlineLink } = req.body;
    const content = await generateAIContent(headlineLink);
    res.json({ newsPaperName: newsPaperName, headline: headline, content: content });

})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

