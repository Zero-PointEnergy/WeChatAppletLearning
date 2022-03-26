// app.js
App({
  onLaunch() {
    wx.cloud.init({
        traceUser: true,
        env: "musicplayer-5g69ur9tf949516d"
      });
  }
})
