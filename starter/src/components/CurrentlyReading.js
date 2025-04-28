import { useState } from "react";

const CurrentlyReading = ({ bookData, updateData }) => {
  const onChangeHandler = (event, bookItem) => {
    const whereToAdd = event.target.value;
    const whatArray = bookItem

    updateData(whereToAdd, whatArray);
  
  }
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
                        <select onChange={(event) => onChangeHandler(event, bookItem)}>
                          <option value="Currently Reading">
                            Currently Reading
                          </option>
                          <option value="Want to read">Want to Read</option>
                          <option value="Read">Read</option>
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
