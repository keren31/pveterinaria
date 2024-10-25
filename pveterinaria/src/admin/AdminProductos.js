import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, ArrowDownIcon, SearchIcon } from '@heroicons/react/solid';  // Importamos los íconos adecuadamente
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea
} from '@material-tailwind/react';  // Ajustamos la importación de Material Tailwind
import AdminLayout from './AdminLayout'; 
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Asumo que tienes un archivo AdminLayout.js en la misma carpeta
import { uploadFilesUsuarios } from "../firebase";


import producto1 from './imagenes2/Producto1.jpg';
import producto2 from './imagenes2/Producto2.jpg';
import producto3 from './imagenes2/Producto3.jpg';
import producto4 from './imagenes2/Producto4.jpg';
import producto5 from './imagenes2/producto5.jpg';
import producto6 from './imagenes2/producto6.jpg';

const initialProductos = [
  {
    id: 1,
    nombre: 'Cama',
    descripcion: 'Descripción del producto 1. Detalles adicionales sobre el producto.',
    precio: '$19.99',
    imagen: producto1,
  },
  {
    id: 2,
    nombre: 'Jugetes',
    descripcion: 'Descripción del producto 2. Detalles adicionales sobre el producto.',
    precio: '$29.99',
    imagen: producto2,
  },
  {
    id: 3,
    nombre: 'Comedero',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    imagen: producto3,
  },
  {
    id: 4,
    nombre: 'Botella de agua',
    descripcion: 'Descripción del producto 4. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    imagen: producto4,
  },
  {
    id: 5,
    nombre: 'Cama',
    descripcion: 'Descripción del producto 5. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    imagen: producto5,
  },
  {
    id: 6,
    nombre: 'Cama',
    descripcion: 'Descripción del producto 6. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    imagen: producto6,
  },
  // Agrega más productos según sea necesario
];

