/*
   IntegralHome  我的
*/
import React, { Component } from 'react';
import styles from './IntegralHome.css'
import header from './images/header.png'
import phone from './images/phone.png'
import icon001 from './images/icon-in-001.png'
import icon002 from './images/icon-in-002.png'
import icon003 from './images/icon-in-003.png'
import icon_1 from './images/icon-1.png'
import icon_2 from './images/icon-2.png'
import icon_3 from './images/icon-3.png'
import guanli from './images/guanli.png'
import secondcode from './images/secondcode.png'
import mymoney from './images/mymoney.png'
import setting from './images/setting.png'
import inco1 from '../../image/inco1.png'
import customer from '../../image/customer.png'
import inco2 from '../../image/inco2.png'
import inco3 from '../../image/inco3.png'
import inco4 from '../../image/inco4.png'
import inco5 from '../../image/inco5.png'
import inco6 from '../../image/inco6.png'
import share from '../../image/share.png'
import initImg from '../../image/init_headerImg.png'
import { Grid } from 'antd-mobile';
import axios from 'axios';
import IntegralMask from './IntegralMask'
import IntegralRule from './IntegralRule'
import wx from 'weixin-js-sdk'
class IntegralHome extends Component {


    constructor(props) {
        super(props);

        this.state = {
            userInfo: [],
            setting: false,
            detail: '',
            rule: false,
            login: false,
            share: false,
            dataCustomer: [

                {
                    icon: inco5,
                    text: `我的收藏`,
                    id: 2
                },
                {
                    icon: inco1,
                    text: `用户规则`,
                    id: 3
                },
                {
                    icon: inco2,
                    text: `商户入驻`,
                    id: 4
                },
                {
                    icon: inco3,
                    text: `客服电话`,
                    id: 5
                },
                {
                    icon: inco6,
                    text: `分享推荐`,
                    id: 6
                },
                {
                    icon: customer,
                    text: `更多精彩`,
                    id: 1
                },
            ],
            data: [

                {
                    icon: inco5,
                    text: `我的收藏`,
                    id: 2
                },
                {
                    icon: inco1,
                    text: `用户规则`,
                    id: 3
                },
                {
                    icon: inco2,
                    text: `商户入驻`,
                    id: 4
                },
                {
                    icon: inco3,
                    text: `客服电话`,
                    id: 5
                },
                {
                    icon: inco6,
                    text: `分享推荐`,
                    id: 6
                },
                {
                    icon: guanli,
                    text: `进入管理`,
                    id: 1
                },
            ]
        };
    }

