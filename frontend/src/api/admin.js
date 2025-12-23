import api from './api'

export function seed(){
  return api.post('/admin/seed')
}

export function health(){
  return api.get('/admin/health')
}
