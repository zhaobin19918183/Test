
import React, {Component} from 'react';
import styles from './IntegralHome.css'
import yonghu from '../../image/yonghu.png'
import yinsi from '../../image/yinsi.png'
import youhui from './images/youhui.png'
import close from './images/close.png'
class IntegralRule extends Component {


    constructor(props) {
        super(props);

        this.state = {
         
        };
    }
    admin(id)
    {
            this.props.close.close(id)
    }
    componentDidMount() {
     

    }
    Detail(id)
    {
        this.props.close.goToRuleDetail(id)
    }
    // 
    render() {
        return (
         <div className={styles.mask}>
             <div className={styles.rule}>
      
                  <img src={yinsi} className={styles.ruleDIv} onClick={this.Detail.bind(this,1)}></img>
                <img src={yonghu} className={styles.ruleDIv} onClick={this.Detail.bind(this,2)}></img>
             </div>
             <img src={close} className={styles.closeImage} onClick={this.admin.bind(this,0)}></img>
         </div>
        );
      }
    
}

export default IntegralRule;



