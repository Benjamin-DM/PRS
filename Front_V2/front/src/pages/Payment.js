import {
  Button,
  ButtonGroup,
  Fab,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Form from "../components/Form";
import { FormControl } from "@mui/material";
import TableC from "../components/Table";
import { TableContainer } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableBody } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getStudents } from "../helpers/student";

import toast, { Toaster } from "react-hot-toast";
import { deletePayment, getPayments, postPayment, updatePayment } from "../helpers/payment";

const initialPayment = {
  cost: "",
  type: "",
  idStudent: "",
  status: ""
}

const Payment = () => {

  const [payment, setPayment] = useState(initialPayment)
  const [payments, setPayments] = useState([])
  const [students, setStudents] = useState([])
  const [update, setUpdate] = useState(false);

  const handleChanguesPayment = (event) => {
    setPayment({ ...payment, [event.target.name]: event.target.value })
  }

  const sendPayment = () => {
    const res = postPayment(payment)
    toast.promise(res, {
      loading: "Cargando...",
      success: "Se envio con exito",
      error: err => console.log(err)
    })
    setPayment(initialPayment)
  }

  const updatePaymentSelect = () => {
    const updateId = payment.id
    const res = updatePayment(updateId, payment)
    toast.promise(res, {
      loading: "Cargando...",
      success: "Se envio con exito",
      error: err => console.log(err)
    })
    setUpdate(false)
    setPayment(initialPayment)
  }

  const deletePaymentSelect = (paymentSelected) => {
    const deleteId = paymentSelected.id
    const res = deletePayment(deleteId)
    toast.promise(res, {
      loading: "Cargando...",
      success: "Se envio con exito",
      error: err => console.log(err)
    })
    setUpdate(false)
    setPayment(initialPayment)
  }

  const handleUpdatePaymentSelect = (paymentSelected) => {
    console.log(paymentSelected)
    setUpdate(true)
    setPayment(paymentSelected)
  }

  const updateStudents = () => {
    getStudents().then((studentsNew) => {
      console.log(studentsNew)
      setStudents(studentsNew)
    })
  }

  const updatePayments = () => {
    getPayments().then((PaymentNew) => {
      console.log(PaymentNew)
      setPayments(PaymentNew)
    })
  }

  useEffect(() => {
    updatePayments();
    updateStudents();
  }, []);

  useEffect(() => {
    updatePayments();
    updateStudents();
  }, [payments]);

  return (
    <>
      <Form title="Pagos">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              name="cost"
              label="Costo"
              value={payment.cost}
              onChange={handleChanguesPayment}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de pago</InputLabel>
              <Select
                name="type"
                label="Tipo de pago"
                value={payment.type}
                onChange={handleChanguesPayment}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value="Examen de Insuficiendia">
                  Examen de Insuficiendia
                </MenuItem>
                <MenuItem value="Examen de Extraordinario">
                  Examen de Extraordinario
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Estudiante</InputLabel>
              <Select
                name="idStudent"
                label="Estudiante"
                value={payment.idStudent}
                onChange={handleChanguesPayment}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {
                  students.map(student => (
                    <MenuItem value={student.name} key={student.id}>
                      {student.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                name="status"
                label="Estado"
                value={payment.status}
                onChange={handleChanguesPayment}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value="solicitado">
                  Solicitado
                </MenuItem>
                <MenuItem value="pagado">
                  Pagado
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            {!update ? (
              payment.cost !== "" &&
                payment.idStudent !== "" &&
                payment.type !== "" &&
                payment.status !== "" ? (
                <Button variant="contained" onClick={sendPayment}>
                  Enviar
                </Button>
              ) : (
                <Button variant="contained" disabled onClick={sendPayment} >
                  Enviar
                </Button>
              )
            ) : (
              <Button variant="contained" onClick={updatePaymentSelect} >
                Modificar
              </Button>
            )
            }
          </Grid>
        </Grid>
      </Form>
      <TableC>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Costo</TableCell>
                <TableCell>Tipo de pago</TableCell>
                <TableCell>Estudiante</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.cost}</TableCell>
                  <TableCell>{payment.type}</TableCell>
                  <TableCell>{payment.idStudent}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell component="th" scope="row">
                    <ButtonGroup variant="text" aria-label="text button group">
                      <Button>
                        {" "}
                        <Fab
                          color="primary"
                          size="small"
                          aria-label="edit"
                          onClick={() => handleUpdatePaymentSelect(payment)}
                        >
                          <EditIcon />
                        </Fab>
                      </Button>
                      <Button>
                        {" "}
                        <Fab
                          color="secondary"
                          size="small"
                          aria-label="edit"
                          onClick={() => deletePaymentSelect(payment)}
                        >
                          <DeleteIcon />
                        </Fab>
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableC>
      <Toaster />
    </>
  );
};

export default Payment;
