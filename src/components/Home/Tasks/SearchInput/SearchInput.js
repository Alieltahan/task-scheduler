import styled from 'styled-components';

const SearchContainer = styled.div`
  margin-bottom: 2rem;

  .search__label {
    font-size: 1.5rem;
  }
  .search__input {
    padding: 0.8rem;
    width: 25rem;
    @media screen and (max-width: 500px) {
      width: 20rem;
    }
  }
`;

const SearchInput = ({ onSearch, onInput }) => {
  return (
    <SearchContainer>
      <input
        className="search__input"
        placeholder="Search by task title"
        type="text"
        name="search"
        id="search"
        value={onInput}
        onChange={(e) => onSearch(e.target.value)}
        style={{ borderRadius: '30px' }}
      />
    </SearchContainer>
  );
};

export default SearchInput;
