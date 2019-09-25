/*
   Mask  遮罩层
*/
import React, { Component } from 'react';
import styles from './OrderMask.css'
class OrderMask extends Component {


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

                        <div className={styles.title}>{this.props.title}</div>
                       {this.props.title2!= ""?<div className={styles.title2}>{this.props.title2}</div>:null}
                        <div className={this.props.title2!= ""?styles.buttonDiv1:styles.buttonDiv}>
                            <div className={styles.sureButton} onClick={this.hiddenMask}>
                                取消
                             </div>
                            <div className={styles.cancleButton}>
                                确认
                             </div>
                        </div>
                       
                    </div>

                </div>
            </div>
        );
    }

}

export default OrderMask;



