// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const getResponse = await got("https://cloudmusicapi.zero-pointenergy.net/personalized?limit=5");
  return getResponse.body;
}
exports.main = async (event,context) => {
  const getCloudSearch = await got('https://cloudmusicapi.zero-pointenergy.net/cloudsearch?keywords=${event.text}');
  return getCloudSearch.body;
}