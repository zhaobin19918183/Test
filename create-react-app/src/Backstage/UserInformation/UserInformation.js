/*
   UserInformation
*/
import React, { Component } from 'react';
import styles from './UserInformation.css'
import icon_1 from '../img/40.png'
import icon_2 from '../img/2.png'
import icon_3 from '../img/47.png'
import box_img_1 from '../img/Back_icon_1.png'
import box_img_2 from '../img/Back_icon_2.png'
import box_img_3 from '../img/Back_icon_3.png'
import box_img_4 from '../img/Back_icon_4.png'
import userInfo from '../img/userInfo.png'
import Menu from '../../image/Menu.png'
import fh from '../../image/fh.png'
import money_sum from '../img/9.png'
import { Accordion, List, Toast, Modal } from 'antd-mobile';
import axios from 'axios'
import { createHashHistory } from 'history'
import wx from 'weixin-js-sdk'

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

class UserInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true,
            userInfo: [],
            modal1: false,
            modal2: false,

        };
    }

    componentDidMount() {
        this.getuserInfo();
        this.weixinAction();
    }
    weixinAction() {

        axios.post("/customer/WeiXinScan/scan",
          {
            'url': encodeURIComponent(window.location.href.split('#')[0])
          },
          {
                 openid: sessionStorage.getItem("user_openid_new"),
                token: sessionStorage.getItem("user_token_new"),
            'content-type': 'application/json'
          }
        ).then((res) => {
       
          sessionStorage.setItem("appIdNew", res.data.attach.appId)
          sessionStorage.setItem("timestampNew", res.data.attach.timestamp)
          sessionStorage.setItem("nonceStrNew", res.data.attach.nonceStr)
          sessionStorage.setItem("signatureNew", res.data.attach.signature)
     
          this.getconfig()
   
    
    
        }).catch(function (error) {
       
         console.log(error)
        });
    
    
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

    getuserInfo = () => {
        axios.post('/customer/merStatistics/accountStatistics', { id: sessionStorage.getItem("UserInformationID") }).then((res) => {
            // console.log("==============")
            console.log(res)
            // console.log("==============")
            this.setState({
                userInfo: res.data.attach
            })
        })
    }

    onChange = (key) => {
        // console.log(key);
    }

    detailListItewm(id) {
        if (id == 1) {
            window.location.href = 'OrderVerification'
        }
        if (id == 2) {
            window.location.href = 'OrderList'
           
            // this.props.history.push({ pathname: 'OrderList' })
        }
        if (id == 3) {
            window.location.href = 'Settlement'
            // this.props.history.push({ pathname: 'Settlement' })
        }
        if (id == 4) {
            window.location.href = 'MoneyList'
            // this.props.history.push({ pathname: 'MoneyList' })
        }
        if (id == 5) {
            window.location.href = 'AdminCommentList'
            // this.props.history.push({ pathname: 'AdminCommentList' })
        }

    }

    backHome = () => {
        const history = createHashHistory();
        history.goBack();
    }
    show = () => {
        this.setState({
            show: !this.state.show
        })
    }

    notOpen() {
        Toast.info('暂未开放，敬请期待!', 2);
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    render() {
        return (
            <div className={styles.data}>
                <Modal
                visible={this.state.modal2}
                transparent
                maskClosable={false}
                onClose={this.onClose('modal2')}
                title="已核销预提现"
                footer={[{ text: '知道了', onPress: () => { console.log('ok'); this.onClose('modal2')(); } }]}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            //   afterClose={() => { alert('afterClose'); }}
            >
                     <div style={{ height: 100, overflow: 'scroll' }}>
                     顾客核销后的款项系统会自动打款处 理，T+1的时间到账，如果预提现额 低于100则会累计到100再提现。
                    </div>
                </Modal>


                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="支付未核销"
                    footer={[{ text: '知道了', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                //   afterClose={() => { alert('afterClose'); }}
                >
                    <div style={{ height: 100, overflow: 'scroll' }}>
                    顾客实际付款的订单，但尚未消费， 顾客核销后才能提现
                    </div>
                </Modal>
                <div className={styles.Header}>
                    <img className={styles.HeaderImageLeft} onClick={this.backHome} src={fh}></img>
                    <div className={styles.Headertitle}>
                        代金券验证
                    </div>
                    <img className={styles.HeaderImage} src={Menu} onClick={this.show}></img>
                </div>
                {this.state.show ?
                    <div className={styles.data_display_all}>

                        {/* 核销 */}
                        <div className={styles.headerDiv}>

                            <div className={styles.data_display_header}>
                                <p className={styles.p1}>{this.state.userInfo.payAndNoVerifyAmount ? this.state.userInfo.payAndNoVerifyAmount : 0}</p>
                                <div className={styles.icon_list}>

                                    支付未核销(元)
                                <span>
                                        <img src={userInfo} alt="" className={styles.icon_1_img} onClick={this.showModal('modal1')} />
                                    </span>
                                </div>
                            </div>

                            <div className={styles.data_display_header}>
                                <p className={styles.p2}>{this.state.userInfo.verifyAndNoSettleAmount ? this.state.userInfo.verifyAndNoSettleAmount : 0}</p>
                                <div className={styles.icon_list}>

                                    已核销预提现(元)
                                <span>
                                        <img src={userInfo} alt="" className={styles.icon_1_img} onClick={this.showModal('modal2')} />
                                    </span>
                                </div>
                            </div>

                        </div>




                        <div className={styles.data_display_center}>
                            <div className={styles.box_1}>
                                <p>{this.state.userInfo.pvCount ? this.state.userInfo.pvCount : 0}</p>
                                <span className={styles.text_span}>
                                    <img src={box_img_1} alt="" className={styles.icon_1_img} />
                                </span>
                                <span>喜欢的用户</span>
                            </div>
                            <div className={styles.box_1}>
                                <p>{this.state.userInfo.orderCount ? this.state.userInfo.orderCount : 0}</p>
                                <span>
                                    <img src={box_img_2} alt="" className={styles.icon_1_img} />
                                </span>
                                <span>总验证订单</span>
                            </div>
                            <div className={styles.box_1}>
                                <p>{this.state.userInfo.userCount ? this.state.userInfo.userCount : 0}</p>
                                <span>
                                    <img src={box_img_3} alt="" className={styles.icon_1_img} />
                                </span>
                                <span>总购买用户</span>
                            </div>
                            <div className={styles.box_1}>
                                <p>{this.state.userInfo.commentCount ? this.state.userInfo.commentCount : 0}</p>
                                <span>
                                    <img src={box_img_4} alt="" className={styles.icon_1_img} />
                                </span>
                                <span>总评论数</span>
                            </div>
                        </div>
                      </div> :



                    <div>
                        <div>
                            <Accordion defaultActiveKey="1" className="my-accordion" onChange={this.onChange}>
                                <Accordion.Panel header={
                                    <div className={styles.icon_list}>
                                        <div className={styles.div_icon}>
                                            <span>
                                                <img src={icon_1} alt="" className={styles.icon_1_img} />
                                            </span>
                                            <div className={styles.title_icon}>
                                                订单管理
                                            </div>
                                        </div>
                                    </div>
                                }>
                                    <div className={styles.my_list_item}>
                                        <List className="my-list">
                                            <List.Item style={{ marginLeft: '8vw' }} onClick={this.detailListItewm.bind(this, 1)}>订单验证</List.Item>
                                            <List.Item style={{ marginLeft: '8vw' }} onClick={this.detailListItewm.bind(this, 2)}>订单列表</List.Item>
                                            <List.Item style={{ marginLeft: '8vw' }} onClick={this.notOpen}>结算列表</List.Item>
                                            <List.Item style={{ marginLeft: '8vw' }} onClick={this.detailListItewm.bind(this, 4)}>金额查询</List.Item>
                                        </List>
                                    </div>

                                </Accordion.Panel>
                            </Accordion>


                            <Accordion defaultActiveKey="1" className="my-accordion" onChange={this.onChange}>
                                <Accordion.Panel header={
                                    <div className={styles.icon_list}>
                                        <div className={styles.div_icon}>
                                            <span>
                                                <img src={icon_2} alt="" className={styles.icon_1_img} />
                                            </span>
                                            <div className={styles.title_icon}>
                                                评论管理
                                            </div>
                                        </div>
                                    </div>
                                }>
                                    <List className="my-list">
                                        <List.Item style={{ marginLeft: '8vw' }} onClick={this.detailListItewm.bind(this, 5)}>评论列表</List.Item>
                                    </List>
                                </Accordion.Panel>
                            </Accordion>
                            <Accordion defaultActiveKey="1" className="my-accordion" onChange={this.onChange}>
                                <Accordion.Panel header={
                                    <div className={styles.icon_list}>
                                        <div className={styles.div_icon}>
                                            <span>
                                                <img src={icon_3} alt="" className={styles.icon_1_img} />
                                            </span>
                                            <div className={styles.title_icon}>
                                                活动管理
                                            </div>
                                        </div>
                                    </div>
                                }>
                                    <List className="my-list">
                                        <List.Item style={{ marginLeft: '8vw' }} onClick={this.notOpen}>奖品验证</List.Item>
                                        <List.Item style={{ marginLeft: '8vw' }} onClick={this.notOpen}>赠送抽奖</List.Item>
                                    </List>
                                </Accordion.Panel>
                            </Accordion>
                        </div>
                        {/*  */}
                    </div>}

                    <button className={styles.sub_button}  onClick={this.detailListItewm.bind(this, 1)} >去扫码核销</button>
            </div>
        );
    }
}

export default UserInformation;



