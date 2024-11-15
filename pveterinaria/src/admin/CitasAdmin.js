import {
  ChevronDownIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import AdminLayout from "./AdminLayout";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const TABLE_HEAD = [
  "IdCita",
  "Nombre",
  "NombreServicio",
  "Fecha",
  "Hora",
  "Correo",
  "Teléfono",
  "Opciones",
  "Estado",
];

export default function Citasadmin() {
  const [dataCitas, setDataCitas] = useState([]);
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const [idCita, setIdCita] = useState(null);
  const [dataCitasVer, setDataCitasVer] = useState([]);

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
            });
          }
        });
    } catch {
      Swal.fire({
        icon: "warning",
        title: "Lo sentimos",
        text: "Error en el servidor. Inténtelo más tarde.",
      });
    }
  };

  const obtenerCitas = async () => {
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/ObtenerCitasCAN`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const userData1 = await response.json();
        setDataCitas(userData1);
        setDataCitasVer(userData1);
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

  const filtrarCitasDelDia = (citas) => {
    const fechaActual = new Date();
    return citas.filter((cita) => {
      const fechaCita = new Date(cita.Fecha);
      return (
        fechaCita.getDate() === fechaActual.getDate() &&
        fechaCita.getMonth() === fechaActual.getMonth() &&
        fechaCita.getFullYear() === fechaActual.getFullYear()
      );
    });
  };

  const filtrarCitasDelDiaSiguiente = (citas) => {
    const fechaActual = new Date();
    const fechaSiguiente = new Date(fechaActual);
    fechaSiguiente.setDate(fechaSiguiente.getDate() + 1);

    return citas.filter((cita) => {
      const fechaCita = new Date(cita.Fecha);
      return (
        fechaCita.getDate() === fechaSiguiente.getDate() &&
        fechaCita.getMonth() === fechaSiguiente.getMonth() &&
        fechaCita.getFullYear() === fechaSiguiente.getFullYear()
      );
    });
  };

  useEffect(() => {
    obtenerCitas();
  }, []);

  const VerCitaTodas = () => {
    setDataCitasVer(dataCitas);
  };

  const VerCitaHoy = () => {
    const data = filtrarCitasDelDia(dataCitas);
    setDataCitasVer(data);
  };

  const VerCitaSiguie = () => {
    const data = filtrarCitasDelDiaSiguiente(dataCitas);
    setDataCitasVer(data);
  };

  return (
    <AdminLayout>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none bg-gray-100 p-6">
          <div className="mb-6 flex items-center justify-between gap-6">
            <div>
              <Typography variant="h5" color="blue-gray" size="xl">
                Citas agendadas
              </Typography>
              <Typography color="gray" className="mt-1 font-normal text-md">
                Información de Citas
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs className="w-full md:w-max">
              <TabsHeader>
                <Tab>
                  <button
                    className="w-full text-blue-gray-700"
                    onClick={VerCitaTodas}
                  >
                    Todas
                  </button>
                </Tab>
                <Tab value="hoy">
                  <button
                    className="w-full text-blue-gray-700"
                    onClick={VerCitaHoy}
                  >
                    Citas de Hoy
                  </button>
                </Tab>
                <Tab value="mañana">
                  <button
                    className="w-full text-blue-gray-700"
                    onClick={VerCitaSiguie}
                  >
                    Citas de Mañana
                  </button>
                </Tab>
              </TabsHeader>
            </Tabs>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-4">
          <table className="mt-4 w-full min-w-max table-auto text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50 p-3 text-md font-semibold text-blue-gray-700"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronDownIcon strokeWidth={2} className="h-4 w-4 inline ml-2" />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataCitasVer &&
                dataCitasVer.map(
                  (
                    {
                      IdCita,
                      Nombre,
                      ApellidoMaterno,
                      ApellidoPaterno,
                      NombreServicio,
                      Fecha,
                      Hora,
                      Correo,
                      Telefono,
                      Estado,
                    },
                    key
                  ) => (
                    <tr key={key} className="bg-white shadow-sm rounded-md">
                      <td className="p-3 text-blue-gray-700">{IdCita}</td>
                      <td className="p-3">
                        <div className="flex flex-col">
                          <Typography variant="small" className="font-medium">
                            {Nombre}
                          </Typography>
                          <Typography variant="small" className="text-gray-500">
                            {`${ApellidoMaterno} ${ApellidoPaterno}`}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-3 text-blue-gray-700">{NombreServicio}</td>
                      <td className="p-3 text-blue-gray-700">{Fecha}</td>
                      <td className="p-3 text-blue-gray-700">{Hora}</td>
                      <td className="p-3 text-blue-gray-700">{Correo}</td>
                      <td className="p-3 text-blue-gray-700">{Telefono}</td>
                      <td className="p-3">
                        <div className="flex gap-2 justify-center">
                          <Tooltip placement="top" tooltip="Cancelar cita">
                            <IconButton
                              onClick={() => handleCancel(IdCita)}
                              className="bg-red-100 hover:bg-red-200 text-red-500 p-2"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                      <td className="p-3 text-blue-gray-700">{Estado}</td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </AdminLayout>
  );
}
