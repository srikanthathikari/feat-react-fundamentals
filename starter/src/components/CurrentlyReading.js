import { useState } from "react";

const CurrentlyReading = ({ bookData }) => {
  return (
    <div>
      {Object.keys(bookData).map((book) => (
        <div key={book}>
          <h2 className="bookshelf-title">{book}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {bookData[book].map((bookItem, index) => (
                <li key={index}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: bookItem.width,
                          height: bookItem.height,
                          backgroundImage: `url("${bookItem.url}")`,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select>
                          <option value="none">Move to...</option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{bookItem.title}</div>
                    <div className="book-authors">{bookItem.author}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurrentlyReading;
