/*
   Home 主页
*/
import React, {Component} from 'react';
import { TabBar} from 'antd-mobile';
import  Mine from '../containers/Mine/Mine'
import  Home from '../containers/Home/Home'
import  Discount from '../containers/discount/Discount'
import  IntegralHome  from '../integralShop/IntegralHome/IntegralHome'
import  Integral  from '../containers/Integral/Integral'
import axios from 'axios';
import TaberIntegral from './TaberIntegral'

import LoginIn from '../containers/LoginIn/LoginIn'
import homeImage from '../image/home.png'
import HomeImageSelect from '../image/homeselect.png'

import integral from '../image/integral.png'
import integralselect from '../image/integralselect.png'


import discount from '../image/discount.png'
import discountSelect from '../image/discountselect.png'


import mine from '../image/mine.png'
import mineselect from '../image/mineselect.png'

import { Map} from 'react-amap';
import Geolocation from 'react-amap-plugin-geolocation';
import  Integralzone from '../Integralzone/Integralzone'

class RouterTabBar extends Component {


    constructor(props) {
        super(props);

        this.state = {
            current: 'mail',
            value: '美食',
            selectedTab: 'blueTab',
            hidden: false,
            fullScreen: false,
            location:true
        };
    }
 componentWillMount()
 {
 

 }
     
    componentDidMount() {
        document.title = "兴农微商城"
        if(sessionStorage.getItem("selectedTab") )
        {
   
          this.setState({
            selectedTab:sessionStorage.getItem("selectedTab")
          })
        }
        else
        {
    
        }
        
       
       
    }

   

    render() {
        return (
          <div >
          <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
            <TabBar
              unselectedTintColor="#949494"
              tintColor="#FB437A"
              barTintColor="white"
              prerenderingSiblingsNumber={0}
              hidden={this.state.hidden}
            >
              <TabBar.Item
                title="首页"
                key="Life"
                icon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url("${homeImage}") center center / cover no-repeat`,
                

                  }}
                />
                }
                selectedIcon={<div style={{
                  width: '22px',
                  height: '22px',
                  background: `url("${HomeImageSelect}") center center / cover no-repeat`, }}
                />
                }
                selected={this.state.selectedTab === 'blueTab'}
                // badge={1}
                onPress={() => {
                  sessionStorage.setItem("selectedTab","blueTab")
                  this.setState({
                    selectedTab: 'blueTab',
                  });
                }}
                data-seed="logId"
              >
              
              <Home state={this}></Home>
              </TabBar.Item>
              <TabBar.Item
                icon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url("${discount}") center center / cover no-repeat`, }}
                  />
                }
                selectedIcon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url("${discountSelect}") center center / cover no-repeat`, }}
                  />
                }
                title="优惠"
                key="Koubei"
                // badge={'new'}
                selected={this.state.selectedTab === 'redTab'}
                onPress={() => {
                  sessionStorage.setItem("selectedTab","redTab")
                  this.setState({
                    selectedTab: 'redTab',
                  });
                }}
                data-seed="logId1"
              >
                <Discount state={this}></Discount>
                {/* {this.renderContent('Koubei')} */}
              </TabBar.Item>
              
              <TabBar.Item
           
                icon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url("${mine}") center center / cover no-repeat`, }}
                  />
                }
                selectedIcon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url("${mineselect}") center center / cover no-repeat`, }}
                  />
                }
                title="我的"
                key="my"
    
                selected={this.state.selectedTab === 'yellowTab'}
                onPress={() => {
                  sessionStorage.setItem("selectedTab","yellowTab")
                  this.setState({
                    selectedTab: 'yellowTab',
                
                  });
                }}
              >
               
           
               <IntegralHome  state={this}></IntegralHome>
            
              </TabBar.Item>
            </TabBar>
          </div>
          </div>
        );
      }
    
}

export default RouterTabBar;



