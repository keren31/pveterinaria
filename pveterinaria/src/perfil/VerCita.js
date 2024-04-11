import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
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
import { useState ,useEffect} from "react";
import Layout from "../Layout";
import { useUser } from '../../src/UserContext'; 
import { useNavigate } from "react-router-dom";

 
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
 
const TABLE_HEAD = ["IdCita","NombreServicio","fecha", "Hora","Telefono","Opciones"];
 

 
export default function VerCita() {

  const { user, logoutUser } = useUser();
  const navigate=useNavigate();

  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  const obtenerIdUsuario = (user) => {
    return user && user.idUsuario ? user.idUsuario : null;
  };

  const id = obtenerIdUsuario(user);


  useEffect(() => {
    obtenerCitas();  
  }, []);

  const [dataCitas,setDataCitas]=useState([]);
  console.log(id)
  const obtenerCitas = async () => {
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/ObtenerCitasCANPorId?idUsuario=${id}`,
        {
          method: 'GET',
          // No es necesario incluir el body para una solicitud GET
        }
      );
  
      if (response.ok) {
        const userData1 = await response.json();
        setDataCitas(userData1);
        console.log(userData1);
       
      } else {
        console.error('Error al obtener datos de los usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  }
  return (
    <Layout>
    <PerfilLayout>
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
              ({IdCita,NombreServicio,Fecha, Hora,Telefono}, key) => {
                const fechaFormateada = Fecha.split("T")[0];
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
                       size="xl">
                        {IdCita}
                      </Typography>
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
                        {fechaFormateada}
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
                        {Telefono}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Editar Usuario">
                        <IconButton variant="text" onClick={()=> navigate('/editarCita',{state:{IdCita}})}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
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
    </PerfilLayout>
    </Layout>
  );
}