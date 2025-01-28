import { useState } from "react";
import axios from "axios";
import { FaLink } from "react-icons/fa";
import { baseUrl } from "../../helpers/config";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { newspapers } from "../../helpers/newspapers";
import { RiGeminiFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

function Hero() {
    const navigate = useNavigate();
    const [headlines, setHeadlines] = useState("");
    const [newsPapers, setNewsPapers] = useState("");
    const [loading, setLoading] = useState(false)
    const [aiContent, setAiContent] = useState("");
    const [aiContentLoading, setAiContentLoading] = useState(false)


    const handleHeadlines = async (newsPaperName) => {
        setNewsPapers(newsPaperName)
        setLoading(true)
        try {
            await axios.post(`${baseUrl}`, { newsPaperName }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                setHeadlines(response.data.headlines);
            }).catch((error) => {
                console.error("Error fetching data:", error);
            })
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false)
        }
    }

    const analyzeWithAI = async (newsPaperName, headline, headlineLink) => {
        setAiContentLoading(true)
        try {
            await axios.post(`${baseUrl}/summarize`,
                {
                    newsPaperName,
                    headline,
                    headlineLink
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then((response) => {
                    const { newsPaperName, headline, content } = response?.data;
                    const data = { newsPaperName: newsPaperName, newsHeadline: headline, summarizedNews: content };
                    navigate('/summarize', { state: data });
                }).catch((error) => {
                    console.error("Error fetching data:", error);
                })
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setAiContentLoading(false)

        }
    }

    return (
        <section className="min-h-screen pt-20 max-w-7xl mx-auto text-lg flex flex-col items-center">
            <TabGroup>
                <TabList className="flex gap-4 justify-between">
                    {newspapers.map(({ name }) => (
                        <Tab
                            key={name}
                            onClick={() => handleHeadlines(name)}
                            className="rounded-full cursor-pointer transition duration-300 py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            {name}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {newspapers.map(({ name }) => (
                        <TabPanel key={name}>
                            {loading ?
                                <div role="status" className="min-h-[800px] flex items-center justify-center">
                                    <svg aria-hidden="true" className="w-8 h-8 text-zinc-700 animate-spin fill-teal-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </div> : (
                                    <ul className="space-y-4 mt-8 flex flex-col items-center">
                                        {headlines ? headlines.map((item, index) => (
                                            <li key={index} className="text-zinc-400 gap-2 inline-flex" >
                                                {item.headline}
                                                <a href={item.link} target="_blank" className="group flex gap-2">
                                                    <FaLink className="text-sm cursor-pointer text-[#242424] group-hover:text-teal-500 transition duration-300" />
                                                </a>
                                                <button onClick={() => analyzeWithAI(name, item.headline, item.link)} className="group flex gap-2">
                                                    <RiGeminiFill className="text-lg cursor-pointer text-[#242424] group-hover:text-teal-500 transition duration-300" />
                                                </button>
                                            </li>
                                        )) :
                                            <li className="text-zinc-400 gap-2 inline-flex">
                                                No headlines found
                                            </li>
                                        }
                                    </ul>
                                )}
                        </TabPanel>
                    ))}

                </TabPanels>
            </TabGroup>
        </section >
    )
}

export default Hero