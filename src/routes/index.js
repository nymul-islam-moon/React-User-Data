import {HashRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error";
import ListUsers from "../fetaures/users/ListUsers";
import AddUsers from "../fetaures/users/AddUsers";
import EditUsers from "../fetaures/users/EditUsers";
import Footer from "../layouts/Footer";
import NavBar from "../layouts/NavBar";

const Index = () => {
    return <>
        <HashRouter basename="/">
            <NavBar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />}/>
                        <Route path="/list-users" element={<ListUsers />}/>
                    <Route path="/add-users" element={<AddUsers />}/>
                    <Route path="/edit-user" element={<EditUsers />}/>
                    <Route path="*" element={<Error />} />
                </Routes>
            </main>
            <Footer />
        </HashRouter>
    </>
}

export default Index;