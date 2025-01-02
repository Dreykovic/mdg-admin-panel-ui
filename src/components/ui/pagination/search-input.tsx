import React from 'react';

interface ISearchInputProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchInput = ({ search, setSearch }: ISearchInputProps) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };
  return (
    <>
      <div>
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          aria-label="search"
          aria-describedby="addon-wrapping"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    </>
  );
};

export default SearchInput;
