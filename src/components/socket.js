import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false,
})

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === 'production'
    ? undefined
    : 'http://192.168.137.1:5000'
// const URL =
//   process.env.NODE_ENV === 'production'
//     ? undefined
//     : 'http://192.168.134.1:5000'

// const URL =
//   process.env.NODE_ENV === 'production'
//     ? undefined
//     : 'http://192.168.134.1:5173'

export const socket = io(URL)

// socket.on('connect', () => {
//   state.connected = true
//   console.log('connect server...')
// })

// socket.on('disconnect', () => {
//   state.connected = false
//   console.log('disconnect...')
// })

// socket.on('message', (data) => {
//   console.log(data)
// })

// socket.on('jhx', (data) => {
//   console.log(data)
//   socket.emit('sendata', 'hello')
// })
