/*
   OrderItem  订单item
*/
import React, { Component } from 'react';
import styles from './ShopSection.css'
import dianpu from '../../image/dianpu.png'
import ShopIndex from './ShopIndex'
import selectCar from '../../image/selectCar.png'
import disselectCar from '../../image/disselectCar.png'
var selectActionFunction = []
class ShopSection extends Component {


    constructor(props) {
        super(props);

        this.state = {
       
            selectSection:[],
            use:false

           
        };
    }

    componentDidMount() {

     
    }
    commment(id)
    {
       
         this.props.detail.ToReleaseComments(id)
    }


    selectSection(item)
    {

        this.props.selectAction.selectSection(item)
       
         
        // this.props.ShopCarSection.select  = this.state.use
       
      

        // if(selectActionFunction.length !=0)
        // {

        //   if(selectActionFunction.indexOf(id) == -1) 
        //   {   
          
        //       selectActionFunction.push (id)
        //   } 
        //   else
        //   {
           
        //   }
          
        // }
        // else
        // {
        //     selectActionFunction.push (id)
        // }
      
         
       
    }

    selectIndex=(item)=>
    {
        
       this.props.selectAction.selectIndex(item)
 
        
    }

    render() {
        const selectIndex=
        {
            selectIndex:this.selectIndex
        }
        
       

        return (
            <div className={styles.Order}>
                <div className={styles.OrderShopName}>

                    {/* <img src={this.props.ShopCarSection.select?disselectCar: selectCar} className={styles.selectImage} onClick={this.selectSection.bind(this,this.props.ShopCarSection)}></img> */}
                    <img src={dianpu} className={styles.OrderShopImage}>
                    </img>
                    <div className={styles.OrderShopTitle}>
                        {this.props.ShopCarSection.name}
               </div>
                </div>
                
                {
                    this.props.ShopCarSection.ShopCarIndex.map((item) =>
                        
                        
                        <ShopIndex key={item.id}     item={item}  ></ShopIndex>
                    )
                }
               
         
               
           <div className={styles.line}>
                </div>

            </div>
        );
    }

}

export default ShopSection;



