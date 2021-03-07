import styles from './cover.module.css';
import cover from '../../assets/images/incomoda-low.jpg';

const Cover = () => (
    <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
            <img src={cover} alt="Incómoda" />
        </div>
        <div className={styles.textWrapper}>
            <div className={styles.header}>
                <div className={styles.title}>Incómoda</div>
            </div>

            <div className={styles.author}>Marcela Laudonio</div>
        </div>
    </div>
);

export default Cover;
