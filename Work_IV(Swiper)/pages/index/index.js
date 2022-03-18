// index.js
Page({
    data: {
        screenHeight: 0,
        indicatorDots: true,
        indicatorColor: "#0f0",
        indicatorActiveColor: "#f00",
        autoplay: true,
        interval: 5000,
        duration: 1000,
        vertical: true,
        webp: true,
        circular: true,
        imagesList: [
            "https://cdn.jsdelivr.net/gh/Zero-PointEnergy/imagesForWeChatMiniProgram@master/20220317/img0.webp",
            "https://cdn.jsdelivr.net/gh/Zero-PointEnergy/imagesForWeChatMiniProgram@master/20220317/img1.webp",
            "https://cdn.jsdelivr.net/gh/Zero-PointEnergy/imagesForWeChatMiniProgram@master/20220317/img2.webp",
            "https://cdn.jsdelivr.net/gh/Zero-PointEnergy/imagesForWeChatMiniProgram@master/20220317/img3.webp",
            "https://cdn.jsdelivr.net/gh/Zero-PointEnergy/imagesForWeChatMiniProgram@master/20220317/img4.webp",
            "https://cdn.jsdelivr.net/gh/Zero-PointEnergy/imagesForWeChatMiniProgram@master/20220317/img5.webp",
            "https://cdn.jsdelivr.net/gh/Zero-PointEnergy/imagesForWeChatMiniProgram@master/20220317/img6.webp"
        ],
    },
    onLoad: function () {
        // 获取屏幕高度
        let that = this;
        wx.getSystemInfo({
            success: function (res) {
                let clientHeight = res.windowHeight;
                let clientWidth = res.windowWidth;
                let ratio = 750 / clientWidth;
                let heightRpx = clientHeight * ratio;
                that.setData({
                    screenHeight: heightRpx
                })
            }
        })
        console.log("Get screen height success!");
    }
})
