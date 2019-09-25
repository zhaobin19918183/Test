/*
   CollectionItem  收藏列表Item
*/
import React, { Component } from 'react';
import dianpu from '../../../image/dianpu.png'
import styles from './Order.css'

class OrderMenuList extends Component {

   constructor(props) {
      super(props);

      this.state = {
         
      };
   }

   componentDidMount(){
    
   }

   render() {
      if(this.props.orderList != []){
         return(
            <div>
               {
                  this.props.orderList.map((item,index)=>{
                     return (
                        <div className={styles.Order}>
                           <div className={styles.OrderTitle}>
                              
                              <img src={dianpu} className={styles.dianpuCss}></img>
                              <div className={styles.OrderTitleLfet}>{item.productInfo.merchantName}</div>
                              <div className={styles.OrderTitleRight1}>{item.status}</div>
                           </div>
         
                           <div className={styles.OrderContent}>
                              <img src={item.logo} className={styles.OrderContentImage}></img>
                              <div className={styles.OrderContentMessage}>
                                 <div className={styles.OrderM} >
                                    <div className={styles.OrderContentMessage1}>
                                       <div className={styles.OrderContentMessage11}>
                                          {item.productInfo.productTitle}
                                       </div>
                                       <div className={styles.OrderContentMessage12}>¥{item.productInfo.salesPrice}</div>
                                    </div>
         
                                    <div className={styles.OrderContentMessageConent} >
                                       {item.merchantName}
                                    </div>
                                 </div>
                                 <div className={styles.OrderContentMessage2}>X{item.productInfo.number}</div>
                              </div>
                           </div>
         
                           <div className={styles.listItem}>
                              <div className={styles.listItemLfet}>订单号码:</div>
                              <div className={styles.listItemRight}>{item.orderNo}</div>
                           </div>
         
                           <div className={styles.listItem}>
                              <div className={styles.listItemLfet}>手机号码:</div>
                              <div className={styles.listItemRight}>{item.mobile}</div>
                           </div>
         
                           <div className={styles.listItem}>
                              <div className={styles.listItemLfet}>下单时间:</div>
                              <div className={styles.listItemRight}>{item.createTime}</div>
                           </div>
         
                           <div className={styles.listItem}>
                              <div className={styles.listItemLfet}>支付时间:</div>
                              <div className={styles.listItemRight}>{item.payTime}</div>
                           </div>
         
                           <div className={styles.listItem}>
                              <div className={styles.listItemLfet}>验证时间:</div>
                              <div className={styles.listItemRight}>{item.verifyTime}</div>
                           </div>
         
                           <div className={styles.money}>
                              <div className={styles.moneyLeft}>总金额</div>
                              <div className={styles.moneyRight}>￥{item.orderAmount}</div>
                           </div>
                        </div>
                     )
                  })
               }
            </div>
         )
      }else{
         return(
            <div>暂无相关数据</div>
         )
      }
   }

}

export default OrderMenuList;