import request from '@/utils/request'

export function addDocumentInfo(docinfo) {
  const data = docinfo
  return request({
    url: '/Upload/AddDocInfo',
    method: 'post',
    data
  })
}

export function updateDocumentInfo(docinfo) {
  const data = docinfo
  return request({
    url: '/Upload/UpdateDocInfo',
    method: 'post',
    data
  })
}

export function getFileList(id) {
  const data = {
    id
  }
  return request({
    url: '/Upload/GetFileList',
    method: 'post',
    data
  })
}

export function getDocInfoList(query) {
  const data = query
  return request({
    url: '/Upload/GetDocInfoList',
    method: 'post',
    data
  })
}

export function outPutFile(file_number) {
  const data = {
    file_number
  }
  return request({
    url: '/Upload/OutPutFile',
    method: 'post',
    data
  })
}

export function delFile(file_number) {
  const data = {
    file_number
  }
  return request({
    url: '/Upload/DelFile',
    method: 'post',
    data
  })
}

export function delDocument(id) {
  const data = {
    id
  }
  return request({
    url: '/Upload/DelDocument',
    method: 'post',
    data
  })
}
