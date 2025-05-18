import { search, getAll } from "../BooksAPI";
import React, { useState } from "react";
import AllBooks from "./AllBooks";

const Search = ({ updateSearchChangeHanlder, updateData, bookData }) => {
  const [searchResults, setSearchResults] = useState([]);

  const searchChangeHanlder = (status) => {
    updateSearchChangeHanlder(status);
  };

  const inputChangeHandler = async (event) => {
    const query = event.target.value.trim();
    if (query === "") {
      setSearchResults([]);
      return;
    } else {
      const results = await search(query, 10);
      if (results.error) {
        setSearchResults([]);
      } else {
        setSearchResults(results);
      }
    }
  };

  const onChangeHandler = (event, bookItem) => {
    const whereToAdd = event.target.value;
    updateData(whereToAdd, bookItem);
  };

  const getShelf = (bookItem) => {
    // Check if the book exists in the current bookData
    for (const shelf in bookData) {
      if (bookData[shelf].some((b) => b.title === bookItem.title)) {
        return shelf; // Return the shelf name if the book exists
      }
    }
    return "none"; // Default to "none" if the book is not in any shelf
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={() => searchChangeHanlder(false)}>
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            onChange={inputChangeHandler}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map((bookItem, index) => (
            <li key={index}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url("${bookItem.imageLinks?.smallThumbnail || ""}")`,
                    }}
                  ></div>
                  <div className="book-shelf-changer">
                    <select
                      value={getShelf(bookItem)} // Set the current shelf
                      onChange={(event) => onChangeHandler(event, bookItem)}
                    >
                      <option value="Currently Reading">
                        Currently Reading
                      </option>
                      <option value="Want to read">Want to read</option>
                      <option value="Read">Read</option>
                      <option value="none">none</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{bookItem.title}</div>
                <div className="book-authors">{bookItem.authors?.join(", ")}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
