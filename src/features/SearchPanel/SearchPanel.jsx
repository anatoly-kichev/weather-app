import styles from './SearchPanel.module.css';

export const SearchPanel = ({ value, onChangeInput, onKeyPress }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        value={value}
        onChange={onChangeInput}
        onKeyPress={onKeyPress}
        placeholder="Enter the name of the city..."
      />
    </div>
  )
}
