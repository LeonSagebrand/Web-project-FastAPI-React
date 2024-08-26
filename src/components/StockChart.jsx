import React, { useState } from "react";
import { mockHistoricalData } from "../constants/mock";
import { convertUnixTimeToDate } from "../helpers/date-helper";
import Card from "./Card";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Tooltip,
} from "recharts";
import StockChartFilter from "./StockChartFilter";
import { chartConfig } from "../constants/config"; // Assuming you have a config file

const StockChart = () => {
  const [data, setData] = useState(mockHistoricalData);
  const [filter, setFilter] = useState("1W");

  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimeToDate(data.t[index]),
      };
    });
  };

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <StockChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item);
              }}
            />
          </li>
        ))}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={formatData(data)}>
          <defs>
            <linearGradient id="stockChartColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(199 210 254)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgb(199 210 254)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="grey"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#stockChartColor)"
          />
          <Tooltip />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default StockChart;
