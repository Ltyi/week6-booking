import axios from 'axios'

const rooms = axios.create({
  baseURL: 'https://challenge.thef2e.com/api/',
  headers: {
    common: {
      Authorization: 'Bearer ynuqy6aiGyk5CDXGbpdrrlfGPf4Q5Py83rQotW6hhSlj41G41XMKdNXhwB8g'
    }
  }
})

// [GET] 取得所有房型
export const getRooms = () => rooms.get('/thef2e2019/stage6/rooms')

// [GET] 單一房型細節
export const getRoomDetails = id => rooms.get(`/thef2e2019/stage6/room/${id}`)

// [POST] 預約房型
export const postBooking = (id, payload) =>
  rooms.post(`thef2e2019/stage6/room/${id}`, payload)
