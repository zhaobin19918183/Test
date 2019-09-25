/*
   EditAddress 
*/
import React, { Component } from 'react';
import styles from './EditAddress.css'
import Header from '../../Tool/Header/Header'
import addressImage from '../../image/addressImage.png'
class EditAddress extends Component {


    constructor(props) {
        super(props);

        this.state = {
            address: [
                {
                
                  title: '居然建材',
                  id:0
    
                },
                {

                  title: '居然建材',
                  id:1
                },
                {

                  title: '居然建材',
                  id:2
                }
              ],
        };
    }

    back = () => {
        // this.props.history.push({ pathname: 'ReceivingAddress' })
    }
    editAddressDetail(item) {
        
        this.props.history.push({ pathname: 'ReceivingAddress',state:{item:item}})
        // this.props.history.push({ pathname: 'ReceivingAddress' ,state: { item: item }})
    }
    render() {
        const HaederBack =
        {
            headerBack: this.back
        }
        return (
            <div>
                <Header HaederBack={HaederBack} title={"我的收货地址"}></Header>

                {
                        this.state.address.map((item) =>
                        <div className={styles.editAddress}>
                        <img src={addressImage} className={styles.editAddressImage}></img>
                        <div>
                            <div className={styles.title}>
                                <div className={styles.titleName}>
                                    {item.title}
                            </div>
                                <div className={styles.titlePhone}>
                                    13845552255
                           </div>
                            </div>
                            <div className={styles.editAddressdiv}>
                                {item.id == 0? <div className={styles.defualtButton}>
                                    默认
                                 </div>:null}
                               
                                <div className={styles.editAddressContent}>
                                    辽宁省大连市高新园区火炬路38号三丰大厦
                          </div>
    
                            </div>
                        </div>
                        <div className={styles.editButtton} onClick={this.editAddressDetail.bind(this,item)}>
                            编辑
                          </div>
                    </div>

                        )
                    }

        
            </div>
        );
    }

}

export default EditAddress;



