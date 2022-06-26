import axios from 'axios'

export default axios.create({
  // baseURL: "http://127.0.0.1:8000/api"
  // baseURL: "http://localhost/api/public/api"
  // baseURL: "http://rabies.padangpariamankab.go.id/api/public/api"
  baseURL: "http://localhost/stok_obat/data/obat"
})
