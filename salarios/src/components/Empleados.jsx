import React, { useEffect, useState } from "react";
import EmpleadoForm from "./EmpleadoForm";

import { db } from "../Firebase";
import { toast } from "react-toastify";

const Empleados = () => {
  const [Empleados, setEmpleados] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getEmpleados = async () => {
    db.collection("Empleados").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setEmpleados(docs);
    });
  };

  const onDeleteEmpleado = async (id) => {
    if (window.confirm("are you sure you want to delete this Empleado?")) {
      await db.collection("Empleados").doc(id).delete();
      toast("Se elimino un Empleado", {
        type: "error",
        //autoClose: 2000
      });
    }
  };


  useEffect(() => {
    getEmpleados();
  }, []);

  const addOrEditEmpleado = async (EmpleadoObject) => {
    if (parseInt(EmpleadoObject.totalhoras) <= 160) {
      EmpleadoObject.sueldobase = EmpleadoObject.totalhoras * 9.75;
    }
    if (parseInt(EmpleadoObject.totalhoras) > 160 && parseInt(EmpleadoObject.totalhoras) <= 200) {
      var primero = 160*9.75;   
      var restadehoras = EmpleadoObject.totalhoras - 160;

      EmpleadoObject.sueldobase = primero + (restadehoras* 10.50) ;
    }
    if (parseInt(EmpleadoObject.totalhoras) > 200 && parseInt(EmpleadoObject.totalhoras) <= 250) {
      var primerashoras = 160*9.75;
      var segundo = 40*10.50;
      
      var restantehoras = EmpleadoObject.totalhoras - 200;


      EmpleadoObject.sueldobase = primerashoras + segundo + (restantehoras* 12.50) ;
    }

    EmpleadoObject.isss = EmpleadoObject.sueldobase*0.0525;
    EmpleadoObject.afp = EmpleadoObject.sueldobase*0.0688;
    EmpleadoObject.renta = EmpleadoObject.sueldobase*0.1;

    EmpleadoObject.sueldoneto = EmpleadoObject.sueldobase - (EmpleadoObject.isss+EmpleadoObject.afp+EmpleadoObject.renta);


  
    try {
      if (currentId === "") {
        await db.collection("Empleados").doc().set(EmpleadoObject);
        toast("Se agrego un Empleado", {
          type: "success",
        });
      } else {
        await db.collection("Empleados").doc(currentId).update(EmpleadoObject);
        toast("Se actualizo un Empleado", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>    
      <div className="col-md-4 p-2">
        <h2>Agregar Empleados</h2>
        <EmpleadoForm {...{ addOrEditEmpleado, currentId, Empleados }} />
      </div>

      <div className="col-md-8 p-2">
        <div class="container">
          <h2>Lista Empleado</h2>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Total Horas</th>
                <th>Sueldo Base</th>
                <th>Descuento ISSS</th>
                <th>Descuento AFP</th>
                <th>Descuento Renta</th>
                <th>Salario Neto</th>
                <th>Aciones</th>
              </tr>
            </thead>
            <tbody>
              {Empleados.map((Empleado) => (
                <tr key={Empleado.id}>
                  <td>{Empleado.codigo}</td>
                  <td>{Empleado.nombre}</td>
                  <td>{Empleado.totalhoras}</td>
                  <td>{Empleado.sueldobase}</td>
                  <td>{Empleado.isss}</td>
                  <td>{Empleado.afp}</td>
                  <td>{Empleado.renta}</td>
                  <td>{Empleado.sueldoneto}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => setCurrentId(Empleado.id)}>Editar</button>
                    &nbsp;
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => onDeleteEmpleado(Empleado.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Empleados;

