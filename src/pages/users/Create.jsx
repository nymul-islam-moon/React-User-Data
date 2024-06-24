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
        <div className="wrap">
            <h1 className="wp-heading-inline">Add New User</h1>
            <hr className="wp-header-end"/>
            <form>
                <table className="form-table">
                    <tbody>
                        <tr>
                            <th scope="row">
                                <label htmlFor="name">Name</label>
                            </th>
                            <td>
                                <input name="name"
                                       type="text"
                                       id="name"
                                       value={name}
                                       onChange={(e) => {
                                           setName(e.target.value)
                                       }}
                                       className="regular-text"
                                       required/>
                            </td>
                        </tr>
                        <tr>
                        <th scope="row">
                            <label htmlFor="email">Email</label>
                        </th>
                        <td>
                            <input
                                name="email"
                                type="email"
                                id="email"
                                value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                                className="regular-text"
                                required/>
                        </td>
                    </tr>
                        <tr>
                        <th scope="row">
                            <label htmlFor="phone">Phone</label>
                        </th>
                        <td>
                            <input
                                name="phone"
                                type="tel"
                                id="phone"
                                value={phone} onChange={(e) => {
                                setPhone(e.target.value)
                            }}
                                className="regular-text"/>
                        </td>
                    </tr>
                        <tr>
                        <th scope="row">
                            <label htmlFor="address">Address</label>
                        </th>
                        <td>
                                <textarea
                                    name="address"
                                    id="address"
                                    className="regular-text"
                                    rows="3"
                                    value={address} onChange={(e) => {
                                    setAddress(e.target.value)
                                }}
                                ></textarea>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p className="submit">
                    <button type="submit" className="button button-primary">Add User</button>
                </p>
            </form>
        </div>
    </>
}

export default Create;