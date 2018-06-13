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

export function getWxOverView_Api(treeText, treeType) {
  const data = {
    treeType,
    treeText
  }
  return request({
    url: '/jtwx/GetWxTable',
    method: 'post',
    data
  })
}

export function getWxCount_Api(treeText, treeType) {
  const data = {
    treeType,
    treeText
  }
  return request({
    url: '/jtwx/GetWxCountPie',
    method: 'post',
    data
  })
}

export function getWxFunds_Api(treeText, treeType) {
  const data = {
    treeType,
    treeText
  }
  return request({
    url: '/jtwx/GetWxFundsPie',
    method: 'post',
    data
  })
}

export function GetWxYearCountDnzx_Api(treeText, treeType) {
  const data = {
    treeType,
    treeText
  }
  return request({
    url: '/jtwx/GetWxYearCountDnzxBar',
    method: 'post',
    data
  })
}
export function GetWxYearCountDnjc_Api(treeText, treeType) {
  const data = {
    treeType,
    treeText
  }
  return request({
    url: '/jtwx/GetWxYearCountDnjcBar',
    method: 'post',
    data
  })
}
export function GetWxYearCountSnzj_Api(treeText, treeType) {
  const data = {
    treeType,
    treeText
  }
  return request({
    url: '/jtwx/GetWxYearCountSnzjBar',
    method: 'post',
    data
  })
}
export function GetWxYearCountDnwg_Api(treeText, treeType) {
  const data = {
    treeType,
    treeText
  }
  return request({
    url: '/jtwx/GetWxYearCountDnwgBar',
    method: 'post',
    data
  })
}
export function GetJtWxList_Api(query) {
  const data = {
    query
  }
  return request({
    url: '/jtwx/GetJtWxList',
    method: 'post',
    data
  })
}
export function Test_Api(query) {
  const data = {
    query
  }
  return request({
    url: '/Upload/Index',
    method: 'post',
    data
  })
}
