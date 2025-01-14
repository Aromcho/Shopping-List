import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const AddItem = ({ show, handleClose, refreshList }) => {
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [typeAmount, setTypeAmount] = useState("mg");

    const userId = user?.user._id;

    const createItem = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/shoplist/", {
                userId,
                name,
                amount,
                typeAmount,
            });
            console.log("Item created:", response.data);
            handleClose(); // Cierra el modal después de guardar
            refreshList(); // Actualiza la lista de elementos
        } catch (error) {
            console.error("Error creating item:", error);
        }
    };
    
    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formItemName">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter item name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Correcto manejo de `onChange`
                        />
                    </Form.Group>
                    <Form.Group controlId="formItemAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)} // Correcto manejo de `onChange`
                        />
                    </Form.Group>
                    <Form.Group controlId="formItemTypeAmount">
                        <Form.Label>Type Amount</Form.Label>
                        <Form.Control
                            as="select"
                            value={typeAmount}
                            onChange={(e) => setTypeAmount(e.target.value)} // Correcto manejo de `onChange`
                        >
                            <option value="mg">mg</option>
                            <option value="kg">kg</option>
                            <option value="unit">Unit</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={createItem}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddItem;
