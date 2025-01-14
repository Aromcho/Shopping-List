import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const UpdateItem = ({ show, handleClose, refreshList, itemId }) => {
    if (!itemId) {
        console.error("Error: itemId is undefined");
        return null;
    }
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [typeAmount, setTypeAmount] = useState("mg");
    const update = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/shoplist/${itemId._id}`, {
                name,
                amount,
                typeAmount
            });
            console.log("Item updated:", response.data);
            refreshList();
            handleClose();
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formItemName">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter item name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formItemAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formItemTypeAmount">
                        <Form.Label>Type Amount</Form.Label>
                        <Form.Control
                            as="select"
                            value={typeAmount}
                            onChange={(e) => setTypeAmount(e.target.value)}
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
                <Button variant="primary" onClick={update}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

    );
};

export default UpdateItem;
