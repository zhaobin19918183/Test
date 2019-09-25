/*
   PreferentialClassification  
*/
import React, {Component} from 'react';
import styles from './PreferentialClassification.css'
import zoneIntegral from '../image/zoneIntegral.png'
import zonefenlei from '../image/zonefenlei.png'
import zoneitem1 from '../image/zoneitem1.png'
import zoneitem2 from '../image/zoneitem2.png'
import selectDown from '../image/selectDown.png'
import selectUp from '../image/selectUp.png'
import Header from '../Tool/Header/Header'
import Selectedgoods from '../integralShop/Tool/Selectedgoods/Selectedgoods'
import ZoneMask from '../Integralzone/ZoneMask'

class PreferentialClassification extends Component {


    constructor(props) {
        super(props);

        this.state = {
            demo: [{ data: 1 }, { data: 1 }, { data: 1 }, { data: 1 }, { data: 1 },],
            sort:true,
            show: true,
            select:false,
            maskshow:false
        };
    }

    componentDidMount() {
        document.title = "优惠分类"

    }
    maskshow = () => {

        this.setState({
            maskshow:!this.state.maskshow
        })
       
    }
    back=()=>
    {
        // console.log("header back home")
    }
    sort=()=>
    {
       this.setState({
           sort:!this.state.sort
       }) 
 
    }
    showmask= () =>{
        
        this.setState({
            maskshow:false
        })
    }
    render() {
        const HaederBack =
        {
            headerBack : this.back
        }

        const maskAction=
        {
            showmask:this.showmask
        }
        return (
         <div className={this.state.maskshow?styles.perferential:null}>
             <div className={styles.HeaderDiv}>
             <Header  HaederBack={HaederBack}  title={"优惠分类"}></Header>
             </div>
               
             <div className={styles.HeaderMenu}>
                 <div  className={styles.HeaderMenuItem} onClick={this.maskshow}>
                    <img src={zonefenlei} className={styles.HeaderMenuImage}></img>
                    <div className={styles.HeaderMenuTitle}>票券类型</div>
                 </div>
                 <div  className={styles.HeaderMenuItem1} onClick={this.sort}>
                 <img src={zoneIntegral} className={styles.HeaderMenuImage}  ></img>
                    <div className={styles.HeaderMenuTitle}>积分排序
                    <img src={this.state.sort ?selectDown:selectUp} className={styles.HeaderMenuRightImage}></img>
                    </div>
                    
                 </div>
             </div>
             {this.state.maskshow?<ZoneMask ></ZoneMask>:null } 
             <ul className={styles.listul}>
                    {
                        this.state.demo.map((item) =>
                            <div className={styles.listItem} onClick={this.ToDiscountDetail}>
                                <Selectedgoods></Selectedgoods>
                            </div>
                        )
                    }
                </ul>
         </div>
        );
      }
    
}

export default PreferentialClassification;



