'use client';

import TopRanking from "./TopRanking";
import GrowthRanking from "./GrowthRanking";
import StreakRanking from "./StreakRanking";

export default function Ranking() {
    return (
        <div className="flex gap-10 h-full">
            <div className="w-1/2 h-full bg-white rounded-lg p-5">
                <TopRanking />
            </div>
            <div className="w-1/2 flex flex-col gap-10">
                <div className="h-full bg-white rounded-lg">
                    <GrowthRanking />
                </div>            
                <div className="h-full bg-white rounded-lg">
                    <StreakRanking />   
                </div>
            </div>
        </div>
    )
}