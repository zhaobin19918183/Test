/*
   Integralzone  积分专区
*/
import React, { Component } from 'react';
import styles from './Integralzone.css'
import { CarouselTool } from '../Tool/ToolRouter'
import graysearch from '../image/graysearch.png'
import headerback from '../image/headerback.png'
import zone1 from '../image/zone1.png'
import zone2 from '../image/zone2.png'
import zone3 from '../image/zone3.png'
import zone4 from '../image/zone4.png'
// import item1 from '../image/item1.png'
// import item2 from '../image/item2.png'
// import item3 from '../image/item3.png'
import Selectedgoods from '../integralShop/Tool/Selectedgoods/Selectedgoods'
import {createHashHistory} from 'history'
import axios from 'axios';
import { withRouter, } from "react-router-dom";

class Integralzone extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataList: [],
            catelist:[],
            advertlist1:"",
            advertlist2:"",
            advertlist3:"",
            demo: [{ data: 1 }, { data: 1 }, { data: 1 }, { data: 1 }, { data: 1 },]
        };
    }

    componentDidMount() {
        document.title = "积分专区";
        

        axios.get('/customer/integralBanner/advertlist').then((res) => {
            // console.log(res.data.attach[0].bannerLogo)
             this.setState({
                 advertlist1:res.data.attach[0].bannerLogo,
                 advertlist2:res.data.attach[1].bannerLogo,
                 advertlist3:res.data.attach[2].bannerLogo,
             })
            
         });

        axios.get('/customer/integralBanner/catelist').then((res) => {
     
            this.setState({
                catelist:res.data.attach
            })
           
        });
        this.getDataList();
    }

    getDataList = ()=>{

        axios.get('/customer/integralStore/queryIntegralStore').then((res) => {
            // console.log(res)
            this.setState({
                dataList: res.data.attach
            });
        });
    }

    toDetailSearch = (value) => {
        this.props.history.push({ pathname: 'zoneSearch'})
        

    }
    ToClassification = (value) => {
        this.props.history.push({ pathname: 'PreferentialClassification'})
        

    }
    ToClassification = (value) => {
        this.props.history.push({ pathname: 'PreferentialClassification'})
        

    }
    ToZoneClassification = (value) => {
       
        //   this.props.state.props.history.push({ pathname: 'DiscountDetail',state: { item: item.id} })
        this.props.history.push({ pathname: 'ZoneClassification'})
        

    }
    ToHotZone = (value) => {
        this.props.history.push({ pathname: 'HotZone'})
    }

    ToSureOeder(item) {
        if(item.unionid == 1)
        {
            this.props.history.push({ pathname: 'GoodsDetail',state: { item: item }})
        }
        if(item.unionid == 0)
        {
            
            this.props.history.push({ pathname: 'DiscountDetail',state: { item: item.id} })
        }
      
    }
    backAction= () =>{
        const history = createHashHistory();

        history.goBack();
   
    }

    render() {
        const self = this
        return (
            <div>
                {/* 顶部搜索 */}
                
                {/* 轮播图 */}
                <div className={styles.xuanfu}>

                    <div>
                    <div className={styles.search} >
                    <img src={headerback} className={styles.searchImag} onClick={this.backAction}></img>
                    <div className={styles.searchBar} onClick={this.toDetailSearch}>
                        <img src={graysearch} className={styles.searchToolImag}></img>
                        <div className={styles.searchtitleserch}>

                            搜索商家名称/商品
                    </div>
                    </div>
                    
                </div>
                    <CarouselTool  class={"integral"}  bannerImage={'/customer/integralBanner/list'}></CarouselTool>
                    </div>
               

                   
                </div>
                {/* 菜单 */}
                <div className={styles.menuDiv}>
                {this.state.catelist.map(function(el,index) {
                    return  <div className={styles.menuDivItem} onClick={self.ToZoneClassification.bind(self,el)}>
                                <img className={styles.menuDivItemImage} src={el.bannerLogo}></img>
                                    <div className={styles.menuDivItemTitle}>{el.bannerName}</div>
                                </div>
                                 })
                     }
                  
            
                </div> 
                <div className={styles.menuDiv2}>
                    
                    <div className={styles.menuDivDetail}>
                     <img src={this.state.advertlist1} className={styles.menuDiv2Left}></img>
                    </div>
                    <div className={styles.menuDivDetail}>
                    <img src={this.state.advertlist2} className={styles.menuDiv2Right}></img>
                    <img src={this.state.advertlist3} className={styles.menuDiv2Right}></img>
                    </div>
                </div>

                <ul className={styles.listul}>
                    {
                        this.state.dataList.map((item) =>
                            <div className={styles.listItem}  onClick={this.ToSureOeder.bind(this,item)} >
                                <Selectedgoods data={item}></Selectedgoods>
                            </div>
                        )
                    }
                </ul>
                {/* 列表 */}
            </div>
        );
    }

}

// export default Integralzone;



export default withRouter(Integralzone);
