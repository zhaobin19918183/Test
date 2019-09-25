/*
   MerchandiseShow  商品展示图片
*/
import React, { Component } from 'react';
import styles from './MerchandiseShow.css'



class MerchandiseShow extends Component {


    constructor(props) {
        super(props);

        this.state = {
          imageData:[
              {
                  imageurl:'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
              },
              {
                imageurl:'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
            },
            {
                imageurl:'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
            }
            ]
        };
    }


    componentDidMount() {
     
    }


    render() {

        return (

            <div className={styles.MerchandiseShowDiv}>
          
          {
            this.state.imageData.map((item) =>

                  <img alt="example" className={styles.list_box_img} src={item.imageurl} />
            )
          }
    
               
            </div>


        );
    }

}

export default MerchandiseShow;



