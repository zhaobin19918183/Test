/*
   Root, Router 配置
*/
import React from 'react';
import { Route, Switch, Redirect,BrowserRouter as Router} from 'react-router-dom';

import App from './../App';
import DiscountDetail from './../containers/discount/DiscountDetail'
import SearchClass from './../containers/discount/SearchClass'
import RouterTabBar from './RouterTabBar'
import TaberIntegral from './TaberIntegral'
import Discount from './../containers/discount/Discount'
import CouponDetail from './../containers/discount/coupon/CouponDetail'
import buyDetail from './../containers/discount/buyDetail/buyDetail'

import Backstage from '../Backstage/Backstage'
import MyIntegral from './../containers/MyIntegral/MyIntegral'
import LoginIn from '../containers/LoginIn/LoginIn'
import Businessresident from './../containers/BusinessResident/Businessresident'
import BusinessDetail from './../containers/BusinessResident/BusinessDetail'
import Comment from './../containers/Comment/Comment'
import SearchDetail from './../containers/SearchDetail/SearchDetail'
import GoodsDetail from './../integralShop/GoodsDetail/GoodsDetail'
import UserInformation from '../Backstage/UserInformation/UserInformation'
import OrderList from '../Backstage/OrderList/OrderList'
import CommentDetail from './../containers/CommentDetail/CommentDetail'
import ReceivingGoods from './../containers/ReceivingGoods/ReceivingGoods'
import ReceivingAddress from './../containers/ReceivingAddress/ReceivingAddress'
import EditAddress from './../containers/EditAddress/EditAddress'
import Classification from './../integralShop/Classification/Classification'
import Pay from './../containers/Pay/Pay'
import SearchDetailClass from './../Tool/Search/SearchDetailClass'
import MyCollection from './../integralShop/MyCollection/MyCollection'
import OrderManagement from './../containers/OrderManagement/OrderManagement'
import ReleaseComments from './../Tool/ReleaseComments/ReleaseComments'
import Refund from '../containers/Refund/Refund'
import RefundDetail from './../containers/Refund/RefundDetail'
import RefundResult from './../containers/Refund/RefundResult'

import Integralzone from '../Integralzone/Integralzone'
import zoneSearch from '../Integralzone/zoneSearch'
import PreferentialClassification from '../Integralzone/PreferentialClassification'
import zoneMask from '../Integralzone/ZoneMask'
import ZoneClassification from '../Integralzone/ZoneClassification'
import HotZone from '../Integralzone/HotZone'
import SureOeder from '../Integralzone/SureOeder'

import OrderVerification from '../Backstage/OrderVerification/OrderVerification'
import Settlement from '../Backstage/OrderList/Settlement'
import MoneyList from '../Backstage/OrderList/MoneyList'
import AdminCommentList from '../Backstage/OrderList/AdminCommentList'

import RuleDetail from '../integralShop/IntegralHome/RuleDetail'
import BankAdminHome from '../Backstage/BankAdmin/BankAdminHome/BankAdminHome'
import Prize from '../Backstage/BankAdmin/Prize/Prize'
import RewardPoints from '../Backstage/BankAdmin/RewardPoints/RewardPoints'
// import HomeToken from './../integralShop/Home/HomeToken'
import Mine from '../containers/Mine/Mine'
import MapView from '../Tool/Map/MapView'
import IntegralHome from '../integralShop/IntegralHome/IntegralHome'
// import Error403 from '../Tool/errorPage/Error403'
// import Regist_QR from '../Tool/errorPage/Regist_QR'
import Transition from '../Tool/Mask/TransitionPage'

const Root = () => (
   <div>
      <Switch>
         <Route
            path="/"
            render={props => (
               // <App>
                  <Switch>
                     <Route path="/IntegralHome"  component={IntegralHome} />
                     {/* <Route path="/HomeToken"  component={HomeToken} /> */}
                     <Route path="/RuleDetail"  component={RuleDetail} />
                     <Route path="/SearchClass"  component={SearchClass} />
                     <Route path="/MapView"  component={MapView} />
                     <Route path="/Mine"  component={Mine} />
                     <Route path="/LoginIn"  component={LoginIn} />
                     <Route path="/Home" exact component={RouterTabBar} />
                     <Route path="/TaberIntegral" component={TaberIntegral} />
                     <Route path="/DiscountDetail" component={DiscountDetail} />
                     <Route path="/Discount" component={Discount} />
                     <Route path="/CouponDetail" component={CouponDetail} />
                     <Route path="/buyDetail" component={buyDetail} />
                     <Route path="/Backstage" component={Backstage} />
                     <Route path="/Businessresident" component={Businessresident} />
                     <Route path="/BusinessDetail" component={BusinessDetail} />
                     <Route path="/MyIntegral" component={MyIntegral} />
                     <Route path="/Comment" component={Comment} />
                     <Route path="/SearchDetail" component={SearchDetail} />
                     <Route path="/GoodsDetail" component={GoodsDetail} />
                     <Route path="/UserInformation" component={UserInformation} />
                     <Route path="/OrderList" component={OrderList} />
                     <Route path="/CommentDetail" component={CommentDetail} />
                     <Route path="/ReceivingGoods" component={ReceivingGoods} />
                     <Route path="/ReceivingAddress" component={ReceivingAddress} />
                     <Route path="/EditAddress" component={EditAddress} />
                     <Route path="/Classification" component={Classification} />
                     <Route path="/SearchDetailClass" component={SearchDetailClass} />
                     <Route path="/Pay" component={Pay} />
                     <Route path="/MyCollection" component={MyCollection} />
                     <Route path="/OrderManagement" component={OrderManagement} />
                     <Route path="/ReleaseComments" component={ReleaseComments} />
                     <Route path="/Refund" component={Refund} />
                     <Route path="/RefundDetail" component={RefundDetail} />
                     <Route path="/Integralzone" component={Integralzone} />
                     <Route path="/zoneSearch" component={zoneSearch} />
                     <Route path="/PreferentialClassification" component={PreferentialClassification} />
                     <Route path="/zoneMask" component={zoneMask} />
                     <Route path="/ZoneClassification" component={ZoneClassification} />
                     <Route path="/HotZone" component={HotZone} />
                     <Route path="/SureOeder" component={SureOeder} />
                     <Route path="/OrderVerification" component={OrderVerification} />
                     <Route path="/Settlement" component={Settlement} />
                     <Route path="/MoneyList" component={MoneyList} />
                     <Route path="/AdminCommentList" component={AdminCommentList} />
                     <Route path="/BankAdminHome" component={BankAdminHome} />
                     <Route path="/Prize" component={Prize} />
                     <Route path="/RewardPoints" component={RewardPoints} />
                     <Route path="/RefundResult" component={RefundResult} />
                     <Route path="/Transition" component={Transition} />
                     {/* <Route path="/Error403" component={Error403} />
                     <Route path="/Regist_QR" component={Regist_QR} /> */}
                     
                     {/*路由不正确时，默认跳回home页面*/}
                     <Route render={() => <Redirect to="/Home" />} />
                  </Switch>
               // </App>
            )}
         />
      </Switch>
   </div>
);

export default Root;


