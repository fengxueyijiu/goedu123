// 定义数据格式

/***
 *
 * "wxSearchData":{
 *  configconfig:{
 *    style: "wxSearchNormal"
 *  },
 *  view:{
 *    hidden: true,
 *    searchbarHeght: 20
 *  }
 *  keys:[],//自定义热门搜索
 *  his:[]//历史搜索关键字
 *  value
 * }
 *
 *
 */
var __keysColor = [];

var __mindKeys = [];

function initColors(colors){
    __keysColor = colors;
}

function initMindKeys(keys){
    __mindKeys = keys;
}

function init(that, barHeight, keys, isShowKey, isShowHis, callBack) {
    var temData = {};
    var view = {
        barHeight: barHeight,
        isShow: true
    }

    if(typeof(isShowKey) == 'undefined'){
        view.isShowSearchKey = true;
    }else{
        view.isShowSearchKey = isShowKey;
    }

    if(typeof(isShowHis) == 'undefined'){
        view.isShowSearchHistory = true;
    }else{
        view.isShowSearchHistory = isShowHis;
    }
    temData.keys = keys;
    wx.getSystemInfo({
        success: function(res) {
            var wHeight = res.windowHeight;
            view.seachHeight = wHeight-barHeight;
            temData.view = view;
            that.setData({
                wxSearchData: temData
            });
        }
    })

    if (typeof (callBack) == "function") {
        callBack();
    }

    getHisKeys(that);
}

function wxSearchInput(e, that, callBack){
    var temData = that.data.wxSearchData;
    var text = e.detail.value;
    var mindKeys = [];
    if(typeof(text) == "undefined" || text.length == 0){

    }else{
        for(var i = 0; i < __mindKeys.length; i++){
            var mindKey = __mindKeys[i];
            if(mindKey.indexOf(text) > -1){
                mindKeys.push(mindKey);
            }
        }
    }
    temData.value = text;
    temData.mindKeys = mindKeys;
    that.setData({
        wxSearchData: temData
    });
}

function wxSearchFocus(e, that, callBack) {
    var temData = that.data.wxSearchData;
    temData.view.isShow = true;
    that.setData({
        wxSearchData: temData
    });
    //回调
    if (typeof (callBack) == "function") {
        callBack();
    }
    // if(typeof(temData) != "undefined"){
    //   temData.view.hidden= false;
    //   that.setData({
    //     wxSearchData:temData
    //   });
    // }else{

    // }
}
function wxSearchBlur(e, that, callBack) {
    var temData = that.data.wxSearchData;
    temData.value = e.detail.value;
    that.setData({
        wxSearchData: temData
    });
    if (typeof (callBack) == "function") {
        callBack();
    }
}

function wxSearchHiddenPancel(that){
    var temData = that.data.wxSearchData;
    temData.view.isShow = false;
    that.setData({
        wxSearchData: temData
    });
}

function wxSearchKeyTap(e, that, callBack) {
    //回调
    var temData = that.data.wxSearchData;
    temData.value = e.target.dataset.key;
    that.setData({
        wxSearchData: temData
    });
    if (typeof (callBack) == "function") {
        callBack();
    }
}
function getHisKeys(that) {
    var value = [];
    try {
        value = wx.getStorageSync('wxSearchHisKeys')
        if (value) {
            // Do something with return value
            var temData = that.data.wxSearchData;
            temData.his = value;
            that.setData({
                wxSearchData: temData
            });
        }
    } catch (e) {
        // Do something when catch error
    }

}
function wxSearchAddHisKey(that) {

    wxSearchHiddenPancel(that);
    var text = that.data.wxSearchData.value;
    console.log(text)
    if(typeof(text) == "undefined" || text.length == 0){return;}
    var value = wx.getStorageSync('wxSearchHisKeys');
    if(value){
        if(value.indexOf(text) < 0){
            value.unshift(text);
        }
        wx.setStorage({

            key:"wxSearchHisKeys",
            data:value,
            success: function(){
                getHisKeys(that);
            }
        })
    }else{
        value = [];
        value.push(text);
        wx.setStorage({
            key:"wxSearchHisKeys",
            data:value,
            success: function(){
                getHisKeys(that);
            }
        })
    }
    wx.request({
      url: 'http://192.168.1.105:6060/v1/schools/search',
      method: 'POST',
      data: {
        value: text
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
         var name = res.data.school;
         var courses=res.data.courses;
         console.log(courses)
         var xx=[];
         courses.map((item,index) =>{
           xx.push(item.school)
         })

        //  console.log(xx)
        //  console.log(name)
        //  console.log(courses)

         var schools=[];
         var s = name.concat ( xx ) ;
         //去重
         (function(){
            var unique = {};
            s.forEach(function(a){ unique[ JSON.stringify(a) ] = 1 });
            s= Object.keys(unique).map(function(u){return JSON.parse(u) });
            return s
          })(s)
         if(s.length==0){
           s=[{name:'未查询到您输入的内容'}]
         }
        console.log(s)
        that.setData({
             name: s

        });
        console.log(that.setData)
      },
      fail: function() {
        console.log('fail')
      }
    })


}
function wxSearchDeleteKey(e,that) {
    var text = e.target.dataset.key;
    var value = wx.getStorageSync('wxSearchHisKeys');
    value.splice(value.indexOf(text),1);
    wx.setStorage({
        key:"wxSearchHisKeys",
        data:value,
        success: function(){
            getHisKeys(that);
        }
    })
}
function wxSearchDeleteAll(that){
    wx.removeStorage({
        key: 'wxSearchHisKeys',
        success: function(res) {
            var value = [];
            var temData = that.data.wxSearchData;
            temData.his = value;
            that.setData({
                wxSearchData: temData
            });
        }
    })
}



module.exports = {
    init: init,
    initColor: initColors,
    initMindKeys: initMindKeys,
    wxSearchInput: wxSearchInput,
    wxSearchFocus: wxSearchFocus,
    wxSearchBlur: wxSearchBlur,
    wxSearchKeyTap: wxSearchKeyTap,
    wxSearchAddHisKey:wxSearchAddHisKey,
    wxSearchDeleteKey:wxSearchDeleteKey,
    wxSearchDeleteAll:wxSearchDeleteAll,
    wxSearchHiddenPancel:wxSearchHiddenPancel
}