import { RiSearchLine } from "@remixicon/react";
const SearchBar = () => {

    return (
        <div className="flex items-center w-[564px] h-[48px] bg-[#FFDEE6] rounded-2xl px-4 sticky">
  
            <RiSearchLine className="text-red-500 text-4xl " />

        <input
            placeholder="Rechercher un film..."
            type="text"
            className="bg-transparent outline-none flex-1 ml-3 text-black"
                />
  
        </div>

        
    )

}

export default SearchBar;