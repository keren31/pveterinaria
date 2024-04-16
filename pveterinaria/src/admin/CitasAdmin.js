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
import AdminLayout from "./AdminLayout";
import { useState ,useEffect} from "react";
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
 
const TABLE_HEAD = ["IdCita", "Nombre","NombreServicio","fecha", "Hora", "Correo", "Telefono","Opciones","Estado"];
 

 
export default function Citasadmin() {

  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const [idCita, setIdCita] = useState(null); // Estado para almacenar el idReservacion seleccionado\

  const handleCancel = (IdCita) => {
    setIdCita(IdCita);
    CancelarReservacion()
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
            }).then(() => {
            });
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
  useEffect(() => {
    obtenerCitas();  
  }, []);

  const [dataCitas,setDataCitas]=useState([]);

  const obtenerCitas = async () => {
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/ObtenerCitasCAN`,
        {
          method: 'GET',
          // No es necesario incluir el body para una solicitud GET
        }
      );
  
      if (response.ok) {
        const userData1 = await response.json();
        setDataCitas(userData1);
        console.log(dataCitas);
        console.log(userData1)
      } else {
        console.error('Error al obtener datos de los usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  }
  return (
    <AdminLayout>
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" size="xl">
              Citas agendadas
            </Typography>
            <Typography color="gray" className="mt-1 font-normal text-xl" >
              Informacion de Citas
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
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
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataCitas !== null && dataCitas.map(
              ({IdCita, Nombre, ApellidoMaterno, ApellidoPaterno,NombreServicio,Fecha, Hora, Correo, Telefono,Estado}, key) => {
                const isLast = key === dataCitas.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr>
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
                          {ApellidoMaterno+ ApellidoPaterno}
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
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Editar Usuario">
                        <IconButton variant="text" onClick={() =>
                      handleCancel(IdCita)
                    }>
                          <TrashIcon className="h-4 w-4" />

                        </IconButton>
                      </Tooltip>
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
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="h5" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="xl">
            Previous
          </Button>
          <Button variant="outlined" size="xl">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
    </AdminLayout>
  );
}