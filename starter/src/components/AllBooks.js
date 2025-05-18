import { useState } from "react";

const AllBooks = ({ bookData, updateData, removeData }) => {
  const onChangeHandler = (event, bookItem, book) => {
    const whereToAdd = event.target.value;
    const whatArray = bookItem;
    const whereToRemove = book;

    removeData(whereToRemove, whatArray);
    updateData(whereToAdd, whatArray);
  };
  return (
    <div>
      {Object.keys(bookData).map((book) => (
        <div key={book}>
          <h2 className="bookshelf-title">{book}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {bookData[book].map(
                (bookItem, index) => (
                  // console.log(bookItem),
                  (
                    <li key={index}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url("${
                                bookItem.url ||
                                bookItem.imageLinks.smallThumbnail
                              })`,
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select
                              value={book}
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
                        <div className="book-authors">{bookItem.author || bookItem["authors"]}</div>
                      </div>
                    </li>
                  )
                )
              )}
            </ol>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBooks;
