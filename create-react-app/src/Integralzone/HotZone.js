/*
   ZoneClassification 
*/
import React, {Component} from 'react';
import styles from './ZoneClassification.css'
import Header from '../Tool/Header/Header'
import { Tabs, Badge } from 'antd-mobile';
import Selectedgoods from '../integralShop/Tool/Selectedgoods/Selectedgoods'
const tabs = [
    { title: <Badge >距离</Badge> },
    { title: <Badge >热度</Badge> },
    { title: <Badge >好评1</Badge> },
    { title: <Badge >好评</Badge> },
    { title: <Badge >好评</Badge> },
    { title: <Badge >好评</Badge> },
  ];
  
class HotZone extends Component {


    constructor(props) {
        super(props);

        this.state = {
            demo: [{ data: 1 }, { data: 1 }, { data: 1 }, { data: 1 }, { data: 1 },],
        };
    }

    componentDidMount() {
        // console.log(this.props)
        document.title = "热兑排行版"

    }
    back=()=>
    {
        // console.log("header back home")
    }
    render() {
        const HaederBack =
        {
            headerBack : this.back
        }
        return (
         <div>
         <div className={styles.headerDIv}>
             <Header  HaederBack={HaederBack}  title={"热兑排行版"}></Header>
            <Tabs tabs={tabs}
            initialPage={0}
            tabBarActiveTextColor='#FB437A'
            tabBarUnderlineStyle={{ border: '1px solid #FB437A' }}
            onChange={(tab, index) => { 
                // console.log('onChange', index, tab); 
            }}
            onTabClick={(tab, index) => {
            //   console.log('onTabClick', index, tab);
            }}
          >
         </Tabs>
             </div>
           
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

export default HotZone;



