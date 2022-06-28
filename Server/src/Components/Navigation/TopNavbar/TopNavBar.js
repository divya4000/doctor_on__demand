import { useNavigate } from 'react-router-dom';

import styles from './TopNavBar.module.css';

const TopNavBar = props => {
    let navigate =  useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem('token');
        if(props.type === 'patient')
            localStorage.removeItem('patientId');
        else
            localStorage.removeItem('doctorId');
        navigate('/');
    }

    return (
        <div id = {styles.headerContainer}>
            <div id = {styles.firstDivContainer}>
                <div id = {styles.heading}>{props.heading}</div>
                <div id = {styles.logoutBtn} onClick = {logoutHandler}>
                    <img src = {props.img} alt = 'profile'/>
                    Logout
                </div>
            </div>
            <span id = {styles.lineF}></span>   
        </div>
    );
}

export default TopNavBar;