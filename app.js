var wilddog = require('wilddog-weapp-all')
var config = {
    syncURL: 'https://kyleenglish.wilddogio.com',
    authDomain: 'kyleenglish.wilddog.com'
}


//app.js
App({
  onLaunch: function () {
    console.log('App Launch')
    wilddog.initializeApp(config)
    this.sliderListRef = wilddog.sync().ref('slider_list').orderByPriority().limitToFirst(20)
    this.venuesListRef = wilddog.sync().ref('venues_list').orderByPriority().limitToFirst(20)
    this.choiceListRef = wilddog.sync().ref('choice_list').orderByPriority().limitToFirst(20)
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口      
      wilddog.auth().signInWeapp(function(err,user){
        if(err){
          console.log(err)
        } else {
          that.globalData.userInfo = user
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    userInfo: null
  }
})