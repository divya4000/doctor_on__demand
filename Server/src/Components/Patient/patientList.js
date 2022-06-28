import {NavLink} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './patientList.module.css';
import profile from '../../assets/Images/user.png';
import Loader from '../Util/Loader/Loader';
import { propTypes } from 'react-bootstrap/esm/Image';
import axios from 'axios';
import Report from '../Report/Report';

function PatientList(props) {
    const [patientList, setPatientList] = useState([]);
    //storing the errors in the errors state
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    let patientData;
    const location = useLocation();
    const p = location.pathname.split('/');
    
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
              if(a.status == 0)
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

  if(p.length === 4){
    const id = p[3];
    patientData = patientList.filter(d => d.email === id)[0];
    // console.log(patientData);
  }
    return (
      <div className={styles.container}>
        {loading ? <Loader />: null}
        <Routes>
          <Route path = '/:id' element = {<Report {...patientData}/>} />
          <Route path = '/' element = {patientList.map(({ name, age, status, email }) => (
            <NavLink to = {'/doctor/all-patients/' + email} key = {email} className = {styles.removeDecoration}>
              <div className={styles.clr}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <img className={styles.img} src={profile} alt="Logo"/>
                    <div className={styles.flitm} ><strong>Name-</strong>{name}</div>
                    <div className="p-2 col-example text-left flitm"><strong>Email-</strong>{email}</div>
                    <div className="p-2 col-example text-left flitm"><strong>Status-</strong>{status === '0' ? 'Critical': 'Moderate'}</div>
                  </div>
                </div>
              </div>
            </NavLink>
           ))} />
        </Routes>
      </div>
      
    )
  }
export default PatientList