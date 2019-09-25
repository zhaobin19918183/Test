/*
   Home 主页
*/
import React, {Component} from 'react';
import { TabBar} from 'antd-mobile';

import  IntegralHome from '../integralShop/IntegralHome/IntegralHome'
import  Home from '../integralShop/Home/Home'
import  ShopCar from '../integralShop/ShopCar/ShopCar'

import  Classification from '../integralShop/Classification/Classification'

import homeImage from '../image/home.png'
import HomeImageSelect from '../image/homeselect.png'

import integral from '../image/integral.png'
import integralselect from '../image/integralselect.png'


import discount from '../image/discount.png'
import discountSelect from '../image/discountselect.png'


import mine from '../image/mine.png'
import mineselect from '../image/mineselect.png'

class TaberIntegral extends Component {


    constructor(props) {
        super(props);

        this.state = {
            current: 'mail',
            value: '美食',
            selectedTab: 'blueTab',
            hidden: false,
            fullScreen: false,
        };
    }

    componentDidMount() {
        document.title = "积分专区"
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
                title="分类"
                key="Koubei"
                // badge={'new'}
                selected={this.state.selectedTab === 'redTab'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'redTab',
                  });
                }}
                data-seed="logId1"
              >
                <Classification state={this}></Classification>
              </TabBar.Item>
              <TabBar.Item
                icon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url("${integral}") center center / cover no-repeat`, }}
                  />
                }
                selectedIcon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url("${integralselect}") center center / cover no-repeat`, }}
                  />
                }
                title="购物车"
                key="Friend"
                // dot
                selected={this.state.selectedTab === 'greenTab'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'greenTab',
                  });
                }}
              >
                 <ShopCar state={this}></ShopCar>
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
                  this.setState({
                    selectedTab: 'yellowTab',
                  });
                }}
              >
             <IntegralHome state={this}></IntegralHome>
              </TabBar.Item>
            </TabBar>
          </div>
          </div>
        );
      }
    
}

export default TaberIntegral;



