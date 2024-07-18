import React, { useState } from 'react';
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
import AdminLayout from './AdminLayout';  // Asumo que tienes un archivo AdminLayout.js en la misma carpeta

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
  const [searchQuery, setSearchQuery] = useState('');
  const [productos, setProductos] = useState(initialProductos);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: ''
  });

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

  const resetFilters = () => {
    setSearchQuery('');
    setFilteredProductos([]);
  };

  const handleOpenModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setNewProduct({ ...newProduct, imagen: URL.createObjectURL(file) });
    } else {
      alert('Por favor, seleccione un archivo de imagen válido.');
    }
  };

  const handleAddProduct = () => {
    setProductos([...productos, { ...newProduct, id: productos.length + 1 }]);
    setIsModalOpen(false);
    setNewProduct({ nombre: '', descripcion: '', precio: '', imagen: '' });
  };

  const handleDeleteProduct = (id) => {
    setProductos(productos.filter(producto => producto.id !== id));
  };

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
                    Nombre
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
                    Acciones
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {(filteredProductos.length > 0 ? filteredProductos : productos).map((producto) => (
                <tr key={producto.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={producto.imagen}
                        alt={producto.nombre}
                        size="lg"
                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-2"
                      />
                      <Typography variant="medium" color="blue-gray" className="font-bold">
                        {producto.nombre}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="medium" color="blue-gray" className="font-normal">
                      {producto.descripcion}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="medium" color="blue-gray" className="font-normal">
                      {producto.precio}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 flex gap-2">
                    <Tooltip content="Editar producto">
                      <IconButton variant="text">
                        <PencilIcon className="h-6 w-6" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Eliminar producto">
                      <IconButton variant="text" onClick={() => handleDeleteProduct(producto.id)}>
                        <TrashIcon className="h-6 w-6" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
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
            <Input
              label="Nombre del producto"
              name="nombre"
              value={newProduct.nombre}
              onChange={handleInputChange}
              size="lg"
            />
            <Textarea
              label="Descripción del producto"
              name="descripcion"
              value={newProduct.descripcion}
              onChange={handleInputChange}
              size="lg"
            />
            <Input
              label="Precio del producto"
              name="precio"
              value={newProduct.precio}
              onChange={handleInputChange}
              size="lg"
            />
            <Input
              type="file"
              label="Imagen del producto"
              accept="image/*"
              onChange={handleFileChange}
              size="lg"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleOpenModal}>
            Cancelar
          </Button>
          <Button color="green" onClick={handleAddProduct}>
            Agregar
          </Button>
        </DialogFooter>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProductos;
