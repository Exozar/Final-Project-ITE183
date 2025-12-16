const SearchFilters = () => {
    return (
        <div className="h-[48px] lg:h-[64px] flex flex-row items-center justify-between border border-gray-300 rounded-full">
            <div className="hidden lg:block">
                <div className="flex flex-row items-center justify-between">
                    <div className="cursor-pointer w-[250px] h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Where</p>
                        <p className="text-xs ">Wanted location</p>
                    </div>
                    <div className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Check in</p>
                        <p className="text-xs ">Add dates</p>
                    </div>
                    <div className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Check out</p>
                        <p className="text-xs ">Add dates</p>
                    </div>
                    <div className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Who</p>
                        <p className="text-xs ">Add guests</p>
                    </div>
                </div>
            </div>
            <div className="p-2">
                <div className="cursor-pointer p-2 lg:p-4 bg-[#ff385c] hover:bg-[#d50027] rounded-full text-white transition-colors duration-200">
                    <svg
                        viewBox="0 0 32 32"
                        style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 3, overflow: 'visible' }}
                        aria-hidden="true" role="presentation" focusable="false"
                    >
                        <path d="m13 24c6.075 0 11-4.925 11-11 0-6.075-4.925-11-11-11s-11 4.925-11 11 4.925 11 11 11zm8-3 9 9"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}
export default SearchFilters;
