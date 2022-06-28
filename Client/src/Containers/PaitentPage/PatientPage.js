import React, {useState, useEffect} from 'react';
import axios from 'axios';

import styles from './PatientPage.module.css';
import SideDrawer from '../../Components/SideDrawer/SideDrawer';
import TopNavBar from '../../Components/Navigation/TopNavbar/TopNavBar';
import Report from '../../Components/Report/Report';
import MedicineScheduler from  '../../Components/Medicine Scheduler/Medicine';
import Loader from '../../Components/Util/Loader/Loader';

import profile from '../../assets/Images/user.png';

const PatientPage = props => {
    const [patientReport, setPatientReport] = useState({});
    const [medicines, setMedicines] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    
    const getReportData = async () => {
        try{
            setIsLoading(true);
            const response = await axios.get('http://localhost:8080/api/patient/', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.token,
                }
            });
            console.log(response)
            if(response.status === 200){
                setPatientReport({...response.data[0], img: profile});
                setMedicines(() => {
                    return response.data[0].medicines});
            }
            else
                setErrors(new Error('Could not find patient'));
            setIsLoading(false);
        }
        catch(err){
            console.log(err);
            setErrors(err.message);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        setIsLoading(true);
        getReportData();
        console.log(medicines, patientReport)
    }, []);

    let content = null;

    if(props.show === 'report')
        content = <Report {...patientReport}/>
    else
        content = <MedicineScheduler med = {medicines}/>

    return (
        <div id = {styles.viewBox}>
            <SideDrawer 
                view = 'Patient' 
                link1 = 'Report' 
                link2 = 'Medicine'/>
            <div id = {styles.leftDiv}>
                <TopNavBar heading = {props.heading} img = {profile} type = 'patient'/>
                <div id = {styles.content}>
                    {isLoading ? <Loader /> : null}
                    {content}
                </div>
            </div>
        </div>
    );
}

export default PatientPage;