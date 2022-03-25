// index.js
Page({
    data: {
        currentTab: 0,
        searchIcon: "images/search.png"
    },
    switchTabs(res) {
        this.setData({
            currentTab: res.target.dataset.item
        })
        console.log("current tab is :", this.data.currentTab);
    },
    slideTab(res) {
        this.setData({
            currentTab: res.detail.current
        })
    }
})
