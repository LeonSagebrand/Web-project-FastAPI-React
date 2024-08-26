import React, { useContext } from "react";
import StockContext from "../context/StockContext";

const SearchStockResults = ({ results }) => {
    const { setStockSymbol } = useContext(StockContext);

    const handleClick = (symbol) => {
        setStockSymbol(symbol);
    };

    return (
        <ul className="absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-white border-neutral-200 custom-scrollbar">
            {results.map((item) => (
                <li key={item.symbol} className="cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-gray-200" onClick={() => handleClick(item.symbol)}>
                    <span>{item.symbol}</span>
                    <span>{item.description}</span>
                </li>
            ))}
        </ul>
    );
};

export default SearchStockResults;
