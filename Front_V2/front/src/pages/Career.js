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
import { deleteCareer, getCareers, postCareer, updateCareer } from "../helpers/career";
import { getInstitutes } from "../helpers/institute";

import toast, { Toaster } from "react-hot-toast";

const initialCareer = {
  name: "",
  institute: "",
}

const Career = () => {

  const [career, setCareer] = useState(initialCareer)
  const [careers, setCareers] = useState([])
  const [institutes, setInstitutes] = useState([])
  const [update, setUpdate] = useState(false);

  const updateInstitutes = () => {
    getInstitutes().then((institutesNew) => {
      console.log(institutesNew)
      setInstitutes(institutesNew)
    })
  }


  const updateCareers = () => {
    getCareers().then(careersNew => {
      console.log(careersNew);
      setCareers(careersNew);
    })
  }



  const sendCareer = () => {
    const res = postCareer(career)
    toast.promise(
      res, {
      loading: "Cargando...",
      success: "Se guardo con exito",
      error: err => console.log(err)
    }
    )
    setCareer(initialCareer)
  }

  const deleteCareerSelect = (careerSelected) => {
    const deleteId = careerSelected.id
    const res = deleteCareer(deleteId)
    toast.promise(res, {
      loading: "Cargando...",
      success: "Se elimino con exito",
      error: err => console.log(err)
    })
    setCareer(initialCareer)
    setUpdate(false)
  }

  const updateCareerSelect = () => {
    const updateId = career.id
    const res = updateCareer(updateId, career)
    toast.promise(res, {
      loading: "Cargando...",
      success: "Se guardo con exito",
      error: err => console.log(err)
    })
    setCareer(initialCareer)
    setUpdate(false)
  }

  const handleUpdateInstituteSelect = (careerSelected) => {
    setUpdate(true)
    setCareer(careerSelected)
  }

  const handleChanguesCareers = (event) => {
    setCareer({ ...career, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    updateCareers();
    updateInstitutes();
  }, []);

  useEffect(() => {
    updateCareers();
    updateInstitutes();
  }, [careers]);


  return (
    <>
      <Form title="Carrera">
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              value={career.name}
              variant="outlined"
              name="name"
              label="Nombre de la carrera"
              onChange={handleChanguesCareers}
            />
          </Grid>
          <Grid item xs={7}>
            <FormControl fullWidth>
              <InputLabel>Instituto</InputLabel>
              <Select label="Instituto"
                value={career.institute}
                name="institute"
                label="Instituto"
                onChange={handleChanguesCareers}>
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {institutes.map((institute) => (
                  <MenuItem value={institute.name}>{institute.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {!update ? (
              career.name !== "" &&
                career.institute !== "" ? (
                <Button variant="contained" onClick={sendCareer}>
                  Enviar
                </Button>
              ) : (
                <Button variant="contained" disabled onClick={sendCareer} >
                  Enviar
                </Button>
              )
            ) : (
              <Button variant="contained" onClick={updateCareerSelect} >
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
                <TableCell>Carrera</TableCell>
                <TableCell>Instituto</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {careers.map((career) => (
                <TableRow key={career.id}>
                  <TableCell>{career.name}</TableCell>
                  <TableCell>{career.institute}</TableCell>
                  <TableCell component="th" scope="row">
                    <ButtonGroup variant="text" aria-label="text button group">
                      <Button>
                        {" "}
                        <Fab
                          color="primary"
                          size="small"
                          aria-label="edit"
                          onClick={() => handleUpdateInstituteSelect(career)}
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
                          onClick={() => deleteCareerSelect(career)}
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

export default Career;
