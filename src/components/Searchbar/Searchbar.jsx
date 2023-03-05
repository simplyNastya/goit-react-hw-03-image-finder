// import PropTypes from 'prop-types';
import styles from './searchbar.module.css';

const Searchbar = () => {
  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
