import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export function getAmount(range, roomInfo) {
  const { normalDayPrice, holidayPrice } = roomInfo

  if (dayjs(range[0]).isAfter(range[1])) {
    range.reverse()
  }

  const [start, end] = range
  const nights = dayjs(end).diff(dayjs(start), 'day')
  const days = [...Array(nights).keys()].map(num => dayjs(start).add(num, 'day').day())

  const counter = { normalDays: 0 }

  days.forEach(day => {
    const isNormalDal = day > 0 && day < 5

    if (isNormalDal) {
      counter.normalDays += 1
    }
  })

  const { normalDays } = counter

  const result = {
    nights,
    normalDays,
    amount: normalDayPrice * normalDays + (nights - normalDays) * holidayPrice
  }

  return result
}
