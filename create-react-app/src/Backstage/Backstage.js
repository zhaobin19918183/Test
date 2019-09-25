/*
   Backstage  银行后台
*/
import React, {Component} from 'react';
import styles from './css/Backstage.css';
import bg_15 from './img/15.png'
import aver from './img/aver.png'

class Backstage extends Component {


    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount()
    {

    }
    godetail=()=>
    {
        // this.props.history.push({ pathname: 'UserInformation'})

        this.props.history.push({ pathname: 'BankAdminHome'})
    }

    render() {
        return (
            <div className={styles.login}>
                <section style={{margin: 0, padding: 0}}>
                    <div className={styles.login_center}>
                        <div className={styles.header_bg_img}>
                            <img src={bg_15} alt=""/>
                            <div className={styles.header_center}>
                                <img src={aver} alt=""/>
                            </div>
                        </div>

                        <form action="" className={styles.login_form}>
                            <div className={styles.user_input}>
                                <div/>
                                <input type="text" placeholder="请输入用户名"/>
                            </div>
                            <div className={styles.pwd_input}>
                                <div/>
                                <input type="password" placeholder="请输入密码"/>
                            </div>
                            <p>您输入的账号有误</p>
                            <button className={styles.sub_button} onClick={this.godetail}>登录</button>
                        </form>
                    </div>
                </section>
            </div>
        );
    }

}

export default Backstage;



