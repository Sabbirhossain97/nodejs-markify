import React from 'react'
import { useLocation } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from 'react-router-dom';

function Summarize() {
    const location = useLocation();
    const data = location.state;

    console.log(data)

    return (
        <div className='min-h-screen max-w-7xl mx-auto flex flex-col pt-20 text-3xl text-zinc-400 w-full'>
            <Link to={"/"}>
                <button className='cursor-pointer w-[250px] inline-flex justify-center px-4 whitespace-nowrap items-center gap-2 transition duration-300 border hover:bg-zinc-900/30 text-zinc-300 border-zinc-700/60 rounded-md text-lg mb-10 py-2'>
                    <MdKeyboardBackspace />
                    Back to headlines
                </button>
            </Link>
            <div className='w-full'>
                <h1 className='text-2xl text-white'>News Paper Name</h1>
                <h3 className='text-xl mt-4 text-zinc-400'>{data.newsPaperName}</h3>
            </div>
            <div className='w-full pt-8'>
                <h1 className='text-2xl text-white'>Headline</h1>
                <h3 className='text-xl mt-4 text-zinc-400'>{data.newsHeadline}</h3>
            </div>
            <div className='w-full pt-8'>
                <h1 className='text-2xl text-white'>Article Summary</h1>
                <h3 className='text-xl mt-4 text-zinc-400'>{data.summarizedNews}</h3>
            </div>
        </div>
    )
}

export default Summarize