import {HashRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error";
import ListUsers from "../fetaures/users/ListUsers";
import AddUsers from "../fetaures/users/AddUsers";
import EditUsers from "../fetaures/users/EditUsers";
import Footer from "../components/Footer";
import NavBar from "../layouts/NavBar";
import Books from "../pages/books/Books";
import Users from "../pages/users/Users";
import UserForm from "../pages/users/UserForm";

const Index = () => {
    return <>
        <HashRouter basename="/">
            <NavBar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />}/>

                    {/* Users Routes */}
                    <Route path="/list-users" element={<ListUsers />}/>
                    <Route path="/add-users" element={<AddUsers />}/>
                    <Route path="/edit-user" element={<EditUsers />}/>
                    <Route path="/new-users" element={<Users />}/>
                    <Route path="/create-users" element={<UserForm />}/>
                    <Route path="/edit-users/" element={<UserForm />}/>

                    {/* Books Routes */}
                    <Route path="/books" element={<Books />}/>
                    <Route path="*" element={<Error />} />
                </Routes>
            </main>
            <Footer />
        </HashRouter>
    </>
}

export default Index;