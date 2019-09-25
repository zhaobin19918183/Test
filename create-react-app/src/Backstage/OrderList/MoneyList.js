import React, {Component} from 'react';
import {Accordion} from 'antd-mobile';
import {Button} from 'antd-mobile';
import fh from '../../image/fh.png'
import {List, DatePicker, PickerView,Toast} from 'antd-mobile';
import styles from './OrderList.css'
import Order from '../Tool/Order/Order'
import {createHashHistory} from 'history'
import bill from '../../image/bill.png'
import axios from 'axios'
import wx from 'weixin-js-sdk'

const season = [
    {
        label: '已打款',
        value: '已打款',
    },
    {
        label: '全部',
        value: '全部',
    },
    {
        label: '未打款',
        value: '未打款',
    },
];

class MoneyList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            initdata: [],
            time: '开始时间',
            timeend: '结束时间',
            value: null,
            picker: false

        };
    }

    componentDidMount() {
        this.getInitData();
        this.weixinAction();
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
                imgUrl:  global.constants.shareDetail // 分享图标

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

    getInitData = () => {
      
        axios.post('/customer/merStatistics/billDetial', {id: sessionStorage.getItem("UserInformationID")}).then((res) => {
            // console.log(res)
            this.setState({
                initdata: res.data.attach
            })
        })
    }

    searchMoney = () => {
        let obj = {
            merId: 1,
            startTime: this.state.time,
            endTime: this.state.timeend
        };
        axios.post('/customer/merStatistics/billDetialByDate', obj).then((res) => {
            // console.log(res)
            this.setState({
                initdata: res.data.attach
            })
        })
    }

    searchByDate = (num) => {
        axios.post('/customer/merStatistics/billDetialTime', {merId:  Number(sessionStorage.getItem("UserInformationID")) , dateType: num}).then((res) => {
            // console.log(res)
        if(res.data.code == "0")
        {
            this.setState({
                initdata: res.data.attach
            })
        }
        else
        {
            Toast.info(res.data.message)
        }
          
        })
    }

    onScrollChange = (value) => {
        // console.log("onScrollChange == " + value);
    }

    formatDate(date) {
        /* eslint no-confusing-arrow: 0 */
        const pad = n => n < 10 ? `0${n}` : n;
        const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
        return `${dateStr}`;
    }

    back = () => {
        const history = createHashHistory()
        history.goBack();
    }
    godetail = () => {
        this.props.history.push({pathname: 'UserInformation'})
    }
    onChange = (value) => {
        // console.log("onChange == " + value);

    }
    picker = () => {
        this.setState({
            picker: true
        })
    }
    pickerclose = () => {
        this.setState({
            picker: false
        })
    }

    render() {
        return (
            <div className={this.state.picker ? styles.data : styles.data1}>

                <div className={styles.Header}>
                    <img className={styles.HeaderImageLeft} src={fh} onClick={this.back}></img>

                    <div className={styles.Headertitle}>
                        金额列表
                    </div>

                    <div className={styles.HeaderImage} s></div>

                </div>


                <div style={{backgroundColor: 'white', width: '100%'}}>


                    <div className={styles.timediv}>
                        <div className={styles.time}>
                            <DatePicker
                                mode="date"
                                title="开始时间"
                                value={this.state.date}
                                onOk={date =>
                                    this.setState({
                                        time: this.formatDate(date)
                                    })

                                }
                            >
                                <div className={styles.startTime}>
                                    {this.state.time}
                                </div>

                            </DatePicker>
                        </div>
                        <div className={styles.zhi}>
                            至
                        </div>
                        <div className={styles.time}>
                            <DatePicker
                                mode="date"
                                title="结束时间"
                                value={this.state.date}
                                minDate={new Date(this.state.time)}
                                onOk={date =>
                                    this.setState({
                                        timeend: this.formatDate(date)
                                    })

                                }
                            >
                                <div className={styles.startTime}>
                                    {this.state.timeend}
                                </div>

                            </DatePicker>
                        </div>

                    </div>
                    <Button type="primary" onClick={this.searchMoney} style={{
                        'backgroundColor': '#6C98F7',
                        'borderRadius': '25px',
                        'margin': '0 15px',
                        'height': '10vw',
                        'line-height': '10vw'
                    }}>查询</Button>
                </div>
                <div className={styles.Money}>
                    <div className={styles.MoneyItemList}>
                        <div className={styles.MoneyItem} onClick={this.searchByDate.bind(this, 1)}>一周</div>
                        <div className={styles.MoneyItem} onClick={this.searchByDate.bind(this, 2)}>一个月</div>
                        <div className={styles.MoneyItem} onClick={this.searchByDate.bind(this, 3)}>三个月</div>
                        <div className={styles.MoneyItem} onClick={this.searchByDate.bind(this, 4)}>半年</div>
                    </div>
                </div>

                <div className={styles.MoneyItemDetail}>
                    <div className={styles.MoneyOder}>
                        <img src={bill} className={styles.MoneyOderImage}></img>
                        <div className={styles.MoneyOderTitle}>账单详情</div>
                    </div>
                    <div className={styles.MoneyItemDetailDiv}>
                        <div className={styles.MoneyOderLeft}>
                            <div className={styles.MoneyOderLeftTitle}>{this.state.initdata.orderCount?this.state.initdata.orderCount:0}</div>
                            <div className={styles.MoneyOderLeftCOntent}>支付订单(单)</div>
                        </div>
                        <div className={styles.MoneyOderRight}>
                            <div className={styles.MoneyOderRIghtTitle}>{this.state.initdata.totalAmount?this.state.initdata.totalAmount:0}</div>
                            <div className={styles.MoneyOderRIghtOntent}>结算金额(元)</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default MoneyList;


