import Mock from 'mockjs'

export default {
  getZdTreeData() {
    return [{
      id: 1,
      label: '战斗舰艇',
      type: 'jtzl1',
      children: [{
        id: 4,
        label: '驱逐舰',
        type: 'jtzl2',
        children: [{
          id: 9,
          label: '驱001',
          type: 'jx'
        },
        {
          id: 10,
          label: '驱002',
          type: 'jx'
        }
        ]
      },
      {
        id: 2,
        label: '护卫舰',
        type: 'jtzl2',
        children: [{
          id: 5,
          label: '护001',
          type: 'jx'
        },
        {
          id: 6,
          label: '护002',
          type: 'jx'
        }
        ]
      }
      ]
    }]
  },
  getFzTreeData() {
    return [{
      id: 1,
      label: '辅助',
      children: [{
        id: 4,
        label: 'Level two 1-1',
        children: [{
          id: 9,
          label: 'Level three 1-1-1'
        },
        {
          id: 10,
          label: 'Level three 1-1-2'
        }
        ]
      }]
    },
    {
      id: 2,
      label: 'Level one 2',
      children: [{
        id: 5,
        label: 'Level two 2-1'
      },
      {
        id: 6,
        label: 'Level two 2-2'
      }
      ]
    },
    {
      id: 3,
      label: 'Level one 3',
      children: [{
        id: 7,
        label: 'Level two 3-1'
      },
      {
        id: 8,
        label: 'Level two 3-2'
      }
      ]
    }
    ]
  },
  getDwTreeData() {
    return [{
      id: 1,
      label: '单位',
      children: [{
        id: 4,
        label: 'Level two 1-1',
        children: [{
          id: 9,
          label: 'Level three 1-1-1'
        },
        {
          id: 10,
          label: 'Level three 1-1-2'
        }
        ]
      }]
    },
    {
      id: 2,
      label: 'Level one 2',
      children: [{
        id: 5,
        label: 'Level two 2-1'
      },
      {
        id: 6,
        label: 'Level two 2-2'
      }
      ]
    },
    {
      id: 3,
      label: 'Level one 3',
      children: [{
        id: 7,
        label: 'Level two 3-1'
      },
      {
        id: 8,
        label: 'Level two 3-2'
      }
      ]
    }
    ]
  },
  getWxOverView_Mock(config) {
    const data = JSON.parse(config.body)
    const wxxxgk = [{
      infotext: '统计单位：',
      // infovalue: Mock.Random.cword(3, 6)
      // infovalue: Mock.mock('@cword(3, 5)')
      infovalue: data.treeText
    },
    {
      infotext: '舰艇总数：',
      // infovalue: Mock.Random.integer(200, 500)
      infovalue: Mock.mock('@integer(200, 500)')
    },
    {
      infotext: '维修次数：',
      infovalue: Mock.Random.integer(100, 260)
    },
    {
      infotext: '维修费用：',
      infovalue: Mock.Random.float(5000, 20000, 2, 2)
    },
    {
      infotext: '总吨位：',
      infovalue: Mock.Random.float(5000, 20000, 2, 2)
    },
    {
      infotext: '在航率：',
      infovalue: Mock.Random.float(50, 100, 2, 2) + '%'
    }
    ]
    return {
      wxxxgk: wxxxgk,
      jtwxcs: Mock.Random.integer(80, 200),
      jtwxjf: Mock.Random.float(5000, 20000, 2, 2)
    }
  },
  getWxCount_Mock(config) {
    // const data = JSON.parse(config.body)
    // console.log(data)
    const wxcs = [{
      name: '中修',
      value: Mock.mock('@integer(30, 100)')
    },
    {
      name: '小修',
      value: Mock.mock('@integer(30, 100)')
    },
    {
      name: '坞修',
      value: Mock.mock('@integer(30, 100)')
    },
    {
      name: '坞检',
      value: Mock.mock('@integer(30, 100)')
    },
    {
      name: '航修',
      value: Mock.mock('@integer(30, 100)')
    }
    ]
    return wxcs
  },
  getWxFunds_Mock(config) {
    // const data = JSON.parse(config.body)
    // console.log(data)
    const wxjf = [{
      name: '中修',
      value: Mock.mock('@float(1000, 5000, 2, 2)')
    },
    {
      name: '小修',
      value: Mock.mock('@float(1000, 5000, 2, 2)')
    },
    {
      name: '坞修',
      value: Mock.mock('@float(1000, 5000, 2, 2)')
    },
    {
      name: '坞检',
      value: Mock.mock('@float(1000, 5000, 2, 2)')
    },
    {
      name: '航修',
      value: Mock.mock('@float(1000, 5000, 2, 2)')
    }
    ]
    return wxjf
  },
  getWxYearCountDnzx_Mock(config) {
    const wxyearcount = {
      xAxis: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
      Series: [{
        seriesName: '中修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '小修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '坞修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '航修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '坞检',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      }
      ]
    }
    return wxyearcount
  },
  getWxYearCountDnjc_Mock(config) {
    const wxyearcount = {
      xAxis: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
      Series: [{
        seriesName: '中修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '小修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '坞修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '航修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '坞检',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      }
      ]
    }
    return wxyearcount
  },
  getWxYearCountSnzj_Mock(config) {
    const wxyearcount = {
      xAxis: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
      Series: [{
        seriesName: '中修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '小修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '坞修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '航修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '坞检',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      }
      ]
    }
    return wxyearcount
  },
  getWxYearCountDnwg_Mock(config) {
    const wxyearcount = {
      xAxis: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
      Series: [{
        seriesName: '中修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '小修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '坞修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '航修',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      },
      {
        seriesName: '坞检',
        data: [
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100),
          Mock.Random.integer(60, 100)
        ]
      }
      ]
    }
    return wxyearcount
  }
}
