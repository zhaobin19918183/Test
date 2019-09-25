/*
   DiscountDetail 
*/
import React, { Component } from 'react';
import CouponItem from '../../Tool/Coupon/CouponItem';
import About from '../../Tool/AboutShop/Aboutshop'
import Location from '../../Tool/Location/Location'
import styles from './discount.css'
import axios from 'axios';
import MerchandiseShow from '../../Tool/MerchandiseShow/MerchandiseShow'
import CollectionItem from '../../Tool/CollectionItem/CollectionItem'
import { ListItem, Shopusermessage, CarouselTool } from '../../Tool/ToolRouter'
import CarouselToolDetail from '../../Tool/Carousel/DetailCarousel'
import Header from '../../Tool/Header/Header'
import AddressLocation from '../../Tool/AddressLocation/AddressLocation'
import juan from '../../image/juan.png'
import collection from '../../image/collection.png'
import close from '../../image/close.png'
import { List, PullToRefresh, Accordion, Toast, Drawer, NavBar, Icon } from 'antd-mobile';
import wx from 'weixin-js-sdk'
import ScrolltoTop from '../../Tool/returnTop/ScrolltoTop'
import defaultImg from '../../image/defaultImg_big.png'

var  array=[]

class DiscountDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            detailData: [],
            products: [],
            banner: '',
            liteData: [],
            disId: 0,
            mask:false,
            autoProduct:[],
            pageNum:1,
            pageSize: 10,
            height: document.documentElement.clientHeight,
            collection:"1",

            docked: false,
            showTop: false,
            scrollTop: 0,
            bannerImage: [],
            // showMoreInfo: [],
            accordionTitle: '图文详情',
            open: false
        };

        // this.handleScroll = this.handleScroll.bind(this);
    }

    ToCouponDetail = (item) => {

        console.log(item)
        window.location.href= "CouponDetail?item="+item.id+"&shopId="+this.state.disId
        // this.props.history.push({ pathname: 'CouponDetail', state: { item: item,shopId: this.state.disId } });
        window.scrollTo(0,0);
    }

    discountautoProduct(item){
        // console.log(item)
        this.props.history.push({ pathname: 'Pay', state: { item: item.orderNo, location: this.state.detailData,shopId: this.state.disId } })
    }

    getLike(){
    //   console.log(this.state.pageNum)
      axios.get('/customer/merchant/foreground/guess/like',{
          params:{
            latitude: sessionStorage.getItem("latitude"),
            longitude:sessionStorage.getItem("longitude"),
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize
          }
        }).then(res => {
          if(res.data.code == '0')
          {
            {
              res.data.attach.map(function (el, index) {
             
                array.push(
                  el
             )
              })
            }
            this.setState({
              liteData: res.data.attach
            })
          }
        
        }).catch(res => {
  
        })
    }
  
    componentWillMount() {
        // window.addEventListener('scroll',this.handleScroll,true);
        let { search } = window.location

        let paramsString = search.substring(1)
        let searchParams = new URLSearchParams(paramsString)
        let item = searchParams.get('item')
       
        this.setState({
            disId:item
        });

        localStorage.setItem("id",item);
        
        this.getLike();
        sessionStorage.setItem("discountdetail", JSON.stringify(item));
    }

    componentDidMount() {
        document.title = "商家详情";
        // /customer/merchant/foreground/select/collection/{merchantId}
        this.weixinAction()
        this.Collection();
       
        axios.get('/customer/merchant/foreground/detail/' +  this.state.disId).then((res) => {
            // console.log("========111111===========")
            // console.log(res)
            // console.log("===========2222222========")
            if( res.data.code == "0")
            {this.setState({
                detailData: res.data.attach,
                bannerImage: res.data.attach.picUrls,
                // showMoreInfo: res.data.attach.picUrls
            })

            }
            
            // this.state.showMoreInfo.splice(this.state.showMoreInfo.length-1,1);

        });
     
        this.requestproductsAndPrize( this.state.disId);

        // this.getShowMorePic();

        
        
        // ====================================监听返回事件===============================
        // this.pushHistory();
        // window.addEventListener("popstate", function(e) {
        //     alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
        // }, false);
            
    }
    // pushHistory() {
    //     var state = {
    //         title: "title",
    //         url: "#"
    //     };
    //     window.history.pushState(state, "title", "#");
    // }



    requestproductsAndPrize(item) {
   
        axios.get('/customer/merchantProduct/productsAndPrize/'+item+'/true').then((res) => {
            //   console.log("++==============")
            //   console.log(res)
            //   console.log("++==============")
             if(res.data.attach.autoProduct == null)
             {
                this.setState({
                    mask:false
                 })
             }
             else
             {
                 this.setState({
                    mask:true,
                    autoProduct:res.data.attach.autoProduct
                 })

              
             }
          
            if (res.data.code == 0) {
                this.setState({
                    products: res.data.attach.products
                })

            }
        })

    }

    request(item) {
        axios.get('/customer/merchant/foreground/detail/' + item.id).then((res) => {
            this.setState({
                detailData: res.data.attach,
                disId:res.data.attach.id,
                bannerImage: res.data.attach.picUrls,
                // showMoreInfo: res.data.attach.picUrls
            })
            // this.state.showMoreInfo.splice(this.state.showMoreInfo.length-1,1);
            
            // document.body.scrollTop = 0;
            window.scrollTo(0,0);
        })
       
    }

    AboutShop=(item)=>{
        axios.get('/customer/merchant/foreground/collection/' + item.id).then((res) => {
        //    console.log(res)
           this.Collection()  
  
        })
    }
   
    Collection(){
        axios.get('/customer/merchant/foreground/select/collection/' +  this.state.disId).then((res) => {
            if(res.data){
                this.setState({
                    collection:res.data.attach
                })
            }
  
          })
    }

    ToDiscountDetail = (item) => {
        // Toast.loading('Loading...', 3, () => {
        //     console.log('Load complete !!!');
        // });

        this.requestproductsAndPrize(item.id)
        this.request(item)
        this.setState({
            disId:item.id
        })
        this.backHeader();
    }

    closeMask=()=>{
        this.setState({
            mask:false
        })
    }
    getconfig() {
         var merchantName =   this.state.detailData.merchantName
         var title = ""
         if(this.state.products.length!=0)
         {
             title = this.state.products[0].title
         }else
         {
             title = this.state.detailData.subtitle
         }
       
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
            title:merchantName, // 分享标题
            // desc:this.state.products.length ==0?this.state.detailData.subtitle:this.state.products[0].title,
            link: global.constants.share,
            imgUrl:  global.constants.shareDetail , // 分享图标
    
          });
    
    
          // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
    
          wx.onMenuShareAppMessage({
            title:merchantName, // 分享标题
            desc:title,
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
    
    back = () => {}

    loading = () => {
  
    }

    gotoMayp = () => {
        this.props.history.push({ pathname: 'Mine', state: { location: this.state.detailData } })
    }

    onDock (d) {
        // console.log(d)
        this.setState({
          [d]: !this.state[d],
        });
    }

    // handleScroll()
    // {
    //     if(document.getElementById('pull3'))
    //     {
       
         
    //      this.setState({
    //        scrollTop:document.getElementById('pull3').scrollTop
    //      })
     
     
     
    //    if(this.state.scrollTop>200)
    //    {
    //      this.setState({
    //        showTop:true
    //      })
    //    }
    //    else
    //    {
    //      this.setState({
    //        showTop:false
    //      })
    //    }
    //     }
    // }
  

    backHeader(){
        document.getElementById('pull3').scrollTop = 0;
    }

    // getShowMorePic(){
    //     axios.get('/customer/merchant/foreground/detail/' + this.state.disId).then((res) => {
    //         this.setState({
    //             showMoreInfo: res.data.attach.picUrls
    //         },()=>{
    //             this.state.showMoreInfo.splice(this.state.showMoreInfo.length-1,1);
    //         })
    //         // console.log(this.state.showMoreInfo)
    //     })
    // }

    showMoreChange = ()=>{
        if(this.state.open){
            this.setState({
                accordionTitle: '图文详情'
            });
        }else{
            this.setState({
                accordionTitle: '收 起'
            });
        }

        this.setState({
            open:!this.state.open
        });
    }


    render() {
        const detail =
        {
            ToDiscountDetail: this.ToDiscountDetail
        }
        const coupondetail =
        {
            ToCouponDetail: this.ToCouponDetail
        }
        const HaederBack =
        {
            headerBack: this.back
        }

        const map =
        {
            goToMap: this.gotoMayp
        }
        const aboutShop =
        {
            aboutShop:this.AboutShop
        }
        const sidebar = (
            <List>
                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
                        return (<List.Item key={index} thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png">Category{index}</List.Item>);
                    })
                }
            </List>
        );

        // const backHeader = {
        //     backHeader: this.backHeader
        // }

        const showMoreInfo = this.state.bannerImage;



        return (

            <div className={styles.discount}>

                {/* {this.state.showTop? <ScrolltoTop  backHeader={backHeader}></ScrolltoTop>:null} */}

                <PullToRefresh
                    id="pull3"
                    damping={100}
                    ref={el => this.ptr = el}
                    style={{
                        // height:this.state.height<510?this.state.height*0.72:this.state.height*0.7,
                        height: '100vh',
                        overflow: 'auto',
                        overflowY: this.state.mask ? 'hidden' : 'auto',
                        WebkitOverflowScrolling: 'touch',
                        zIndex: 10
                    }}
                    indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction={this.state.down ? 'down' : 'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                    
                        this.setState({
                        pageNum:this.state.pageNum+1
                        })
                        this.getLike()
                    }}
                    >

                <Header HaederBack={HaederBack} title={"商家详情"}></Header>
                {this.state.mask?
                <div className={styles.mask}>
                    <img src={juan} className={styles.juan} onClick={this.discountautoProduct.bind(this,this.state.autoProduct)}></img>
                    <img src={this.state.autoProduct.logo} className={styles.discountImageJuan}></img>
                    <div className={styles.juancontent}>
                        <div className={styles.juantitle}>
                        {this.state.autoProduct.title} 
                        </div>
                        <div className={styles.juanMoney}>
                        ¥ {this.state.autoProduct.salesPrice} 
                        </div>
                        <div className={styles.juannumber}>
                        市场价: ¥{this.state.autoProduct.originalPrice} 
                        </div>
                    </div>
                    <img src={close}  onClick={this.closeMask} className={styles.juancontentclose}></img>

                </div>:null}
                <Shopusermessage  data={this.state.detailData}></Shopusermessage>
                <div style={{ margin: '2vw' }}>
                    <CarouselToolDetail class={"discount"} bannerImage={this.state.bannerImage}></CarouselToolDetail>
                </div>


                {/* <MerchandiseShow></MerchandiseShow> */}

                <About   aboutShop ={aboutShop} data={this.state.detailData}  collection={this.state.collection}></About>

                <Location map={map} data={this.state.detailData}></Location>
                {this.state.products.length == 0 ? null :
                     <CouponItem products={this.state.products} coupondetail={coupondetail}></CouponItem>}


                {/* ============================================================================================================= */}

                <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.showMoreChange}>
                    <Accordion.Panel header={this.state.accordionTitle} style={{textAlign: 'center'}}>
                        <List className="my-list">
                            {
                                showMoreInfo.map((item,index)=>{
                                    return(
                                        <List.Item key={index}>
                                            <img src={item} alt="详情图片" style={{width: '100%', height: '100%', padding: '3vw 0'}} />
                                        </List.Item>
                                    )
                                })
                            }
                        </List>
                    </Accordion.Panel>
                </Accordion>
                {
                    (!this.state.open) && <div>
                        <img src={this.state.bannerImage.length != 0?this.state.bannerImage[this.state.bannerImage.length-1]:defaultImg} alt="详情图片2" style={{width: '92%', height: '100%', padding: '4vw'}} />
                    </div>
                }

                {/* ============================================================================================================= */}



                <div className={styles.like}>
                     <div className={styles.lineDIv1}></div>
                        推荐商家 
                     <div className={styles.lineDIv2}></div>
                </div>
              
                    <List style={{padding: '0 3vw'}}>
                        {
                            this.state.liteData.map((item,key) =>
                                <ListItem key={key}  list={item} detail={detail}  ></ListItem>
                            )
                        }
                    </List>
                
                </PullToRefresh>
                {/* <CollectionItem></CollectionItem> */}


            </div>
        );
    }

}
// export default withRouter(DiscountDetail);
export default DiscountDetail;



