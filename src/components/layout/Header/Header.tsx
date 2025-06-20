import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import styles from "./header.module.css";
import Icon from "../../ui/Icon/Icon";

const Header = () => {
    const location = useLocation();

    return (
        <div className={styles.header}>
            <div className={styles.leftSide}>
                <Icon name="logo" className={styles.logo} />
                <div className={styles.title}>Межгалактическая Аналитика</div>
            </div>
            <nav className={styles.rightSide}>
                <Link
                    to="/analytics"
                    className={classNames({
                        [styles.active]: location.pathname === "/analytics",
                    })}
                >
                    <Icon name="upload" />
                    CSV Аналитик
                </Link>
                <Link
                    to="/generator"
                    className={classNames({
                        [styles.active]: location.pathname === "/generator",
                    })}
                >
                    <Icon name="generate" />
                    CSV Генератор
                </Link>
                <Link
                    to="/history"
                    className={classNames({
                        [styles.active]: location.pathname === "/history",
                    })}
                >
                    <Icon name="history" />
                    История
                </Link>
            </nav>
        </div>
    );
};

export default Header;
