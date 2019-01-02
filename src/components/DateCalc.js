import moment from 'moment';

const DateCalc = (start_date, end_date) => {
  const a = moment(end_date);
  const b = moment(start_date);  
  const years = a.diff(b, 'years');
  let months = '';
  let results = '';
  if(years === 0) {
    months = a.diff(b, 'months');
  }
  if (months) {
    results = months + ' months';
  } else {
    results = years + ' years';
  }
  // console.log('years, months', years, months);
  return results;
};

export default DateCalc;