"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { ChartData } from "@/types/analytics";

interface ClicksChartProps {
  data?: ChartData[];
  timeframe: '7d' | '30d' | '12m';
  onTimeframeChange: (timeframe: '7d' | '30d' | '12m') => void;
}

export function ProfileVisitsChart({ data, timeframe, onTimeframeChange }: ClicksChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Profile Visits Overview</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={timeframe === '7d' ? "default" : "outline"}
            size="sm"
            onClick={() => onTimeframeChange('7d')}
          >
            7D
          </Button>
          <Button
            variant={timeframe === '30d' ? "default" : "outline"}
            size="sm"
            onClick={() => onTimeframeChange('30d')}
          >
            30D
          </Button>
          <Button
            variant={timeframe === '12m' ? "default" : "outline"}
            size="sm"
            onClick={() => onTimeframeChange('12m')}
          >
            12M
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          {data && data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="formattedDate"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value.toLocaleString()}`}
                />
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Visits
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].value?.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorClicks)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">No data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}