// pages/guestInformation.js
Page({

  /**
   * Page initial data
   */
  data: {
    giBackgroundImageUrl: "https://cdn.jsdelivr.net/gh/Zero-PointEnergy/imagesForWeChatMiniProgram@master/20220317/bg_2.68dph824ymw0.webp" ,
    screenHeight: 0,
    nameInputValue: '',
    phoneInputValue: '',
    numberOfPeople: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    selectorSelectedValue: 1,
    nameVerified: false,
    phoneVerified: false,
    blessingWords: '',
  },
  checkName() {
    let that = this
    let name = that.data.nameInputValue
    let reg = /^[\u4E00-\u9FFF]{2,3}(·[\u4E00-\u9FFF]{2,3}){0,2}$/
    let regTestRsult;
    if (name != '' && name.length >= 2) {
      regTestRsult = reg.test(name)
      if (regTestRsult) {
        that.setData({
          nameInputValue: name,
          nameVerified: true,
        })
        console.log("User name successfully verified.")
      } else 
        wx.showToast({
          title: '姓名似乎有误，请检查一下吧',
          icon: 'none',
          duration: 2000
        })
    } else wx.showToast({
      title: '姓名未通过校验，请检查一下吧',
      icon: 'none',
      duration: 2000
    })
  },
  checkPhone() {
    let that = this
    let phone = that.data.phoneInputValue
    let VNOReg = /(^(1064)\d{8}\d$)|(^1(62|65|67|70|71)\d{7}\d$)/   // VNO: 虚拟运营商
    let BCBReg = /(^1749\d{6}\d$)/   // BCB: 北船舶，北京船舶通信导航有限公司
    let CBNReg = /(^192\d{7}\d$)/    // CBN: China Broadcasting Network Corp Ltd, 中国广电，中国广播电视网络集团有限公司
    let CTReg = /(^1(33|49|53|73|77|80|81|89|90|91|93|99)\d{7}\d$)|(^1349\d{6}\d$)|(^1740[0-5]\d{5}\d$)/   // CT: China Telecom，中国电信
    let CUReg = /(^1(30|31|32|45|46|55|56|66|71|75|76|85|86|96)\d{7}\d$)/   // CU: China Unicom，中国联通
    let CMCCReg = /(^134[0-8]\d{6}\d$)|(^1(35|36|37|38|39|47|48|50|51|52|57|58|59|72|78|82|83|84|87|88|95|97|98)\d{7}\d$)|(^144[0-1]\d{8}\d$)/  // CMCC: China Mobile，中国移动
    let ECGCReg = /(^1740[6-9]\d{5}\d$)|(^1741[0-2]\d{5}\d$)/   // ECGC: Emergency Communication Guarantee Centre, 这里指 工业和信息化部应急通信保障中心

    if (VNOReg.test(phone)) {   // 校验虚拟运营商号码
      that.setData({
        phoneInputValue: phone,
        phoneVerified: true
      })
      console.log("User phone number successfully verified (VNO).")
    } else if (BCBReg.test(phone)) {  // 校验北船舶号码
        that.setData({
          phoneInputValue: phone,
          phoneVerified: true
        })
        console.log("User phone number successfully verified (BCB).")
      } else if (CBNReg.test(phone)) {  // 校验中国广电号码
          that.setData({
            phoneInputValue: phone,
            phoneVerified: true
          })
          console.log("User phone number successfully verified (CBN).")
        } else if (CTReg.test(phone)) {  // 校验中国电信号码
            that.setData({
              phoneInputValue: phone,
              phoneVerified: true
            })
            console.log("User phone number successfully verified (CT).")
          } else if (CUReg.test(phone)) {  // 校验中国联通号码
              that.setData({
                phoneInputValue: phone,
                phoneVerified: true
              })
              console.log("User phone number successfully verified (CU).")
            } else if (CMCCReg.test(phone)) {  // 校验中国移动号码
                that.setData({
                  phoneInputValue: phone,
                  phoneVerified: true
                })
                console.log("User phone number successfully verified (CMCC).")
              } else if (ECGCReg.test(phone)) {  // 校验应急通信保障中心号码
                  that.setData({
                    phoneInputValue: phone,
                    phoneVerified: true
                  })
                  console.log("User phone number successfully verified (ECGC).")
                } else {
                  wx.showToast({
                    title: '手机号码未通过校验，请检查一下吧',
                    icon: 'none',
                    duration: 2000
                  })
                }

  },
  pickerChange(getValues) {
    let NoOfPeople = parseInt(getValues.detail.value) + 1;
    let that = this
    that.setData({
      selectorSelectedValue: NoOfPeople
    })
  },
  inputNameData(getValues) {
    let that = this
    let tmpName = getValues.detail.value
    that.setData({
      nameInputValue: tmpName
    })
  },
  inputPhoneData(getValues) {
    let that = this
    let tmpPhone = getValues.detail.value
    that.setData({
      phoneInputValue: tmpPhone
    })
  },
  inputBlessingWordsData(getValues) {
    let that = this
    let tmpBlessingWords = getValues.detail.value
    that.setData({
      blessingWords: tmpBlessingWords
    })
  },
  formSubmit(getFormData) {
    let that = this
    let name = getFormData.detail.value.name
    let phone = getFormData.detail.value.phone
    let peoples = getFormData.detail.value.NumOfPeople
    let blessingWords = getFormData.detail.value.blessingWords
    if (that.data.nameVerified && that.data.phoneVerified) {
      wx.showToast({
        title: '提交成功！',
        icon: 'success',
        duration: 2000
      })
      setTimeout(()=>{
        that.setData({
          nameInputValue: "",
          phoneInputValue: "",
          blessingWords: "",
          selectorSelectedValue: 1
        })
      }, 2080)
    } else wx.showToast({
      title: '提交失败！',
      icon: 'error',
      duration: 2000
    })
  },

  onLoad: function () {
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
  },
})