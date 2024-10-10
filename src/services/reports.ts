import { getData } from './api';

export function generateCSV(data: any[]): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  let csvContent = headers.join(',') + '\n';

  for (const row of data) {
    const values = headers.map(header => {
      const cellValue = row[header] ?? '';
      return typeof cellValue === 'string' && cellValue.includes(',') 
        ? `"${cellValue}"` 
        : cellValue;
    });
    csvContent += values.join(',') + '\n';
  }

  return csvContent;
}

export function downloadCSV(content: string, fileName: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}