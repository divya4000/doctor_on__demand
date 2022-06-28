import styles from './Cards.module.css';

const card = props => {
    console.log(props);
    return (
        <div className = {[styles.container, props.status == 0 ? styles.critical: styles.moderate].join(' ')}>
            <div className = {styles.container1}>
                <img src = {props.img} alt = 'profile pic'/>
                <div className = {styles.name}>{props.name}</div>
            </div>
            <div className = {styles.details}>
                <u>Last Visit:</u> &nbsp;{props.date}
            </div>  
            <div className = {styles.details}>
                <u>Email Id:</u> &nbsp;{props.email}
            </div>  
            <div className = {styles.details}>
                <u>Status:</u> &nbsp;{props.status == 0 ? 'Critical': 'Moderate'}
            </div>  
        </div>
    );
}

export default card;