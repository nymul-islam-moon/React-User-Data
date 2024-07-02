import {useState} from "react";

const DateFilter = ({handleFilter}) => {

    const [ startDate, setStartDate ] = useState('');
    const [ endDate, setEndDate ] = useState('');

    const handleFilterDate = () => {
        handleFilter(startDate, endDate);
        // console.log(startDate + ' - ' + endDate);
    }

    return <>
        <div className="alignleft actions">
            <label htmlFor="filter-start-date" className="screen-reader-text">Start Date</label>
            <input
                type="date"
                name="start-date"
                id="filter-start-date"
                className="postform"
                onChange={(e) => setStartDate(e.target.value)}
            />

            <label htmlFor="filter-end-date" className="screen-reader-text">End Date</label>
            <input
                type="date"
                name="end-date"
                id="filter-end-date"
                className="postform"
                onChange={(e) => setEndDate(e.target.value)}
            />

            <input type="submit" onClick={handleFilterDate} name="filter_action" id="post-query-submit" className="button" value="Filter"/>
        </div>

    </>
}

export default DateFilter;