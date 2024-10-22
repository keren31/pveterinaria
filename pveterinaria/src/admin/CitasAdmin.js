import {
  ChevronDownIcon,
  TrashIcon,
} from "@heroicons/react/outline"; // Importar desde outline o solid según corresponda
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
  "fecha",
  "Hora",
  "Correo",
  "Telefono",
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
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray" size="xl">
                Citas agendadas
              </Typography>
              <Typography color="gray" className="mt-1 font-normal text-xl">
                Informacion de Citas
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs className="w-full md:w-max">
              <TabsHeader>
                <Tab>
                  <button
                    style={{ width: "100%" }}
                    onClick={() => VerCitaTodas()}
                  >
                    Todas
                  </button>
                </Tab>
                <Tab value="hoy">
                  <button
                    style={{ width: "100%" }}
                    onClick={() => VerCitaHoy()}
                  >
                    Citas de Hoy
                  </button>
                </Tab>
                <Tab value="mañana">
                  <button
                    style={{ width: "100%" }}
                    onClick={() => VerCitaSiguie()}
                  >
                    Citas de Mañana
                  </button>
                </Tab>
              </TabsHeader>
            </Tabs>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left ">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 text-xl"
                  >
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 text-xl"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataCitasVer !== null &&
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
                  ) => {
                    const isLast = key === dataCitasVer.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={key}>
                        <td className={classes}>
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-normal"
                            size="xl"
                          >
                            {IdCita}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="font-normal"
                              size="xl"
                            >
                              {Nombre}
                            </Typography>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="font-normal opacity-70"
                              size="xl"
                            >
                              {ApellidoMaterno + " " + ApellidoPaterno}
                            </Typography>
                          </div>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-normal"
                            size="xl"
                          >
                            {NombreServicio}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-normal"
                            size="xl"
                          >
                            {Fecha}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-normal"
                            size="xl"
                          >
                            {Hora}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-normal"
                            size="xl"
                          >
                            {Correo}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-normal"
                            size="xl"
                          >
                            {Telefono}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <div className="flex gap-2 justify-center">
                            <Tooltip
                              placement="top"
                              tooltip="Cancelar cita"
                              color="light"
                            >
                              <IconButton
                                onClick={() => handleCancel(IdCita)}
                                className="hover:bg-indigo-500  text-gray-500/50 p-2  transition-colors"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-normal"
                            size="xl"
                          >
                            {Estado}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </AdminLayout>
  );
}
