export const formatDate = (date: string | number | Date) => {
  const newDate = new Date(date)

  if (Date.now() - newDate.getTime() < 1000 * 60 * 60 * 24) {
    return newDate.toLocaleString(undefined, {
      timeStyle: "short",
    })
  }
  return newDate.toLocaleString(undefined, {
    dateStyle: "short",
    // timeStyle: "short",
  })
}
