/*
   Mask  遮罩层
*/
import React, { Component } from 'react';
import styles from './SuccessMask.css'
import selectCar from '../../image/selectCar.png'
// import {createHashHistory} from 'history'
class SuccessMask extends Component {


    constructor(props) {
        super(props);

        this.state = {
            dateSelected: false
        };
    }
    hiddenMask = () => {
       this.props.maskAction.successMask()
    }

    render() {
        return (
            <div>
                <div
                    
                    className={styles.mask} >
                   
                    <div className={styles.whiteBackground}>
                    <img src={selectCar} className={styles.maskimage}></img>
                        <div className={styles.maskTitle}>
                            恭喜提交成功
                        </div>
                        <div className={styles.maskclose}  onClick={this.hiddenMask}>
                            确定
                        </div>
            
                    </div>

                </div>
            </div>
        );
    }

}

export default SuccessMask;



