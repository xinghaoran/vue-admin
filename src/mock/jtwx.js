// import Mock from 'mockjs'

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
  }
}
