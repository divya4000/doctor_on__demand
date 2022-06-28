import {useState} from 'react';
import axios from 'axios';

import styles from './DoctorPage.module.css';
import PatientList from '../../Components/Patient/patientList';
import Schedule from '../Schedule/Schedule';
import SideDrawer from "../../Components/SideDrawer/SideDrawer";
import TopNavBar from '../../Components/Navigation/TopNavbar/TopNavBar';
import Loader from '../../Components/Util/Loader/Loader';
import profile from '../../assets/Images/user.png';

const DoctorPage = props => {
    //storing patientlist in the state patientList
    

    let content = null;
    const patients = [
        {
            img: profile,
            patientName: 'Umesh',
            date: {
                day: 20,
                month: 12,
                year: 2021
            },
            patientId: '#13111',
            status: 1
        },
        {
            img: profile,
            patientName: 'Umesh',
            date: {
                day: 20,
                month: 12,
                year: 2021
            },
            patientId: '#13114',
            status: 0
        },
        {
            img: profile,
            patientName: 'Umesh',
            date: {
                day: 20,
                month: 12,
                year: 2021
            },
            patientId: '#13112',
            status: 1
        },
        {
            img: profile,
            patientName: 'Umesh',
            date: {
                day: 20,
                month: 12,
                year: 2021
            },
            patientId: '#13113',
            status: 0
        }
    ]

    //getting the patient data associated with the doctor from the backend
    

    //checking the page to be displayed for the doctor...
    if(props.show === 'patients'){
        content = <PatientList/>;
    }
    else if(props.show === 'schedule'){
        content = <Schedule/>;
    }
    else
        content = <h1>Under development!!!</h1>

    return (
        <div id = {styles.viewBox}>
            <SideDrawer 
                view = 'doctor' 
                link1 = 'Queue' 
                link2 = 'All-Patients'
                link3 = 'Appointments'/>
            <div id = {styles.leftDiv}>
                <TopNavBar heading = {props.heading} img = {profile} type = 'doctor'/>
                <div id = {styles.content}>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default DoctorPage;