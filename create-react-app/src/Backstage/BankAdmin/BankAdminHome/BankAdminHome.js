/*
   Businessresident  商户入驻
*/
import React, { Component } from 'react';
import styles from './BankAdminHome.css'
import store from '../../../image/store.png'
import vouchers from '../../../image/vouchers.png'
class BankAdminHome extends Component {


    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        document.title = "银行管理"

    }
    toDetail = () => {
        //  console.log("Prize")
        this.props.history.push({ pathname: 'Prize'})

    }
    RewardPoints= () => {
        //  console.log("Prize")
        this.props.history.push({ pathname: 'RewardPoints'})

    }
    render() {
        return (
            <div >
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        赤壁农商银行
                    </div>
                    <div className={styles.headerRight}>
                        退出
                    </div>
                </div>
                <div className={styles.businessDiv}>
                    <div className={styles.businessDiv1} >
                        <img src={store} className={styles.businessImage}></img>
                        存款送抽奖
                </div>
                    <div className={styles.businessDiv2} onClick={this.toDetail}> 
                        <img src={vouchers} className={styles.businessImage}></img>
                         奖品验证
              </div>
                </div>

                <div className={styles.businessDiv}>
                    <div className={styles.businessDiv1} >
                        <img src={store} className={styles.businessImage}></img>
                        授权购买优惠
                </div>
                    <div className={styles.businessDiv2} onClick={this.RewardPoints}>
                        <img src={vouchers} className={styles.businessImage}></img>
                        扫码送积分
              </div>
                </div>

            </div>
        );
    }

}

export default BankAdminHome;



