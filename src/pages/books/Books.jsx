import {Link} from "react-router-dom";
import Table from "../../components/Table/Table";

const Books = () => {
    const bookColumns = ['Name', 'Category', 'Author'];
    const bookData = [
        {name: "Life of PI", category: "Adventure", author: "Yann Martel"},
        {name: "JUMANJI", category: "Adventure", author: "Chris Van Allsburg"}
    ];


    return <>
        <Table title="Books" columns={bookColumns} data={bookData} />
    </>
}
export default Books;