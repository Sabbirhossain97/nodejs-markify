import { useState, useEffect } from "react";
import axios from "axios";
import { FaLink } from "react-icons/fa";
import { baseUrl } from "../../helpers/config";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { newspapers } from "../../helpers/newspapers";
import { RiGeminiFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { HeadlineCardSkeleton } from "./Skeleton";

function Hero() {
    const navigate = useNavigate();
    const [newsName, setNewsName] = useState({
        name: 'The Daily Star',
        activeField: '',
        filterBy: ''
    });
    const [headlines, setHeadlines] = useState({
        newsPaperName: "",
        list: []
    });
    const [loading, setLoading] = useState(false)
    const [aiContentLoading, setAiContentLoading] = useState(false)

    useEffect(() => {
        const handleHeadlines = async (newsName) => {
            const { name, filterBy } = newsName
            setLoading(true)
            try {
                await axios.post(`${baseUrl}`, { name, filterBy }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then((response) => {
                    const data = response?.data;
                    setHeadlines({ ...headlines, newsPaperName: data.newsPaperName, list: data.headlinesList })
                }).catch((error) => {
                    console.error("Error fetching data:", error);
                })
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false)
            }
        }
        if (newsName) {
            handleHeadlines(newsName);
        }

    }, [newsName])

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

    useEffect(() => {
        setNewsName({ ...newsName, activeField: "", filterBy: "" })
    }, [newsName.name])

    return (
        <section className="min-h-screen pt-20 max-w-7xl mx-auto text-lg flex flex-col items-center">
            {aiContentLoading &&
                <div className="fixed inset-0 backdrop-blur-sm flex flex-col gap-4 justify-center items-center z-[1000]">
                    Generating Summary with AI ...
                    <div role="status" className="flex items-center justify-center">
                        <svg aria-hidden="true" className="w-8 h-8 text-zinc-700 animate-spin fill-teal-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                </div>
            }
            <TabGroup className='w-full'>
                <TabList className="flex gap-4 justify-between">
                    {newspapers.map((news, index) => (
                        <Tab
                            key={index}
                            onClick={() => setNewsName({ ...newsName, name: news.name })}
                            className="rounded-full cursor-pointer transition duration-300 py-2 px-6 text-md font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            {news.name}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels className='flex'>
                    {newspapers.map(({ name }) => (
                        <TabPanel key={name} className='w-3/4 py-20'>

                            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto">
                                {loading ?
                                    Array(12).fill(null).map((_, index) => (
                                        <HeadlineCardSkeleton key={index} />
                                    ))
                                    :
                                    headlines && headlines.list && headlines.list.map((item, index) => (
                                        <div key={index} className="col-span-2 lg:col-span-1 group">
                                            <div
                                                className="flex py-4 flex-col sm:flex-row rounded-xl overflow-hidden border transition duration-300 group-hover:bg-zinc-900/30 border-zinc-700/60"
                                            >
                                                <div className="flex flex-col w-full px-4 py-4 sm:py-0">
                                                    <div className="flex justify-between">
                                                        <h3 className="text-[16px] whitespace-nowrap text-zinc-400">{headlines.newsPaperName}</h3>
                                                        <button onClick={() => analyzeWithAI(headlines.newsPaperName, item.headline, item.link)} data-tooltip-id={`my-tooltip-${index}`} type="button" className="cursor-pointer" >
                                                            <RiGeminiFill className="text-[#242424] group-hover:text-teal-500 transition duration-300" />
                                                        </button>
                                                        <ReactTooltip
                                                            id={`my-tooltip-${index}`}
                                                            place="top"
                                                            content="Generate Headline Summary with AI"
                                                            style={{ backgroundColor: "#3A3A3A", color: "#fff", borderRadius: "12px" }}
                                                        />
                                                    </div>
                                                    <p className="text-lg mt-4 font-semibold dark:text-gray-200">
                                                        {item.headline}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </TabPanel>
                    ))}
                    <div className="flex w-1/4 justify-end">
                        <div className="py-20 px-8 flex flex-col ">
                            <h3 className="text-white whitespace-nowrap">Select Category</h3>
                            <ul className="space-y-4 mt-6 text-[16px]">
                                {newspapers.filter((item) => item.name === newsName.name)[0].categories.map((category, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <button onClick={() => setNewsName({ ...newsName, activeField: category.field, filterBy: category.slug })} className={`${newsName.activeField === category.field ? "text-teal-500" : 'text-zinc-400'} hover:text-teal-500 cursor-pointer transition duration-300 capitalize`}>{category.field}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </TabPanels>
            </TabGroup>
        </section >
    )
}

export default Hero