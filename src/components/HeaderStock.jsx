import React from "react";
import { mockCompanyDetails } from "../constants/mock";
import SearchStock from "./SearchStock";


const HeaderStock = ({ name }) => {
    return (<>
        <div className="xl:px-32">
            <h1 className="text5-xl">{mockCompanyDetails.name}</h1>
            <SearchStock />
        </div>
        </>
);
};

export default HeaderStock;
