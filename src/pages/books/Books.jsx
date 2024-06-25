import {Link} from "react-router-dom";
import Table from "../../components/Table/Table";

const Books = () => {
    // const bookColumns = ['Name', 'Category', 'Author', 'Publish_Date'];
    const bookColumns = {
        'Name' : 'name',
        'Category': 'category',
        'Author': 'author',
        'Publish Date': 'publish_date'
    };
    const bookData = [
        {name: "Life of PI", category: "Adventure", author: "Yann Martel", publish_date: "12/12/2023"},
        {name: "JUMANJI", category: "Adventure", author: "Chris Van Allsburg", publish_date: "12/12/2023"}
    ];


    return <>
        <Table title="Books" columns={bookColumns} data={bookData} />
    </>
}
export default Books;