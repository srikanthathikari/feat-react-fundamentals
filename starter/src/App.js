import "./App.css";
import { useState, useEffect } from "react";
import AllBooks from "./components/AllBooks";
import Search from "./components/Search";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  // Load `bookData` from localStorage or use default data
  const [bookData, setBookData] = useState(() => {
    const savedData = localStorage.getItem("bookData");
    return savedData
      ? JSON.parse(savedData)
      : {
          "Currently Reading": [
            {
              url: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
              title: "To Kill a Mockingbird",
              author: "Harper Lee",
            },
            {
              url: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
              title: "Ender's Game",
              author: "Orson Scott Card",
            },
          ],
          "Want to read": [
            {
              url: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
              title: "1776",
              author: "David McCullough",
            },
            {
              url: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
              title: "Harry Potter and the Sorcerer's Stone",
              author: "J.K. Rowling",
            },
          ],
          "Read": [
            {
              url: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
              title: "The Hobbit",
              author: "J.R.R. Tolkien",
            },
            {
              url: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
              title: "Oh, the Places You'll Go!",
              author: "Seuss",
            },
            {
              url: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
              title: "The Adventures of Tom Sawyer",
              author: "Mark Twain",
            },
          ],
        };
  });

  // Save `bookData` to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bookData", JSON.stringify(bookData));
  }, [bookData]);

  const updateData = (whereToAdd, whatArray) => {
    setBookData((currentData) => ({
      ...currentData,
      [whereToAdd]: [...currentData[whereToAdd], whatArray],
    }));
  };

  const removeData = (whereToRemove, whatArray) => {
    setBookData({
      ...bookData,
      [whereToRemove]: bookData[whereToRemove].filter(
        (book) => book !== whatArray
      ),
    });
  };

  const updateSearchChangeHanlder = (status) => {
    setShowSearchpage(status);
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <Search
          updateSearchChangeHanlder={updateSearchChangeHanlder}
          updateData={updateData}
          bookData={bookData}
        />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <AllBooks
                  bookData={bookData}
                  updateData={updateData}
                  removeData={removeData}
                />
              </div>
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
