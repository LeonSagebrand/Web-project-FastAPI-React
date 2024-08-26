import React, { useContext, useEffect, useState } from "react";
import SearchStock from "./SearchStock";
import HeaderStock from "./HeaderStock";
import { mockCompanyDetails } from "../constants/mock";
import StockDetails from "./StockDetails";
import StockOverview from "./StockOverview";
import { Chart } from "react-chartjs-2";
import StockChart from "./StockChart";

const Stockdash = () => {
    return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10">
        <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
            <HeaderStock name={mockCompanyDetails.name}/>
            </div>
            <div>
            <div className="md:col-span-2 row-span-4"></div>
            <StockChart />
            </div>
            <div>
            <StockOverview symbol={mockCompanyDetails.ticker} 
            price={300} 
            change={30}
            changePercent={10.0}
            currency={"USD"}
            />
            <div className="row-span-2 xl:row-span-3">
                <StockDetails details={mockCompanyDetails}/>

    </div></div></div>
    );
};

export default Stockdash;

