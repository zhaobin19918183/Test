/*
   RefundDetail  
*/
import React, { Component } from 'react'
import styles from './RefundDetail.css'
import Header from '../../Tool/Header/Header'
import refundImg from '../../image/refund.png'
import { Card } from 'antd-mobile'
import axios from 'axios'
import { createHashHistory } from 'history'
import backDetail from '../../image/backDetail.png'
class RefundResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            HaederBack: {
                headerBack: () => {
                    
                    // window.location.href = 'RouterTabBar'

    

                }
            },
            orderNo: '',
            stepList: [],
            refundTime: ''

        };
    }
    getInitData = (orderNo) => {
      
        axios.post('/customer/order/refundSchedule?orderNo=' + orderNo).then((res) => {
             console.log(res)
             if(res.data.code == "0")
             {
                this.setState({
                    stepList: res.data.attach,
                    // refundTime: res.data.attach.dates[3].date,
                })
    
             }
          

        })
    }
    goToRefundDetail = (orderNo) => {
        this.props.history.push({ pathname: 'RefundDetail', state: { orderNo: this.state.orderNo } })

    }
    componentDidMount() {
        let { search } = this.props.location

        let paramsString = search.substring(1)
        let searchParams = new URLSearchParams(paramsString)
        this.setState({
            orderNo: searchParams.get('orderNo')
        })
        this.getInitData(searchParams.get('orderNo'))

    }

    render() {
        //
        return (
            <div className={styles.refunddetail}>
                <Header HaederBack={this.state.HaederBack} title={"退款结果"}></Header>

                <Card full className={styles.card1}>
                    <Card.Body>
                        <div className={styles.refundTime} onClick={this.state.stepList.refundStatus == 5?null:this.goToRefundDetail.bind(this, this.state.orderNo)}>
                            <div>
                                <div>
                                    <img src={refundImg} alt="" style={{ width: '6vw', verticalAlign: 'bottom', marginRight: '2vw' }} />
                                   {this.state.stepList.refundStatus == 1?<span className={styles.refundTitle}> 退款中 ¥ { this.state.stepList.orderAmount}</span>:null } 
                                   {this.state.stepList.refundStatus == 2?<span className={styles.refundTitle}> 客户主动退款成功 ¥ { this.state.stepList.orderAmount}</span>:null } 
                                   {this.state.stepList.refundStatus == 3?<span className={styles.refundTitle}> 系统自动退款成功 ¥ { this.state.stepList.orderAmount}</span>:null } 
                                   {this.state.stepList.refundStatus == 4?<span className={styles.refundTitle}> 客服辅助退款成功 ¥ { this.state.stepList.orderAmount}</span>:null } 
                                   {this.state.stepList.refundStatus == 5?<span className={styles.refundTitle}> 其他 ¥ { this.state.stepList.orderAmount}</span>:null } 
                                   {this.state.stepList.refundStatus == 6?<span className={styles.refundTitle}> 退款异常 ¥ { this.state.stepList.orderAmount}</span>:null } 
                                </div>
                                <div className={styles.refundNumber}>
                                    <label>券码：</label>
                                    <span>{this.state.stepList.verifyCode}</span>
                                    <div className={styles.quan2}></div>
                                </div>
                                {this.state.stepList.refundStatus == 5?null: <div className={styles.refundTime}>
                                    <span>到账时间：</span>
                                    {/* <span>预计最晚 {this.state.refundTime} 到账</span> */}
                                    <span>预计最晚2日后到账</span>
                                </div>}
                               
                            </div>

                            {this.state.stepList.refundStatus == 5?null:  <img src={backDetail} className={styles.backDetailImage}></img>}
                        </div>

                    </Card.Body>
                </Card>


            </div>
        )
    }

}

export default RefundResult;
