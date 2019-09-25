/*
   OrderManager  
*/
import React, { Component } from 'react';
import styles from './CurrencyItem.css'
import collection from '../../image/collection.png'
import axios from 'axios';
import { Toast } from 'antd-mobile';
class OrderManager extends Component {


    constructor(props) {
        super(props);

        this.state = {
            use: false,
            number: false,
            cancle: true,
            time:''

        };
    }
    collectionAction(value) {
        // console.log(value)
        // if(value.overdue == true)
        // {
        //   Toast.info("优惠券已过期")
        // }
        // else
        // {
        //     this.props.collectionAction.collectionAction(value)
        // }
        this.props.collectionAction.collectionAction(value)

    }
    
    payAction(item)
    {
    //   Toast.loading('正在支付...', 60,() => {
    //     Toast.info("付款超时!")
    //   });
      console.log(global.constants.name)
    //http://10.1.194.16:8021/customer/payment/o2o/pay?orderNo=201908221333339885358022
//      axios.get('/customer/payment/o2o/pay?orderNo='+item.orderNo).then((res) => {
//        console.log(res)
//        Toast.info(res.data.message)
//        if(res.data.code == '0')
//        {
//         Toast.hide()
//         // window.location.reload()
//        }else
//        {
//         Toast.info(res.data.msg) 
//        }
    
//    })
    }
    releasecomment(value) {
          this.props.collectionAction.releasecomment(value)

    }
    componentDidMount() {

        var timestamp = Date.parse(new Date());
        var time = timestamp.toString()
        time= time.slice(0,10)
        this.setState({
            time:time
        })
    }

    render() {
   
        return (
            <div className={styles.orderList}>
                <div className={ 
                    // this.props.tabIndex == 2?styles.OrderManagerCurrency:
                    // this.props.tabIndex == 3&&this.props.data.status == 1&&this.props.data.overdue ==false&&this.props.data.isComment ==0?styles.OrderManagerCurrency1:
                    // this.props.tabIndex == 0&&this.props.data.isComment ==0&&this.props.data.status == 1?styles.OrderManagerCurrency1:
                
                    styles.OrderManagerCurrency
                    
                }  >
                    <img src={this.props.data.productLogo} className={styles.CurrencyImage}  onClick={this.collectionAction.bind(this, this.props.data)}></img>

                    <div >
                        <div className={styles.CurrencyTitle}  onClick={this.collectionAction.bind(this, this.props.data)}>
                        <div className={styles.CurrencyTitle101}>{this.props.data.merchantName}</div>
                            {this.props.data.status == 0 && this.props.data.overdue == true?<div className={styles.CurrencyTitle2}>已过期</div>:null}
                            {this.props.data.status == -1 ?<div className={styles.CurrencyTitle2f}>待付款</div>:null}
                            {this.props.data.status == 0 && this.props.data.overdue == false ?<div className={styles.CurrencyTitle2f}>待使用</div>:null}
                            {this.props.data.status == 1 &&this.props.data.isComment!=0 ?<div className={styles.CurrencyTitle2}>已完成</div>:null}
                            {this.props.data.status == 1&&this.props.data.isComment!=1 ?<div className={styles.CurrencyTitle2}>待评价</div>:null}
                        
                            {/* {this.props.data.status == 3 && this.props.data.overdue == false ?<div className={styles.CurrencyTitle2}>支付中</div>:null} */}
                            {this.props.data.status == 4 ?<div className={styles.CurrencyTitle2}>退款中</div>:null}
                            {this.props.data.status == 5 ?<div className={styles.CurrencyTitle2}>已取消</div>:null}
                            
                            {this.props.data.status == 2 &&this.props.data.refundType == 0 ?<div className={styles.CurrencyTitle2}>已退款</div>:null}
                            {this.props.data.status == 2 &&this.props.data.refundType == 1 ?<div className={styles.CurrencyTitle2}>过期已退款</div>:null}
                            {this.props.data.status == 2 &&this.props.data.refundType == 2 ?<div className={styles.CurrencyTitle2}>已退款</div>:null}
                          
                        
                            
                        </div>
                        <div className={styles.CurrencyTitle4}  onClick={this.collectionAction.bind(this, this.props.data)}>
                           下单时间:{this.props.data.createTime}  
                        </div>
                        <div className={styles.CurrencyTitle4}  onClick={this.collectionAction.bind(this, this.props.data)}>
                            总价:{this.props.data.orderAmount}
                        </div>
                        {/* <div className={styles.CurrencyMoney}>
                            <div className={styles.CurrencyMoney1}>
                                <span style={{fontSize: '4vw'}}>￥</span>
                                {this.props.data.salesPrice}
                            </div>
                            <div className={styles.CurrencyMoney2}>
                                +{this.props.data.points}积分
                            </div>
                        </div> */}

                        {/* <div className={styles.CurrencyMoneyDelete}  onClick={this.collectionAction.bind(this, this.props.data)}>
                            <div className={styles.CurrencyMoney3}>
                                ￥{this.props.data.originalPrice}
                            </div>

                            <div className={styles.CurrencyNumber}>
                                x{this.props.data.number}
                            </div>

                        </div>  */}
                        {/* <div  className={styles.test}>
                        <div className={styles.CancleButton2}>
                        评论
                        </div>
                        <div className={styles.CancleButton1} >
                        退款
                        </div>
                        </div> */}


                        {/* { this.props.tabIndex ==2|| this.props.tabIndex ==0?null:this.props.data.isComment == 0?<div className={styles.CancleButton} onClick={this.releasecomment.bind(this,this.props.data)}>
                        评论
                        </div>:null} */}
                    </div>
                </div>
{/* 2（已退款），3（支付中），4（退款中） */}
                <div className={styles.goPay}>
                    {/* {this.props.data.status == -1 && this.props.data.overdue == false ?<div className={styles.cancelbtn} onClick={this.closeAction.bind(this,this.props.data)}>取消</div>:null} */}
                    {this.props.data.status == -1 && this.props.data.overdue == false ? <a href={global.constants.pay+this.props.data.orderNo+'&timestamp='+this.state.time} ><div className={styles.paybtn}  >付款</div></a> :null}

                    {this.props.data.status == 0 && this.props.data.overdue == false ?<div className={styles.paybtn} onClick={this.collectionAction.bind(this, this.props.data)}>去消费</div>:null}
                    {this.props.data.status == 1 &&this.props.data.isComment!=1 ?<div className={styles.CancleButton} onClick={this.releasecomment.bind(this,this.props.data)}>评论</div>:null}
                    
                    {this.props.data.status == 2 && this.props.data.overdue == false  ?<div className={styles.CancleButton}  onClick={this.collectionAction.bind(this, this.props.data)}>已退款</div>:null} 
                    {/* {this.props.data.status == 3 && this.props.data.overdue == false ?<div className={styles.CancleButton} onClick={this.releasecomment.bind(this,this.props.data)}>已退款</div>:null}  */}
                    {this.props.data.status == 4 && this.props.data.overdue == false ?<div className={styles.CancleButton} >退款中</div>:null}  
                    {/* { this.props.tabIndex ==2? null:this.props.data.overdue == true?null:this.props.data.isComment == 0?this.props.data.status == 0?null:
                    <div className={styles.CancleButton} onClick={this.releasecomment.bind(this,this.props.data)}>
                    评论
                    </div>:null} */}
                </div>

            </div>

        );
    }

}

export default OrderManager;



