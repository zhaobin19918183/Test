import React, { Component } from 'react'
import arrowUp from '../../image/returnTop.png'
import styles from './ScrolltoTop.css'

class ScrolltoTop extends Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }

    gotoTop = ()=>{
  
        this.props.backHeader.backHeader()
    }

    render(){
        return(
            <div className={styles.main} onClick={this.gotoTop}>
                <img className={styles.arrowUp} src={arrowUp} width="40"></img>
            </div>
        )
    }
}

export default ScrolltoTop;