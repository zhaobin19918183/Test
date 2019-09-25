/*
   CollectionItem  收藏列表Item
*/
import React, {Component} from 'react';
import styles from './shopusermessage.css'
import start0 from  '../../image/start0.png'
import start1 from  '../../image/yellow1.png'
import start2 from  '../../image/yellow2.png'
import start3 from  '../../image/yellow3.png'
import start4 from  '../../image/yellow4.png'
import start5 from  '../../image/yellow5.png'
class Shopusermessage extends Component {


    constructor(props) {
        super(props);

        this.state = {
            startNumber:0
        };
    }


    componentDidMount()
    {
       
       
    }
    render() {
        // console.log("this.props.data.merchantName == "+ this.props.data.merchantName)
        return (
         <div className={styles.message}>
            <div className={styles.title1}>
                {this.props.data.merchantName}
            </div>
           
            <div className={styles.title2}>
            {this.props.data.subtitle}
            </div>
            <img src={  this.props.data.score == "null"?start0:this.props.data.score=="1"?start1:this.props.data.score=="2"?
                   start2:this.props.data.score=="3"?start3:this.props.data.score=="4"?start4:this.props.data.score=="5"?start5:null}  className={styles.startImage}></img>
         </div>
        );
      }
    
}

export default Shopusermessage;



