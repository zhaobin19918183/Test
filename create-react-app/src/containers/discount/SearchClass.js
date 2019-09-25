/*
   Discount 优惠
*/
import React, { Component } from 'react';
import { ListItem, SearchTabBar } from '../../Tool/ToolRouter'
import styles from './discount.css'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import axios from 'axios';
import SearchDetailBar from '../../Tool/Search/SearchDetailBar'
import collection from '../../image/locationImage.png'
import noshop from '../../image/noshop.png'
import {createHashHistory} from 'history'
import { Toast, PullToRefresh } from 'antd-mobile';
import wx from 'weixin-js-sdk'
const tabs = [
  { title: <Badge >距离</Badge>, id: 0 },
  { title: <Badge >热度</Badge>, id: 1 },
  { title: <Badge >好评</Badge>, id: 2 },
  { title: <Badge >足迹</Badge>, id: 3 },

];


var array = []

class SearchClass extends Component {


  constructor(props) {
    super(props);

    this.state = {
      type: 0,
      searchList: [],
      parame: [],
      liteData: [],
      selectedTab: 'blueTab',
      searchValue: '',
      pageNum: 1,
      pageSize: 10,
      height: document.documentElement.clientHeight,
      noshop: false,
      isreload:false
   

    };
  }
  componentWillMount() {
    array = []
    this.getData()
    
  

  }


  getData() {
     
    axios.get('/customer/merchant/foreground/search',
      {
        params: this.props.history.location.state.params
      }).then((res) => {
        // console.log(res)
        if (res.data.code == '0') {
          {
            res.data.attach.map(function (el, index) {

              array.push(
                el
              )
            })
          }
          this.setState({
            liteData: array,
            height: '90vh',
            
          })
        }
        else {
          this.setState({
            noshop: true
          })
          Toast.info("无更多内容")
        }



      })
  }
  componentDidMount() {
   this.weixinAction()

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
      this.getLocation()


    }).catch(function (error) {

      console.log(error)
    });


  }

  goMapView() {
    const map = []
    this.state.liteData.map(function (el, index) {

      var strArr = el.coordinate.split(",");
      var lat = strArr[1]
      var lng = strArr[0]


      var locationArr = {
        longitude: parseFloat(lng),
        latitude: parseFloat(lat)

      }
      if (lat != null) {
        map.push({ position: locationArr })
      }



    })
  //  console.log(map)

    this.props.history.push({ pathname: 'MapView', state: { map: map } })

  }
  ToDiscountDetail = (item) => {

    window.location.href = "DiscountDetail?item="+item.id
    // this.props.history.push({ pathname: 'DiscountDetail', state: { item: item.id } })

  }
  goback=()=>
  {
    const history = createHashHistory();
    history.goBack();  
  }

  gotosearch = () => {
    this.props.state.props.history.push({ pathname: 'SearchDetail' })
  }
  toDetailSearch = (value) => {


    this.setState({
      searchValue: value
    })
  }
  keyAction = () => {
    let params =
    {
      merchantName: this.state.searchValue,
      latitude: sessionStorage.getItem("latitude"),
      longitude: sessionStorage.getItem("longitude"),
      type: this.state.type,
      pageNum: 1,
      pageSize: 10,

    }

    axios.get('/customer/merchant/foreground/search',
      {
        params: params
      }).then((res) => {
      //  console.log(res)
       if(res.data.code == "0")
       {
        this.setState({

          liteData: res.data.attach,
          noshop :false
        })
       }
       else
       {
        this.setState({

          liteData: [],
           noshop :true
        })
       }
       


      })
  }
  render() {
    const detail =
    {
      ToDiscountDetail: this.ToDiscountDetail
    }
    const toDetailSearch =
    {
      toDetailSearch: this.toDetailSearch,
      keyAction: this.keyAction
    }
    return (
      <div>
        <SearchDetailBar toDetailSearch={toDetailSearch}></SearchDetailBar>
        {this.state.noshop == false ?
          <div className={styles.tabDiv}>

            <Tabs tabs={tabs}
              initialPage={0}
              tabBarActiveTextColor='#FB437A'
              tabBarBackgroundColor="#F4F4F4"
              tabBarUnderlineStyle={{ border: '1px solid #FB437A' }}
              onChange={(tab, index) => {
                this.setState({
                  type: tab.id,
                  liteData: [],
                  pageNum: 1,
                  pageSize: 10
                })

                array=[]
                this.props.history.location.state.params.type = tab.id
                this.props.history.location.state.params.pageNum = 1
                this.props.history.location.state.params.pageSize = 10
                // console.log(this.props.history.location.state.params)

                axios.get('/customer/merchant/foreground/search',
                  {
                    params: this.props.history.location.state.params

                  }).then((res) => {

                    if (res.data.code == '0') {
                        {
                          res.data.attach.map(function (el, index) {

                            array.push(
                              el
                            )
                          })
                        }
                        this.setState({
                          liteData: array
                        })
                      }
                      else {
                        Toast.info("无更多内容")
                      }

                  })
              }}
              onTabClick={(tab, index) => {
                // console.log('onTabClick', index, tab);
              }}
            >
              {
                tabs.map((item,key) =>
                  <div key={key}>
                    <PullToRefresh
                      damping={60}
                      ref={el => this.ptr = el}
                      style={{
                        height: this.state.height < 510 ? this.state.height * 0.8 : this.state.height,
                        overflow: 'auto',
                        padding:'2vw',
                        backgroundColor:"white"
                      }}
                      indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                      direction={this.state.down ? 'down' : 'up'}
                      refreshing={this.state.refreshing}
                      onRefresh={() => {
                        // console.log("上拉加载")
                        this.setState({
                          pageNum: this.state.pageNum + 1,
                          pageSize: this.state.pageSize
                        })
                        this.props.history.location.state.params.pageNum = this.state.pageNum
                        axios.get('/customer/merchant/foreground/search',
                          {
                            params: this.props.history.location.state.params
                          }).then((res) => {
                            // console.log(res)
                            if (res.data.code == '0') {
                              {
                                res.data.attach.map(function (el, index) {

                                  array.push(
                                    el
                                  )
                                })
                              }
                              this.setState({
                                liteData: array
                              })
                            }
                            else {
                              Toast.info("无更多内容")
                            }



                          })

                      }}
                    >

                      {
                        this.state.liteData.map(function (el, index) {

                          return <ListItem key={index} list={el} detail={detail} ></ListItem>
                        })
                      }


                    </PullToRefresh>
                  </div>
                )
              }


            </Tabs>
            <WhiteSpace />
            {/* <RouterTabBar></RouterTabBar>   */}

            {this.state.noshop == false ? <img src={collection} className={styles.MapDIv} onClick={this.goMapView.bind(this)}></img> : null}

          </div> :
    
            <div>    
                  <img src={noshop} className={styles.noShop}></img>
                  <div className={styles.Buttondiv}>   
                   
                      <div className={styles.BanckButton} onClick={this.goback}> 返回</div>
                   
                  </div>
               
            </div>
           }
        
      </div>
    );
  }

}

export default SearchClass;



