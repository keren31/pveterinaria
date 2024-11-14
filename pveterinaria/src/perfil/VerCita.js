import { TrashIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/solid";
import { Typography, IconButton } from "@material-tailwind/react";
import PerfilLayout from "./PerfilLayout";
import { useState, useEffect, useCallback } from "react";
import Layout from "../Layout";
import { useUser } from "../../src/UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './vercita.css';

export default function VerCita() {
  const [Estado] = useState("Cancelada");
  const [Ip, setIp] = useState("Cancelada");
  const { user } = useUser();
  const navigate = useNavigate();
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const [idCita, setIdCita] = useState(null);
  const [dataCitas, setDataCitas] = useState([]);

  const obtenerIdUsuario = (user) => {
    return user && user.idUsuario ? user.idUsuario : null;
  };

  const id = obtenerIdUsuario(user);

  const handleCancel = (IdCita) => {
    setIdCita(IdCita);
    CancelarReservacion();
  };

  async function json(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const CancelarReservacion = () => {
    const data = new FormData();
    data.append("idCita", parseInt(idCita));
    data.append("Estado", Estado);
    data.append("ip", Ip);

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
            }).then(() => obtenerCitas());
          }
        });
    } catch {
      Swal.fire({
        icon: "warning",
        title: "Lo sentimos",
        text: "Parece que hay un error en el servidor. Por favor, inténtelo de nuevo más tarde.",
      });
    }
  };

  const ObtenerIp = useCallback(() => {
    let apiKey = "8c308d0e8f217c1a489e15cb1998c34ffcd76bcead2a2851c3878299";
    json(`https://api.ipdata.co?api-key=${apiKey}`).then((data) => {
      setIp(data.ip);
    });
  }, []);

  const obtenerCitas = async () => {
    if (!id) return;
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/ObtenerCitasCANPorId?idUsuario=${id}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        const now = new Date(); // Fecha y hora actual

        // Filtrar citas que aún no han pasado ni en fecha ni en hora
        const citasFuturas = data.filter((cita) => {
          const citaFecha = new Date(cita.Fecha);
          const [hours, minutes, seconds] = cita.Hora.split(':').map(Number);
          citaFecha.setHours(hours, minutes, seconds, 0);

          // Incluir solo citas futuras o citas de hoy en una hora posterior a la actual
          return (
            citaFecha > now || 
            (citaFecha.toDateString() === now.toDateString() && citaFecha > now)
          );
        });

        setDataCitas(citasFuturas);
      } else {
        console.error("Error al obtener datos de los usuarios:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };

  useEffect(() => {
    if (id) { 
      obtenerCitas();
    }
    ObtenerIp();
  }, [id]);

  return (
    <Layout>
      <PerfilLayout>
        <div className="citas-container">
          {dataCitas.map(
            ({ IdCita, NombreServicio, Fecha, Hora, Telefono, Estado }, key) => {
              const fechaFormateada = Fecha.split("T")[0];
              return (
                <div key={key} className="card-cita">
                  <div className="card-header">
                    <Typography variant="h4" color="blue-gray" fontWeight="bold" textAlign="center">
                      {NombreServicio}
                    </Typography>
                  </div>
                  <div className="card-content">
                    <Typography variant="subtitle1" color="blue-gray" textAlign="center">
                      Numero de cita: {IdCita}
                    </Typography>
                    <Typography variant="subtitle1" color="blue-gray" textAlign="center">
                      Fecha: {fechaFormateada}
                    </Typography>
                    <Typography variant="subtitle1" color="blue-gray" textAlign="center">
                      Hora: {Hora}
                    </Typography>
                    <Typography variant="subtitle1" color="blue-gray" textAlign="center">
                      Teléfono: {Telefono}
                    </Typography>
                  </div>
                  <div className="card-actions">
                    <Typography variant="subtitle1" color="blue-gray">
                      Estado: {Estado}
                    </Typography>
                    <div className="card-buttons">
                      <IconButton variant="text" onClick={() => navigate("/editarCita", { state: { IdCita } })}>
                        <PencilIcon className="h-6 w-6" />
                      </IconButton>
                      <IconButton variant="text" onClick={() => handleCancel(IdCita)}>
                        <TrashIcon className="h-6 w-6" />
                      </IconButton>
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
