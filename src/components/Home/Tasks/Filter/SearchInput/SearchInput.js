import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const InputSearch = styled.input`
  border-radius: 30px;
`;
const SearchInput = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      onSearch(searchInput);
    }, 100);
    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchInput, onSearch]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  return (
    <>
      <label className="filter__form__label">Search: </label>
      <InputSearch
        label="Search"
        placeholder="Search by task title"
        type="text"
        name="search"
        id="search"
        value={searchInput}
        onChange={handleChange}
      />
    </>
  );
};

export default SearchInput;
