'use client';

import React, { useEffect, useState } from 'react'
import { BarChart3, Link } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileVisitsChart } from './Visits-Charts';
import { processClicksData } from '@/lib/analytics';
import { ClickAnalytics } from "@/types/analytics";
import { ProfileVisit } from '@prisma/client';

export type DashboardProps = {
    chartData:ProfileVisit[];
    urlData: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ chartData, urlData }) => {
    const [timeframe, setTimeframe] = useState<'7d' | '30d' | '12m'>('7d');
    const [analytics, setAnalytics] = useState<ClickAnalytics | null>(null);

    useEffect(() => {
        const processedData = processClicksData(chartData, timeframe);
        setAnalytics(processedData);
    }, [chartData, timeframe]);

    return (
        <div>
            <div className="container mx-auto p-6 space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total URLs</CardTitle>
                            <Link className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{urlData}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Profile Visits</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {chartData.length}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <ProfileVisitsChart
                        data={timeframe === '12m' ? analytics?.monthly : analytics?.daily}
                        timeframe={timeframe}
                        onTimeframeChange={setTimeframe}
                    />
                </div>
            </div>
        </div>
    )
}