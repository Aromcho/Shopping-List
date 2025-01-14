import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddItem from "../../components/AddItem/AddItem";
import UpdateItem from "../UpdateItem/UpdateItem";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import "./myShoppingList.css";
import { Link } from "react-router-dom";

export default function DenseTable() {
    const { user } = useAuth();
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [listItems, setListItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);

    const userId = user ? user.user._id : null;

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = (item) => {
        setCurrentItem(item);
        setShowUpdate(true);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/shoplist/${userId}`);
            setListItems(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/shoplist/${id}`);
            console.log("Item deleted:", response.data);
            fetchData();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const rows = listItems;

    return (
        <div className="container mt-5">
            <h2 className="text-center display-4">My List</h2>
            {user ? (
            <TableContainer component={Paper} className="mb-3">
                <Table className="table table-striped table-hover" size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name item</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Type Amount</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.typeAmount}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outline-danger" className="me-2" onClick={() => deleteItem(row._id)}>Delete</Button>
                                    <Button variant="outline-primary" onClick={() => handleShowUpdate(row)}>Update</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>) : (
                <div className="text-center">
                <p className="text-center">Please log in to see your list</p>
                <Button as={Link} to="/login" variant="outline-primary" >Login</Button>
                </div>
            )}
            <Button className="flotador" onClick={handleShowAdd}>
                +
            </Button>
            <AddItem show={showAdd} handleClose={handleCloseAdd} refreshList={fetchData} />
            <UpdateItem show={showUpdate} handleClose={handleCloseUpdate} refreshList={fetchData} itemId={currentItem ? currentItem._id : null} />
        </div>
    );
}
