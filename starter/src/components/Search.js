import { search, getAll } from "../BooksAPI";
import React, { useState } from "react";
import AllBooks from "./AllBooks";
const Search = ({ updateSearchChangeHanlder, updateData }) => {
  const [bookData, setBookData] = useState({});

  const searchChangeHanlder = (status) => {
    updateSearchChangeHanlder(status);
  };

  const inputChangeHandler = async (event) => {
    const query = event.target.value.trim();
    if (query === "") {
      setBookData({});
      return;
    }else {
    const searchResults = await search(query, 10);
    if (searchResults.error) {
      setBookData({});
    } else {
    setBookData([searchResults]);
    }
  }
  };

  const onChangeHandler = (event, bookItem, book) => {
    const whereToAdd = event.target.value;
    const whatArray = bookItem;

    updateData(whereToAdd, whatArray);
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
        {Object.keys(bookData).map((book) => (
          <div key={book}>
            <ol className="books-grid">
              {bookData[book].map((bookItem, index) => (
                <li key={index}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url("${bookItem.imageLinks.smallThumbnail}")`,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select
                          value="none"
                          onChange={(event) =>
                            onChangeHandler(event, bookItem, book)
                          }
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
                    <div className="book-authors">{bookItem["authors"]}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}

        <ol className="books-grid"></ol>
      </div>
    </div>
  );
};

export default Search;
