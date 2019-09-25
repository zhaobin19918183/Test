/*
   OrderItem  订单item
*/
import React, { Component } from 'react';
import styles from './OrderItem.css'
import dianpu from '../../image/dianpu.png'
import OrderManager from '../../Tool/CurrencyItem/OrderManager'
class OrderItem extends Component {


    constructor(props) {
        super(props);

        this.state = {
            tag: '',
            use: false,
            footer: false,
            complete: false,
            cancel:false,
            data: [{ id: 1 }, { id: 1 }]
        };
    }

    componentDidMount() {
    //    console.log(this.props.data)
        if (this.props.index == 1) {
            this.setState({
                tag: '待支付',
            })
        }
        if (this.props.index == 2) {
            this.setState({
                tag: '待使用',
            })
        }
        if (this.props.index == 3) {
         
            this.setState({
                tag: '已完成',
            })
        }
        if (this.props.index == 4) {
            this.setState({
                tag: '已取消',
            })
        }
    }
    commment(id)
    {
        // console.log(id)
         this.props.detail.ToReleaseComments(id)
    }

    Refund(id)
    {
        // console.log(id)
         this.props.detail.Refund(id)
    }

    render() {
 
        return (
            <div className={styles.Order}>
                <div className={styles.OrderShopName}>
                    <img src={dianpu} className={styles.OrderShopImage}>
                    </img>
                    <div className={styles.OrderShopTitle}>
                        {this.props.data.merchantName}
               </div>
                </div>
                <OrderManager  item={this.props.data} ></OrderManager>
                {/* {
                    this.props.data.map((item) =>
                   
                        // 
                    )
                } */}
                {this.state.footer ?

                    <div className={styles.OrderFooter}>
                        <div className={styles.OrderFooterNumber}>
                            <div className={styles.OrderFooterNumber1}>
                                订单编号：
                        </div>
                            <div className={styles.OrderFooterNumber2}>
                                B201906101651286947862390
                        </div>
                        </div>
                        <div className={styles.OrderFooterNumber}>
                            <div className={styles.OrderFooterNumber1}>配送方式：
                        </div>
                            <div className={styles.OrderFooterNumber2}>
                                快递免邮
                        </div>
                            {/* 共2件 ￥276.00小计： */}
                        </div>
                        <div className={styles.OrderFooterALl}>
                            <div className={styles.OrderFooterALl1}>
                                共2件
                    </div>
                            <div className={styles.OrderFooterALl2}>
                                小计：
                    </div>
                            <div className={styles.OrderFooterALl3}>
                                ￥27699.00
                    </div>
                        </div>

                    </div> : null}
                {/* 付款 */}
              {this.state.cancel?null: <div>
                {this.state.complete ?
                    <div className={styles.payButtonComment} onClick={this.commment.bind(this,1)}>
                        评论
                  </div> :
                    <div>
                        {this.state.footer ?

                            <div className={styles.payButton}>
                                付款
                           </div> :

                            <div className={styles.buttonDiv}>
                                <div className={styles.payButtonCancle1} onClick={this.Refund.bind(this,2)}>
                                    退款
                              </div>

                                <div className={styles.payButton1}>
                                    使用
                                </div>
                            </div>}
                    </div>}
                </div>}
               
                {this.state.cancel?null: <div className={styles.line}>
                </div>}

            </div>
        );
    }

}

export default OrderItem;



