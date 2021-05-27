export const dateModule = (repo, fullDate, today, todayYear) => {

  //Date logic

  //Variable for date object of repo's date of last update
  fullDate = new Date(repo.node.updatedAt);

  //Variables for date of the month (int), month (int, changes to string)
  let date = fullDate.getDate();
  let dateMonth = fullDate.getMonth();
  let monthsArray = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  dateMonth = monthsArray[dateMonth];

  //Sets year if not this year
  let fullYear = fullDate.getFullYear() === todayYear ? '' : fullDate.getFullYear();

  //If updated today, set hours ago or minutes ago
  let minutesOrHours = (fullDate.getTime() - today.getTime())/1000 >= 1 ? `${(fullDate.getTime() - today.getTime())} mins` : 'Just now';
  minutesOrHours = (fullDate.getTime() - today.getTime())/3600000 >= 1 ? `${(fullDate.getTime() - today.getTime())} hours` : minutesOrHours;

  //Sets days ago if this month
  let daysAgo =  `${(today.getDate() - date)} days ago`;

  //Sets date
  let finalDate = fullDate === today ? minutesOrHours : dateMonth === today.getMonth ? daysAgo : `${date} ${dateMonth} ${fullYear}`;

  return finalDate;
}