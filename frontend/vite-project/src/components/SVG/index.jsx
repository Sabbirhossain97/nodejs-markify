export const CloseIcon = ({ setOpenMenuIcon }) => {
    return (
        <svg
            onClick={() => setOpenMenuIcon(false)}
            xmlns="http://www.w3.org/2000/svg"
            color="black"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 sm:w-10 h-12 sm:h-10 cursor-pointer text-white hover:text-gray-200 transition duration-300"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    )
}

export const MenuIcon = ({ setOpenMenuIcon }) => {
    return (
        <svg
            onClick={() => setOpenMenuIcon(true)}
            className="cursor-pointer hover:text-[#ff8b32f3] transition duration-300 block w-12 sm:w-10 h-12 sm:h-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
        </svg>
    )
}