import React, { Component } from 'react';
import { Accordion } from 'antd-mobile';
import { Button } from 'antd-mobile';
import fh from '../../image/fh.png'
import { List, DatePicker, PickerView } from 'antd-mobile';
import styles from './OrderList.css'
import Order from '../Tool/Order/Order'
import SettlementIltem from   '../Tool/Settlement/SettlementIltem'
import {createHashHistory} from 'history'
const season = [
    {
        label: '已打款',
        value: '已打款',
    },
    {
        label: '全部',
        value: '全部',
    },
    {
        label: '未打款',
        value: '未打款',
    },
];
class Settlement extends Component {


    constructor(props) {
        super(props);

        this.state = {
            time: '开始时间',
            timeend: '结束时间',
            value: null,
            picker:false,
            data:[{title:'结算日期',detail:'T+1结算（2018-12-28）'},
            {title:'结算金额',detail:'215485元'},
            {title:'结算状态',detail:'已打款）'},
            {title:'划款时间',detail:'2018-12-30 18:52:49 (周末、节假日延后)'}]
                
            
           

        };
    }
    onScrollChange = (value) => {
        // console.log("onScrollChange == "+value);
    }
    formatDate(date) {
        /* eslint no-confusing-arrow: 0 */
        const pad = n => n < 10 ? `0${n}` : n;
        const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
        return `${dateStr}`;
    }
    back=()=>
    {
        const history = createHashHistory()
         history.goBack();
    }
    componentDidMount() {

    }

    godetail = () => {
        this.props.history.push({ pathname: 'UserInformation' })
    }
    onChange = (value) => {
        // console.log("onChange == "+value);
      
    }
    picker = () => {
        this.setState({
            picker:true
        })
    }
    pickerclose = () => {
        this.setState({
            picker:false
        })
    }
    render() {
        return (
            <div className={this.state.picker?styles.data:styles.data1}>
                {this.state.picker?<div className={styles.mask}>
                <div className={styles.pickerDiv}>
                <div className={styles.divHeader}>

                <div className={styles.divHeaderleft} onClick={this.pickerclose} >关闭</div>
                <div className={styles.divHeaderight} onClick={this.pickerclose}>确定</div>
                </div>
                <PickerView
                onScrollChange={this.onScrollChange}
                    data={season}
                    cascade={false}
                    onChange={this.onChange}
                 
                />
                </div>
                
                </div>:null}
                <div className={styles.Header}>
                   <img className={styles.HeaderImageLeft} src={fh} onClick={this.back}></img>
                  
                   <div className={styles.Headertitle}>
                   结算列表
                   </div>
                 
                   <div className={styles.HeaderImage} s></div>
                   
               </div>
                <div className={styles.allDIv} onClick={this.picker}>

              
                    <div className={styles.alldiv1} >
                        全部
                 </div>
                </div>
                {
              this.state.data.map((item) =>
              <div className={styles.settlementdiv}>
                   <SettlementIltem  state= {this.state.data}></SettlementIltem>
               </div>
                
              )
            }
             
            </div>
        );
    }

}

export default Settlement;


