import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './Schedule.module.css';
import profile from '../../assets/Images/user.png';
import Card from '../../Components/Util/Cards/Cards';

import Loader from '../../Components/Util/Loader/Loader';

const Schedule = props => {
    // cards list initialization...
    const [patientList, setPatientList] = useState([]);
    //storing the errors in the errors state
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
  const getPatientData = async () => {
    try{
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/doctor/getallpatients',
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        });
        console.log(response)
        if(response.status === 200){
            const data = [];
            response.data.map(d => {
              const obj = {...d, img: profile};
              data.push(obj);
            });
            data.sort((a,b) => {
              if(a.status === '0')
               return -1;
              else 
               return 1;
            });
            setPatientList(data);
        }
        else
            setErrors(new Error('Could not find!!!'));
        setLoading(false);
    }
    catch (e){
        setErrors(e);
        console.log(e)
        setLoading(false);
    }
  }

  useEffect(() => {
    getPatientData();
  }, []);

    let cards = null;
    if(patientList.length === 0)
        cards = 'No patient data available!!!';
    else{
        cards = patientList.map(patient => 
            <Card name = {patient.name} email = {patient.email} date = {patient.lastVisitedDate} status = {patient.status} img = {patient.img} key = {patient.email}/>
        );
    }
    return (
        <div id = {styles.outerBox}>
            {loading ? <Loader /> : null}
            {cards}
        </div>
    );
}

export default Schedule;