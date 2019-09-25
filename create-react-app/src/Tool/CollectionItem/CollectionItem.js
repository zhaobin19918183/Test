/*
   CollectionItem  收藏列表Item
*/
import React, {Component} from 'react';
import styles from './Collectioncss.css'
class CollectionItem extends Component {


    constructor(props) {
        super(props);

        this.state = {
         
        };
    }


    
    render() {
        return (
         <div className={styles.collection}>
            <img alt="example" className={styles.collectionImg} src={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'} />
            <div className={styles.collectionContent}>
               <div className={styles.collectiontitle}>
                   <div className={styles.collectiontitle1}>
                   黑加仑葡萄干源自新疆吐鲁番盆地，昼夜温差比较
                   </div>
                   <div  className={styles.collectiontitle2}>
                   源自新疆吐鲁番盆地，昼夜温差比较ww 源1自新疆吐鲁番盆地，昼夜温差比较源自新疆吐鲁番盆地，昼夜温差比较
                   </div>

               </div>
               <div className={styles.collectionnumber}>

               </div>

            </div>
         </div>
        );
      }
    
}

export default CollectionItem;



