/*
   Discount 优惠
*/
import React, { Component } from 'react';
import { ListItem, SearchTabBar } from '../../Tool/ToolRouter'
import styles from './discount.css'
import { Tabs, WhiteSpace, Badge,Toast } from 'antd-mobile';
import axios from 'axios';
import { TabBar, PullToRefresh } from 'antd-mobile';
import ScrolltoTop from '../../Tool/returnTop/ScrolltoTop'
import collection from '../../image/locationImage.png'
import noshop from '../../image/noshop.png'
import wx from 'weixin-js-sdk'

const tabs = [
  { title: <Badge >距离</Badge>, id: 0 },
  { title: <Badge >热度</Badge>, id: 1 },
  { title: <Badge >好评</Badge>, id: 2 },
  { title: <Badge >足迹</Badge>, id: 3 },

];

var  array=[]

class Discount extends Component {


  constructor(props) {
    super(props);

    this.state = {
      type: 0,
      searchList: [],
      liteData: [],
      pageNum: 1,
      pageSize: 10,
      height: document.documentElement.clientHeight,
      selectedTab: 'blueTab',
      location:false,
      showTop:false,
      noshop: false,
    };

    this.handleScroll = this.handleScroll.bind(this)
  }
  
  componentWillMount() {
    this.getData();
    this.weixinAction()
    window.addEventListener('scroll',this.handleScroll,true)
  }
  getconfig()
  {

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

  getData() {
    axios.get('/customer/merchant/foreground/search',
      {
        params:
        {
          type: this.state.type,					//排序类型：0距离,1热度,3好评,4足迹【接口①、接口②、接口③时应该传0】（必传）
          latitude: sessionStorage.getItem("latitude"),
          longitude:sessionStorage.getItem("longitude"),
          pageNum: this.state.pageNum,
          pageSize: this.state.pageSize

        }
      }).then((res) => {
     
        if(res.data.code =='0')
        {
       
          {
            res.data.attach.map(function (el, index) {
           
              array.push(
                el
           )
            })
          }
         this.setState({
           liteData:array
         })
        }
        else
        {
          if(this.state.pageNum == 1)
          {
            this.setState({
              noshop: true
            })
          }
        
          Toast.info("无更多内容")
        }
     


      })
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
       if(lat !=null)
       {
        map.push({ position: locationArr })
       }
           
       


    })
    // console.log(map)
    this.props.state.props.history.push({ pathname: 'MapView', state: { map: map } })

  }
  ToDiscountDetail = (item) => {
   console.log(item)
   window.location.href = "DiscountDetail?item="+item.id
    // this.props.state.props.history.push({ pathname: 'DiscountDetail', state: { item: item.id , } })
    
  
    sessionStorage.setItem("selectedTab","redTab")
    // /customer/merchant/foreground/search
  }
  gotosearch = () => {
    this.props.state.props.history.push({ pathname: 'SearchDetail' })
  }

  handleScroll()
  {
    if(document.getElementById('pull2'))
    {
      let scrollTop  =  document.getElementById('pull2').scrollTop;
      // console.log(scrollTop)
  
      if(scrollTop>200)
      {
        this.setState({
          showTop:true
        })
      }
      else
      {
        this.setState({
          showTop:false
        })
      }
    }
  
  }

  backHeader(){
     document.getElementById('pull2').scrollTop = 0;
  }



  render() {
    const detail =
    {
      ToDiscountDetail: this.ToDiscountDetail
    }

    const backHeader =
    {
      backHeader: this.backHeader
    }


    return (
      <div>
           
        <div onClick={this.gotosearch}>
          <SearchTabBar ></SearchTabBar>
        </div>

    
        <div className={styles.tabDiv}>
        {this.state.noshop == false ?  <img src={collection} className={styles.MapDIv} onClick={this.goMapView.bind(this)}></img>:null}
         {this.state.showTop? <ScrolltoTop  backHeader={backHeader}></ScrolltoTop>:null}

          <Tabs tabs={tabs}
            initialPage={0}
            tabBarActiveTextColor='#FB437A'
            tabBarBackgroundColor="#F4F4F4"
            tabBarUnderlineStyle={{ border: '1px solid #FB437A' }}
            onChange={(tab, index) => {
              this.setState({
                  type: tab.id,
                  liteData:[],
                  pageNum: 1,
                  pageSize: 10
              })
              array=[]
              axios.get('/customer/merchant/foreground/search',
                {
                  params:
                  {
                    type: tab.id,					//排序类型：0距离,1热度,3好评,4足迹【接口①、接口②、接口③时应该传0】（必传）
                    latitude: sessionStorage.getItem("latitude"),
                    longitude:sessionStorage.getItem("longitude"),
                    pageNum: 1,
                    pageSize: 10
                  }

                }).then((res) => {

                    if(res.data.code =='0')
                    {
                   
                      {
                        res.data.attach.map(function (el, index) {
                       
                          array.push(
                            el
                       )
                        })
                      }
                     this.setState({
                       liteData:array
                     })
                    }
                    else
                    {
                      if(this.state.pageNum == 1)
                      {
                        this.setState({
                          noshop: true
                        })
                      }
                    
                      Toast.info("无更多内容")
                    }

                })
            //   this.getData();
            }}
            onTabClick={(tab, index) => {
              // console.log('onTabClick', index, tab);
            }}
          >
            {
              tabs.map((item) =>
                <div key={item.id} >
                {this.state.noshop == false ?  <PullToRefresh
                    id="pull2"
                    damping={100}
                    ref={el => this.ptr = el}
                    style={{
                      height:this.state.height<510?this.state.height*0.7:this.state.height*0.75,  
                      // height: '100vh',
                      overflow: 'auto',
                      padding:'2vw',
                      backgroundColor:"white",
                      '-webkit-overflow-scrolling': 'touch'
                    }}
                    indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction={this.state.down ? 'down' : 'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                      // console.log("上拉加载")
                      this.setState({
                        pageNum: this.state.pageNum + 1,
                        pageSize: this.state.pageSize,
                     
                      })
                    
                      this.getData();

                    }}
                  >

                    {
                      this.state.liteData.map(function (el, index) {
                     
                        return <ListItem key={el.id} list={el} detail={detail}></ListItem>
                      })
                    }


                  </PullToRefresh>: <div>    
                  <img src={noshop} className={styles.noShop}></img>
                
               
            </div>
           } 
                </div>
              )
            }

          </Tabs>
          <WhiteSpace />
          {/* <RouterTabBar></RouterTabBar>   */}
          


        </div>
      
     

      </div>
    );
  }

}

export default Discount;



