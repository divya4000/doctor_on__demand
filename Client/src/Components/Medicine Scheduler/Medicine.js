import React from 'react'

import styles from './Medicine.module.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Calendar from '../CalendarComponent';

import med from '../../assets/Images/med.jpeg';

const Medicine= props => {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  console.log(props.med);
  return (
  <>
  <div className={[styles.container, styles.outerBox].join(' ')}>
    {/* <h1 className="text-center  text-captitalize my-5 " >Medicine Schedule</h1>
    <hr/> */}
    <h3>{date}</h3>
    <br/>
    <h4>Set a Reminder for your medicines</h4>
    <br/>
    <div className="row">
    <div className={[styles.box + " col-sm"]}><div className={styles.card} >
  <img src={med} className="card-img-top" alt="..." height="150px" background-size="cover" resizemode="cover"/>
  <div className={styles['card-body']}>
    <h5 className="card-title">Before Breakfast</h5>
    <ul className={styles['no-bullets']}>
      <li>{props.med[0].name}   {props.med[0].dose}</li>
      {/* <li>Parcacetamol   1tbs</li> */}
    </ul>
  </div>
</div></div>
    <div className={[styles.box + " col-sm"]}><div className={styles.card} >
  <img src={med} 
  className="card-img-top" 
  alt="..."
  height="150px"/>
  <div className={styles['card-body']}>
    <h5 className="card-title">After Lunch</h5>
    <ul className={styles['no-bullets']}>
    {/* <li>{props.med[1].name}   {props.med[1].dose}</li> */}
      <li>Parcacetamol   2tbs</li>
    </ul>
  </div>
</div></div>
    <div className={[styles.box + " col-sm"]}><div className={styles.card} >
  <img src={med} className="card-img-top" alt="..." height="150px"/>
  <div className={styles['card-body']}>
    <h5 className="card-title">After Dinner</h5>
    <ul className={styles['no-bullets']}>
    {/* <li>{props.med[2].name}   {props.med[2].dose}</li> */}
      <li>Parcacetamol   2tbs</li>
    </ul>
  </div>
</div></div>
  </div>
  <br/>
  <br/>
  <div className={styles.ss}>
  <a href="https://calendar.google.com/calendar/u/0?cid=cGZiZjUwbTZoZzZpM24wdnI4c3UwOWNsaXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ" target = '_blank'>Set Reminder</a>
  </div>
 
  </div>
  {/* <iframe src={"https://calendar.google.com/calendar/embed?src=ajkk00iqapasv2h8sjrmss1eh8%40group.calendar.google.com&ctz=Asia%2FKolkata"} style={{border: "0", width:"800px", height:"600px", frameBorder:"0", scrolling:"no"}}></iframe> */}
    <Calendar />
    </>
  );
};

export default Medicine;
