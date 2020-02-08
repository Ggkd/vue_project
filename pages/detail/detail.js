// miniprogram/pages/detail/detail.js
let datas = require ("../../data/data_list.js");
let appData = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj : {},
    index : null,
    isCollected : false,
    isMusic: false
  },


//点击收藏
  collect(){
    let isCollected = !this.data.isCollected;
    this.setData({
      isCollected,
    });

    let title = isCollected?"收藏成功": "取消收藏";
    // 显示收藏的提示信息
    wx.showToast({
      title,
      icon : "success"
    });

    // 将数据缓存
    
    // 先从缓存中取数据
    wx.getStorage({
      key: 'isCollected',
      success:(res) => {
        // 将数据缓存
        let obj = res.data; // {1:true, 2 false}
        let index = this.data.index;
        obj[index] = this.data.isCollected;
        wx.setStorage({
          key: "isCollected",
          data: obj,
          success: () => {
            console.log("缓存成功")
          }
        });
      },
    })
  },

  // 音乐播放
  clickMusic(){
    // 处理音乐播放
    let isMusic = !this.data.isMusic;
    this.setData({
      isMusic
    });

    // 控制音乐播放
    let dataUrl = this.data.dataObj.music_url
    let title = this.data.dataObj.music_title
    if (isMusic) {
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    }else{
      wx.pauseBackgroundAudio()
    };
  },


  // 点击分享
  handleShare(){
    wx.showActionSheet({
      itemList:["分享到微信", "分享到QQ", "分享到微博"],
      itemColor: "	#3CB371"
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取文章的index
    let index = options.index;
    this.setData({
      dataObj : datas.data_list[index],
      index
    });


    // 从缓存取收藏数据
    let detailStorage = wx.getStorageSync("isCollected");
    //判断isCollectd是否创建
    if (!detailStorage) {
      wx.setStorageSync("isCollected", {})
    }

    // 设置isCollected为最新的状态
    if (detailStorage[index]) {
      this.setData({
        isCollected : true
      })
    }

    // 判断音乐是否在播放
    if (appData.data.isMusicPlay && appData.data.pageIndex === index) {
      this.setData({
        isMusic : true
      })
    }

    // 监听音乐
    wx.onBackgroundAudioPlay(() =>{
      console.log("播放")
      this.setData({
        isMusic : true
      });

      //修改appData的值
      appData.data.isMusicPlay = true;
      appData.data.pageIndex = index;
    });

    wx.onBackgroundAudioPause(() => {
      console.log("暂停")
      this.setData({
        isMusic : false
      });
      //修改appData的值
      appData.data.isMusicPlay = false;
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})