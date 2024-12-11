import { ClickAnalytics, ChartData, AnalyticsPeriod } from "@/types/analytics";
import { formatDate, formatMonth } from "@/lib/date-utils";

interface RawClickData {
  id: string;
  userId: string;
  visitorId: string | null;
  ipAddress: string | null;
  country: string | null;
  city: string | null;
  postalCode: string | null;
  device: string | null;
  browser: string | null;
  referer: string | null;
  visitAt: Date;
}

export function getPeriodDates(period: '7d' | '30d' | '12m'): AnalyticsPeriod {
  const endDate = new Date();
  const startDate = new Date();

  switch (period) {
    case '7d':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '30d':
      startDate.setDate(endDate.getDate() - 30);
      break;
    case '12m':
      startDate.setMonth(endDate.getMonth() - 12);
      break;
  }

  return { startDate, endDate };
}

export function processClicksData(clicks: RawClickData[], period: '7d' | '30d' | '12m'): ClickAnalytics {
  const { startDate, endDate } = getPeriodDates(period);
  
  // Filter clicks within the period
  const periodClicks = clicks?.filter(click => 
    click.visitAt && click.visitAt >= startDate && click.visitAt <= endDate
  );

  // Group clicks by date
  const clicksByDate = new Map<string, number>();
  
  periodClicks?.forEach(click => {
    if (!click.visitAt) return;
    
    const dateKey = click.visitAt.toISOString().split('T')[0];
    clicksByDate.set(dateKey, (clicksByDate.get(dateKey) || 0) + 1);
  });

  // Generate daily data
  const daily: ChartData[] = Array.from(clicksByDate.entries()).map(([date, clicks]) => ({
    date,
    clicks,
    formattedDate: formatDate(new Date(date))
  })).sort((a, b) => a.date.localeCompare(b.date));

  // Generate monthly data
  const monthlyClicks = new Map<string, number>();
  
  periodClicks?.forEach(click => {
    if (!click.visitAt) return;
    
    const monthKey = `${click.visitAt.getFullYear()}-${click.visitAt.getMonth() + 1}`;
    monthlyClicks.set(monthKey, (monthlyClicks.get(monthKey) || 0) + 1);
  });

  const monthly: ChartData[] = Array.from(monthlyClicks.entries()).map(([monthKey, clicks]) => {
    const [year, month] = monthKey.split('-').map(Number);
    const date = new Date(year, month - 1);
    return {
      date: date.toISOString(),
      clicks,
      formattedDate: formatMonth(date)
    };
  }).sort((a, b) => a.date.localeCompare(b.date));

  // Calculate previous period change
  const previousStartDate = new Date(startDate);
  previousStartDate.setDate(previousStartDate.getDate() - (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const previousPeriodClicks = clicks?.filter(click => 
    click.visitAt && click.visitAt >= previousStartDate && click.visitAt < startDate
  ).length;

  const currentPeriodClicks = periodClicks?.length;
  const previousPeriodChange = previousPeriodClicks === 0 
    ? 100 
    : ((currentPeriodClicks - previousPeriodClicks) / previousPeriodClicks) * 100;

  return {
    daily,
    monthly,
    total: currentPeriodClicks,
    previousPeriodChange
  };
}