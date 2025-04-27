'use client';

import TopRanking from "./TopRanking";
import GrowthRanking from "./GrowthRanking";
import StreakRanking from "./StreakRanking";
import DateSelect from "../components/DateSelect";
export default function Ranking() {
    return (
        <div>
            <div className="flex gap-10">
                <DateSelect />
            </div>
            <div className="flex gap-10 h-full">
                <div className="w-1/2 h-full bg-white rounded-lg p-5">
                    <TopRanking />
                </div>
                <div className="w-1/2 flex flex-col gap-10">
                    <div className="h-full bg-white rounded-lg p-5">
                        <GrowthRanking />
                    </div>            
                    <div className="h-full bg-white rounded-lg p-5">
                        <StreakRanking />   
                    </div>
                </div>
            </div>
        </div>
    )
}