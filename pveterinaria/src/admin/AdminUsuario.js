import React, { useEffect, useState } from 'react';
import { TrashIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/outline";
import { PencilIcon, UserAddIcon } from "@heroicons/react/solid";
import Swal from 'sweetalert2';

import AdminLayout from './AdminLayout'
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
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
  const apiurl = "https://lacasadelmariscoweb.azurewebsites.net/";
  const [Estado] = useState('Offline');
  const [EstadoB] = useState('Bloqueado');
  const [EstadoC] = useState('Activo');

  const estadoColor = (estado) => {
    let color = '';
    if (estado === 'Activo') {
      color = "green"; 
    } else if (estado === 'Bloqueado') {
      color = 'red';
    } else if (estado === 'Offline') {
      color = 'blue-gray';
    }
    return color;
  };

  const estadoTexto = (estado) => {
    let texto = '';
    if (estado === 'Activo') {
      texto = "Online"; 
    } else if (estado === 'Bloqueado') {
      texto = 'Bloqueado';
    } else if (estado === 'Offline') {
      texto = 'Offline';
    }
    return texto;
  };

  const bloquearUser = (idUser) => {
    const idUsuarioInt = parseInt(idUser, 10);
    const data = new FormData();
    data.append("idUsuario", idUsuarioInt);
    data.append("Estado", EstadoB);

    fetch(
      apiurl + "api/CasaDelMarisco/CambiarEstadoUsuario?idUsuario=" + idUsuarioInt + "&Estado=" + EstadoB,
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
          text: 'Realizado con éxito',
        });
        obtenerDatosUsuarios();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se bloqueó correctamente',
          text: 'Ha ocurrido un error, verifique los datos',
        });
      }
    });
  };

  const desbloquearUser = (idUser) => {
    const idUsuarioInt = parseInt(idUser, 10);
    const data = new FormData();
    data.append("idUsuario", idUsuarioInt);
    data.append("Estado", EstadoC);

    fetch(
      apiurl + "api/CasaDelMarisco/CambiarEstadoUsuario?idUsuario=" + idUsuarioInt + "&Estado=" + EstadoC,
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
          title: 'Usuario desbloqueado',
          text: 'Realizado con éxito',
        });
        obtenerDatosUsuarios();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo desbloquear correctamente',
          text: 'Ha ocurrido un error, verifique los datos',
        });
      }
    });
  };

  const eliminarUser = (idUser) => {
    const idUsuarioInt = parseInt(idUser, 10);
    const data = new FormData();
    data.append("idUsuario", idUsuarioInt);
    data.append("Estado", Estado);

    fetch(
      apiurl + "api/CasaDelMarisco/CambiarEstadoUsuario?idUsuario=" + idUsuarioInt + "&Estado=" + Estado,
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
          title: 'Usuario eliminado',
          text: 'Realizado con éxito',
        });
        obtenerDatosUsuarios();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se eliminó correctamente',
          text: 'Ha ocurrido un error, verifique los datos',
        });
      }
    });
  };

  const obtenerDatosUsuarios = async () => {
    try {
      const response = await fetch(
        `${apiurl}/api/CasaDelMarisco/TraerUsuarios`,
        {
          method: 'GET',
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
  };

  useEffect(() => {
    obtenerDatosUsuarios();
  }, []); // Se ejecuta solo una vez al montar el componente

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
                View all
              </Button>
              <Button className="flex items-center gap-3" size="sm">
                <UserAddIcon strokeWidth={2} className="h-4 w-4" /> Add member
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
              {userData !== null && userData.map(({ idUsuario, Icono, Nombre, Correo, Telefono, EstadoCuenta, Rol, Token }, key) => {
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
                    <td className={className} >
                      <div className="flex gap-4 mr-5" >
                        <Avatar src={Icono} size="md" className="rounded-full" />
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
                      <Typography className="font-semibold text-blue-gray-600" variant="h5">{Rol} </Typography>
                    </td>
                    <td className={`${className} text-center`}>
                      <Chip
                        color={estadoColor(EstadoCuenta)}
                        className="text-sm h-10 w-36"
                        size="sm"
                      >
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="font-semibold"
                          size="xl"
                        >
                          {estadoTexto(EstadoCuenta)}
                        </Typography>
                      </Chip>
                    </td>
                    <td className={className}>
                      <div className="flex justify-evenly">
                        <Tooltip
                          placement="top"
                          content="Bloquear"
                        >
                          <IconButton
                            onClick={() => bloquearUser(idUsuario)}
                            size="sm"
                            color="red"
                            ripple="light"
                          >
                            <LockClosedIcon strokeWidth={2} className="h-5 w-5" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          placement="top"
                          content="Desbloquear"
                        >
                          <IconButton
                            onClick={() => desbloquearUser(idUsuario)}
                            size="sm"
                            color="green"
                            ripple="light"
                          >
                            <LockOpenIcon strokeWidth={2} className="h-5 w-5" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          placement="top"
                          content="Eliminar"
                        >
                          <IconButton
                            onClick={() => eliminarUser(idUsuario)}
                            size="sm"
                            color="red"
                            ripple="light"
                          >
                            <TrashIcon strokeWidth={2} className="h-5 w-5" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          placement="top"
                          content="Editar"
                        >
                          <IconButton
                            size="sm"
                            color="blue"
                            ripple="light"
                          >
                            <PencilIcon strokeWidth={2} className="h-5 w-5" />
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
      </Card>
    </AdminLayout>
  );
}
