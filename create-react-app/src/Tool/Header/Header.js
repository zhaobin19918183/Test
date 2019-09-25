/*
   Header  头部封装
*/
import React, {Component} from 'react';
import styles from './Header.css'
import headerback from '../../image/headerback.png'
import {createBrowserHistory} from 'history' 
class Header extends Component {


    constructor(props) {
        super(props);

        this.state = {
         
        };
    }
  
    backHeader=()=>
    {

    
        if(this.props.title == "订单管理")
        {
   
                    
                  window.location.href = 'RouterTabBar'
              
        }
        else{
            const history = createBrowserHistory();
            history.goBack();
        }
    
    }
    editHeader=()=>
    {
        this.props.HaederBack.headerBack()
  
    }
    
    render() {
        return (
            <div className={styles.headerDiv}>
                {this.props.title == "分类"?null:
                //  <div>
                    <img src={headerback} className={styles.backImage} onClick ={this.backHeader}></img>
                //  </div>
            
                }
                
                <span className={styles.headerTitleClass} >
                    {this.props.title}
                </span>
                {/* <div className={styles.headerTitleClass} >
                    {this.props.title}
                </div> */}
                {this.props.title == "我的收货地址"?
                <div className={styles.endit} onClick ={this.editHeader} >
                    添加收货地址
                </div>
                :null}
            </div>
        );
      }
    
}

export default Header;



