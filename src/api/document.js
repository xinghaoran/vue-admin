import request from '@/utils/request'

export function addDocumentInfo(docinfo) {
  const data = docinfo
  return request({
    url: '/Doc/AddDocInfo',
    method: 'post',
    data
  })
}

export function updateDocumentInfo(docinfo) {
  const data = docinfo
  return request({
    url: '/Doc/UpdateDocInfo',
    method: 'post',
    data
  })
}

export function getFileList(id) {
  const data = {
    id
  }
  return request({
    url: '/Doc/GetFileList',
    method: 'post',
    data
  })
}

export function getDocInfoList(query) {
  const data = query
  return request({
    url: '/Doc/GetDocInfoList',
    method: 'post',
    data
  })
}

export function outPutFile(file_number) {
  const data = {
    file_number
  }
  return request({
    url: '/Doc/OutPutFile',
    method: 'post',
    data
  })
}

export function delFile(file_number) {
  const data = {
    file_number
  }
  return request({
    url: '/Doc/DelFile',
    method: 'post',
    data
  })
}

export function delDocument(id) {
  const data = {
    id
  }
  return request({
    url: '/Doc/DelDocument',
    method: 'post',
    data
  })
}
