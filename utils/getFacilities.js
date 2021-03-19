export function getFacilities(amenities) {
  const {
    'Air-Conditioner': ac,
    Breakfast: breakfast,
    'Child-Friendly': childFriendly,
    'Great-View': view,
    'Mini-Bar': minibar,
    'Pet-Friendly': pet,
    Refrigerator: freezer,
    'Room-Service': roomservice,
    'Smoke-Free': smoke,
    Sofa: sofa,
    'Wi-Fi': wifi
  } = amenities

  const facilities = {
    ac,
    breakfast,
    childFriendly,
    view,
    minibar,
    pet,
    freezer,
    roomservice,
    smoke,
    sofa,
    wifi
  }

  return facilities
}
