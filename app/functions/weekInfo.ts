const getWeekRange = (weekOffset = 0) => {
  const today = new Date();

  const utc = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()),
  );

  const day = utc.getUTCDay();
  const diffToMonday = (day === 0 ? -6 : 1) - day;

  const start = new Date(utc);
  start.setUTCDate(utc.getUTCDate() + diffToMonday + weekOffset * 7);

  const days: { date: string; label: string }[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);

    days.push({
      date: d.toISOString().slice(0, 10), // YYYY-MM-DD
      label: d.toLocaleDateString("en-US", { weekday: "short" }), // Mon
    });
  }

  const end = days[6].date;

  return {
    startDate: days[0].date,
    endDate: end,
    days,
  };
};
export default getWeekRange;
