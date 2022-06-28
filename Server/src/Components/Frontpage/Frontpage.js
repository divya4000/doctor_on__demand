import {NavLink} from 'react-router-dom';

import styles from './Frontpage.module.css';
import Navigation from '../Navigation/HorizontalNav/Navigation';
import React from 'react';

const Frontpage = props => {
    return (
        <React.Fragment>
            <Navigation hide = 'false'/>
            <div className = {styles.coverDiv}>
                <div id = {styles['displayContainer']}>
                    <p id = {styles.title}>doctorOnDemand</p>
                    <p id = {styles.subheading}>Find your way to the best care</p>
                    <p className = {styles.heading}>Medical &nbsp;Services</p>
                    <p className = {styles.heading}>Trusted &nbsp;by &nbsp;Clients</p>
                    <div id = {styles.btnContainer}>
                        <NavLink to = {localStorage.doctorId ? '/doctor/all-patients' : '/doctor/login'} className = {styles.btnLogin}>
                            {localStorage.doctorId ? "Visit the Doctor's Dashboard" : "Login as a doctor"}
                        </NavLink>
                        <NavLink to = {localStorage.patientId ? '/patient/report' :'/patient/login'} className = {styles.btnLogin}>
                            {localStorage.patientId ? "Visit the Patient Dashboard" : "Login as a patient"}
                        </NavLink>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Frontpage;