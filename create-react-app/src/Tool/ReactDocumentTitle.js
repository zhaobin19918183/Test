/*
   CollectionItem  收藏列表Item
*/
import React, {Component} from 'react';
import styles from './buyDetail.css'
class CollectionItem extends Component {


    constructor(props) {
        super(props);

        this.state = {
         
        };
    }

    componentDidMount() {
        document.title = "搜索"

    }
    
    render() {
        return (
         <div>
             我是积分
         </div>
        );
      }
    
}

export default CollectionItem;



