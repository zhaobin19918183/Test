/*
   CurrencyItemjuan 
*/
import React, { Component } from 'react';
import styles from './CurrencyItem.css'
import collection from '../../image/collection.png'
class CurrencyItemjuan extends Component {


    constructor(props) {
        super(props);

        this.state = {
             use:false,
             number:false,
             cancle:true

        };
    }



    render() {
        return (
            <div className={styles.Currency}>

                <img src={collection} className={styles.CurrencyImage}></img>
                <div>
                    <div className={styles.CurrencyTitle}>
                        <div className={styles.CurrencyTitle1}>黑加仑葡萄干</div>
                      {this.props.use ?<div className={this.props.complete?styles.CurrencyTitle22: styles.CurrencyTitle2}>{this.props.tag}</div>:null}
                    </div>
                    {/* #FFB623  30元抵50元代金券  有效期至:2019-08-12*/}
                    <div className={styles.CurrencyTitle4}>
                    30元抵50元代金券
                   </div>
                   <div className={styles.CurrencyTitle3}>
                   有效期至:2019-08-12
                   </div>
                    <div className={styles.CurrencyMoney}>
                        <div className={styles.CurrencyMoney1}>
                            ￥138.00
                    </div>
                        <div className={styles.CurrencyMoney2}>
                            +5积分
                        </div>
                    </div>
                    <div className={styles.CurrencyMoneyDelete}>
                        <div className={styles.CurrencyMoney3}>
                        ￥159.00
                    </div>
                    {this.props.use?<div className={styles.CurrencyNumber}>
                            x1
                        </div>:null}
                      
                   {this.props.use?null:<div className={styles.CancleButton}>
                         取消收藏
                    </div>}
                    </div>


                    {/*  ￥138.00  5积分    x1*/}
                </div>
            </div>
        );
    }

}

export default CurrencyItemjuan;



     