/*
   SearchBar  搜索框
*/
import React, { Component } from 'react';
import styles from './SearchBar.css'
import drop from '../../image/drop.png'
import searchimg from '../../image/graysearch.png'
import downImg from '../../image/downImg.png'
import axios from 'axios';
import { SearchBar } from 'antd-mobile';
class SearchTabBar extends Component {


    constructor(props) {
        super(props);

        this.state = {
            // /customer/banner/getsitename
            name: ''
        };
    }
    componentDidMount() {
        axios.get('/customer/banner/getsitename').then((res) => {
            this.setState({
                name: res.data.attach
            })

        })
    }


    render() {
        return (
            <div className={styles.search}>
                <div className={styles.searchtitle}>
                    {this.state.name}
                </div>
                <img src={downImg} className={styles.searchImag}></img>
                <div className={styles.searchBar}>
                    <img src={searchimg} className={styles.searchToolImag}></img>
                    <div className={styles.searchtitleserch}>

                        搜索商家名称
                    </div>
                </div>

            </div>
        );
    }

}

export default SearchTabBar;



