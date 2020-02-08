// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg : "data msg",
    userInfo: {},
    isShow : true
  },

  parent() {
    console.log("parent")
  },

  child(){
    console.log("child")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload 页面加载")
    this.handleUserInfo()
  },

  handleUserInfo() {
    // 获取用户的微信信息
    wx.getUserInfo({
      success: (data) => {
        console.log("用户信息", data)
        this.setData({
          userInfo: data.userInfo
        })
      }
    })


    //判断用户是否授权
    wx.getSetting({
      success: (data) => {
        console.log("用户是否授权", data)
        if (data.authSetting["scope.userInfo"]) {
          this.setData({
            isShow: false
          })
        }
      }
    })
  },


  //处理用户是否允许授权
  handleUserAuth(data){
    // console.log(data)
    if (data.detail.rawData) {
      this.handleUserInfo();
    }
  },


// 点击跳转
  handleClick(){
    wx.switchTab({
      url: "/pages/list/list"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady 监听页面初次渲染完成")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow 监听页面显示")
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