import React from "react";

function SearchBoroughs({ results, handleInputChange }) {
    return (
        <div className="input-group mb-2">
            <select className="custom-select" id="inputGroupSelect01" onChange={handleInputChange}>
                {results.map((ele, i) => (
                    ele ? <option key={i + "-el"} value={ele}>{ele}</option> : null
                ))}
            </select>
        </div>
    )
}

export default SearchBoroughs; 