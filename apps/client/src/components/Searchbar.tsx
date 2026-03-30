import { RiSearchLine } from "@remixicon/react";
import type { ChangeEvent } from "react";

type SearchBarProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {

    return (
        <div className="flex items-center w-[564px] h-[48px] bg-[#FFDEE6] rounded-2xl px-4 sticky">
  
            <RiSearchLine className="text-red-500 text-4xl " />

        <input
            placeholder="Rechercher un film..."
            type="text"
            value={value}
            onChange={onChange}
            className="bg-transparent outline-none flex-1 ml-3 text-black"
                />
  
        </div>

        
    )

}

export default SearchBar;