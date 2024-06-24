import {HashRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error";
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
                    <Route path="/users" element={<Users />}/>
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