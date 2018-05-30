import Mock from 'mockjs'
// import {
//   param2Obj
// } from '@/utils'

const List = []
const count = 15

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    yjpt: Mock.Random.cword(3, 4),
    ejpt: Mock.Random.cword(3, 4),
    jx: Mock.Random.cword(5, 12),
    sszj: i, // Mock.Random.integer(10, 60),
    zhl: Mock.Random.float(0, 100),
    zxs: Mock.Random.integer(10, 60),
    zxzxs: Mock.Random.integer(10, 60),
    xxzxs: Mock.Random.integer(10, 60),
    wxzxs: Mock.Random.integer(10, 60),
    hxzxs: Mock.Random.integer(10, 60),
    wjzxs: Mock.Random.integer(10, 60),
    dnjf: Mock.Random.float(5000, 20000)
  }))
}

const InfoTable = [{
  infotext: '现役舰船数：',
  infovalue: Mock.Random.integer(100, 260)
},
{
  infotext: '总吨位：',
  infovalue: Mock.Random.float(5000, 100000, 2, 2)
},
{
  infotext: '在修舰船数：',
  infovalue: Mock.Random.integer(100, 260)
},
{
  infotext: '在航舰船数：',
  infovalue: Mock.Random.integer(100, 260)
},
{
  infotext: '在航率：',
  infovalue: Mock.Random.float(50, 100, 2, 2) + '%'
},
{
  infotext: '当年修理经费：',
  infovalue: Mock.Random.float(5000, 20000, 2, 2)
}
]

export default {
  getList: (config) => {
    const data = JSON.parse(config.body)

    const yjpt = data.query.yjpt
    const ejpt = data.query.ejpt
    const jx = data.query.jx
    const sszj = data.query.sszj
    const zhl = data.query.zhl
    const zxs = data.query.zxs
    const zxzxs = data.query.zxzxs
    const xxzxs = data.query.xxzxs
    const wxzxs = data.query.wxzxs
    const hxzxs = data.query.hxzxs
    const wjzxs = data.query.wjzxs
    const dnjf = data.query.dnjf
    const page = data.query.page
    const limit = data.query.limit
    const sort_field = data.query.sort_field
    const sort_type = data.query.sort_type
    const selectValue = data.selectValue
    // 筛选
    let mockList = []
    if (!selectValue || selectValue.length === 0) {
      mockList = List
    } else {
      for (let i = 0; i < selectValue.length; i++) {
        List.forEach(element => {
          if (element.jx === selectValue[i]) {
            mockList.push(element)
          }
        })
      }
    }

    // 查询
    mockList = mockList.filter(item => {
      if (yjpt && item.yjpt.indexOf(yjpt) < 0) return false
      if (ejpt && item.ejpt.indexOf(ejpt) < 0) return false
      if (jx && item.jx.indexOf(jx) < 0) return false
      if (sszj && item.sszj.indexOf(sszj) < 0) return false
      if (zhl && item.zhl.indexOf(zhl) < 0) return false
      if (zxs && item.zxs.indexOf(zxs) < 0) return false
      if (zxzxs && item.zxzxs.indexOf(zxzxs) < 0) return false
      if (xxzxs && item.xxzxs.indexOf(xxzxs) < 0) return false
      if (wxzxs && item.wxzxs.indexOf(wxzxs) < 0) return false
      if (hxzxs && item.hxzxs.indexOf(hxzxs) < 0) return false
      if (wjzxs && item.wjzxs.indexOf(wjzxs) < 0) return false
      if (dnjf && item.dnjf.indexOf(dnjf) < 0) return false
      return true
    })

    // 排序
    const compare_jx = function(obj1, obj2) {
      var val1 = obj1.jx
      var val2 = obj2.jx
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
    const compare_sszj = function(obj1, obj2) {
      var val1 = obj1.sszj
      var val2 = obj2.sszj
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
    const compare_zhl = function(obj1, obj2) {
      var val1 = obj1.zhl
      var val2 = obj2.zhl
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
    const compare_zxs = function(obj1, obj2) {
      var val1 = obj1.zxs
      var val2 = obj2.zxs
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
    const compare_zxzxs = function(obj1, obj2) {
      var val1 = obj1.zxzxs
      var val2 = obj2.zxzxs
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
    const compare_xxzxs = function(obj1, obj2) {
      var val1 = obj1.xxzxs
      var val2 = obj2.xxzxs
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
    const compare_wxzxs = function(obj1, obj2) {
      var val1 = obj1.wxzxs
      var val2 = obj2.wxzxs
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
    const compare_hxzxs = function(obj1, obj2) {
      var val1 = obj1.hxzxs
      var val2 = obj2.hxzxs
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
    const compare_wjzxs = function(obj1, obj2) {
      var val1 = obj1.wjzxs
      var val2 = obj2.wjzxs
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
    const compare_dnjf = function(obj1, obj2) {
      var val1 = obj1.dnjf
      var val2 = obj2.dnjf
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
    switch (sort_field) {
      case 'jx':
        mockList = mockList.sort(compare_jx)
        break
      case 'sszj':
        mockList = mockList.sort(compare_sszj)
        break
      case 'zhl':
        mockList = mockList.sort(compare_zhl)
        break
      case 'zxs':
        mockList = mockList.sort(compare_zxs)
        break
      case 'zxzxs':
        mockList = mockList.sort(compare_zxzxs)
        break
      case 'xxzxs':
        mockList = mockList.sort(compare_xxzxs)
        break
      case 'wxzxs':
        mockList = mockList.sort(compare_wxzxs)
        break
      case 'hxzxs':
        mockList = mockList.sort(compare_hxzxs)
        break
      case 'wjzxs':
        mockList = mockList.sort(compare_wjzxs)
        break
      case 'dnjf':
        mockList = mockList.sort(compare_dnjf)
        break
      default:
        break
    }
    if (sort_type === 'descending') {
      mockList = mockList.reverse()
    }

    // 筛选项
    const filterList = () => {
      const list = []
      for (let i = 0; i < List.length; i++) {
        const element = List[i]
        if (list.indexOf(element.jx) === -1) {
          list.push({
            text: element.jx,
            value: element.jx
          })
        }
      }
      return list
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      filterList: filterList(),
      items: pageList
    }
  },
  getOverViewInfoTable() {
    return {
      infotable: InfoTable,
      zdjtzs: Mock.Random.integer(80, 200),
      fzjtzs: Mock.Random.integer(100, 300)
    }
  }
}
