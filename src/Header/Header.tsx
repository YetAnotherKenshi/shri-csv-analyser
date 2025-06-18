import styles from "./header.module.css";
import Logo from "/src/assets/logo.svg";
import Upload from "/src/assets/upload.svg";
import Generate from "/src/assets/generate.svg";
import History from "/src/assets/history.svg";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.leftSide}>
                <img src={Logo} alt="" className={styles.logo} />
                <div className={styles.title}>Межгалактическая Аналитика</div>
            </div>
            <nav className={styles.rightSide}>
                <a href="/analytics">
                    <img src={Upload} alt="" />
                    CSV Аналитик
                </a>
                <a href="/generator">
                    <img src={Generate} alt="" />
                    CSV Генератор
                </a>
                <a href="/history">
                    <img src={History} alt="" />
                    История
                </a>
            </nav>
        </div>
    );
};

export default Header;
