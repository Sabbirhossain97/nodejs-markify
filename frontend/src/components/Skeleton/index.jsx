import React from 'react'

export const HeadlineCardSkeleton = () => {
    return (
        <div className="col-span-2 lg:col-span-1 group animate-pulse">
            <div
                className="flex py-4 flex-col sm:flex-row rounded-xl overflow-hidden border transition duration-300 group-hover:bg-zinc-900/30 border-zinc-700/60"
            >
                <div className="flex flex-col w-full px-4 py-4 sm:py-0">
                    <div className="flex justify-between">
                        <h3 className="text-[16px] whitespace-nowrap bg-zinc-700/80 h-4 w-32 rounded-md"></h3>
                        <button type="button" className="cursor-pointer h-5 w-5 rounded-full bg-zinc-700/80" >
                            
                        </button>
                    </div>
                    <p className="text-lg mt-4 font-semibold bg-zinc-700/80 h-5 w-full rounded-md"></p>
                    <p className="text-lg mt-4 font-semibold bg-zinc-700/80 h-5 w-44 rounded-md"></p>
                </div>
            </div>
        </div>
    )

}