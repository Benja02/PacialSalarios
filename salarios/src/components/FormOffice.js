import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
export default function FormOffice(props) {
  const initialStateValues = {
    name: '',
    earnings: '',
    employees: '',
    state: '',
  };

  const [office, setOffice] = useState({ initialStateValues });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addOrEditOffice(office);
    setOffice({ ...initialStateValues });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOffice({ ...office, [name]: value });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group id="name">
          <Form.Label>Office's name</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            type="text"
            name="name"
            value={office.name}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group id="earnings">
          <Form.Label>Earnings</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            type="number"
            name="earnings"
            value={office.earnings}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group id="employees">
          <Form.Label>Employees</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            type="number"
            name="employees"
            value={office.employees}
            required
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="w-100">
          Register
        </Button>
      </Form>
    </>
  );
}
