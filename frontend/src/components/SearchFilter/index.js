import "./SearchFilter.css";

function SearchFilter({ query, setQuery }) {

    return (
        <div className="search-bar-container">
            <div className="search-input">
                <input
                    type="search"
                    value={query}
                    placeholder="Search by city..."
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchFilter;
