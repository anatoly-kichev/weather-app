export const SearchPanel = ({ value, onChangeInput, onKeyPress }) => {
  return (
    <input
      value={value}
      onChange={onChangeInput}
      onKeyPress={onKeyPress}
    />
  )
}
