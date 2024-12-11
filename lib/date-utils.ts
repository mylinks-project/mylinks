export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  }
  
  export function formatMonth(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
  
  export function getLastNMonths(n: number): Date[] {
    const today = new Date();
    const months: Date[] = [];
    
    for (let i = 0; i < n; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(date);
    }
    
    return months.reverse();
  }