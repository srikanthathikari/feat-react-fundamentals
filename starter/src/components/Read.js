import { useState } from "react";

const Read = ({bookData}) => {
    return (
        <div className="bookshelf-books">
                  <ol className="books-grid"> 
                    {bookData.map((book, i) =>(
                    <li key={i}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: book.width,
                              height: book.height,
                              backgroundImage: `url("${book.url}")`
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select>
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.author}</div>
                      </div>
                    </li>
))}
                  </ol>
                </div>
    )
}

export default Read;