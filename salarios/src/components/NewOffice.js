import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { db } from '../Firebase';
import { toast } from 'react-toastify';
import ContainerLayout from './ContainerLayout';
import FormOffice from './FormOffice';

export default function NewOffice() {
  const [error, setError] = useState('');
  const history = useHistory();

  const addOrEditOffice = async (officeObject) => {
    try {
      setError('');
      if (parseInt(officeObject.earnings) < 1000) {
        setError('The earnings must be higher than $1000');
      } else if (
        parseInt(officeObject.employees) > 20 ||
        parseInt(officeObject.employees) < 10
      ) {
        setError('The number of employees must be between 10 and 20');
      } else {
        await db
          .collection('offices')
          .doc()
          .set(officeObject);
        toast('New office added', {
          type: 'success',
        });
        history.push('/offices');
      }
    } catch {
      setError('Failed to added a new office');
    }
  };

  return (
    <>
      <ContainerLayout>
        {error && <Alert variant="danger">{error}</Alert>}
        <FormOffice addOrEditOffice={addOrEditOffice} />
      </ContainerLayout>
    </>
  );
}
