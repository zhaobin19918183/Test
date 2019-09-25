/*
   CollectionItem  收藏列表Item
*/
import React, { Component } from 'react';
// import collection from '../../../image/collection.png'
import styles from './Order.css'
import axios from 'axios'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';

class Order extends Component {

   constructor(props) {
      super(props);

      this.state = {
         
      };
   }

   componentDidMount(){
  
   }

   comfirmSubmit=()=>{
     
      axios.post('/customer/VerifyOrder/verifyOrderByCode', {verifyCode:JSON.parse( sessionStorage.getItem("orderInfo")).verifyCode}).then((res) => {
         Toast.success('验证成功', 2, () => {
            sessionStorage.removeItem("orderInfo");
           sessionStorage.setItem("show",'1')
            window.location.reload()
            Toast.hide()
           });
       
        
      })
   }

   render() {
     
         return(
            <div>
       
                        <div className={styles.Order}>
                           <div className={styles.OrderTitle}>
                              <div className={styles.OrderTitleLfet}>{JSON.parse( sessionStorage.getItem("orderInfo")).merchantName}</div>
                              <div className={styles.OrderTitleRight1}>{JSON.parse( sessionStorage.getItem("orderInfo")).status}</div>
                           </div>
         
                           <div className={styles.OrderTitle2}>
                              <img src={JSON.parse( sessionStorage.getItem("orderInfo")).headimgurl} className={styles.OrderTitle2Image}></img>
                              <div className={styles.OrderTitle2Title1}>
                                 {JSON.parse( sessionStorage.getItem("orderInfo")).nickname}
                              </div>
                              <div className={styles.OrderTitle2Title1}>
                                 {JSON.parse( sessionStorage.getItem("orderInfo")).mobile}
                              </div>
                           </div>
         
                           <div className={styles.OrderContent}>
                              <img src={JSON.parse( sessionStorage.getItem("orderInfo")).productLogo} className={styles.OrderContentImage}></img>
                              <div className={styles.OrderContentMessage}>
                                 <div className={styles.OrderM} >
                                    <div className={styles.OrderContentMessage1}>
                                       <div className={styles.OrderContentMessage11}>
                                          {JSON.parse( sessionStorage.getItem("orderInfo")).productName}
                                       </div>
                                       <div className={styles.OrderContentMessage12}>¥{JSON.parse( sessionStorage.getItem("orderInfo")).price}</div>
                                    </div>
         
                                    {/* <div className={styles.OrderContentMessageConent} >
                                       {JSON.parse( sessionStorage.getItem("orderInfo")).voucherName}
                                    </div> */}
                                 </div>
                                 <div className={styles.OrderContentMessage2}>X{JSON.parse( sessionStorage.getItem("orderInfo")).voucherNum}</div>
                              </div>
                           </div>
         
                           <div className={styles.listItem}>
                              <div className={styles.listItemLfet}>订单号码:</div>
                              <div className={styles.listItemRight}>{JSON.parse( sessionStorage.getItem("orderInfo")).orderNo}</div>
                           </div>
         
                           <div className={styles.listItem}>
                              <div className={styles.listItemLfet}>手机号码:</div>
                              <div className={styles.listItemRight}>{JSON.parse( sessionStorage.getItem("orderInfo")).mobile}</div>
                           </div>
         
                           <div className={styles.listItem}>
                              <div className={styles.listItemLfet}>下单时间:</div>
                              <div className={styles.listItemRight}>{JSON.parse( sessionStorage.getItem("orderInfo")).createTime}</div>
                           </div>
         
                           <div className={styles.listItem}>
                              <div className={styles.listItemLfet}>支付时间:</div>
                              <div className={styles.listItemRight}>{JSON.parse( sessionStorage.getItem("orderInfo")).paidTime}</div>
                           </div>
         
                           {/* <div className={styles.listItem}>
                              <div className={styles.listItemLfet}>验证时间:</div>
                              <div className={styles.listItemRight}>{JSON.parse( sessionStorage.getItem("orderInfo")).verifyTime}</div>
                           </div> */}
         
                           <div className={styles.money}>
                              <div className={styles.moneyLeft}>总金额</div>
                              <div className={styles.moneyRight}>￥{JSON.parse( sessionStorage.getItem("orderInfo")).paymentAmount}</div>
                           </div>
         
                           <div className={styles.buttonDiv}>
                              <div className={styles.button} onClick={this.comfirmSubmit}>确认验证</div>
                           </div>
                        </div>
                 
               
            </div>
         )
    
   }

}

export default Order;