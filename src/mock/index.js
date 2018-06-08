import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import jtgkAPI from './jtgk'
import jtwxApi from './jtwx'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// 舰艇概况
Mock.mock(/\/jtgk\/list/, jtgkAPI.getList)
Mock.mock(/\/jtgk\/overviewinfogtable/, jtgkAPI.getOverViewInfoTable)
Mock.mock(/\/jtgk\/getfzjtpiedata/, jtgkAPI.getFzjtPieData)
Mock.mock(/\/jtgk\/getzdjtpiedata/, jtgkAPI.getZdjtPieData)
Mock.mock(/\/jtgk\/getCountBarData/, jtgkAPI.getCountBarData_Mock)
Mock.mock(/\/jtgk\/getFundBarData/, jtgkAPI.getFundBarData_Mock)

// 舰艇维修
Mock.mock(/\/jtwx\/zdtree/, jtwxApi.getZdTreeData)
Mock.mock(/\/jtwx\/fztree/, jtwxApi.getFzTreeData)
Mock.mock(/\/jtwx\/dwtree/, jtwxApi.getDwTreeData)

export default Mock
