import React, { Component } from 'react';
import { Accordion } from 'antd-mobile';
import { Button } from 'antd-mobile';
import fh from '../../image/fh.png'
import { List, DatePicker, PickerView } from 'antd-mobile';
import styles from './OrderList.css'
import Order from '../Tool/Order/Order'
import {createHashHistory} from 'history'
import CommentListAdmin from '../Tool/CommentListAdmin/CommentListAdmin'
import wx from 'weixin-js-sdk'

const season = [
    {
        label: '已审核',
        value: '已审核',
    },
    {
        label: '全部',
        value: '全部',
    },
    {
        label: '未审核',
        value: '未审核',
    },
];
class AdminCommentList extends Component {


    constructor(props) {
        super(props);

        this.state = {
            time: '开始时间',
            timeend: '结束时间',
            value: null,
            picker: false,
         

        };
    }

    componentDidMount() {
        this.getconfig()
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
                imgUrl: global.constants.shareDetail, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
            });
        });
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
                        评论列表
                   </div>

                    <div className={styles.HeaderImage} s></div>

                </div>

                {/* 功能暂缓 */}
                {/* <div className={styles.allDIv} onClick={this.picker}>
                    <div className={styles.alldiv1} >
                        全部
                    </div>
                </div> */}
               <div className={styles.CommentListAdminCss}>
               <CommentListAdmin></CommentListAdmin>
               </div>
                

            </div>
        );
    }

}

export default AdminCommentList;