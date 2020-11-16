import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import ContainerLayout from './ContainerLayout';

export default function OfficeList() {
  useEffect(() => {
    getOffices();
  }, []);

  const [offices, setOffices] = useState([]);

  const getOffices = () => {
    db.collection('offices').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setOffices(docs);
    });
  };

  const deleteOffice = async (id) => {
    if (window.confirm('Are you sure you want to delete this office?')) {
      await db
        .collection('offices')
        .doc(id)
        .delete();
      toast('Office deleted', {
        type: 'error',
      });
    }
  };

  const stateOffice = (earning) => {
    if (earning < 30000) {
      return 'Good job';
    } else {
      return 'Excellen job!';
    }
  };

  return (
    <>
      <ContainerLayout>
        {offices.map((office) => {
          return (
            <Container id={office.id}>
              <div className="w-100 mb-4">
                <Card className="w-100" style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title className="text-center">
                      {office.name}
                    </Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <strong>Earnings:</strong> ${office.earnings}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Employees:</strong> {office.employees}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>State:</strong>{' '}
                      {stateOffice(parseInt(office.earnings))}
                    </ListGroupItem>
                    <ListGroupItem>
                      <Button
                        className="w-100"
                        variant="danger"
                        onClick={() => deleteOffice(office.id)}
                      >
                        Delete
                      </Button>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </div>
            </Container>
          );
        })}
      </ContainerLayout>
    </>
  );
}
