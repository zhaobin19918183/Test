/*
   SearchBar  搜索框
*/
import React, { Component } from 'react';
import styles from './SearchBar.css'
import graysearch from '../../image/graysearch.png'
import headerback from '../../image/headerback.png'
import { createHashHistory } from 'history'
import { withRouter, } from "react-router-dom";
import { List, InputItem, WhiteSpace } from 'antd-mobile';
class SearchDetailBar extends Component {


    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentWillMount(){
        
    }

    handelChange(e) {

    }
    backHeader = () => {

        const history = createHashHistory();
        history.goBack();
    }
    onKeyup(e) {

        if (e.keyCode === 13) {
            this.props.toDetailSearch.keyAction()

        }
    }


    render() {

        return (
            <div className={styles.search} >
                <img src={headerback} className={styles.backImage} onClick={this.backHeader}></img>
                <div className={styles.searchBarDiv}>
                    <img src={graysearch} className={styles.searchToolImagNar} ></img>
                    <input type="text" onKeyUp={this.onKeyup.bind(this)} className={styles.searchBarcss} onChange={(e) => {
                        this, this.props.toDetailSearch.toDetailSearch(e.target.value)
                    }} placeholder="请输入商家名称" />

                    {/* <List>
                        <InputItem placeholder="请输入商家名称" onKeyUp={this.onKeyup.bind(this)} className={styles.searchBarcss} onChange={(e) => {
                        this, this.props.toDetailSearch.toDetailSearch(e.target.value)
                        }}></InputItem>
                    </List> */}
                    
                </div>
            </div>
        );
    }

}

// export default SearchDetailBar;

export default withRouter(SearchDetailBar);

