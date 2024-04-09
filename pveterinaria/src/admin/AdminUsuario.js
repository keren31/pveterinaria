
import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, TrashIcon, LockClosedIcon, LockOpenIcon} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import Swal from 'sweetalert2';

import AdminLayout from './AdminLayout'
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
 


 
export default function AdminUsuario() {

  const [userData, setUserData] = useState([]);
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const [Estado,setEstado]=useState('Ofline');
  
  const estadoColor = (estado) => {
    let color = '';
    if (estado === 'Activo') {
      color = "green"; 
    } else if (estado === 'Bloqueado') {
      color = 'red';
    } else if(estado==='Ofline'){
      color = 'blue-gray';
    }
    return color;
  };
  const [EstadoB,setEstadoB]=useState('Bloqueado');

  const bloquearUser=(idUser)=>{

    const idUsuarioInt = parseInt(idUser, 10);
    const data = new FormData();
    data.append("idUsuario",idUsuarioInt);
    data.append("Estado",EstadoB);

    fetch(
      apiurll + "api/CasaDelMarisco/CambiarEstadoUsuario?idUsuario=" + idUsuarioInt+ "&Estado="+ EstadoB,
      {
          method: "POST",
          body: data,
      }
    )
    .then((res) => res.json())
    .then((result) => {
        console.log(result);
        if (result === 'Icono actualizado') {
            Swal.fire({
                icon: 'success',
                title: 'Usuario bloqueado',
                text: 'Realizado con exito',
            });
            obtenerDatosUsuarios();
        } else {
            Swal.fire({
                icon: 'success',
                title: 'No se bloqueo correctamente',
                text: 'Ha ocurrido un error verifique los datos',
            });
        }
    })
  }

  const [EstadoC,setEstadoC]=useState('Activo');

  const desbloquearUser=(idUser)=>{

    const idUsuarioInt = parseInt(idUser, 10);
    const data = new FormData();
    data.append("idUsuario",idUsuarioInt);
    data.append("Estado",EstadoC);

    fetch(
      apiurll + "api/CasaDelMarisco/CambiarEstadoUsuario?idUsuario=" + idUsuarioInt+ "&Estado="+ EstadoC,
      {
          method: "POST",
          body: data,
      }
    )
    .then((res) => res.json())
    .then((result) => {
        console.log(result);
        if (result === 'Icono actualizado') {
            Swal.fire({
                icon: 'success',
                title: 'Se desbloqueo correctamente',
                text: 'Realizado con exito',
            });
            obtenerDatosUsuarios();
        } else {
            Swal.fire({
                icon: 'success',
                title: 'no se pudo desbloquear correctamente ',
                text: 'Ha ocurrido un error verifique los datos',
            });
        }
    })
  }

  const eliminarUser=(idUser)=>{
    const idUsuarioInt = parseInt(idUser, 10);
    const data = new FormData();
    data.append("idUsuario",idUsuarioInt);
    data.append("Estado",Estado);

    fetch(
      apiurll + "api/CasaDelMarisco/CambiarEstadoUsuario?idUsuario=" + idUsuarioInt+ "&Estado="+ Estado,
      {
          method: "POST",
          body: data,
      }
    )
    .then((res) => res.json())
    .then((result) => {
        console.log(result);
        if (result === 'Icono actualizado') {
            Swal.fire({
                icon: 'success',
                title: 'Usuario Eliminado',
                text: 'Realizado con exito',
            });
            obtenerDatosUsuarios();
        } else {
            Swal.fire({
                icon: 'success',
                title: 'No se elimino correctamente',
                text: 'Ha ocurrido un error verifique los datos',
            });
        }
    })
  }

  

  const estadoTexto = (estado) => {
    let texto = '';
    if (estado === 'Activo') {
      texto = "Online"; 
    } else if (estado === 'Bloqueado') {
      texto = 'Bloqueado';
    } else if (estado==='Ofline'){
      texto = 'Ofline';
    }
    return texto;
  };
  useEffect(() => {
    obtenerDatosUsuarios();
  },[] ); // Se ejecuta solo una vez al montar el componente
  
  const obtenerDatosUsuarios = async () => {
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/TraerUsuarios`,
        {
          method: 'GET',
          // No es necesario incluir el body para una solicitud GET
        }
      );
  
      if (response.ok) {
        const userData1 = await response.json();
        setUserData(userData1);
        console.log(userData1);
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
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
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
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID","Usuario", "Telefono","Rol", "Estado",  "Opciones"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left text-xl"
                  >
                    <Typography
                      variant="h4"
                      className="text-[14px] font-bold uppercase text-blue-gray-400"
                      size="xl"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userData !== null && userData.map(({ idUsuario,Icono, Nombre, Correo, Telefono, EstadoCuenta, Rol ,Token}, key) => {
                const className = `py-3 px-5 ${
                  key === userData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={idUsuario}>
                    <td className={className}>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-semibold"
                        size="xl"
                      >
                        {idUsuario}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="flex items-start gap-4 min-w-[20rem]">
                        <Avatar src={Icono}  size="md" className="rounded-full" />
                        <div className="flex-1">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-semibold"
                            size="xl"
                          >
                            {Nombre}
                          </Typography>
                          <Typography className="font-normal text-blue-gray-500" variant="h6">
                            {Correo}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                        <Typography className='text-xl text-bold'> {Telefono}</Typography>
                    </td>
                    <td className={className}>
                      <Typography className="font-semibold text-blue-gray-600" variant="h5">
                        {Rol===2?'Admin':'Usuario'}
                      </Typography>
                    </td>
                    <td className={className} style={{ width: '100px' }}>
                    <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="md"
                          color={estadoColor(EstadoCuenta)}
                        value={estadoTexto(EstadoCuenta)}
                        />
                      </div>
                    </td>

                    <td className={className}>
                      <div>
                      <Tooltip content="Desbloquear">
                        <IconButton variant="text" onClick={() => desbloquearUser(idUsuario)}>
                          <LockOpenIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip content="Bloquear">
                        <IconButton variant="text" onClick={() => bloquearUser(idUsuario)}>
                          <LockClosedIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                     
                      <Tooltip content="delate user">
                        <IconButton variant="text" onClick={() => eliminarUser(idUsuario)}>
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>


                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          

        </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 text-xl">
        <Typography variant="small" color="blue-gray" className="font-normal text-xl">
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
