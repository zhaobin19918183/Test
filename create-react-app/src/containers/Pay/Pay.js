/*
   CollectionItem  收藏列表Item
*/
import React, { Component } from 'react';
import styles from './Pay.css'
import paysuccess from '../../image/paysuccess.png'
import payerror from '../../image/payerror.png'
import collection from '../../image/collection.png'
import backDetail from '../../image/backDetail.png'
import axios from 'axios';
import headerback from '../../image/headerback.png'
import suregreen from '../../image/suregreen.png'
import toedit from '../../image/toedit.png'
import { Toast } from 'antd-mobile';
import Header from '../../Tool/Header/Header'
// import createHashHistory from 'history/createHashHistory'
import { createHashHistory } from 'history'
var number = 0
class Pay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            payButton: false,
            paysuccess: [],
            title: '',
            detail: 0,
            detailproducts: [],
            priceTag: [],
            code: -100,
            paysuccess: [],
            productId: -1,
            message: '',
            time: '',
            orderNo: '',
            salesPrice: 0,
            overdueTime: '',
            status: -1000,



        };
    }
    closeAction(orderNo) {
        Toast.loading('正在取消订单...', 60, () => {
            
        });
        axios.post('/customer/order/close?orderNo=' + orderNo).then((res) => {
        
            Toast.info(res.data.message)
            if (res.data.code == '0') {
                Toast.hide()
                window.location.reload()
                // window.location.href = 'RouterTabBar'
            }

        })

    }
    goToPay(pay) {
        let { search } = this.props.location
        let paramsString = search.substring(1)
        let searchParams = new URLSearchParams(paramsString)
        let orderNo = searchParams.get('orderNo')

        window.location.href = global.constants.pay + orderNo + '&timestamp=' + this.state.time


    }
    componentDidMount() {

        console.log("测试pay")
        let { search } = this.props.location
        let paramsString = search.substring(1)
        let searchParams = new URLSearchParams(paramsString)
        let orderNo = searchParams.get('orderNo')
        let code = searchParams.get('code')
        let message = searchParams.get('message')

        var timestamp = Date.parse(new Date());
        var time = timestamp.toString()
        time = time.slice(0, 10)

        this.setState({
            message: message,
            time: time,

        })
       
        if (code != null) {
            window.history.pushState(null, null, document.URL); //禁止网页返回上一页
            window.addEventListener('popstate', function () {
                 
                if (number == 1) {
                
                    window.location.href = 'RouterTabBar'
    
                }
                if (number == 0) {
                    number = number + 1
                }
    
            });
            this.setState({
                code: code,
                orderNo: orderNo
            })

            axios.get('/customer/order/getSuccessOrder?orderNo=' + orderNo + '&storeType=1').then((res) => {
                if(res.data.code == "0"){
                   
                this.setState({
                    paysuccess: res.data.attach,
                    productId: res.data.attach.productId,
                    salesPrice: res.data.attach.salesPrice,
                    status: res.data.attach.status

                })
            }

            })
           



        }

        if (code == null) {
     
           
           
            this.setState({
                orderNo:  sessionStorage.getItem("orderNoPay")
            })



            axios.get('/customer/order/getSuccessOrder?orderNo=' + sessionStorage.getItem("orderNoPay")+ '&storeType=1').then((res) => {
     
                if (res.data.code == '0') {
                    this.setState({
                        paysuccess: res.data.attach,
                        productId: res.data.attach.productId,
                        priceTag:  res.data.attach.priceTag.split(","),
                        status: res.data.attach.status

                    })
               


                }


            })
        }

    };

   

    back = () => {
     
     
            window.location.href = "OrderManagement?item=0"
       
    };

    releasecomment() {

        this.props.history.push({ pathname: 'ReleaseComments', state: { item: this.state.paysuccess } })

    }
    goToDefundetail = (item) => {

        this.props.history.push({ pathname: 'RefundDetail', state: { orderNo: this.state.orderNo } })
    }
    goToDetal = (item) => {


        window.location.href = "CouponDetail?item=" + this.state.productId + "&shopId=" + item.merchantId
        // this.props.history.push({ pathname: 'CouponDetail', state: { item: detail, shopId: item.merchantId } });
    }
    Refund = (item) => {

        this.props.history.push({ pathname: 'Refund', state: { item: item } })

    }
    render() {

        return (
            <div className={styles.payDiv}>
                <div className={styles.headerDiv}>

                    <div>
                        <img src={headerback} className={styles.backImage} onClick={this.back}></img>
                    </div>


                    <div className={styles.headerTitleClass} >
                        订单详细
</div>

                </div>

                {this.state.message == null ? null : this.state.message == '支付成功' ? <img src={payerror} className={styles.payImage}></img> : this.state.message == '支付失败' ?
                    <img src={paysuccess} className={styles.payImage} onClick={this.goToPay.bind(this, "付款")}></img> : null}
                <div className={styles.titleDiv} onClick={this.goToDetal.bind(this, this.state.paysuccess)}>
                    <img src={this.state.paysuccess.productLogo} className={styles.buyDetailtitleImage}></img>

                    <div>
                        <div className={styles.title1}>{this.state.paysuccess.merchantName}</div>
                        <div className={styles.success}>{this.state.paysuccess.title}</div>
                        <div className={styles.successMoney}>¥ {this.state.paysuccess.salesPrice}</div>



                    </div>
                    <img src={backDetail} className={styles.backDetailImage}></img>

                </div>
                <div className={styles.tagDiv}>
                    {
                        this.state.priceTag.map((item, key) =>
                            <div className={styles.tagDiv1} key={key}>
                                <img src={suregreen} className={styles.tagImage} ></img>
                                <div className={styles.successTag}>{item}</div>
                            </div>


                        )
                    }
                </div>


                {/* 二维码 */}

                {/* {this.state.status == 1 ?
                    <div className={styles.useDiv}>
                        <div className={styles.useDiv1}> 验证码：{this.state.paysuccess.verifyCode}</div>
                        <div className={styles.useDiv2}>已使用</div>

                    </div> : null} */}
                {this.state.status == 1 ?
                    <div className={styles.code}>

                        <div className={styles.payRefunddiv}>

                            <div>
                                <div className={styles.codeTitleLeft}>
                                    优惠券
                                </div>
                                <div className={styles.codeTitleseconde}>
                                    <div className={styles.payRefundtitle}> {this.state.paysuccess.number}张可用</div>
                                    <div className={styles.payRefundtitle1}> &nbsp;&nbsp;{this.state.paysuccess.overdueTime}到期</div>

                                </div>
                            </div>


                        </div>



                        <div className={styles.payRefundCode}>
                            <div className={styles.payRefundCode1}>
                                券码： {this.state.paysuccess.verifyCode}
                            </div>
                            <div className={styles.payRefundCode2}>
                                已消费
                        </div>
                        </div>



                    </div> : null}

                {this.state.status == 0 ?
                    <div className={styles.code}>

                        <div className={styles.payRefunddiv}>

                            <div>
                                <div className={styles.codeTitleLeft}>
                                    优惠券
                                </div>
                                <div className={styles.codeTitleseconde}>
                                    <div className={styles.payRefundtitle}> &nbsp;&nbsp;{this.state.paysuccess.number}张可用</div>
                                    <div className={styles.payRefundtitle1}>&nbsp;&nbsp;{this.state.paysuccess.overdueTime}到期 </div>

                                </div>
                            </div>
                            <div className={styles.payRefund} onClick={this.Refund.bind(this, this.state.paysuccess)}>申请退款</div>

                        </div>


                        <div className={styles.payImagecode}>
                            <img src={this.state.paysuccess.qrcode} className={styles.codeImage}></img>
                        </div>

                        <div className={styles.codeTitle}>
                            券码： {this.state.paysuccess.verifyCode}
                        </div>
                    </div> : null}
                    {this.state.status == 2 ?
                    <div className={styles.code}>

                        <div className={styles.payRefunddiv}>

                            <div>
                                <div className={styles.codeTitleLeft}>
                                    优惠券
                                </div>
                                <div className={styles.codeTitleseconde}>
                                    <div className={styles.payRefundtitle}> {this.state.paysuccess.number}张可用</div>
                                    <div className={styles.payRefundtitle1}> &nbsp;&nbsp;{this.state.paysuccess.overdueTime}到期 </div>

                                </div>
                            </div>


                        </div>



                        {/* // 1 退款中  2 客户主动退款成功 3 系统自动退款成功  4 客服辅助退款成功 5 其他 6 退款异常 */}
                        <div className={styles.payRefundCode}>
                            <div className={styles.payRefundCode1}>
                                券码： {this.state.paysuccess.verifyCode}
                            </div>
                            <div className={styles.payRefundCode2}>
                                未消费
                        </div>
                        </div>

                        <div className={styles.payRefundDetail}>

                            <div className={styles.payRefundDetail1}>
                                {this.state.status == 1 ? "退款中" : null}
                                {this.state.status == 2 ? "客户主动退款成功" : null}
                                {this.state.status == 3 ? "系统自动退款成功" : null}
                                {this.state.status == 4 ? "客服辅助退款成功" : null}
                                {this.state.status == 5 ? "其他" : null}
                                {this.state.status == 5 ? "退款异常" : null}


                            </div>
                            <div className={styles.payRefundDetail2} onClick={this.goToDefundetail.bind(this, 1)}>
                                查看详情
                      </div>
                            <img src={toedit} className={styles.toedit}></img>
                        </div>


                    </div> : null}
                {this.state.status == 4 ?
                    <div className={styles.code}>

                        <div className={styles.payRefunddiv}>

                            <div>
                                <div className={styles.codeTitleLeft}>
                                    优惠券
                                </div>
                                <div className={styles.codeTitleseconde}>
                                    <div className={styles.payRefundtitle}> {this.state.paysuccess.number}张可用</div>
                                    <div className={styles.payRefundtitle1}> &nbsp;&nbsp;{this.state.paysuccess.overdueTime}到期 </div>

                                </div>
                            </div>


                        </div>



                        {/* // 1 退款中  2 客户主动退款成功 3 系统自动退款成功  4 客服辅助退款成功 5 其他 6 退款异常 */}
                        <div className={styles.payRefundCode}>
                            <div className={styles.payRefundCode1}>
                                券码： {this.state.paysuccess.verifyCode}
                            </div>
                            <div className={styles.payRefundCode2}>
                                未消费
                        </div>
                        </div>

                        <div className={styles.payRefundDetail}>

                            <div className={styles.payRefundDetail1}>
                                {this.state.status == 1 ? "退款中" : null}
                                {this.state.status == 2 ? "客户主动退款成功" : null}
                                {this.state.status == 3 ? "系统自动退款成功" : null}
                                {this.state.status == 4 ? "客服辅助退款成功" : null}
                                {this.state.status == 5 ? "其他" : null}
                                {this.state.status == 5 ? "退款异常" : null}


                            </div>
                            <div className={styles.payRefundDetail2} onClick={this.goToDefundetail.bind(this, 1)}>
                                查看详情
                      </div>
                            <img src={toedit} className={styles.toedit}></img>
                        </div>


                    </div> : null}

                {/* 详细信息 */}



                <div className={styles.payDetail}>
                    <div className={styles.payTitleMessage}>订单信息</div>
                    <div className={styles.list}>
                        <div className={styles.listName}>
                            订单号码：
                        </div>
                        <div className={styles.listContent}>
                            {this.state.paysuccess.orderNo}
                        </div>
                    </div>

                    <div className={styles.list}>
                        <div className={styles.listName}>
                            手机号码：
                        </div>
                        <div className={styles.listContent}>
                            {this.state.paysuccess.mobile}
                        </div>
                    </div>

                    <div className={styles.list}>
                        <div className={styles.listName}>
                            下单时间：
                        </div>
                        <div className={styles.listContent}>
                            {this.state.paysuccess.createTime}
                        </div>
                    </div>

                    {/* <div className={styles.list}>
                        <div className={styles.listName}>
                        支付时间：
                        </div>
                        <div className={styles.listContent}>
                        {this.state.paysuccess.payTime}微信支付
                        </div>
                    </div> */}
                    {/*                   
                    <div className={styles.list}>
                        <div className={styles.listName}>
                        有效时间：
                        </div>
                        {this.state.status == -1||this.state.status == 3?null:<div className={styles.listContent}>
                        {this.state.paysuccess.overdueTime}
                        </div>}
                     
                        
                    </div> */}



                    <div className={styles.listdashed}>
                        <div className={styles.listName}>
                            数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：
                        </div>
                        <div className={styles.listContent}>
                            {this.state.paysuccess.number}
                        </div>
                    </div>
                    <div className={styles.list}>
                        <div className={styles.listName}>
                            总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：
                        </div>
                        <div className={styles.listContent}>
                            ¥ {this.state.paysuccess.orderAmount}
                        </div>
                    </div>


                </div>

                {this.state.status == -1 ? <a href={global.constants.pay + this.state.orderNo + '&timestamp=' + this.state.time} > <div className={styles.payButtonDetail} >付款</div> </a> : null}
                {this.state.status == -1 ? <div className={styles.cancleButtonDetail} onClick={this.closeAction.bind(this, this.state.orderNo)}>取消订单</div> : null}
                {this.state.status == 5 ? <div className={styles.cancleButtonDetailCancle} >订单已取消</div> : null}
                {this.state.status == 1 && this.state.paysuccess.isComment == 0 ? <div className={styles.payButtonDetail} onClick={this.releasecomment.bind(this)} >评价</div> : null}
            </div>
        );
    }

}

export default Pay;




