import styles from './Loader.module.css';

const loader = props => {
    return (
        <div className={styles.middle}>
            <div className={[styles.bar, styles.bar1].join(' ')}></div>
            <div className={[styles.bar, styles.bar2].join(' ')}></div>
            <div className={[styles.bar, styles.bar3].join(' ')}></div>
            <div className={[styles.bar, styles.bar4].join(' ')}></div>
            <div className={[styles.bar, styles.bar5].join(' ')}></div>
            <div className={[styles.bar, styles.bar6].join(' ')}></div>
            <div className={[styles.bar, styles.bar7].join(' ')}></div>
            <div className={[styles.bar, styles.bar8].join(' ')}></div>
        </div>
    );
};

export default loader;