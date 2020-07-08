import moment from 'moment'

function toUTC(date) {
  return moment(date, 'MM/DD/YYYY HH:mm').toISOString()
}

function getTimezoneOffset() {
  return new Date().getTimezoneOffset()
}

export { toUTC, getTimezoneOffset }
