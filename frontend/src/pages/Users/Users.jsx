import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const Users = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users')
            setUsers(response.data);
        } catch (error) {
         console.log(error);   
        }
    }

    // delete user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${id}`);
            getUsers(); // Recargar la lista de usuarios
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header text-center">
                            <h3>Users</h3>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {users.map(user => (
                                    <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {user.username}
                                        <span className="badge badge-primary badge-pill">{user._id}</span>
                                        <Button variant="danger" onClick={() => deleteUser(user._id)}>
                                        delete
                                    </Button>
                                    </li>
                                    
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Users;