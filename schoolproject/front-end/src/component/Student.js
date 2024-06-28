import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Button, Table } from "react-bootstrap";

const API_URL = "http://127.0.0.1:8000/student"; // Update this URL as needed

function Student() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [fee, setFee] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    (async () => await load())();
  }, []);

  async function load() {
    const result = await axios.get(API_URL);
    setStudents(result.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post(API_URL, {
        name: name,
        address: address,
        fee: fee,
      });
      alert("Student Registration Successfully");
      setId("");
      setName("");
      setAddress("");
      setFee("");
      load();
    } catch (err) {
      alert("Student Registration Failed");
    }
  }

  async function editStudent(student) {
    setName(student.name);
    setAddress(student.address);
    setFee(student.fee);
    setId(student.id);
  }

  async function deleteStudent(id) {
    await axios.delete(`${API_URL}/${id}`);
    alert("Student deleted Successfully");
    setId("");
    setName("");
    setAddress("");
    setFee("");
    load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put(`${API_URL}/${id}`, {
        name: name,
        address: address,
        fee: fee,
      });
      alert("Student Updated Successfully");
      setId("");
      setName("");
      setAddress("");
      setFee("");
      load();
    } catch (err) {
      alert("Student Update Failed");
    }
  }

  return (
    <Container>
      <h1>Student Details</h1>
      <Form>
        <Form.Group controlId="formStudentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formStudentAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formStudentFee">
          <Form.Label>Fee</Form.Label>
          <Form.Control
            type="text"
            value={fee}
            onChange={(event) => setFee(event.target.value)}
          />
        </Form.Group>

        <Button className="mt-4" variant="primary" onClick={save}>
          Register
        </Button>
        <Button className="mt-4" variant="warning" onClick={update}>
          Update
        </Button>
      </Form>

      <Table striped bordered hover variant="dark" className="mt-5">
        <thead>
          <tr>
            <th>Student Id</th>
            <th>Student Name</th>
            <th>Address</th>
            <th>Fee</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.address}</td>
              <td>{student.fee}</td>
              <td>
                <Button variant="warning" onClick={() => editStudent(student)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteStudent(student.id)}
                  className="ml-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Student;
