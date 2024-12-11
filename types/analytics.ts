export interface ClickData {
    date: string;
    clicks: number;
  }
  
  export interface MonthlyStats {
    month: string;
    year: number;
    totalClicks: number;
  }
  
  export interface ChartData extends ClickData {
    formattedDate: string;
  }
  
  export interface AnalyticsPeriod {
    startDate: Date;
    endDate: Date;
  }
  
  export interface ClickAnalytics {
    daily: ChartData[];
    monthly: ChartData[];
    total: number;
    previousPeriodChange: number;
  }