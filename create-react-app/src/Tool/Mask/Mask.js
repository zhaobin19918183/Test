/*
   Mask  遮罩层
*/
import React, { Component } from 'react';
import styles from './Maskcss.css'
class Mask extends Component {


    constructor(props) {
        super(props);

        this.state = {
            dateSelected: false
        };
    }
    hiddenMask = () => {
       this.props.maskAction.showmask()
    }

    render() {
        return (
            <div>
                <div
                    
                    className={styles.mask} >

                    <div className={styles.whiteBackground}>
                        <div className={styles.maskTitle}>
                            积分使用规则
                        </div>
                        <div className={styles.maskcontent}>
                            <div className={styles.maskcontentList1}>1，写优质评论专区积分</div>
                            <div className={styles.maskcontentList2}> 2，购买商品获得积分</div>
                            <div className={styles.maskcontentList3}> 3，写优质评论专区积分写优质评论专区积分写优 质评论专区积分</div>
                            <div className={styles.maskcontentList4}>  4，购买商品获得积分</div>
                        </div>
                        <div className={styles.maskclose}  onClick={this.hiddenMask}>
                            关闭
                        </div>
            
                    </div>

                </div>
            </div>
        );
    }

}

export default Mask;



