/*
   Discount 优惠
*/
import React, { Component } from 'react';
import { ListItem } from '../../Tool/ToolRouter'
import styles from './OrderManagement.css'
import nocomment from '../../image/nocomment.png'
import { Tabs, WhiteSpace, Badge ,PullToRefresh} from 'antd-mobile';
import Header from '../../Tool/Header/Header'
import wx from 'weixin-js-sdk'
import axios from 'axios';
import {createHashHistory} from 'history'
import OrderManager from '../../Tool/CurrencyItem/OrderManager'
var array = []
// 全部("0"), 待支付("1"), 待使用("2"), 待评价("3"), 退款("4");
const tabs = [
  { title: <Badge >全部</Badge> },
  { title: <Badge >待支付</Badge> },
  { title: <Badge >待使用</Badge> },
  { title: <Badge >待评价</Badge> },
  { title: <Badge >退款/售后</Badge> },
];

var number = 0

class OrderManagement extends Component {


  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
      OrderManager:[],
      pageNum:1,
      pageSize: 10,
      height: document.documentElement.clientHeight,
      detailproducts:[],
      liteData: [
        {
          image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          title: '居然建材1',
          length: '12345.00km',
          subtitle: '硅藻泥',
          content: '限购四十件',
          subcontent: '免预约11'
        },
        {
          image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          title: '居然建材',
          length: '12345.00km',
          subtitle: '硅藻泥',
          content: '限购四十件',
          subcontent: '免预约'
        },
        {
          image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          title: '居然建材',
          length: '12345.00km',
          subtitle: '硅藻泥',
          content: '限购四十件',
          subcontent: '免预约'
        }
      ],
    };
  }
  back = () => {
   

  }
  Refund = (item) => {
 
    this.props.history.push({ pathname: 'Refund', state: { item: item } })

  }
  ToReleaseComments = (item) => {
  
    this.props.history.push({ pathname: 'ReleaseComments', state: { item: item } })

  }
  componentDidMount() {
    document.title = "订单管理"
    array = []
    this.weixinAction()
  
    this.orderRequest(this.state.tabIndex)
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

  orderRequest(tabIndex)
  {
  
      axios.get('/customer/order/getO2oOrderList', {
        params: {
          pageSize: this.state.pageSize,
          pageNum: this.state.pageNum,
          status:tabIndex
        }
      }).then((res) => {
        console.log("orderRequest")
      console.log(res)
      console.log("orderRequest")
      if(res.data.code == "0")
      {
        if(this.state.pageNum == 1&&res.data.code =="1028")
        {
          this.setState({
            OrderManager:[]
          })
        }  
        if(res.data.code == "0")
        {
          res.data.attach.map(function (el, index) {
    
            array.push(
                el
            )
        })
          
          this.setState({
            OrderManager:array
          })
    
        }
        if(this.state.pageNum == 1&& res.data.code != "0")
        {
          this.setState({
            OrderManager:[]
          })
        }
      }
    
      
    
      
      })
//     }
//     else
//     {
//  this.setState({
//           OrderManager:[]
//         })
//     }
    
  }
  collectionAction=(item)=>
  {
    sessionStorage.setItem("orderNoPay", item.orderNo)
    this.props.history.push({ pathname: 'Pay' })
    // axios.get('/customer/merchantProduct/detail/'+item.productId).then((res) => {
     
    //   this.props.history.push({ pathname: 'Pay' ,state: { item:  item.orderNo,title:"订单详情",detail:0,detailproducts:res.data.attach,productId:item.productId  }})
    //    })

  }


  releasecomment=(item)=>
  {
   this.props.history.push({ pathname: 'ReleaseComments' ,state: { item: item }})
  }
  render() {
    const detail =
    {
      ToReleaseComments: this.ToReleaseComments,
      Refund: this.Refund,

    }
    const HaederBack =
    {
      headerBack: this.back
    }
  
    const  collectionAction=
    {
      collectionAction:this.collectionAction,
      releasecomment:this.releasecomment
    }

    return (
      <div>
        <Header HaederBack={HaederBack} title={"订单管理"}></Header>
        <div className={styles.tabDiv}>
          <Tabs tabs={tabs}
            initialPage={0}
            tabBarActiveTextColor='#FB437A'
            tabBarUnderlineStyle={{ border: '1px solid #FB437A' }}
            onChange={(tab, index) => {
              array=[]
              this.setState({
                tabIndex: index,
                pageNum:1,
                OrderManagement:[]
              })
              this.orderRequest(index)
            }}
            onTabClick={(tab, index) => {
              array=[]
              this.setState({
                tabIndex: index,
                pageNum:1,
                OrderManagement:[]
             
              })
              // this.orderRequest(index)
              
            }}
          >
            {/* <div  className={styles.OrderManagementCsss}> */}
         {this.state.OrderManager.length == 0?
         <div>
           <img src={nocomment} className={styles.nocommentImage}></img>
         </div>:

            <PullToRefresh
          damping={60}
          ref={el => this.ptr = el}
          style={{
            height:this.state.height<510?this.state.height*0.8:this.state.height,  
            overflow: 'auto',
            paddingBottom: '50vw'
          }}
          indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
          direction={this.state.down ? 'down' : 'up'}
          refreshing={this.state.refreshing}
          onRefresh={() => {
          
            this.setState({
               pageNum:this.state.pageNum+1
            })
            this.orderRequest(this.state.tabIndex)
          }}
        >
              { this.state.OrderManager.map((item,key) =>
                <OrderManager key={key} tabIndex={this.state.tabIndex} collectionAction={collectionAction} data={item} refund={this.Refund}></OrderManager>
              )}
        
        </PullToRefresh>}
           
            {/* </div> */}
            {/* */}
         
            {/* {this.state.tabIndex == 1 ? <OrderItem index={this.state.tabIndex}></OrderItem> :
              <div>

                {this.state.tabIndex == 2 ? <OrderItem detail={detail} index={this.state.tabIndex}></OrderItem> :
                  this.state.tabIndex == 3 ? <div> <OrderItem detail={detail} index={this.state.tabIndex}></OrderItem></div> :
                    this.state.tabIndex == 4 ? <div> <OrderItem index={this.state.tabIndex}></OrderItem></div> :
                      null}
              </div> */

            }




            {/* {
              tabs.map((item) =>
                <div >
                  {
                    this.state.liteData.map((item) =>
                      <ListItem key={item.id} list={item} detail={detail} ></ListItem>
                    )
                  }

                </div>
              )
            } */}


          </Tabs>
          <WhiteSpace />

        </div>
      </div>
    );
  }

}

export default OrderManagement;



