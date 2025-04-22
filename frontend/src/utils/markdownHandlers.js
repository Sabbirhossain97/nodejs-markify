import axios from "axios";
import { baseUrl } from "../../helpers/config";

export const handleConvert = async (markdown, setHtml, setConvertLoading) => {
    if (!markdown) {
        alert('Please enter some markdown content');
        return;
    }
    setConvertLoading(true);
    try {
        const response = await axios.post(`${baseUrl}/convert`, { markdown });
        setTimeout(() => {
            setHtml(response.data.html);
            setConvertLoading(false);
        }, 1500);
    } catch (error) {
        console.error('Error converting markdown to HTML:', error);
        alert('Error converting markdown to HTML. Please try again.');
        setConvertLoading(false);
    }
};


export const handleHTMLDownload = (html, css) => {
    const blob = new Blob(
        [
            `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Converted Markdown</title>
</head>
<body>
<style>${css}</style>
${html}
</body>
</html>`
        ],
        { type: 'text/html' }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
    a.click();
    URL.revokeObjectURL(url);
};

export const handleFileChange = (e, setMarkdown, setUploadLoading) => {
    const file = e.target.files[0];
    if (file) {
        setUploadLoading(true);
        const reader = new FileReader();
        reader.onload = (event) => {
            setTimeout(() => {
                setMarkdown(event.target.result);
                setUploadLoading(false);
            }, 1500);
        };
        reader.readAsText(file);
    }
};