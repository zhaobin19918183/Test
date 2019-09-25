/*
   Location 定位组件
*/
import React, {Component} from 'react';

import styles from './Location.css'

import locitonImage from '../../image/home.png'
import location  from '../../image/location.png'
import phone  from '../../image/phone.png'
class Location extends Component {


    constructor(props) {
        super(props);

        this.state = {
         
        };
    }

   Map=()=>
   {
     this.props.map.goToMap()
   }
   phone=()=>
   {
    //  console.log(this.props.data)
    window.location.href= 'tel:' +  this.props.data.phoneNumber
  
   }
   componentDidMount()
   {
    //  console.log(this.props.data)
   }
    render() {
        return (
         <div className={styles.locationDiv}>
             <div className={styles.phoneImage}>
             <img src={location} className={styles.locaitonImage} onClick={
                this.Map
             }></img>
             </div>
           

             <div className={styles.address}>{this.props.data.pname}{this.props.data.cname}{this.props.data.aname}</div>
             {/*   */}
             <img src={phone} onClick={this.phone} className={styles.phoneImage}></img>
         </div>
        );
      }
    
}

export default Location;



