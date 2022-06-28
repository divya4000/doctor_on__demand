import {NavLink} from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = props => {
    return (
        <div className = {styles.navigationContainer}>
            <div>
                <NavLink to = '/' className = {styles.NavBtns}>Home</NavLink>
                <NavLink to = '/#about-us' className = {styles.NavBtns}>About Us</NavLink>
                {props.hide === 'false' ? <NavLink to = '/patient/signup' className = {styles.NavBtns}>Sign Up</NavLink> :  <NavLink to = '/patient/login' className = {styles.NavBtns}>Log In as a Patient</NavLink>}
            </div>
        </div>
    )
}

export default Navigation;