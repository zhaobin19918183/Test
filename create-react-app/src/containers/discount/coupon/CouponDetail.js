/*
   CouponDetail  
*/
import React, { Component } from 'react';
import CouponitemDetail from '../../../Tool/Coupon/CouponitemDetail';
import styles from './Coupondetailcss.css'
import Location from '../../../Tool/Location/Location'
import BusinessInformation from '../../../Tool/BusinessInformation/BusinessInformation'
import Comment from '../../../Tool/Comment/Comment'
import Footer from '../../../Tool/Footer/Footer'
import nocomment from '../../../image/nocomment.png'
import axios from 'axios';
import Header from '../../../Tool/Header/Header'
import wx from 'weixin-js-sdk'
import {createBrowserHistory} from 'history' 
var   number = 0
class CouponDetail extends Component {


    constructor(props) {
        super(props);

        this.state = {
            number: 2,
            showhidden: true,
            detailproducts: [],
            merchant: [],
            detailData: [],
            commentlist: [],
            CommentBool: false,
            shopId: '',
            item:'',
            priceTag:''
        };
    }
    getconfig() {
        var merchantName =   this.state.merchant.merchantName
        var title = this.state.detailproducts
       
      
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
    componentDidMount() {
        document.title = "优惠券详情"
        let { search } = window.location

        let paramsString = search.substring(1)
        let searchParams = new URLSearchParams(paramsString)
        let item = searchParams.get('item')
        let shopId = searchParams.get('shopId')
        
        // window.history.pushState(null, null, document.URL); //禁止网页返回上一页
        // window.addEventListener('popstate', function() { 
        
             
        //     if(number == 1)
        //     {
        //         window.history.go(-1);
        //     }
        //     if(number == 0)
        //     {
        //       number = number + 1
        //     }
            

        // });


        this.setState({
            shopId: shopId,
            item:item
        })


        this.getCommentList(shopId)
      
        axios.get('/customer/merchantProduct/detail/' + item).then((res) => {

            this.setState({
                detailproducts: res.data.attach,
                priceTag:res.data.attach.priceTag
            })
            this.weixinAction()
        })

        axios.get('/customer/merchant/info/' + shopId).then((res) => {


            this.setState({
                merchant: res.data.attach
            })
        })

  
    }
    getCommentList(shopId) {
        var obj = { merchantId: shopId, pageNum: 1, pageSize: 3 }
     
      
        axios.post('/customer/userMerchantComment/commentlist', JSON.stringify(obj)).then((res) => {
       
            if (res.data.attach == null) {

            } else {
                this.setState({
                    commentlist: res.data.attach,
                    CommentBool: true
                })
            }
        })

    }
    back = () => {
        
        // const history = createBrowserHistory();
        // history.goBack();
    }

    CommentList = () => {

        // console.log("评论分页")
    }
    ToCommentDetail = () => {
        this.props.history.push({ pathname: 'CommentDetail', state: { merchantId: this.state.shopId } })

    }
    ToBuyDetail = (item) => {
        // console.log(this.props.history.location.state.item)
        if (sessionStorage.getItem("registered") == "false") {
            window.scrollTo(0, 0);
            this.props.history.push({ pathname: 'LoginIn' })
        }
        else {
            window.scrollTo(0, 0);
            console.log(item)
            this.props.history.push({ pathname: 'buyDetail', state: { detail: this.state.item, detailproducts: this.state.detailproducts } })
        }


    }
    gotoMayp = () => {

        // console.log( this.state.merchant.coordinate)
        this.props.history.push({ pathname: 'Mine', state: { location: this.state.merchant } })

    }
    render() {
        const buyDetail =
        {
            ToBuyDetail: this.ToBuyDetail
        }
        const HaederBack =
        {
            headerBack: this.back
        }
        const map =
        {
            goToMap: this.gotoMayp
        }
        const ToCommentDetail =
        {
            ToCommentDetail: this.ToCommentDetail,
            CommentList: this.CommentList
        }
        return (
            <div className={styles.coupon}>
                <Header HaederBack={HaederBack} title={"优惠券详情"}></Header>
                <CouponitemDetail products={this.state.detailproducts} showhidden={this.state.showhidden}></CouponitemDetail>
                <div className={styles.couponTitle}>
                    <div className={styles.couponTitle1}>
                        {this.state.priceTag.replace(/,/g, " | ")}
                    </div>
                    <div className={styles.couponTitle2}>
                        已售{this.state.detailproducts.salesCount}
                    </div>
                </div>

                <div className={styles.couponConttitle1}>
                    活动详情
                </div>
                <div className={styles.couponConttitle2} dangerouslySetInnerHTML = {{ __html: this.state.detailproducts.activityDetail }} >
                    {/* {this.state.detailproducts.activityDetail} */}
                </div>
                <div className={styles.couponConttitle1}>
                    使用规则
                </div>
                <div className={styles.couponConttitle2} dangerouslySetInnerHTML = {{ __html: this.state.detailproducts.useRules }} >
                    {/* {this.state.detailproducts.useRules} */}
                </div>
                <BusinessInformation merchant={this.state.merchant}></BusinessInformation>
                <Location map={map} data={this.state.merchant}></Location>
                <div className={styles.bottiomComment}>

                    {this.state.CommentBool ? <Comment pull={false} ToCommentDetail={ToCommentDetail} commentlist={this.state.commentlist} ></Comment> : null}
                    {this.state.CommentBool == false ? <img src={nocomment} className={styles.nocommentImage}></img> : null}
                </div>

                <Footer detai={this.state.detailproducts} buyDetail={buyDetail}></Footer>

            </div>
        );
    }

}

export default CouponDetail;



