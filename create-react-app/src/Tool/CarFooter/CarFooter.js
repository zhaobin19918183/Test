/*
   CarDooter  底部购买
*/
import React, { Component } from 'react';
import styles from './CarDooter.css'
import car from '../../image/car.png'
import shop from '../../image/shop.png'
class CarFooter extends Component {


    constructor(props) {
        super(props);

        this.state = {
            number: 158
        };
    }

    navigationToBuy = () => {

        this.props.ToReceivingGoods.ToBuyDetail()

    }
    ToReceivingGoods = () => {

        this.props.ToReceivingGoods.ToReceivingGoods()

    }

    render() {
        return (
            <div className={styles.footer}>
                {/* <div className={styles.footer1} >
                    <div className={styles.footermoney}>
                     
                        <img src={shop} className={styles.car}></img>
                    </div>
                    <div className={styles.footernumber}>
                        店铺
                    </div>
                </div>
                <div className={styles.footer1} >
                    <div className={styles.footermoney}>
                     
                        <img src={car} className={styles.car}></img>
                    </div>
                    <div className={styles.footernumber}>
                        购物车
                    </div>
                    <div className={styles.numberDiv}>
                    99

                    </div>
                </div> */}

                {/* <div className={styles.footer4} onClick={this.navigationToBuy}>
                     加入购物车
                </div> */}
                <div className={styles.footer2} onClick={this.navigationToBuy} >
                     立即购买
                </div>

            </div>
        );
    }

}

export default CarFooter;



