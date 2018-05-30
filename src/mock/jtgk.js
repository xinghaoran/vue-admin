import Mock from 'mockjs'
// import {
//   param2Obj
// } from '@/utils'

Mock.Random.extend({
  yjpts: ['战斗舰艇', '辅助船'],
  yjpt: function(date) {
    return this.pick(this.yjpts)
  }
})

Mock.Random.extend({
  ejpts: ['航空母舰', '战列舰', '巡洋舰', '战列巡洋舰', '驱逐舰', '护卫舰', '鱼雷艇', '导弹艇', '猎潜艇', '潜艇救援舰', '布雷舰', '反水雷舰艇', '两栖登陆舰', '登陆舰'],
  ejpt: function(date) {
    return this.pick(this.ejpts)
  }
})

Mock.Random.extend({
  zdpiedata: [
    { value: 5, name: '航空母舰' },
    { value: 100, name: '战列舰' },
    { value: 150, name: '巡洋舰' },
    { value: 41, name: '战列巡洋舰' },
    { value: 41, name: '驱逐舰' },
    { value: 41, name: '护卫舰' },
    { value: 41, name: '导弹艇' },
    { value: 41, name: '猎潜艇' },
    { value: 32, name: '鱼雷艇' }
  ],
  zdjtpiedate: function(date) {
    return this.zdpiedata
  }
})

Mock.Random.extend({
  fzpiedata: [
    { value: 35, name: '潜艇救援舰' },
    { value: 35, name: '布雷舰' },
    { value: 35, name: '反水雷舰艇' },
    { value: 35, name: '两栖登陆舰' },
    { value: 44, name: '登陆舰' },
    { value: 23, name: '维修船' }
  ],
  fzjtpiedate: function(date) {
    return this.fzpiedata
  }
})

const List = []
const count = 20
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    yjpt: Mock.Random.yjpt(),
    ejpt: Mock.Random.ejpt(),
    jx: Mock.Random.cword(6, 12),
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
console.log(List)
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
    // console.log(config.body)
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
    const selectValue = data.query.selValList
    const paramEjpt = data.query.paramEjpt
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
      if (paramEjpt && item.ejpt !== paramEjpt) return false
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
      const jxlist = []
      for (let i = 0; i < List.length; i++) {
        const element = List[i]
        if (element.ejpt !== paramEjpt) {
          continue
        }
        if (jxlist.indexOf(element.jx) === -1) {
          jxlist.push(element.jx)
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
  },
  getZdjtPieData() {
    return {
      ZdPieData: Mock.Random.zdjtpiedate()
    }
  },
  getFzjtPieData() {
    return {
      FzPieData: Mock.Random.fzjtpiedate()
    }
  }
}
