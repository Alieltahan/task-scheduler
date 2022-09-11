import styled from 'styled-components';

const InputSearch = styled.input`
  border-radius: 30px;
`;
const SearchInput = ({ onChange, input }) => {
  return (
    <>
      <label className="filter__form__label">Search: </label>
      <InputSearch
        label="Search"
        placeholder="Search by task title"
        type="text"
        name="search"
        id="search"
        value={input}
        onChange={onChange}
      />
    </>
  );
};

export default SearchInput;
