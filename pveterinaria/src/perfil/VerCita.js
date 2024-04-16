import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import PerfilLayout from "./PerfilLayout";
import { useState, useEffect } from "react";
import Layout from "../Layout";
import { useUser } from "../../src/UserContext";
import { useNavigate } from "react-router-dom";


import Swal from "sweetalert2";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

export default function VerCita() {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  const obtenerIdUsuario = (user) => {
    return user && user.idUsuario ? user.idUsuario : null;
  };

  const id = obtenerIdUsuario(user);
  const [idCita, setIdCita] = useState(null); // Estado para almacenar el idReservacion seleccionado\

  const handleCancel = (IdCita) => {
    setIdCita(IdCita);
    CancelarReservacion();
  };
  const CancelarReservacion = () => {
    const data = new FormData();
    data.append("idCita", parseInt(idCita));
    data.append("Estado", "Cancelada");

    try {
      fetch(apiurll + "api/CasaDelMarisco/CambiarEstadoCitas", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result === "Cita pendiente") {
            Swal.fire({
              icon: "success",
              title: "La cancelación ha sido exitosa",
              showConfirmButton: false,
              timer: 2500,
            }).then(() => {});
          }
        });
    } catch {
      Swal.fire({
        icon: "warning",
        title: "Lo sentimos",
        text:
          "Parece que hay un error en el servidor. Por favor, inténtelo de nuevo más tarde.",
      });
    }
  };

  const [dataCitas, setDataCitas] = useState([]);

  useEffect(() => {
    obtenerCitas();
  }, []);

  console.log(id);
  const obtenerCitas = async () => {
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/ObtenerCitasCANPorId?idUsuario=${id}`,
        {
          method: "GET",
          // No es necesario incluir el body para una solicitud GET
        }
      );

      if (response.ok) {
        const userData1 = await response.json();
        setDataCitas(userData1);
      } else {
        console.error(
          "Error al obtener datos de los usuarios:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };
  return (
    <Layout>
      <PerfilLayout>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", justifyContent: "center", alignItems: "center" }}>
          {dataCitas.map(
            ({ IdCita, NombreServicio, Fecha, Hora, Telefono, Estado }, key) => {
              const fechaFormateada = Fecha.split("T")[0];
              return (
                <div key={key} style={{ display: "flex", flexDirection: "column", backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0px 4px 8px rgba(38, 39, 48, 0.1)", padding: "1rem", width: "300px" }}>
                  <div style={{ marginBottom: "1rem" }}>
                    <Typography variant="h4" color="blue-gray" fontWeight="bold" textAlign="center">
                      {NombreServicio}
                    </Typography>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <Typography variant="subtitle1" color="blue-gray" textAlign="center">
                      ID Cita: {IdCita}
                    </Typography>
                    <Typography variant="subtitle1" color="blue-gray" textAlign="center">
                      Fecha: {fechaFormateada}
                    </Typography>
                    <Typography variant="subtitle1" color="blue-gray" textAlign="center">
                      Hora: {Hora}
                    </Typography>
                    <Typography variant="subtitle1" color="blue-gray" textAlign="center">
                      Telefono: {Telefono}
                    </Typography>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="subtitle1" color="blue-gray">
                      Estado: {Estado}
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                      <Tooltip content="Editar Cita">
                        <IconButton
                          variant="text"
                          onClick={() =>
                            navigate("/editarCita", { state: { IdCita } })
                          }
                        >
                          <PencilIcon className="h-6 w-6" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Cancelar Cita">
                        <IconButton
                          variant="text"
                          onClick={() => handleCancel(IdCita)}
                        >
  
                          <TrashIcon className="h-6 w-6" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </PerfilLayout>
    </Layout>
  );
}