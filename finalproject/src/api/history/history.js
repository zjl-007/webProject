import instance from '../../router/axios';
let urlList = [
  '/getUserHistory', 
  '/delUserHistoryData', 
  '/delAllHistoryData', 
  '/delHistoryData',
  '/getUserChartHistory',
];
let requestObj = {}; 
urlList.forEach(url => {
  requestObj[url] = function(params) {
    return instance({
      url,
      method: 'post',
      data: params,
    })
  }
  // requestObj.push()
})
const getUserHistory = requestObj['/getUserHistory'];
const getUserChartHistory = requestObj['/getUserChartHistory'];
const delUserHistory = requestObj['/delUserHistoryData'];
const delAllHistory = requestObj['/delAllHistoryData'];
const delHistoryData = requestObj['/delHistoryData'];
export {
  getUserHistory,
  delUserHistory,
  delAllHistory,
  delHistoryData,
  getUserChartHistory,
}