    closeShare = () => {

        this.setState({
            share: false
        })
    }
    navigationTo = (index) => {
        sessionStorage.setItem("selectedTab", "yellowTab")
        if (index.id == 6) {
            this.setState({
                share: true
            })
        }
        if (index.id == 3) {

            this.setState({
                rule: true
            })
        }
        if (index.id == 4) {
            this.props.state.props.history.push({ pathname: 'Businessresident' })
        }
        if (index.id == 2) {
            this.props.state.props.history.push({ pathname: 'MyCollection' })
        }
        if (index.id == 5) {


            window.location.href = 'tel:' + this.state.userInfo.customerServiceMobile


        }
        if (index.id == 1) {


            // console.log(this.state.userInfo)
            if (this.state.userInfo.role == "merchant") {
                window.location.href ="UserInformation"
                // this.props.state.props.history.push({ pathname: 'UserInformation' })
                sessionStorage.setItem("UserInformationID", this.state.userInfo.merchantId)
            }


        }


    }
    componentWillMount() {
        // console.log(sessionStorage.getItem("registered"))
        if (sessionStorage.getItem("registered") == "false") {

            this.props.state.props.history.push({ pathname: 'LoginIn' })

        }

        // this.props.state.props.history.push({ pathname: 'LoginIn'})

    }
    navigationToMyIntegral = (index) => {

        sessionStorage.setItem("selectedTab", "yellowTab")
        this.props.state.props.history.push({ pathname: 'MyIntegral' })


    }
    setting = () => {

        this.setState({
            setting: !this.state.setting,
            detail: 'admin'
        })

    }
    navigationToComment = (index) => {
        sessionStorage.setItem("selectedTab", "yellowTab")

        this.props.state.props.history.push({ pathname: 'Comment' })

    }
    navigationToOrderManagement(index) {
        sessionStorage.setItem("selectedTab", "yellowTab")
        window.location.href = "OrderManagement?item="+index
        // this.props.state.props.history.push({ pathname: 'OrderManagement', state: { item: index } })

    }
    componentDidMount() {

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

                // console.log("ready")
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

        }).catch(function (error) {
            console.log(error);
            window.location.reload()
          });


  



        var obj = { id: '3' }

        axios.post('/customer/ScanCodeIntegral/getUserInfo', JSON.stringify(obj)).then((res) => {



        })


        axios.get('/customer/userProfile/info').then((res) => {
            // console.log(res)
            // merchant 
            this.setState({
                userInfo: res.data.attach
            })
        })

    }
    secodeOcode = () => {
        this.setState({
            setting: !this.state.setting,
            detail: this.state.userInfo.idQRCode
        })
    }
    Admin = (id) => {

        if (id == 1) {
            this.props.state.props.history.push({ pathname: 'UserInformation' })
        }
        if (id == 0) {
            this.setState({
                setting: !this.state.setting
            })
        }
    }
    close = (id) => {
        this.setState({
            rule: false
        })
    }

    goToRuleDetail = (id) => {
        this.props.state.props.history.push({ pathname: 'RuleDetail', state: { ruleId: id } })

    }
    render() {
        const admin =
        {
            admin: this.Admin
        }
        const close =
        {
            close: this.close,
            goToRuleDetail: this.goToRuleDetail
        }
        return (
            <div style={{ background: '#FFFFFF' }}>
                {this.state.setting ? <IntegralMask detail={this.state.detail} admin={admin}></IntegralMask> : null}
                {this.state.rule ? <IntegralRule close={close}></IntegralRule> : null}
                {this.state.share ? <img src={share} className={styles.shareimage} onClick={this.closeShare}></img> : null}
                <div className={styles.aui_head_chang}>
                    <div className={styles.aui_palace}>
                        <a href="#" className={styles.aui_palace_grid_1}>
                            {
                                this.state.userInfo.headimgurl?
                                <img src={this.state.userInfo.headimgurl} className={styles.headerimage} alt="" />:
                                <img src={initImg} className={styles.headerimage} alt="" />
                            }

                            <div className={styles.aui_palace_grid_text}>
                                <h2 className={styles.heaertitle}>{this.state.userInfo.nickname}</h2>
                                <div className={styles.headercontent}>
                                    <img src={phone} className={styles.phoneimage} alt="" />
                                    <div className={styles.phoneNumber}>{this.state.userInfo.mobile}</div>
                                </div>
                            </div>
                            {/* <img src={setting} onClick={this.setting} className={styles.setting} alt=""/> */}
                        </a>
                    </div>
                </div>

                <div className={styles.aui_palace_one}>
                    <a className={styles.aui_palace_grid} onClick={this.navigationToOrderManagement.bind(this, 3)}>
                        <div className={styles.aui_palace_grid_icon} onClick={this.navigationToOrderManagement.bind(this, 3)}>
                            <img src={icon001} className={styles.tab21} alt="" />
                        </div>
                        <div className={styles.aui_palace_grid_text1}>
                            优惠订单
                        </div>
                    </a>
                    <a className={styles.aui_palace_grid}>
                        <div className={styles.aui_palace_grid_icon}>
                            <img src={secondcode} onClick={this.secodeOcode} className={styles.tab1} alt="" />
                        </div>
                        <div className={styles.aui_palace_grid_text1}>
                            我的二维码
                        </div>
                    </a>
                    {/* <a  className={styles.aui_palace_grid} >
                     <div className={styles.aui_palace_grid_icon}>
                         <img src={mymoney} className={styles.tab1} alt=""/>
                     </div>
                     <div className={styles.aui_palace_grid_text}>
                         <h2 >我的贷款</h2>
                     </div>
                 </a> */}
                </div>
                <div className={styles.lineDiv} />
                {/* 
             <div className={styles.tab2}>
                 <a onClick={this.secodeOcode} className={styles.aui_palace_grid}>
                     <div className={styles.aui_palace_grid_icon}>
                         <img src={icon_2} alt=""/>
                     </div>
                     <div className={styles.aui_palace_grid_text}>
                         <h2>分享二维码</h2>
                     </div>
                 </a>
                 <a onClick={this.navigationToMyIntegral} className={styles.aui_palace_grid}>
                     <div className={styles.aui_palace_grid_icon}>
                         <img src={icon_1} alt=""/>
                     </div>
                     <div className={styles.aui_palace_grid_text} >
                         <h2>我的积分</h2>
                     </div>
                 </a>
                 <a onClick={this.navigationToComment} className={styles.aui_palace_grid}>
                     <div className={styles.aui_palace_grid_icon}>
                         <img src={icon_3} alt=""/>
                     </div>
                     <div className={styles.aui_palace_grid_text}>
                         <h2>我的贷款</h2>
                     </div>
                 </a>
             </div> */}
                <div className={styles.girdTitle}>商城服务</div>
                <Grid itemStyle={{ color: 'red' }} onClick={this.navigationTo} data={this.state.userInfo.role == "merchant" ? this.state.data : this.state.dataCustomer} columnNum={3} />

                {/* <div><a href={'tel:' + this.state.userInfo.mobile} ></a>111111</div>  */}
            </div>

        );
    }

}

export default IntegralHome;



