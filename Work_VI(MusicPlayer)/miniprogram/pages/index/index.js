// index.js
Page({
    data: {
        currentTab: 0,
        searchIcon: "images/search.png",
        ncmList: [],
    },
    switchTabs(res) {
        this.setData({
            currentTab: res.target.dataset.item
        })
        console.log("current tab is :", this.data.currentTab);
        wx.request({
            url: 'https://cloudmusicapi.zero-pointenegy.net/personalized?limit=5',
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                console.log(res.data);
            }
          })
    },
    slideTab(res) {
        this.setData({
            currentTab: res.detail.current
        })
    },
    testGetNCM() {
        wx.request({
          url: 'cloudmusicapi.zero-pointenegy.net/personalized?limit=5',
          header: {
              'content-type': 'application/json'
          },
          success: res => {
              console.log(res.data);
          }
        })
    }
})
