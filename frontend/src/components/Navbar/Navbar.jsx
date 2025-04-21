import { useState } from 'react'
import { CloseIcon, MenuIcon } from '../SVG'

function Navbar() {

    const [openMenuIcon, setOpenMenuIcon] = useState(false);

    return (
        <nav className="mx-auto h-16 max-w-7xl">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center justify-between w-full">
                    <div className='flex items-center gap-4'>
                        <h1 className="font-montserrat leading-[58px] text-zinc-500 flex font-bold whitespace-nowrap tracking-[1px] text-xl">
                            Marki<span className='font-bold text-sky-400'>fy</span>
                        </h1>
                    </div>
                    <div className="xl:hidden">
                        {openMenuIcon ? (
                            <CloseIcon setOpenMenuIcon={setOpenMenuIcon} />
                        ) : (
                            <MenuIcon setOpenMenuIcon={setOpenMenuIcon} />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar