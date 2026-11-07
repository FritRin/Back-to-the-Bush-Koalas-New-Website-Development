import { useState, useEffect } from "react";   
import { getAllKoalas } from "../../services/koalaService";

import StatisticCard from "./StatisticDisplay";

function TotalKoalas() {
    const [totalKoalas, setTotalKoalas] = useState(null);
    useEffect(() => {
        async function fetchKoalas() {
            try {
                const data = await getAllKoalas();
                setTotalKoalas(data.count);
            } catch (error) {
                console.error("Error fetching koalas:", error);
            }
        }
        fetchKoalas();
    }, []);

    return (
        <StatisticCard 
            title="Total Koalas"
            value={totalKoalas !== null ? totalKoalas : "Loading..."} 
        />
    );
}

export default TotalKoalas;
