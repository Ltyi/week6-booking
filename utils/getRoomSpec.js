export function getRoomSpec(amenities, descriptionShort) {
  const { Breakfast } = amenities
  const { GuestMin, GuestMax, Bed, Footage, 'Private-Bath': Bath } = descriptionShort

  const guest = GuestMin === GuestMax ? GuestMax : `${GuestMin} ~ ${GuestMax}`
  const breakfast = Breakfast ? '附早餐' : ''
  const beds = Bed.map(ele => {
    switch (ele) {
      case 'Single':
        ele = '單人床'
        break
      case 'Double':
        ele = '雙人床'
        break
      case 'Queen':
        ele = '加大雙人床'
        break
      case 'Small Double':
        ele = '小雙人床'
        break
    }

    return ele
  })

  return `${guest}人・${beds[0]}・${breakfast}・衛浴${Bath}間・${Footage}平方公尺`
}
