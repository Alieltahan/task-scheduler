import { useState } from 'react';
import { useEffect } from 'react';
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

const SearchInput = ({ onSearch, searchInput }) => {
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Debounce
    const searchTimer = setTimeout(() => {
      // Condition to avoid double rendering.
      if (userInput !== searchInput) {
        onSearch(userInput);
      }
    }, 300);
    return () => {
      clearTimeout(searchTimer);
    };
  }, [onSearch, searchInput, userInput]);

  return (
    <SearchContainer>
      {/* <label className="search__label">Search: </label> */}
      <input
        className="search__input"
        placeholder="Search by task title"
        type="text"
        name="search"
        id="search"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{ borderRadius: '30px' }}
      />
    </SearchContainer>
  );
};

export default SearchInput;
