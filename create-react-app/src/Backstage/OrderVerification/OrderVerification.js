/*
   OrderVerification  
*/
import React, { Component } from 'react';
import styles from './OrderVerification.css'
import Menu from '../../image/Menu.png'
import fh from '../../image/fh.png'
import money_sum from '../img/9.png'
import QRcode from '../Tool/QRcode/QRcode'
import Order from '../Tool/Order/Order'
import { createHashHistory } from 'history'
import { Toast } from 'antd-mobile';
import axios from 'axios'
import wx from 'weixin-js-sdk'
var dataArray = []
class OrderVerification extends Component {


    constructor(props) {
        super(props);

        this.state = {
            qrDataList: [{ id: sessionStorage.getItem("UserInformationID") }],
            appId: '',
            timestamp: '',
            nonceStr: '',
            signature: '',
            openid: '',
            token: '',
            initdata: [],
            verifyCode: '',
            order: false

        };
    }

    componentDidMount() {
        document.title = "订单验证"
        this.secondQR();
        // Toast.info( sessionStorage.getItem("orderInfo").orderNo)

        this.getconfig();

    }

    getconfig(){
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


    secondQR() {
        axios.post("/customer/WeiXinScan/scan",
            {
                'url': encodeURIComponent(window.location.href.split('#')[0])
            },
            {
                openid: sessionStorage.getItem("user_openid"),
                token: sessionStorage.getItem("user_token"),
                'content-type': 'application/json'
            }
        ).then((res) => {



            this.setState({
                appId: res.data.attach.appId,
                timestamp: res.data.attach.timestamp,
                nonceStr: res.data.attach.nonceStr,
                signature: res.data.attach.signature,
            })

            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.attach.appId, // 必填，公众号的唯一标识
                timestamp: res.data.attach.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.attach.nonceStr, // 必填，生成签名的随机串
                signature: res.data.attach.signature,// 必填，签名
                jsApiList: ['chooseImage',
                    'uploadImage',
                    'scanQRCode',
                    'getLocalImgData',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareQZone',
                    'onMenuShareTimeline',
                    'openLocation',
                    'getLocation',
                    'translateVoice']

            });


        }).catch(function (error) {
            console.log(error);
            window.location.reload()
          });

  



    }

    onScanQRCode = () => {
        wx.ready(() => {

            wx.checkJsApi({
                jsApiList: ['chooseImage', 'uploadImage', 'scanQRCode', 'getLocalImgData', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareTimeline', 'openLocation', 'getLocation'], // 必填，需要使用的JS接口列表
                success: function (res) {
                    wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        desc: 'scanQRCode desc',
                        success: function (res) {
                        
                            var result = res.resultStr;

                            axios.post('/customer/VerifyOrder/orderInfo', { verifyCode: result }).then((res) => {

                                if (res.data.code == '0') {
                                    // Toast.info(res.data.message, 2);
                                    sessionStorage.setItem("orderInfo", JSON.stringify(res.data.attach[0]))
                                    sessionStorage.setItem("show", '0')
                                    window.location.reload()

                                } else {
                                    // if (res.data.code == 2026) {
                                    //     Toast.info(res.data.message, 2);
                                    // }
                                    Toast.info(res.data.message, 2);

                                }

                            })

                        },
                        error: function (err) {
                            Toast.info("扫描失败::扫描码" );
                        }

                    });
                }
            });

        });

    }

    // 扫描二维码
    scanningQR = () => {
        // alert(this.state.verifyCode)

    }

    back = () => {
        const history = createHashHistory()
        history.goBack();
    }

    render() {

        const onScanQRCode = {
            onScanQRCode: this.onScanQRCode
        }
        return (
            <div>
                <div className={styles.Header}>
                    <img className={styles.HeaderImageLeft} src={fh} onClick={this.back}></img>

                    <div className={styles.Headertitle}>
                        订单验证
                    </div>

                    <div className={styles.HeaderImage} s></div>

                </div>
                <QRcode onScanQRCode={onScanQRCode}></QRcode>
                {/*  sessionStorage.setItem("orderInfo",JSON.stringify(res.data.attach[0])) */}
                {sessionStorage.getItem("show") == '0' ? <Order orderList={this.state.qrDataList}></Order> : null}

            </div>
        );
    }

}

export default OrderVerification;



