import {search, getAll} from "../BooksAPI";
const Search = ({updateSearchChangeHanlder}) => {

    const searchChangeHanlder = (status) => {
        updateSearchChangeHanlder(status)
    }

    const inputChangeHandler = async(event) => {
       console.log(await getAll());

    }
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a
          className="close-search"
          onClick={() => searchChangeHanlder(false)}
        >
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input onChange ={inputChangeHandler} type="text" placeholder="Search by title, author, or ISBN" />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    </div>
  );
};

export default Search;