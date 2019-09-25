/*
   SearchDetail  
*/
import React, { Component } from 'react';
import styles from './SearchDetail.css'
import SearchDetailBar from '../../Tool/Search/SearchDetailBar'
import axios from 'axios';
import wx from 'weixin-js-sdk'
// import  Discount from '../containers/discount/Discount'
class SearchDetail extends Component {


  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      advertlist: [

      ],
      pageNum: 1,
      pageSize: 10,
      searchValue: '',
      liteData: []
    };
  }
  getconfig() {

    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: sessionStorage.getItem("appIdNew"), // 必填，公众号的唯一标识
      timestamp: sessionStorage.getItem("timestampNew"), // 必填，生成签名的时间戳
      nonceStr: sessionStorage.getItem("nonceStrNew"), // 必填，生成签名的随机串
      signature: sessionStorage.getItem("signatureNew"),// 必填，签名
      jsApiList: [
        'chooseImage',
        'uploadImage',
        'scanQRCode',
        'getLocalImgData',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareQZone',
        'onMenuShareTimeline',
        'openLocation',
        'getLocation'
      ] // 必填，需要使用的JS接口列表

    });

    wx.ready(function () {


      wx.checkJsApi({
        jsApiList: ['chooseImage', 'uploadImage', 'scanQRCode', 'getLocalImgData', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareTimeline', 'openLocation', 'getLocation'], // 必填，需要使用的JS接口列表
        success: function (res) {
          // console.log(res)
        }
      });

      wx.onMenuShareTimeline({
        title: '丰收商城-大兴安岭美食-大兴安岭餐厅餐饮-大兴安岭团购-吃喝玩乐-大兴安岭丰收商城', // 分享标题
        link: global.constants.share,
        imgUrl:  global.constants.shareDetail , // 分享图标

      });


      // 获取“分享给朋友”按钮点击状态及自定义分享内容接口

      wx.onMenuShareAppMessage({
        title: '丰收商城-大兴安岭美食-大兴安岭餐厅餐饮-大兴安岭团购-吃喝玩乐-大兴安岭丰收商城', // 分享标题
        link: global.constants.share,
        imgUrl:  global.constants.shareDetail , // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
      });
    });



  }
  weixinAction() {


    axios.post("/customer/WeiXinScan/scan",
      {
        'url': encodeURIComponent(window.location.href.split('#')[0])
      },
      {
        openid: sessionStorage.getItem("user_openid"),
        // openid: 'okgBl1qAdb9rpq8BFbFfQUOJZIdU',
        token: sessionStorage.getItem("user_token"),
        // token: 'D277B73FE6324BFC5F9901E762365D77EF3C5DE9',
        'content-type': 'application/json'
      }
    ).then((res) => {
      console.log("首页  user_token=== " + sessionStorage.getItem("user_token"))
      sessionStorage.setItem("appIdNew", res.data.attach.appId)
      sessionStorage.setItem("timestampNew", res.data.attach.timestamp)
      sessionStorage.setItem("nonceStrNew", res.data.attach.nonceStr)
      sessionStorage.setItem("signatureNew", res.data.attach.signature)

      this.getconfig()
 


    }).catch(function (error) {

      console.log(error)
    });


  }
  componentDidMount() {
    document.title = "搜索"
    this.weixinAction()
    axios.get('/customer/merchant/foreground/guess/like', {
      params:
      {
        latitude: sessionStorage.getItem("latitude"),
        longitude: sessionStorage.getItem("longitude"),
        pageNum: this.state.pageNum,
        pageSize: this.state.pageSize

      }

    }).then((res) => {
      this.setState({
        liteData: res.data.attach
      })
    })
    // axios.get('/customer/merchantCategoryTag/list',
    //   {
    //     headers: {
    //       openid: sessionStorage.getItem('user_openid'),
    //       token: sessionStorage.getItem('user_token'),

    //     }
    //   }).then((res) => {
    //     // console.log(res)
    //     this.setState({
    //       advertlist: res.data.attach
    //     })

    //   })

  }
  keyAction = () => {
    let params =
    {
      merchantName: this.state.searchValue,
      latitude: sessionStorage.getItem("latitude"),
      longitude: sessionStorage.getItem("longitude"),
      type: 0,
      pageNum: 1,
      pageSize: 10,

    }
    // console.log(params)
    this.props.history.push({ pathname: 'SearchClass', state: { params: params } })
  }

  toDetailSearch = (value) => {
    // console.log("===" + value)
    this.setState({
      searchValue: value
    })

  }
  toDetailSearchClass = (value) => {
    let params =
    {
      categoryId: this.state.searchValue,
      latitude: sessionStorage.getItem("latitude"),
      longitude: sessionStorage.getItem("longitude"),
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
      type: 0

    }
    // this.props.state.props.history.push({ pathname: 'SearchClass', state: { params: params } })
  }

  toDiscountDetail(item) {
    window.location.href = "DiscountDetail?item="+item.id
    // this.props.history.push({ pathname: 'DiscountDetail', state: { item: item.id, lat: this.state.latAdd, lng: this.state.lngAdd } })
  }
  toSearch = (value, item) => {

    let params =
    {
      categoryId: item.id,
      tags: value.id,
      latitude: sessionStorage.getItem("latitude"),
      longitude: sessionStorage.getItem("longitude"),
      type: 0,
      pageNum: 1,
      pageSize: 10,


    }
    //   console.log(params)
    this.props.history.push({ pathname: 'SearchClass', state: { params: params } })

  }


  render() {
    const toDetailSearch =
    {
      toDetailSearch: this.toDetailSearch,
      keyAction: this.keyAction
    }
    let self = this;
    return (
      <div>

        <SearchDetailBar toDetailSearch={toDetailSearch}></SearchDetailBar>
        <div className={styles.Recommendationdiv}>
          <div className={styles.RecommendationUser}>
            推荐商家
               </div>
          <ul className={styles.listul} >
            {
              this.state.liteData.map(function (el, index) {

                return <div key={index} onClick={self.toDiscountDetail.bind(self, el)} className={styles.RecommendationButton} >
                  {el.merchantName}
                </div>
              })
            }
          </ul>

        </div>


        {/* <div className={styles.searchdiv}>
          {this.state.advertlist.map((item, i) =>
            <div key={i} className={styles.search}>
            <div className={styles.searchDivLeft}> 
            <div style={{backgroundColor:item.colour,width:'1vw',height:'5vw',marginTop:'1.5vw'}}>

            </div>
            <div className={styles.searchItemTitle} style={{color:item.colour}}>
                {item.category}
              </div>

            </div>
             
              <div>
                <ul className={styles.listul}>

                  {
                    this.state.advertlist[i].tags.map(function (el, index) {
                      return <div key={index} className={styles.searchItem}    onClick={self.toSearch.bind(self, el, item)}>{el.tag}</div>
                    })

                  }
                </ul>
              </div>
            </div>

          )
          }
        </div> */}



      </div>
    );
  }

}

export default SearchDetail;