const AdminProductos = () => {

  const [File, setFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    const [File2, setFile2] = useState(null);
    const [imageURL2, setImageURL2] = useState(null);

    const [nombre,setNombre]=useState();
    const [precio,setPrecio]=useState();
    const [descripcion,setDescripcion]=useState();
    const [idcategoria,setidCategoria]=useState();
    const [stok,setStok]=useState();
    const [idProductoModif,setIdProductoModif]=useState();
    const [nombre2,setNombre2]=useState();
    const [precio2,setPrecio2]=useState();
    const [descripcion2,setDescripcion2]=useState();
    const [idcategoria2,setidCategoria2]=useState();
    const [stok2,setStok2]=useState();
    const [estado2,setEstado2]=useState();
    const navigate=useNavigate();

    const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
    const [estado,setEstado]=useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [productos] = useState(initialProductos);
  const [ setFilteredProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  

  const [productData, setProductData] = useState(null);
  useEffect(() => {
    obtenterDatosProductos();
  }, []); // Se ejecuta solo una vez al montar el componente
// Se ejecuta solo una vez al montar el componente


  const obtenterDatosProductos = async () => {
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/TraerProductosCan`,
        {
          method: 'GET',
          // No es necesario incluir el body para una solicitud GET
        }
      );

      if (response.ok) {
        const product1Data = await response.json();
        setProductData(product1Data);
        //console.log(product1Data)
      } else {
        console.error('Error al obtener datos de los usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const applyFilters = () => {
    let filtered = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(searchQuery)
    );

    setFilteredProductos(filtered);
  };



const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
    const imageURL = URL.createObjectURL(droppedFile);
    setImageURL(imageURL);
  };

  const handleDrop2 = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
      setFile2(droppedFile);
    const imageURL = URL.createObjectURL(droppedFile);
    setImageURL2(imageURL);
  };

  const handleSubmit2 = async ()=>{

    let resultImage2 ="";

    if (File2 != null) {
        resultImage2 = await uploadFilesUsuarios(File2);
    }else{
        resultImage2 = result.Imagen;
    }

    console.log(resultImage2);

  
    
    const data =new FormData();
    data.append("idProducto", idProductoModif);
    data.append("Nombre",nombre2)
    
    data.append("Descripcion",descripcion2);
    data.append("Precio",precio2);
    data.append("Stok",stok2);
    data.append("idCategoria",idcategoria2);
    data.append("Estado",estado2);
    data.append("Imagen",imageURL2===result.Imagen? imageURL2:resultImage2);

    fetch(apiurll + "api/CasaDelMarisco/EditarProductoCan", {
      method: "POST",
      body: data,
  }).then((res) => res.json())
  .then((result) => {
      if (result === 'Editado!!') {
          Swal.fire({
              icon: 'success',
              title: 'Registro Completo',
              text: 'Realizado con exito',
          });
          navigate('/admin-producto');
      } else {
          Swal.fire({
              icon: 'success',
              title: 'Registro incompleto',
              text: 'Ha ocurrido un error verifique los datos',
          });
      }
  }).catch((error) => {
      console.error('Error al realizar la solicitud:', error);
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al procesar la solicitud',
      });
  });
  
    
 

}

const handleSubmit = async (e)=>{
        
    e.preventDefault();
     // Verificar si el archivo seleccionado es una imagen
    if (!File.type.startsWith("image")) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El archivo seleccionado no es una imagen.",
        });
        return;
      }

    const resultImage = await uploadFilesUsuarios(File);
  

    const data =new FormData();
    data.append("Nombre",nombre)
    data.append("Descripcion",descripcion);
    data.append("Precio",precio);
    data.append("Stok",stok);
    data.append("idCategoria",idcategoria);
    data.append("Estado",estado);
    data.append("Imagen",resultImage);

    fetch(
        apiurll + "api/CasaDelMarisco/AgregarProductosCan",
        {
            method: "POST",
            body: data,
        }
    )
    .then((res) => res.json())
    .then((result) => {
        //console.log(result);
        if (result === 'Agregado!!') {
          handleOpenModal()
            Swal.fire({
                icon: 'success',
                title: 'Registro Completo',
                text: 'Realizado con exito',
            });
            navigate('/admin-producto')
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Registro incompleto',
                text: 'Ha ocurrido un error verifique los datos',
            });
        }
    })
    .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al procesar la solicitud',
        });
    });
    
 

}

const [result, setResult] = useState(null);

const traerProducto=(idProducto)=>{
  const proData=new FormData();
  
  proData.append("idProducto",idProducto);

  fetch(
    apiurll + "api/CasaDelMarisco/TraerProductoCanPorID?idProducto=" + idProducto,
    {
      method: 'POST',
      body: proData,
    }
  ).then((res) => res.json())
    .then((result) => {
      setNombre2(result.Nombre);  
      setResult(result);
      setIdProductoModif(idProducto);
      setDescripcion2(result.Descripcion);
      setPrecio2(result.Precio);
      setStok2(result.Stok);
      setidCategoria2(result.idCategoria);
      setEstado2(result.Estado);
      setImageURL2(result.Imagen);
    })
  
  .catch((error) => {
      console.error('Error al realizar la solicitud:', error);
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Erro al realizar la solicitud',
      });
  })
  
}

  const handleOpenModal = () => setIsModalOpen(!isModalOpen);
  const handleOpenModal2 = (idProducto) =>{ setIsModalOpen2(!isModalOpen2) 
    traerProducto(idProducto)
  };



  const [EstadoProd]=useState('Inactivo');
  const elimnarProducto=(idProducto)=>{
    const data= new FormData();
    data.append("idProducto",idProducto);
    data.append("Estado",EstadoProd);
    fetch(
      apiurll + "/api/CasaDelMarisco/CambiarEstadoProductoCan?idProducto=" + idProducto + "&Estado=" + EstadoProd,
      {
        method:'POST',
        body:data,
      }
    )
    .then((res) => res.json())
    .then((result) => {
        //console.log(result);
        if (result === 'Producto actualizado') {
            Swal.fire({
                icon: 'success',
                title: 'Registro Completo',
                text: 'Realizado con exito',
            });
           obtenterDatosProductos();
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Registro incompleto',
                text: 'Ha ocurrido un error verifique los datos',
            });
        }
    })
  }


  

  return (
    <AdminLayout>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h4" color="blue-gray">
                Administrar Productos
              </Typography>
              <Typography color="gray" className="mt-1 font-normal text-lg">
                Aquí puedes administrar los productos disponibles
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Buscar productos"
                  icon={<SearchIcon className="h-6 w-6" />}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Button className="flex items-center gap-3" size="lg" onClick={applyFilters}>
                <ArrowDownIcon className="h-5 w-5" /> Filtrar
              </Button>
              <Button className="flex items-center gap-3" size="lg" onClick={handleOpenModal}>
                Agregar Producto
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left text-lg">
            <thead>
              <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="medium" color="blue-gray" className="font-normal leading-none opacity-70">
                    Id Producto
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="medium" color="blue-gray" className="font-normal leading-none opacity-70">
                    Producto
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="medium" color="blue-gray" className="font-normal leading-none opacity-70">
                    Descripción
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="medium" color="blue-gray" className="font-normal leading-none opacity-70">
                    Precio
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="medium" color="blue-gray" className="font-normal leading-none opacity-70">
                    Fecha Introduccion
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="medium" color="blue-gray" className="font-normal leading-none opacity-70">
                    Categoria
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="medium" color="blue-gray" className="font-normal leading-none opacity-70">
                    Stok
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="medium" color="blue-gray" className="font-normal leading-none opacity-70">
                    Estado                      
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="medium" color="blue-gray" className="font-normal leading-none opacity-70">
                    Acciones
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {productData !== null && productData.map(
                ({ idProducto,Imagen, Nombre, Descripcion,Precio, FechaIntroduccion, idCategoria, Stok ,Estado}, key) => {
                  const className = `py-3 px-5 ${
                    key === productData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;   

                  return (
                    <tr key={idProducto}>
                        <td className={className}>
                      <Typography
                              variant="h5"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {idProducto}
                            </Typography>
                      </td>
                      
                      <td className={className}>
                      <div className=" items-center justify-start  gap-3">
                      <Avatar
                        src={Imagen}
                      
                        size="lg"
                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-2"
                      />
                      <Typography variant="medium" color="blue-gray" className="font-bold  justify-start text-start">
                        {Nombre}
                      </Typography>
                    </div>

                        
                      </td>
                     
                      <td className={className}>
                      <Typography variant="medium" color="blue-gray" className="font-normal">
                      {Descripcion}
                    </Typography>
                      </td>
                      
                      <td className={className}>
                      <Typography variant="medium" color="blue-gray" className="font-bold">
                      {Precio}
                    </Typography>
                    
                      </td>
                      <td className={className}>
                       <Typography className='text-xl text-bold'>
                         {FechaIntroduccion}
                       </Typography>
                      </td>
                      <td className={className} >
                        <Typography className='text-xl text-center text-bold' >
                          {idCategoria}
                        </Typography>
                      </td>
                      <td className={className} >
                        <Typography className='text-xl text-center text-bold'>
                          {Stok}
                        </Typography>
                      </td>
                      <td className={className} >
                        <Typography className='text-xl text-center text-bold'>
                          {Estado}
                        </Typography>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50 flex gap-2">
                    <Tooltip content="Editar producto">
                      <IconButton variant="text">
                        <PencilIcon className="h-6 w-6" onClick={()=> handleOpenModal2(idProducto)} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Eliminar producto">
                      <IconButton variant="text" onClick={()=> elimnarProducto (idProducto)} >
                        <TrashIcon className="h-6 w-6" />
                      </IconButton>
                    </Tooltip>
                  </td>
                     
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" size="lg">
            Anterior
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" size="lg">
              1
            </IconButton>
            <IconButton variant="text" size="lg">
              2
            </IconButton>
            <IconButton variant="text" size="lg">
              3
            </IconButton>
            <IconButton variant="text" size="lg">
              ...
            </IconButton>
            <IconButton variant="text" size="lg">
              8
            </IconButton>
            <IconButton variant="text" size="lg">
              9
            </IconButton>
            <IconButton variant="text" size="lg">
              10
            </IconButton>
          </div>
          <Button variant="outlined" size="lg">
            Siguiente
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isModalOpen} onClose={handleOpenModal}>
        <DialogHeader>Agregar Nuevo Producto</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
           <form onSubmit={handleSubmit}>
           <Input
              label="Nombre del producto"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              size="lg"
            />
            <Input
              label="Categoria"
              type='number'
              value={idcategoria}
              onChange={(e) => setidCategoria(e.target.value)}
              size="lg"
            />
            <Textarea
              label="Descripción del producto"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              size="lg"
            />
            <Input
              label="Precio del producto"
              name="precio"
              type='number'
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              size="lg"
            />
             <Input
              label="Stok"
              name="StokP"
              type='number'
              value={stok}
              onChange={(e) => setStok(e.target.value)}
              size="lg"
            />
             <Input
              label="Estado"
              name="EstadoP"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              size="lg"
            />
            <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>     
                    <div className="col-span-3">
                        <label htmlFor="cover-photo" className="block text-2xl font-medium leading-6 text-gray-900">
                            Imagen del Producto
                        </label>
                        {imageURL ? (
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <img 
                                  src={imageURL} 
                                  alt="Imagen seleccionada" 
                                  style={{
                                    height: '300px', 
                                    width: '400px', 
                                    borderRadius: '20px', 
                                    backgroundColor: '#f7fafc' // bg-gray-100 en hexadecimal
                                  }} 
                                />
                            </div>
                        ) : (
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                               
                                <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                                    <label
                                    
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input  type="file" className="sr-only"   accept="image/*"   onChange={(e) => {
                                         setFile(e.target.files[0]);
                                         const imageURL = URL.createObjectURL(e.target.files[0]);
                                         setImageURL(imageURL);
                                        }} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                        )}
                    </div>

                    <div className='col-span-3  flex flex-col sm:flex-row'>
                        <div className='col-span-3 flex-col sm:flex-row'>
                            <>
                                {imageURL ? (
                                    <>    
                                        <Button color='amber' className='mt-2 text-white' onClick={()=> setImageURL(null)}>Eliminar Foto</Button>
                                    </>
                                ) : (
                                   
                                    <div>
                                       
                                        
                                    </div>
                                )}
                            </>
                        </div>


                     
                    </div>
                </div>
            </div>
            <Button color="green" type='submit' >
            Agregar
          </Button>
           </form>
          </div>

        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleOpenModal}>
            Cancelar
          </Button>
         
        </DialogFooter>
      </Dialog>
      <Dialog open={isModalOpen2} onClose={handleOpenModal2}>
        <DialogHeader>Agregar Nuevo Producto</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
           <form >
           <Input
              label="Nombre del producto"
              name="nombre"
              value={nombre2}
              onChange={(e) => setNombre2(e.target.value)}
              size="lg"
            />
            <Input
              label="Categoria"
              type='number'
              value={idcategoria2}
              onChange={(e) => setidCategoria2(e.target.value)}
              size="lg"
            />
            <Textarea
              label="Descripción del producto"
              name="descripcion"
              value={descripcion2}
              onChange={(e) => setDescripcion2(e.target.value)}
              size="lg"
            />
            <Input
              label="Precio del producto"
              name="precio"
              type='number'
              value={precio2}
              onChange={(e) => setPrecio2(e.target.value)}
              size="lg"
            />
             <Input
              label="Stok"
              name="StokP"
              type='number'
              value={stok2}
              onChange={(e) => setStok2(e.target.value)}
              size="lg"
            />
             <Input
              label="Estado"
              name="EstadoP"
              value={estado2}
              onChange={(e) => setEstado2(e.target.value)}
              size="lg"
            />
            <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6" onDrop={handleDrop2} onDragOver={(e) => e.preventDefault()}>     
                    <div className="col-span-3">
                        <label htmlFor="cover-photo" className="block text-2xl font-medium leading-6 text-gray-900">
                            Imagen del Producto
                        </label>
                        {imageURL2 ? (
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <img 
                                  src={imageURL2} 
                                  alt="Imagen seleccionada" 
                                  style={{
                                    height: '300px', 
                                    width: '400px', 
                                    borderRadius: '20px', 
                                    backgroundColor: '#f7fafc' // bg-gray-100 en hexadecimal
                                  }} 
                                />
                            </div>
                        ) : (
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                               
                                <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                                    <label
                                    
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input  type="file" className="sr-only"   accept="image/*"   onChange={(e) => {
                                         setFile2(e.target.files[0]);
                                         const imageURL = URL.createObjectURL(e.target.files[0]);
                                         setImageURL2(imageURL);
                                        }} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                        )}
                    </div>

                    <div className='col-span-3  flex flex-col sm:flex-row'>
                        <div className='col-span-3 flex-col sm:flex-row'>
                            <>
                                {imageURL2 ? (
                                    <>    
                                        <Button color='amber' className='mt-2 text-white' onClick={()=> setImageURL2(null)}>Eliminar Foto</Button>
                                    </>
                                ) : (
                                   
                                    <div>
                                       
                                        
                                    </div>
                                )}
                            </>
                        </div>


                     
                    </div>
                </div>
            </div>
            <Button color="green" onClick={()=>handleSubmit2()} >
            Agregar
          </Button>
           </form>
          </div>

        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleOpenModal2}>
            Cancelar
          </Button>
         
        </DialogFooter>
      </Dialog>
    </AdminLayout>

    
  );
};

export default AdminProductos;
