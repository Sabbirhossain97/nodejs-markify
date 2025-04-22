import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../helpers/config';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { markdownTabs, renderedTabs } from '../../../helpers/config';

function index() {

    const [markdown, setMarkdown] = useState('');
    const [html, setHtml] = useState('');
    const [convertLoading, setConvertLoading] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [css, setCss] = useState('');

    const handleMarkdownChange = (e) => {
        setMarkdown(e.target.value);
    }

    const handleConvert = async () => {
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
            }, 1500)
        } catch (error) {
            console.error('Error converting markdown to HTML:', error);
            alert('Error converting markdown to HTML. Please try again.');
            setConvertLoading(false);
        }
    }


    const handleHTMLDownload = () => {
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadLoading(true);
            const reader = new FileReader();
            reader.onload = (event) => {
                setTimeout(() => {
                    setMarkdown(event.target.result);
                    setUploadLoading(false);
                }, 1500);
            }
            reader.readAsText(file);
        }
    }

    return (
        <section className="py-20 mx-auto max-w-7xl px-4">
            <div>
                <h1 className='text-center text-2xl font-semibold'>Convert your Markdown to HTML Here</h1>
                <TabGroup className="mt-6">
                    <TabList className="flex gap-4">
                        {markdownTabs.map(({ name }) => (
                            <Tab
                                key={name}
                                className="cursor-pointer rounded-full py-1 px-3 text-sm/6 font-semibold bg-zinc-200 text-zinc-700 focus:outline-none data-[selected]:bg-zinc-700 data-[selected]:text-white data-[hover]:bg-zinc-800 data-[hover]:text-white data-[selected]:data-[hover]:bg-zinc-700 data-[focus]:outline-1 data-[focus]:outline-white"
                            >
                                {name}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {markdownTabs.map(({ name }) => (
                            <TabPanel key={name} className="rounded-xl">
                                {name === 'Markdown' ? (
                                    <textarea
                                        value={markdown}
                                        onChange={handleMarkdownChange}
                                        placeholder="Enter Markdown here..."
                                        className='border bg-white border-zinc-300 rounded-md w-full mt-4 p-4'
                                        rows="10"
                                        cols="50"
                                    />
                                ) : (
                                    <textarea
                                        value={css}
                                        onChange={(e) => setCss(e.target.value)}
                                        placeholder="Add your custom CSS here..."
                                        className="border bg-white border-zinc-300 rounded-md w-full mt-4 p-4"
                                        rows="10"
                                        cols="50"
                                    />
                                )}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>
                <br />
                <div className="flex flex-col mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <button onClick={handleConvert} type='button' disabled={convertLoading} className="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-zinc-700 hover:bg-zinc-600 transition duration-300">
                        {convertLoading ? <>
                            <div className='flex items-center gap-2'>
                                <div role="status">
                                    <svg aria-hidden="true" className="w-4 h-4 text-white animate-spin fill-zinc-800 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </div> Converting...
                            </div>
                        </> : 'Convert to HTML'}
                    </button>
                    <label for="uploadFile"
                        className="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-zinc-700 hover:bg-zinc-600 transition duration-300">
                        {uploadLoading ? <>
                            <div className='flex items-center gap-2'>
                                <div role="status">
                                    <svg aria-hidden="true" className="w-4 h-4 text-white animate-spin  fill-zinc-800 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </div> Uploading...
                            </div>
                        </> : 'Upload File'}
                        <input type="file" id='uploadFile' accept=".md" onChange={handleFileChange} className="hidden" />
                    </label>
                </div>

                {html && <div className="w-full">
                    <TabGroup>
                        <TabList className="flex gap-4">
                            {renderedTabs.map(({ name }) => (
                                <Tab
                                    key={name}
                                    className="cursor-pointer rounded-full py-1 px-3 text-sm/6 font-semibold bg-zinc-200 text-zinc-700 focus:outline-none data-[selected]:bg-zinc-700 data-[selected]:text-white data-[hover]:bg-zinc-800 data-[hover]:text-white data-[selected]:data-[hover]:bg-zinc-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                >
                                    {name}
                                </Tab>
                            ))}
                        </TabList>
                        <TabPanels className="mt-3">
                            {renderedTabs.map(({ name }) => (
                                <TabPanel key={name} className="rounded-xl">
                                    {name === 'Preview' ? (
                                        <div className='border bg-white border-zinc-300 rounded-md p-4 relative'>
                                            <style>{css}</style>
                                            <div
                                                className="prose prose-neutral max-w-none"
                                                dangerouslySetInnerHTML={{ __html: html }} />
                                            <button
                                                onClick={handleHTMLDownload}
                                                className="absolute top-4 right-4 cursor-pointer inline-flex justify-center items-center py-2 px-2 text-sm font-medium text-center text-white rounded-lg bg-zinc-700 hover:bg-zinc-600 transition duration-300"
                                            >
                                                Download HTML
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="prose relative bg-white max-w-none">
                                            <CopyToClipboard text={html} onCopy={() => {
                                                setCopied(true);
                                                setTimeout(() => setCopied(false), 2000);
                                            }}>
                                                <button className="absolute top-2 right-2 px-3 py-1 text-sm bg-sky-400 text-white rounded hover:bg-blue-700">
                                                    {copied ? 'Copied!' : 'Copy'}
                                                </button>
                                            </CopyToClipboard>
                                            <pre>{html}</pre>
                                        </div>
                                    )}
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </TabGroup>
                </div>}
            </div>
        </section>
    )
}

export default index