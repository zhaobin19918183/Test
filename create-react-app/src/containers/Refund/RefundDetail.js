/*
   RefundDetail  
*/
import React, { Component } from 'react'
import styles from './RefundDetail.css'
import Header from '../../Tool/Header/Header'
import axios from 'axios'
import refundImg from '../../image/refund.png'
import refund_qr from '../../image/refund_qr.jpg'
import finishIcon from '../../image/step_finish.png'
import cusIcon from '../../image/svg.svg'
import step_error from '../../image/step_error.png'


import { Radio, Card, Steps, Button, ActionSheet, Toast, Modal } from 'antd-mobile'
var number = 0
const Step = Steps.Step;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
};
var    stepArray  =[]
const customIcon = () => (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 18 18" enableBackground="new 0 0 18 18">
        <image id="image0" width="18" height="18" x="0" y="0" href={finishIcon} />
    </svg>
);
const customIconError = () => (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 18 18" enableBackground="new 0 0 18 18">
        <image id="image0" width="18" height="18" x="0" y="0" href={step_error} />
    </svg>
);

class RefundDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            HaederBack: {
                headerBack: () => { 
                    // window.history.go(-1);
                }
            },
            steps: [
                { status: 'finish', title: '退款申请已提交', des: '您的退款申请已经成功提交     2019-08-30  10:39', date: '2019-08-30  10:39' },
                { status: 'process', title: '微商城审核通过', des: '100.00元的退款申请已提交至银商支付     2019-08-30  10:39', date: '2019-08-30  10:42' },
                { status: 'error', title: '银商支付受理退款', des: '您的退款已被银商支付受理     2019-08-30  10:39', date: '2019-08-30  12:36' },
                { status: 'wait', title: '等待银商返回结果', des: '等待银商支付返回处理结果,如有任何问题请拨打微商城平台客服电话：400-117-2310，或添加微信客服"kefu001"进行咨询。     2019-08-30  10:39', date: '2019-08-31  08:26' },
            ],
            modal1: false,
            stepList: {},
            refundTime: '',
            orderNo:''
         
        };
    }

    componentDidMount() {
        this.getInitData();
        // window.history.pushState(null, null, document.URL); //禁止网页返回上一页
        // window.addEventListener('popstate', function () {
        //     window.history.go(-1);
        // });
    }

    getInitData = () => {
  
        axios.post('/customer/order/refundSchedule?orderNo=' + this.props.history.location.state.orderNo).then((res) => {
            console.log(res)
            stepArray=[]
            if (res.data.code == "0") {
              
                if(res.data.attach.refundStatus == 1)
                {
                    for(var i = 0;i < res.data.attach.dates.length -1 ;i++)
                    {
                        stepArray.push(
                            res.data.attach.dates[i]
                        )  
                    }
           
                    this.setState({
                        stepList: {"dates":stepArray,"verifyCode":res.data.attach.verifyCode,"refundStatus":res.data.attach.refundStatus,"orderAmount":res.data.attach.orderAmount}
                    })
              
                    this.formatStepData();
                }
                if(res.data.attach.refundStatus == 2||res.data.attach.refundStatus == 3||res.data.attach.refundStatus == 4)
                {
                    this.setState({
                        stepList: res.data.attach
                    })
    
                    this.formatStepSuccess();
    
                }
                if(res.data.attach.refundStatus == 6)
                {
                    for(var i = 0;i < res.data.attach.dates.length -2 ;i++)
                    {
                        stepArray.push(
                            res.data.attach.dates[i]
                        )  
                    }
                    stepArray.push(
                        res.data.attach.dates[3]
                    )  
                    this.setState({
                        stepList: {"dates":stepArray,"verifyCode":res.data.attach.verifyCode,"refundStatus":res.data.attach.refundStatus,"orderAmount":res.data.attach.orderAmount}
                    })
                    console.log(this.state.stepList)
                    this.formatStepError()
                }
              
            }

        })
    }
    formatStepSuccess = () => {
        this.state.stepList.dates[1].title = '微商城审核通过';
        this.state.stepList.dates[2].title = '银商支付受理退款';
        this.state.stepList.dates[3].title = '退款入账中';

        this.state.stepList.dates[1].des = '您的退款申请已提交至银商支付';
        this.state.stepList.dates[2].des = '您的退款已被银商支付受理';
        this.state.stepList.dates[3].des = '银商支付正将您的款项退还至原支付账户，预计最晚两小时后完成入账。如有任何问题请拨打微商城平台客服电话：400-117-2310，或添加微信客服"kefu001"进行咨询。';

        if (this.state.stepList.refundStatus == 1) {
            this.state.stepList.dates[3].title = '等待银商返回结果';
            this.state.stepList.dates[3].des = '等待银商支付返回处理结果。如有任何问题请拨打微商城平台客服电话：400-117-2310，或添加微信客服"kefu001"进行咨询。';
        }

        if (this.state.stepList.refundStatus == 3) {
            this.state.stepList.dates[0].title = '券码过期，系统发起自动退款'
            this.state.stepList.dates[0].des = '团购券过期，系统发起自动退款'
        } else {
            this.state.stepList.dates[0].title = '退款申请已提交'
            this.state.stepList.dates[0].des = '您的退款申请已经成功提交'
        }

        this.setState({
            refundTime: this.state.stepList.dates[3].date,
            stepList: this.state.stepList
        })
        // console.log(this.state.stepList)
        // return this.state.stepList
    }
    formatStepData = () => {
        this.state.stepList.dates[1].title = '微商城审核通过';
        this.state.stepList.dates[2].title = '银商支付受理退款';
        // this.state.stepList.dates[3].title = '退款入账中';

        this.state.stepList.dates[1].des = '您的退款申请已提交至银商支付';
        this.state.stepList.dates[2].des = '您的退款已被银商支付受理';
        // this.state.stepList.dates[3].des = '银商支付正将您的款项退还至原支付账户，预计最晚两小时后完成入账。如有任何问题请拨打微商城平台客服电话：400-117-2310，或添加微信客服"kefu001"进行咨询。';

        // if (this.state.stepList.refundStatus == 1) {
        //     this.state.stepList.dates[3].title = '等待银商返回结果';
        //     this.state.stepList.dates[3].des = '等待银商支付返回处理结果。如有任何问题请拨打微商城平台客服电话：400-117-2310，或添加微信客服"kefu001"进行咨询。';
        // }

        if (this.state.stepList.refundStatus == 3) {
            this.state.stepList.dates[0].title = '券码过期，系统发起自动退款'
            this.state.stepList.dates[0].des = '团购券过期，系统发起自动退款'
        } else {
            this.state.stepList.dates[0].title = '退款申请已提交'
            this.state.stepList.dates[0].des = '您的退款申请已经成功提交'
        }

        this.setState({
            // refundTime: this.state.stepList.dates[3].date,
            stepList: this.state.stepList
        })
        // console.log(this.state.stepList)
        // return this.state.stepList
    }

    formatStepError = () => {
        this.state.stepList.dates[1].title = '微商城审核通过';
        this.state.stepList.dates[2].title = '银商支付受理退款';
        // this.state.stepList.dates[3].title = '退款入账中';

        this.state.stepList.dates[1].des = '您的退款申请已提交至银商支付';
        this.state.stepList.dates[2].des = '原因:' +this.state.stepList.dates[2].errMsg+"异常代码:"+this.state.stepList.dates[2].errCode+" 请耐心等待平台进一步处理； 如有任何问题请拨打微商城平台客服电话： 400-000-0000，或添加微信客服 kefu001 进行咨询。";
        // this.state.stepList.dates[3].des = '银商支付正将您的款项退还至原支付账户，预计最晚两小时后完成入账。如有任何问题请拨打微商城平台客服电话：400-117-2310，或添加微信客服"kefu001"进行咨询。';

        // if (this.state.stepList.refundStatus == 1) {
        //     this.state.stepList.dates[3].title = '等待银商返回结果';
        //     this.state.stepList.dates[3].des = '等待银商支付返回处理结果。如有任何问题请拨打微商城平台客服电话：400-117-2310，或添加微信客服"kefu001"进行咨询。';
        // }

        if (this.state.stepList.refundStatus == 3) {
            this.state.stepList.dates[0].title = '券码过期，系统发起自动退款'
            this.state.stepList.dates[0].des = '团购券过期，系统发起自动退款'
        } else {
            this.state.stepList.dates[0].title = '退款申请已提交'
            this.state.stepList.dates[0].des = '您的退款申请已经成功提交'
        }

        this.setState({
            // refundTime: this.state.stepList.dates[3].date,
            stepList: this.state.stepList
        })
        // console.log(this.state.stepList)
        // return this.state.stepList
    }

    showActionSheet = () => {
        const BUTTONS = [<a href="tel:400-117-2310" style={{ color: '#000' }}>400-117-2310</a>, <span >微信客服</span>, '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            // destructiveButtonIndex: BUTTONS.length - 2,    //破坏性按钮（一般为删除）的索引位置(红色)
            // title: 'title',
            // message: 'I am description, description, description',
            maskClosable: true,
            'data-seed': 'logId',
            wrapProps,
        },
            (buttonIndex) => {
                if (buttonIndex == 0) {
                    window.location.href="tel:400-117-2310";
                } else if (buttonIndex == 1) {
                   
                    // this.preventDefault();
                    this.setState({
                        ['modal1']: true,
                    });

                    //微信客服
                } else if (buttonIndex == 2) {
                 
                    //取消
                }
            });
    }

    scontact_wx() {
        // alert(3)
        this.showModal('modal1')
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

    render() {
        return (
            <div className={styles.refunddetail}>
                <Header HaederBack={this.state.HaederBack} title={"退款详细"}></Header>

                <Card full className={styles.card1}>
                    <Card.Body>
                        <div>
                            <img src={refundImg} alt="" style={{ width: '6vw', verticalAlign: 'bottom', marginRight: '2vw' }} />
                            {this.state.stepList.refundStatus == 1?<span className={styles.refundTitle}> 退款中 ¥ { this.state.stepList.orderAmount}</span>:null } 
                                   {this.state.stepList.refundStatus == 2?<span className={styles.refundTitle}> 客户主动退款成功 ¥ { this.state.stepList.orderAmount}</span>:null } 
                                   {this.state.stepList.refundStatus == 3?<span className={styles.refundTitle}> 系统自动退款成功 ¥ { this.state.stepList.orderAmount}</span>:null } 
                                   {this.state.stepList.refundStatus == 4?<span className={styles.refundTitle}> 客服辅助退款成功 ¥ { this.state.stepList.orderAmount}</span>:null } 
                                   {this.state.stepList.refundStatus == 5?<span className={styles.refundTitle}> 其他 ¥ { this.state.stepList.orderAmount}</span>:null } 
                                   {this.state.stepList.refundStatus == 6?<span className={styles.refundTitle}> 退款异常 ¥ { this.state.stepList.orderAmount}</span>:null } 
                            {/* <span className={styles.refundTitle}>{(this.state.stepList.refundStatus == 1) ? '退款处理中' : (this.state.stepList.refundStatus == 2) ? '已退款' : '过期已退款'} ￥{this.state.stepList.orderAmount}</span> */}
                        </div>
                        <div className={styles.refundNumber}>
                            <label>券码：</label>
                            <span>{this.state.stepList.verifyCode}</span>
                            {/* <div className={styles.quan2}>{this.state.stepList.verifyCode}</div> */}
                        </div>
                        <div className={styles.refundTime}>
                            <span>到账时间：</span>
                            {/* <span>预计最晚 {this.state.refundTime} 到账</span> */}
                            <span>预计最晚两天后到账</span>
                        </div>
                    </Card.Body>
                </Card>

                <Card full className={styles.card2}>
                    <Card.Header title="退款进度" />
                    <Card.Body>
                        <div className={styles.stepsLine}>
                            <Steps size="large" current={3}>
                                {
                                    this.state.stepList.dates != undefined ? this.state.stepList.dates.map((item, index) => {
                                        return <Step key={index} id={styles.steppp}
                                            status={item.status}
                                            title={item.title}
                                            description={item.des + '     ' + item.date}
                                            icon={(item.status == 'finish') ? customIcon() : customIconError()}
                                        />
                                    }) : null
                                }
                            </Steps>
                        </div>
                    </Card.Body>
                </Card>

                <Button className={styles.contactkf} onClick={this.showActionSheet}>联系客服</Button>

                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="添加小二微信"
                    footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    afterClose={() => { console.log('afterClose'); }}
                >
                    <div style={{ height: 100 }}>
                        <img src={refund_qr} alt="" width="130" />
                    </div>
                    <div style={{ paddingTop: '10vw' }}>长按扫码，添加小二微信，小二将为您处理各种问题。微信：kefu001。</div>
                </Modal>
            </div>
        )
    }

}

export default RefundDetail;
