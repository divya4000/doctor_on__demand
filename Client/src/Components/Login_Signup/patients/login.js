import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styles from './Login.module.css'

import Navigation from '../../Navigation/HorizontalNav/Navigation';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['Patient']);
  const navigate = useNavigate();

  useEffect(() => {
    if(cookies.email){
      setEmail(cookies.email);
      setPassword(cookies.password);
      setCheck(true);
    }
  }, []);


  const handleChangeEvent = (event, field) => {
    const val = event.target.value;
    switch(field){
      case 'email': setEmail(val);
                    break;
      case 'password': setPassword(val);
                        break;
      default: console.log('Error!!');
    }
  }

  const setCookiesForLogin = event => {
    console.log(event.target.checked);
    const checked = event.target.checked;
    setCheck(checked);
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if(localStorage.getItem('doctorId')){
      localStorage.removeItem('token');
      localStorage.removeItem('doctorId');
    }

    if(check){
      setCookie('email', email, { path: '/', expires: new Date(new Date().getTime() + 1000*60*180)});
      setCookie('password', password, { path: '/', expires: new Date(new Date().getTime() + 1000*60*180)})
    }
    else{
      console.log('removing cookie');
      removeCookie('email');
      removeCookie('password');
    }

    console.log(password, email);
    try{
      const response = await axios.post('http://localhost:8080/api/patient/login', {
        email: email,
        password: password
      });

      console.log(response);
      if(response.status === 200){
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('patientId', response.data.userId);
        navigate('/patient/report');
      }
    }
    catch(err){
      console.log(err);
      const errs = [...errors];
      errs.push(err);
      setErrors(errs);
      console.log(errors);
    }
  }

  return (
    <div  className = {[styles.outerBox].join(' ')}>
      <Navigation hide = 'false'/>
      <form onSubmit = {submitHandler}>
        <h3>{props.name}</h3>
        <div className="mb-3">
          <label>Email ID</label>
          <input
            type="email"
            className="form-control"
            value = {email}
            placeholder="xyz@gmail.com"
            onChange = {event => handleChangeEvent(event, 'email')}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value = {password}
            placeholder="Enter password"
            onChange = {event => handleChangeEvent(event, 'password')}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
              checked = {check ? true: false}
              onChange = {setCookiesForLogin}
            />
            <label  className="tt custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-outline-dark">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    </div>
  );
}

export default Login;