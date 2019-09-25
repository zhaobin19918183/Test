
import React, {Component} from 'react';
import styles from './IntegralHome.css'
import bank from './images/bank.png'
import shop from './images/shop.png'
import youhui from './images/youhui.png'
import close from './images/close.png'
class PhoneMasl extends Component {


    constructor(props) {
        super(props);

        this.state = {
         
        };
    }

    componentDidMount() {
        document.title = "搜索"

    }
    admin(id)
    {
            this.props.admin.admin(id)
    }
    render() {
        return (
         <div className={styles.mask}>
             {this.props.detail == 'admin'?
             <div className={styles.maskBackground}>
                 <div className={styles.maskTop}>登录入口</div>
                <img src={bank} className={styles.maskBackgroundImage} onClick={this.admin.bind(this,1)}></img>
             </div>: 
              <div className={styles.maskBackground}>
                 <img src={this.props.detail} className={styles.maskBackgroundImageSecond} ></img>
             </div>}
             <img src={close} className={styles.closeImage} onClick={this.admin.bind(this,0)}></img>
         </div>
        );
      }
    
}

export default PhoneMasl;



