import React from "react";

function SelectNeighborhoods({ results, handleNtaChange }) {
    console.log(results)
    return (
        <div className="input-group mb-2">
            <select className="custom-select" id="inputGroupSelect02" onChange={handleNtaChange}>
                <option value="All Neighborhoods" selected="selected">All Neighborhoods</option>
                {results.map((ele, i) => (
                    ele.nta ? <option key={i + "-el"} value={ele.nta}>{ele.nta}</option> : null
                ))}
            </select>
        </div>
    )
}

export default SelectNeighborhoods; 