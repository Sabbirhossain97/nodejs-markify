import React from 'react'
import { useLocation } from 'react-router-dom';

function Summarize() {
    const location = useLocation();
    const data = location.state;
    return (
        <div className='min-h-screen max-w-7xl mx-auto flex flex-col pt-20 text-3xl text-zinc-400 w-full'>
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