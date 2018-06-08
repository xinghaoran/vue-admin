import request from '@/utils/request'

export function getZdTree() {
  return request({
    url: '/jtwx/zdtree',
    method: 'post'
  })
}

export function getFzTree() {
  return request({
    url: '/jtwx/fztree',
    method: 'post'
  })
}

export function getDwTree() {
  return request({
    url: '/jtwx/dwtree',
    method: 'post'
  })
}
