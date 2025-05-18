import { useState } from "react";

const AllBooks = ({ bookData, updateData, removeData }) => {
  const onChangeHandler = (event, bookItem, currentShelf) => {
    const newShelf = event.target.value;

    if (newShelf === currentShelf) {
      // If the shelf hasn't changed, do nothing
      return;
    }

    // Remove the book from the current shelf
    removeData(currentShelf, bookItem);

    // Add the book to the new shelf
    updateData(newShelf, bookItem);
  };

  return (
    <div>
      {Object.keys(bookData).map((shelf) => (
        <div key={shelf}>
          <h2 className="bookshelf-title">{shelf}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {bookData[shelf].map((bookItem, index) => (
                <li key={index}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url("${
                            bookItem.url || bookItem.imageLinks?.smallThumbnail || ""
                          }")`,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select
                          value={shelf} // Set the current shelf as the selected value
                          onChange={(event) =>
                            onChangeHandler(event, bookItem, shelf)
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
                    <div className="book-authors">
                      {bookItem.author || bookItem.authors?.join(", ")}
                    </div>
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

export default AllBooks;
