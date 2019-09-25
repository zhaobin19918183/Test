/*
   Home 主页
*/
import React, { Component } from 'react';
import { Grid, Badge } from 'antd-mobile';
import styles from './home.module.css'
import Discount from '../discount/Discount'
import { PullToRefresh, List, Toast } from 'antd-mobile';
import axios from 'axios';
import '../../Tool/global/global'
import '../../Tool/post/request'
import { withRouter, } from "react-router-dom";
import AddressLocation from '../../Tool/AddressLocation/AddressLocation'
// import { CarouselTool, ListItem, SearchTabBar } from '../../Tool/ToolRouter'
import CarouselTool from '../../Tool/Carousel/Carousel'
import ListItem from '../../Tool/List/ListItem'
import SearchTabBar from '../../Tool/Search/SearchTabBar'

import { Net } from '../../Tool/post/request';
import homeLeft from '../../image/homeLeft.png'
import HomeRight from '../../image/HomeRight.png'
import Http from '../../httpRequest/http'
import wx from 'weixin-js-sdk'
import ScrolltoTop from '../../Tool/returnTop/ScrolltoTop'
var array = []
class Home extends Component {


  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      showTop: false,
      refreshing: false,
      lat: 38.86304,
      lng: 121.51652,
      advertlist: [],
      bannerImage: [],
      catelist: [],
      latAdd: '',
      lngAdd: '',
      current: 'mail',
      value: '美食',
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
      pageNum: 1,
      pageSize: 10,
      scrollTop: '',
      advertlist:[],
      url1:'',
      url2:'',
      link1: '',
      link2: '',
      pluginProps: {
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 100,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
        extensions: 'all'
      },
      liteData: [],
      image3: [
        {
          icon: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          id: 1
        },
        {
          icon: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          id: 2
        },
        {
          icon: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          id: 3
        },
        {
          icon: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          id: 4
        },
        {
          icon: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          id: 5
        },
        {
          icon: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          id: 6
        },
      ],

    };
  }



  renderContent(pageText) {
    return (
      <Discount state={pageText}></Discount>
    );
  }

  handleClick(e) {

  }


  componentWillMount() {

    window.addEventListener('scroll', this.handleScroll, true)

  }
  handleScroll(e) {
    e.preventDefault()

    if (document.getElementById('pull')) {
      this.setState({
        scrollTop: document.getElementById('pull').scrollTop
      })

      if (this.state.scrollTop > 200) {
        this.setState({
          showTop: true
        })
      } else {
        this.setState({
          showTop: false
        })
      }
    }

  }
  getLike() {
  
    axios.get('/customer/merchant/foreground/guess/like',
      {
        params:
        {
          latitude: sessionStorage.getItem("latitude"),
          longitude: sessionStorage.getItem("longitude"),
          pageNum: this.state.pageNum,
          pageSize: this.state.pageSize
        }
      }).then(res => {

        console.log(res)
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

      }).catch(res => {

      })
  }


  componentDidMount() {
    console.log("Home  Home")
    var timestamp = Date.parse(new Date());
    var time = timestamp.toString()
    time = time.slice(0, 10)
    if ((parseInt(time) - parseInt(sessionStorage.getItem("timestampNew"))) > 1800) {


      this.weixinAction();

    }
    if (sessionStorage.getItem("timestampNew") == null) {
 
      this.weixinAction();
    }

    axios.get('/customer/banner/advertlist').then((res) => {
    //   console.log("=====1=============")
    // console.log(res.data.attach)
    // console.log("=====1=============")
   if(res.data.code == "0")
   {
    if(res.data.attach.length >2)
    {
      this.setState({
        advertlist: res.data.attach,
        url1:res.data.attach[0].picUrl,
        url2:res.data.attach[1].picUrl,
        link1:res.data.attach[0].linkUrl,
        link2:res.data.attach[1].linkUrl
      })
    }
   }
      
     
  

    })
    axios.get('/customer/banner/catelist').then((res) => {
      if(res.data.code == "0")
      {
        this.setState({
          catelist: res.data.attach
        })
      }
     
      console.log(res)

    })
    this.getLike();


  }
  getLocation = () => {

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
        'getLocation',
        'translateVoice'
      ] // 必填，需要使用的JS接口列表

    });

    wx.ready(() => {


      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          
          sessionStorage.setItem('latitude', res.latitude)
          sessionStorage.setItem('longitude', res.longitude)
          // window.location.reload()

        },
        cancel: function (res) {
          Toast.info('用户拒绝授权获取地理位置');
          wx.closeWindow()

        }
      });


    });


    // 

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
        imgUrl: global.constants.shareDetail// 分享图标

      });


      // 获取“分享给朋友”按钮点击状态及自定义分享内容接口

      wx.onMenuShareAppMessage({
        title: '丰收商城-大兴安岭美食-大兴安岭餐厅餐饮-大兴安岭团购-吃喝玩乐-大兴安岭丰收商城', // 分享标题
        link: global.constants.share,
        imgUrl: global.constants.shareDetail, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
      });
    });



  }
  weixinAction() {


    var openid = sessionStorage.getItem("user_openid")
    var user_token = sessionStorage.getItem("user_token")
    sessionStorage.setItem("user_openid_new", openid)
    sessionStorage.setItem("user_token_new", user_token)

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


  newActiob = () => {
    // Toast.info("敬请期待!")
    // window.location.href = 'https://www.baidu.com/';
  }

  gotosearch = () => {
    this.props.state.props.history.push({ pathname: 'SearchDetail' })
    sessionStorage.setItem("selectedTab", "blueTab")
  }

  ToDiscountDetail = (item) => {

    sessionStorage.setItem("selectedTab", "blueTab")
    window.location.href = "DiscountDetail?item="+item.id
    // this.props.state.props.history.push({ pathname: 'DiscountDetail', state: { item: item.id, lat: this.state.latAdd, lng: this.state.lngAdd } })

  }
  navigationTo = (index) => {
    sessionStorage.setItem("selectedTab", "blueTab")
    let params =
    {
      categoryId: index.linkUrl,
      latitude: sessionStorage.getItem("latitude"),
      longitude: sessionStorage.getItem("longitude"),
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
      type: 0

    }
    this.props.state.props.history.push({ pathname: 'SearchClass', state: { params: params } })



  }
  navigationToDetail(item) {
    // console.log(item)

  }
  addressLocation = (address) => {
    this.setState({
      latAdd: address.position.lat,
      lngAdd: address.position.lng
    })
    sessionStorage.setItem("lacotionlat", address.position.lat)
    sessionStorage.setItem("lacotionlng", address.position.lng)

  }
  // backHeader()
  // {

  //      document.getElementById('pull').scrollTop = 0;

  // }

  render() {
    const detail =
    {
      ToDiscountDetail: this.ToDiscountDetail
    }

    // const backHeader =
    // {
    //   backHeader: this.backHeader
    // }

    return (

      <div style={{ backgroundColor: "white" }}>

        {/* {sessionStorage.getItem("lacotionlng") == null ? <AddressLocation addressL={addressL}></AddressLocation> : null} */}
        <div onClick={this.gotosearch}>
          <SearchTabBar ></SearchTabBar>
        </div>

        {/* {this.state.showTop? <ScrolltoTop  backHeader={backHeader}></ScrolltoTop>:null} */}

        <PullToRefresh
          // id="pull"
          damping={100}
          ref={el => this.ptr = el}
          style={{
            overflow: 'auto',
            height: '100vh',
            // '-webkit-overflow-scrolling': 'touch',
            WebkitOverflowScrolling: 'touch',
            zIndex: 10
          }}
          indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
          direction={this.state.down ? 'down' : 'up'}
          refreshing={this.state.refreshing}
          onRefresh={() => {

            this.setState({
              pageNum: this.state.pageNum + 1
            })
            this.getLike()
          }}
        >


          <div className={styles.xuanfu}>
            <CarouselTool class={"home"} bannerImage={'/customer/banner/list'}></CarouselTool>
          </div>
          {/* <a href="" onclick="_czc.push(['_trackEvent', '小说', '打分', '达芬奇密码','5','dafen']);">打分</a > */}
          <Grid data={this.state.catelist}
            columnNum={5}
            hasLine={false}
            onClick={this.navigationTo}
            itemStyle={{ height: '100px', padding: '0px' }}
            renderItem={dataItem => (
              <div >
                <img src={dataItem.picUrl} style={{ width: '43px', height: '43px' }} alt="" />
                <div style={{ color: '#363830', fontSize: '14px', marginTop: '8px' }}>
                  <span>{dataItem.title}</span>
                </div>
              </div>
            )}
          />
          <div className={styles.HomeNew}>
            <a href={this.state.link1}><img src={this.state.url1} className={styles.HomeNewDiv}></img></a>
            <a href={this.state.link2}><img src={this.state.url2} className={styles.HomeNewDiv}></img></a>
            {/* <img src={this.state.url1} className={styles.HomeNewDiv} onClick={this.newActiob}></img>
            <img src={this.state.url2} className={styles.HomeNewDiv} onClick={this.newActiob}></img> */}
          </div>
          {/* <ul className={styles.listul}>
          {
            this.state.advertlist.map((item) =>

              <img alt="example" key={item.id} className={styles.list_box_img} src={item.picUrl} onClick={this.navigationToDetail.bind(this, item)} />

            )
          }
        </ul> */}
          <div className={styles.like}>
            猜你喜欢
        </div>
          <div className={styles.like1}>
            精选优质好商品
        </div>


          <List style={{ padding: '0 3vw' }}>
            {
              this.state.liteData.map((item) =>
                <ListItem key={item.id} list={item} detail={detail} ></ListItem>
              )
            }
          </List>

        </PullToRefresh>
      </div>
    );
  }


//   componentWillUnmount(){
//     localStorage.clear();
//     sessionStorage.clear();
//   }

}
// export default withRouter(Post);
// export default Home;

export default withRouter(Home);

