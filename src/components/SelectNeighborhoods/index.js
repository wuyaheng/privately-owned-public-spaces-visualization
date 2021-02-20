import React from "react";

function SelectNeighborhoods({ results, handleNtaChange }) {
    let ntaArray = Array.from(new Set(results.map((ele, i) => ele.nta))).sort()
    return (
        <div className="input-group mb-2">
            <select className="custom-select" id="inputGroupSelect02" onChange={handleNtaChange}>
                <option value="All Neighborhoods" selected="selected">All Neighborhoods</option>
                {ntaArray.map((ele, i) => ( <option key={i + "-el"} value={ele}>{ele}</option> ))}
            </select>
        </div>
    )
}

export default SelectNeighborhoods; 