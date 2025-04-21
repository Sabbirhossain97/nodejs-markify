import express from 'express'
import cors from 'cors';
import 'dotenv/config';
import { marked } from 'marked';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/convert', (req, res) => {
    const { markdown } = req.body;

    if (!markdown) {
        return res.status(400).json({ error: 'Markdown content is required' });
    }

    try {
        const html = marked.parse(markdown);
        return res.status(200).json({ html });

    } catch (error) {
        return res.status(500).json({ error: 'Error converting markdown to HTML' });
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

