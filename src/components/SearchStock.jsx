import React, { useState } from "react";
import { XIcon, SearchIcon } from "@heroicons/react/solid";
import SearchStockResults from "./SearchStockResults";
import { searchSymbols } from "../api/stock-api";

const SearchStock = () => {
    const [input, setInput] = useState("");
    const [bestMatches, setBestMatches] = useState([]);

    const clear = () => {
        setInput("");
        setBestMatches([]);
    };

    const updateBestMatches = async () => { 
        try {
            if (input) {
                const searchResults = await searchSymbols(input);
                const result = searchResults.result;
                setBestMatches(result);
            }
        } catch(error) {
            setBestMatches([]);
            console.log(error);
        }
    };


    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            updateBestMatches();
        }
    };

    return (
        <div className="flex items-center my-4 border-2 rounded-md relative z-50 w-96 bg-white border-neutral-200"> 
            <input 
                type="text"
                value={input}
                className="w-full px-4 py-2 focus:outline-none rounded-md"
                placeholder="Search stock..."
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            {input && <button onClick={clear} className="m-1">
                <XIcon className="h-4 w-4 fill-gray-500" />
            </button>}

            <button onClick={updateBestMatches} className="h-8 w-8 bg-gray-800 rounded-md flex justify-center items-center m-1 p-2 ">
                <SearchIcon className="h-4 w-4 fill-gray-100"/>
            </button>

            {input && bestMatches.length > 0 ? <SearchStockResults results={bestMatches} /> : null  }
        </div>
    );
};

export default SearchStock;
