import styles from './cover.module.css';
import cover from '../../assets/images/petra.jpg';

const Cover = () => (
    <div className={styles.wrapper}>
        <div className={styles.header}>
            <div className={styles.title}>Incómoda</div>
        </div>

        <div className={styles.imageWrapper}>
            <img src={cover} alt="Incómoda" width="750" height="562" />
        </div>
        <div className={styles.author}>Marcela Laudonio</div>
    </div>
);

export default Cover;
