/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-03 10:01:04
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-03 10:09:42
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'user/logout',
    method: 'post'
  })
}
