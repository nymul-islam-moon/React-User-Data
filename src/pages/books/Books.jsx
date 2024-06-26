import {Link} from "react-router-dom";
import Table from "../../components/Table/Table";

const Books = () => {

    const bookColumns = { 'Name' : 'name', 'Category': 'category', 'Author': 'author', 'Rating': 'rating', 'Publish Date': 'publish_date' };
    const bookData = [
        {id: 1, name: "Life of PI", category: "Adventure", author: "Yann Martel", rating: 5.5, publish_date: "12/12/2023"},
        {id: 2, name: "JUMANJI", category: "Adventure", author: "Chris Van Allsburg", rating: 8.0, publish_date: "12/12/2023"},
        {id: 3, name: "Life of PHP", category: "Autobiography", author: "Telyan Marsubag", rating: 6, publish_date: "12/12/2023"}
    ];


    return <>
        <Table title="Books" columns={bookColumns} data={bookData} />
    </>
}
export default Books;