/*
   Settlement  
*/
import React, {Component} from 'react';
import styles from './Settlement.css'
class SettlementIltem extends Component {


    constructor(props) {
        super(props);

        this.state = {
         
        };
    }

  
    render() {
        return (
          
          <div className={styles.settlement}>
                 {
              this.props.state.map((item) =>
              <div className={styles.settlementList}>
              <div className={styles.settlementListItemLeft}>
              {item.title}
              </div>  
              <div className={styles.settlementListRight}>
              {item.detail}
           </div>     
           </div> 
              )
            }
                
         </div>
        );
      }
    
}

export default SettlementIltem;



