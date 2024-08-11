export function getHowManyMonth(startDate: Date, endDate: Date){
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diff = end.getTime() - start.getTime()
  const diffInMonth = diff / (1000 * 60 * 60 * 24 * 30)
  return diffInMonth
}