import React, {useState} from "react";

const BulkActions = ({bulkAction}) => {

    const [selectedAction, setSelectedAction] = useState('-1');

    const handleActionChange = (e) => {
        setSelectedAction(e.target.value);
    };

    const handleSubmit = () => {
        if ( selectedAction !== '-1' ) {
            bulkAction(selectedAction);
        }
    };

    return <>
        <div className="alignleft actions bulkactions">
            <label htmlFor="bulk-action-selector-top" className="screen-reader-text">Select bulk action</label>
            <select name="action" id="bulk-action-selector-top" onChange={handleActionChange}>
                <option value="-1">Bulk actions</option>
                <option value="edit" className="hide-if-no-js">Edit</option>
                <option value="trash">Move to Trash</option>
            </select>
            <button type="submit" onClick={ () => (handleSubmit()) } className="button">Action</button>
        </div>
    </>
}

export default BulkActions;