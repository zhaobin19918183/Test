/*
   CurrencyItem  收藏列表Item
*/
import React, { Component } from 'react';
import styles from './CurrencyItem.css'
import collection from '../../image/collection.png'
import Item from 'antd-mobile/lib/popover/Item';
class CurrencyItem extends Component {


    constructor(props) {
        super(props);

        this.state = {
             use:false,
             number:false,
             cancle:true

        };
    }
    collectionAction(value)
    {
        this.props.collectionAction.collectionAction(value)
    }
    ToDiscountDetail(value)
    {
        this.props.collectionAction.ToDiscountDetail(value)
    }

    componentDidMount()
    {
        // console.log(this.props.data)
    }

    render() {
        // const data = this.props.data[0]
      
        return (
            <div className={styles.Currency}>

                <img src={this.props.data.info.logo} className={styles.CurrencyImage}  onClick={this.ToDiscountDetail.bind(this,this.props.data)}></img>
                
                <div>
                    <div className={styles.CurrencyTitle}  onClick={this.ToDiscountDetail.bind(this,this.props.data)}>
                        <div className={styles.CurrencyTitle1}>{this.props.data.info.merchantName}</div>
                      {this.props.use ?<div className={this.props.complete?styles.CurrencyTitle22: styles.CurrencyTitle2}>{this.props.tag}</div>:null}
                    </div>
                     {/* <div className={styles.CurrencyTitle4}>
                   30元抵50元代金券
                   </div> */}
                    <div className={styles.CurrencyTitle3}>
                    {this.props.data.info.subtitle}
                   </div>
                   {this.props.collection?
                    <div className={styles.CurrencyMoney}>
                        <div className={styles.CurrencyMoney1}>
                            ￥138.00
                    </div>
                        <div className={styles.CurrencyMoney2}>
                            +5积分
                        </div>
                    </div>:null}

                    <div className={styles.CurrencyMoneyDelete}>
                    {this.props.collection? <div className={styles.CurrencyMoney3}>
                        ￥159.00
                    </div>:null}
                    {/*  complete: true */}
                    {this.props.use?<div className={styles.CurrencyNumber}>
                            x1
                        </div>:null}
                      
                   {this.props.use?null:<div className={this.props.use?styles.CancleButton:styles.CancleButtonC} onClick={this.collectionAction.bind(this,this.props.data)}>
                         取消收藏
                    </div>}
                    </div>
                </div>
            </div>
        );
    }

}

export default CurrencyItem;



     