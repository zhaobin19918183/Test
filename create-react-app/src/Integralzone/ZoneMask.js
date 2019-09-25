/*
   zoneMask  遮罩层
*/
import React, { Component } from 'react';
import styles from './zoneMask.css'
class ZoneMask extends Component {


    constructor(props) {
        super(props);

        this.state = {
            dateSelected: false,
            demo: [{ data: 1 }, { data: 1 }, { data: 1 }, { data: 1 }, { data: 1 },],
        };
    }
    hiddenMask = () => {
        this.props.maskAction.showmask()
    }

    render() {

        return (
            <div>
                <div

                    className={styles.mask} >

                    <div className={styles.whiteBackground}>
                        <ul className={styles.maskul} >
                            {
                                this.state.demo.map((item) =>
                                    <div className={styles.tagDiv}>
                                        餐饮美食
                            </div>
                                )
                            }
                        </ul>


                    </div>

                </div>
            </div>
        );
    }

}

export default ZoneMask;



