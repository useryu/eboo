//获取应用实例
var app = getApp()
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false  // loading
    },

    //事件处理函数
    swiperchange: function(e) {
        //console.log(e.detail.current)
    },

    onLoad: function() {
        console.log('onLoad')
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

        //sliderList
        app.sliderListRef.once("value").then(function(snapshot){
            that.setData({
                images:snapshot.val()
            })
            console.info(snapshot.val());
        }).catch(function(err){
            console.error(err);
        })

        //venuesList
        app.venuesListRef.once("value").then(function(snapshot){
            that.setData({
                venuesItems:snapshot.val().data
            })
            console.info(snapshot.val());
        }).catch(function(err){
            console.error(err);
        })

        //choiceList
        app.choiceListRef.once("value").then(function(snapshot){
            that.setData({
                choiceItems:snapshot.val().data.dataList
            })
            console.info(snapshot.val());
        }).catch(function(err){
            console.error(err);
        })
        that.setData({
                loadingHidden:true
        })
    }
})
