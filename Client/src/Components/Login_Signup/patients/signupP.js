import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';
import Navigation from '../../Navigation/HorizontalNav/Navigation';
import Loader from '../../Util/Loader/Loader';

const SignUpP = props => {
  const [fileSrc, setFileSrc] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleChangeEvent = (event, field) => {
    const val = event.target.value;
    switch(field){
      case 'name': setPatientName(val);
                    break;
      case 'password': setPassword(val);
                        break;
      case 'fileUpload': setFileSrc(event.target.files[0]);
                          break;
      case 'email': setEmail(val);
                    break;
      default: console.log('Error!!');
    }
  };

  const submitHandler = async event => {
    event.preventDefault();
    try{
      setLoading(true);
      console.log('in here')
      const response = await axios.post('http://localhost:8080/api/patient/signup', {
                          email: email,
                          name: patientName,
                          password: password,
                          report: fileSrc
                        }, {
                          headers: {
                            'Content-type': 'multipart/form-data'
                          }
                        });
      if(response.status === 201)
        navigate('/patient/login');
      setLoading(false);
    }
    catch(err){
      console.log(err);
      setLoading(false);
    }
  }
  return (
    <div className = {[styles.outerBox, loading ? styles.bk : ""].join(' ')}>
      <Navigation hide = 'true'/>
      {loading ? <Loader signup = {true}/> : 
      <form onSubmit={submitHandler}>
        <h3>{props.name1}</h3>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value = {patientName}
            onChange={event => handleChangeEvent(event, 'name')}
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value = {email}
            onChange={event => handleChangeEvent(event, 'email')}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value = {password}
            onChange={event => handleChangeEvent(event, 'password')}
          />
        </div>
        <div className="mb-3">
          <label>Upload Report</label>
          <input
            type="file"
            className="form-control"
            placeholder="Enter password"
            onChange={event => handleChangeEvent(event, 'fileUpload')}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-outline-dark">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/patient/login">sign in?</a>
        </p>
      </form>}
    </div>
  )
}

export default SignUpP;