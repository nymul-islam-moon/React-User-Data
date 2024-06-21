import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Create = () => {

    const [name, setName]       = useState("");
    const [email, setEmail]     = useState("");
    const [phone, setPhone]     = useState("");
    const [address, setAddress]     = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return <>

    </>
}

export default Create;