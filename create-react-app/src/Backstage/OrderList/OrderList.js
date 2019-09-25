import React, { Component } from 'react';
import { Accordion } from 'antd-mobile';
import { Button } from 'antd-mobile';
import fh from '../../image/fh.png'
import { PullToRefresh, DatePicker, PickerView, Toast } from 'antd-mobile';
import styles from './OrderList.css'
import OrderMenuList from '../Tool/Order/OrderMenuList'

import { createHashHistory } from 'history'
import axios from 'axios'
import wx from 'weixin-js-sdk'
var array = []
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
class OrderList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time: '开始时间',
            timeend: '结束时间',
            value: null,
            picker: false,
            qrDataList: [],
            orderNumber: '',
            pageSize: 10,
            pageNum: 1,
            height: document.documentElement.clientHeight,
        };
    }

    componentDidMount() {
        array = [];
        this.weixinAction()
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

    orderChange(e) {
        this.setState({
            orderNumber: e.target.value
        })
        array= []
    }

    searchOrder = () => {
        // 清空列表
   
  
        if (this.state.orderNumber != '') {
            axios.get('/customer/merchantProduct/order/list?merchantId=' + sessionStorage.getItem("UserInformationID") + '&startTime=' + (this.state.time == '开始时间' ? null :
                this.state.time) + '&endTime=' + (this.state.timeend == '结束时间' ? null : this.state.timeend) + '&orderNo=' + this.state.orderNumber + '&pageSize=' + this.state.pageSize + '&pageNum=' + this.state.pageNum).then((res) => {
                    // console.log(res)
                    if (res.data.code == "0") {
                        Toast.success(res.data.message,1)
                        {
                            res.data.attach.map(function (el, index) {

                                array.push(
                                    el
                                )
                            })
                        }
                        this.setState({
                            qrDataList: array
                        })

                    }
                    else {
                        Toast.info(res.data.message)
                    }

                })
        } else {

            if(this.state.pageNum == 1)
            {
             array = [],
             this.setState({
                qrDataList: []
            })
            }
           
            axios.get('/customer/merchantProduct/order/list?merchantId=' + sessionStorage.getItem("UserInformationID") + '&startTime=' + (this.state.time == '开始时间' ? null :
                this.state.time +' 00:00:00') + '&endTime=' + (this.state.timeend == '结束时间' ? null : this.state.timeend +' 23:59:59') + '&pageSize=' + this.state.pageSize + '&pageNum=' + this.state.pageNum).then((res) => {
               
                    // console.log(res)
                    if (res.data.code == "0") {
                        Toast.success(res.data.message,1)
                        {
                            res.data.attach.map(function (el, index) {

                                array.push(
                                    el
                                )
                            })
                        }
                        this.setState({
                            qrDataList: array
                        })

                    }
                    else {
                        Toast.info(res.data.message)
                    }

                })
        }


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
        this.props.history.push({ pathname: 'UserInformation' })
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
                {/* 功能暂缓 */}
                {/* {this.state.picker ? <div className={styles.mask}>
                    <div className={styles.pickerDiv}>
                        <div className={styles.divHeader}>

                            <div className={styles.divHeaderleft} onClick={this.pickerclose} >关闭</div>
                            <div className={styles.divHeaderight} onClick={this.pickerclose}>确定</div>
                        </div>
                        <PickerView
                            onScrollChange={this.onScrollChange}
                            data={season}
                            cascade={false}
                            onChange={this.onChange}
                        />
                    </div>
                </div> : null} */}

                <div className={styles.Header}>
                    <img className={styles.HeaderImageLeft} src={fh} onClick={this.back}></img>

                    <div className={styles.Headertitle}>
                        订单列表
                   </div>

                    <div className={styles.HeaderImage}></div>

                </div>

                {/* 功能暂缓 */}
                {/* <div className={styles.allDIv} onClick={this.picker}>
                    <div className={styles.alldiv1} >
                        全部
                    </div>
                </div> */}

                <div style={{ backgroundColor: 'white', width: '100%', paddingTop: '2vw' }}>
                    <div className={styles.timediv}>
                        <div className={styles.time}>
                            <DatePicker mode="date" extra="开始时间" value={this.state.date} onOk={date =>
                               
                                this.setState({
                                    time: this.formatDate(date),
                                    qrDataList: [],
                                })
                               
                            }>
                                <div className={styles.startTime}>
                                    {this.state.time}
                                </div>
                            </DatePicker>
                        </div>
                        <div className={styles.zhi}>
                            至
                        </div>
                        <div className={styles.time}>
                            <DatePicker mode="date" extra="结束时间" value={this.state.date} minDate={new Date(this.state.time)} onOk={date =>
                                this.setState({
                                    timeend: this.formatDate(date),
                                    qrDataList: [],
                                })
                               
                            }
                            >
                                <div className={styles.startTime}>
                                    {this.state.timeend}
                                </div>
                            </DatePicker>
                        </div>
                    </div>
                </div>

                <div className={styles.alldiv3}>
                    <input className={styles.alldiv2} placeholder="请输入订单号" onChange={this.orderChange.bind(this)}></input>
                    <div className={styles.button} onClick={this.searchOrder}>查询</div>
                </div>
                <PullToRefresh
                    damping={60}
                    ref={el => this.ptr = el}
                    style={{
                        height: this.state.height < 510 ? this.state.height * 0.9 : this.state.height,
                        overflow: 'auto',
                    }}
                    indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction={this.state.down ? 'down' : 'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({
                            pageNum: this.state.pageNum + 1
                        })
                        this.searchOrder()
                    }}
                >
                    <div className={styles.order}>
                        {/* <Order orderList={this.state.qrDataList}></Order> */}
                        <OrderMenuList orderList={this.state.qrDataList}></OrderMenuList>
                    </div>

                </PullToRefresh>


            </div>
        );
    }

}

export default OrderList;


