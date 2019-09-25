/*
   MyCollection
*/
import React, {Component} from 'react';
import styles from './MyCollection.css'
import axios from 'axios';
import Header from '../../Tool/Header/Header'
import CurrencyItem from '../../Tool/CurrencyItem/CurrencyItem'
import { PullToRefresh } from 'antd-mobile';
// import {createHashHistory} from 'history'
var  array=[]

class MyCollection extends Component {


    constructor(props) {
        super(props);

        this.state = {

            data: [],
            pageNum:1,
            pageSize: 10,
            height: document.documentElement.clientHeight,
        };
    }
    back = () => {
      // const history = createHashHistory();
      //          history.goBack(); 
  
    }
    componentDidMount()
    {
      array=[]
      this.collectionRequest()
    }
    collectionRequest()
    {

      axios.get('/customer/merchantCollection/list/'+this.state.pageSize+'/'+this.state.pageNum).then((res) => {
        // console.log(res)
        if(res.data.code == '0')
        {
           
            res.data.attach.map(function (el, index) {
           
              array.push(
                el
           )
            })
          
          this.setState({
            data:array
          })
        }
        if(res.data.code == '5999')
        {
          this.setState({
            data:[]
          })
        }
   
        
      })
    }

    ToDiscountDetail = (item) => {
      window.location.href = "DiscountDetail?item="+ item.merchantId
      // this.props.history.push({ pathname: 'DiscountDetail', state: { item: item.merchantId} })
  
    }
    collectionAction=(item)=>
    {
      // console.log(item.merchantId)
      axios.get('/customer/merchant/foreground/collection/' + item.merchantId).then((res) => {

        // console.log(res)
        if(res.data.attach == true)
        {
          this.collectionRequest()
          array=[]
        }
    
    })
   
    }
    
    render() {
        const HaederBack =
        {
            headerBack: this.back
        }
        const  collectionAction=
        {
          collectionAction:this.collectionAction,
          ToDiscountDetail:this.ToDiscountDetail
        }
        return (
         <div style={{backgroundColor:'white'}}>
              <Header HaederBack={HaederBack} title={"我的收藏"}></Header>

        <PullToRefresh
          damping={60}
          ref={el => this.ptr = el}
          style={{
            overflow: 'auto',
            height:this.state.height<510?this.state.height*0.9:this.state.height,  
          }}
          indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
          direction={this.state.down ? 'down' : 'up'}
          refreshing={this.state.refreshing}
          onRefresh={() => {
          
            this.setState({
               pageNum:this.state.pageNum+1
            })
            this.collectionRequest()
          }}
        >
        {
           this.state.data.map((item) =>
          
             <CurrencyItem collectionAction={collectionAction} data={item} collection ={false}></CurrencyItem>
          )
        }
        
        </PullToRefresh>

             
       
         </div>
        );
      }
    
}

export default MyCollection;



