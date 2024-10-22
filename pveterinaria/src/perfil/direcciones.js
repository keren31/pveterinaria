import React, { useState, useEffect ,useCallback} from "react";
import Swal from "sweetalert2";
import { useUser } from "../UserContext";
import { Button, Card, CardHeader, CardBody, Typography} from "@material-tailwind/react";
import {  useLoadScript, Autocomplete } from '@react-google-maps/api';
import PerfilLayout from "./PerfilLayout";
import Layout from "../Layout";


const CONFIGURATION = {
  ctaTitle: 'Encuentrame',
  mapOptions: {
    center: { lat: 37.4221, lng: -122.0841 },
    fullscreenControl: true,
    mapTypeControl: false,
    streetViewControl: true,
    zoom: 12,
    zoomControl: true,
    maxZoom: 22,
    mapId: '',
  },
  mapsApiKey: 'AIzaSyBMZxb7lHGBmYbaV8uDoiSjenlPxhwgS1M',
  capabilities: {
    addressAutocompleteControl: true,
    mapDisplayControl: true,
    ctaControl: true,
  },
};


const SHORT_NAME_ADDRESS_COMPONENT_TYPES = new Set(['street_number', 'administrative_area_level_1', 'postal_code']);
const ADDRESS_COMPONENT_TYPES_IN_FORM = ['location', 'locality', 'administrative_area_level_1', 'postal_code', 'country'];


const Direcciones = () => {


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: CONFIGURATION.mapsApiKey,
    libraries: ['places'],
  });


  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  const { user } = useUser();

  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [calle, setCalle] = useState("");
  const [colonia, setColonia] = useState("");
  const [numeroExterior, setNumeroExterior] = useState("");
  const [numeroInterior, setNumeroInterior] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [estado, setEsado] = useState("");
  const [cp, setCP] = useState("");
  const [InformacionAdicional, setInformacionAdicional] = useState("");
  const [ setLoading] = useState(true);
  const [direcciones,setDirecciones]= useState([]);


  const [calleE, setCalleE] = useState("");
  const [coloniaE, setColoniaE] = useState("");
  const [numeroExteriorE, setNumeroExteriorE] = useState("");
  const [numeroInteriorE, setNumeroInteriorE] = useState("");
  const [municipioE, setMunicipioE] = useState("");
  const [estadoE, setEsadoE] = useState("");
  const [cpE, setCPE] = useState("");
  const [InformacionAdicionalE, setInformacionAdicionalE] = useState("");
  const [idDireccionEspecifica, setIdDireccionEspecifica]= useState("");

  const [place, setPlace] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map] = useState(null);
  const [marker] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("Calle", calle);
    formData.append("Colonia", colonia);
    formData.append("NumeroInterior", numeroInterior);
    formData.append("NumeroExterior", numeroExterior);
    formData.append("CP", cp);
    formData.append("Estado", estado);
    formData.append("Ciudad", municipio);
    formData.append("UsuarioID", user.idUsuario);
    formData.append("Referencias", InformacionAdicional);
    formData.append("Lat", latitud);
    formData.append("Long", longitud);

    fetch(apiurll + "/api/CasaDelMarisco/AgregarDireccion", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
       if(result==="Exito"){
          Swal.fire({
            icon: "success",
            title: "Accion realizado con exito",
            text: "",
          });

          window.location.reload();
       }else{
          Swal.fire({
            icon: "failed",
            title: "No se realizo ",
            text: "Verifique todos los datos en el apartado de reservaciones.",
          });
       
       }
      });

  };

  
  const direccionEspecifica= async (idDireccion)=>{
    setIdDireccionEspecifica(idDireccion)
    try {
      const response = await fetch(
        apiurll + `/api/CasaDelMarisco/TraerDireccionPorId?DireccionID=${idDireccion}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data)     
      setCalleE(data.Calle);
      setColoniaE(data.Colonia);
      setNumeroExteriorE(data.NumeroExterior);
      setNumeroInteriorE(data.NumeroInterior);
      setMunicipioE(data.Ciudad);
      setEsadoE(data.Estado);
      setCPE(data.CP);
      setInformacionAdicionalE(data.Referencias);
    } catch (error) {
      console.error("Error al obtener la informacion:", error);
    } finally {
      setLoading(false); 
    }
  }


  const obtenerDirecciones =useCallback( async () => {

    try {
      const response = await fetch(
        apiurll + `/api/CasaDelMarisco/TraerDirecciones?UsuarioID=${user.idUsuario}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();     
      if (Array.isArray(data)) {
        setDirecciones(data);
        console.log("Direcciones obtenidas:", data);
      } else {
        console.error("La respuesta de la API no es un array:", data);
        setDirecciones([]);
      }
     
    } catch (error) {
      console.error("Error al obtener reservaciones:", error);
    } finally {
      setLoading(false); 
    }

});

  useEffect(() => {
    obtenerDirecciones()
  }, [obtenerDirecciones]);



 

  const actualizarDireccion = async () => {
    const data = new FormData();
    data.append("Calle",calleE);
    data.append("Colonia",coloniaE);
    data.append("NumeroInterior",numeroInteriorE);
    data.append("NumeroExterior",numeroExteriorE);
    data.append("CP",cpE);
    data.append("Estado",estadoE);
    data.append("Ciudad",municipioE);
    data.append("UsuarioID",user.idUsuario);
    data.append("DireccionID",idDireccionEspecifica);
    data.append("Referencias",InformacionAdicionalE)
   
     fetch(
        apiurll + "/api/CasaDelMarisco/EditarDireccion",
        {
          method: "POST",
          body: data,
        }
      )
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        if (result === 'Exito') {
            Swal.fire({
                icon: 'success',
                title: 'Actualizado',
                text: 'Realizado con exito',
            });
            window.location.reload();
        } else {
            Swal.fire({
                icon: 'failed',
                title: 'Failed',
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

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      alert(`No details available for input: '${place.name}'`);
      return;
    }
    setPlace(place);
    fillInAddress(place);
  };

  const fillInAddress = (place) => {
    const getComponentName = (componentType) => {
      for (const component of place.address_components || []) {
        if (component.types[0] === componentType) {
          return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType)
            ? component.short_name
            : component.long_name;
        }
      }
      return '';
    };

    const getComponentText = (componentType) => {
      return componentType === 'location'
        ? `${getComponentName('street_number')} ${getComponentName('route')}`
        : getComponentName(componentType);
    };

    ADDRESS_COMPONENT_TYPES_IN_FORM.forEach((componentType) => {
      const element = document.getElementById(`${componentType}-input`);
      if (element) {
        const value = getComponentText(componentType);
        element.value = value;
  
        switch(componentType) {
          case 'location':
            setCalle(value);
            break;
          case 'locality':
            setMunicipio(value);
            break;
          case 'postal_code':
            setCP(value);
            break;
          case 'administrative_area_level_1':
            setEsado(value);
            break;
          default:
            // Lógica para el caso por defecto
            break;
        }
      }
    });

    const coloniaValue = getComponentName('sublocality_level_1') || getComponentName('neighborhood');
    if (coloniaValue) {
      setColonia(coloniaValue);
      const coloniaInput = document.getElementById('route-input');
      if (coloniaInput) coloniaInput.value = coloniaValue;
    }
  

    
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setLatitud(lat.toString());
    setLongitud(lng.toString());
  };

  useEffect(() => {
    if (place && map) {
      const location = place.geometry.location;
      map.panTo(location);
      marker.setPosition(location);
    }
  }, [place, map, marker]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

 
  return (
    <Layout>
      <PerfilLayout>
    <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
     <div style={{ display: 'flex', flexWrap: 'wrap', marginRight: '-0.75rem', marginLeft: '-0.75rem' }}>
     <div 
  style={{ 
    flex: '1 0 0%', 
    marginLeft: '0.5rem', 
    display: 'flex', 
    alignItems: 'center' // Centra verticalmente el contenido
  }}
>
  <h1 
    style={{ 
      fontSize: '1.5rem', // Tamaño de fuente más grande
      fontWeight: 'bold', // Negrita para el título
      color: '#333', // Color del texto
      margin: 0, // Elimina el margen predeterminado
      padding: '3rem', // Espaciado alrededor del texto
      borderBottom: '2px solid #007BFF', // Línea inferior para destacar el título
      width: '100%',
       // Asegura que el h1 ocupe todo el ancho disponible
    }}
  >
    Mis Pedidos
  </h1>
</div>

        <div style={{ flex: '0 0 auto', width: 'auto' }}></div>
         <div style={{ flex: '1 0 0%', maxWidth: '16.66667%' }}> 

         <Button 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', marginRight:'700px'}}
            onClick={toggleFormVisibility}
            color="blue"     
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              style={{ height: '1.5rem', width: '1.5rem' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            {formVisible ? "Cerrar" : "Agregar nueva direccion"}
          </Button>
         

        </div>
        
        <div 
      style={{ 
        transition: 'all 0.3s', 
        display: formVisible ? 'block' : 'none', 
        padding: '5rem', 
       
        borderRadius: '0.5rem', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        backgroundColor: '#fff',
        maxWidth: '1000px', // Set a maximum width for the form
        margin: '100px' // Center the form
      }}
    >
      <form onSubmit={handleSubmit}>
        <h1 
          style={{ 
            fontWeight: 'bold', 
            marginBottom: '1rem', 
            fontSize: '2rem', 
            color: '#333',
            textAlign: 'center' // Center align the title
          }}
        >
          Datos de Envío
        </h1>
        
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '1rem',
          }}
        >
          <div style={{ gridColumn: 'span 2' }}>
            <label 
              htmlFor="Calle" 
              style={{ 
                fontSize: '1rem', 
                color: '#4A5568',
                marginBottom: '0.5rem',
                display: 'block' // Make the label a block element
              }}
            >
              Calle
            </label>
            <Autocomplete
              onLoad={(autocomplete) => setAutocomplete(autocomplete)}
              onPlaceChanged={handlePlaceChanged}
            >
              <input
                type="text"
                placeholder="Ingresa tu calle aquí"
                id="location-input"
                style={{ 
                  height: '40px', 
                  borderRadius: '0.5rem', 
                  fontSize: '1rem', 
                  border: '1px solid #d1d5db', 
                  padding: '0.5rem',
                  width: '100%' // Set width to 100%
                }}
                className="form-control w-full"
                onChange={(e) => setCalle(e.target.value)}
              />

              
            </Autocomplete>
          </div>

          <div>
            <label 
              htmlFor="NumeroExterior" 
              style={{ 
                fontSize: '1rem', 
                color: '#4A5568',
                marginBottom: '0.5rem',
                display: 'block' // Make the label a block element
              }}
            >
              Número Exterior
            </label>
            <input
              type="number"
              style={{ 
                height: '40px', 
                borderRadius: '0.5rem', 
                fontSize: '1rem', 
                border: '1px solid #d1d5db', 
                padding: '0.5rem',
                width: '100%' // Set width to 100%
              }}
              placeholder="203"
              id="NumeroExterior"
              onChange={(e) => setNumeroExterior(e.target.value)}
            />
          </div>

          <div>
            <label 
              htmlFor="NumeroInterior" 
              style={{ 
                fontSize: '1rem', 
                color: '#4A5568',
                marginBottom: '0.5rem',
                display: 'block' // Make the label a block element
              }}
            >
              Número Interior
            </label>
            <input
              type="text"
              style={{ 
                height: '40px', 
                borderRadius: '0.5rem', 
                fontSize: '1rem', 
                border: '1px solid #d1d5db', 
                padding: '0.5rem',
                width: '100%' // Set width to 100%
              }}
              placeholder="112"
              id="NumeroInterior"
              onChange={(e) => setNumeroInterior(e.target.value)}
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label 
              htmlFor="Colonia" 
              style={{ 
                fontSize: '1rem', 
                color: '#4A5568',
                marginBottom: '0.5rem',
                display: 'block' // Make the label a block element
              }}
            >
              Colonia
            </label>
            <input
              type="text"
              style={{ 
                height: '40px', 
                borderRadius: '0.5rem', 
                fontSize: '1rem', 
                border: '1px solid #d1d5db', 
                padding: '0.5rem',
                width: '100%' // Set width to 100%
              }}
              placeholder="5 de Mayo"
              id="Colonia"
              onChange={(e) => setColonia(e.target.value)}
            />
          </div>

          <div>
            <label 
              htmlFor="Municipio" 
              style={{ 
                fontSize: '1rem', 
                color: '#4A5568',
                marginBottom: '0.5rem',
                display: 'block' // Make the label a block element
              }}
            >
              Municipio
            </label>
            <input
              type="text"
              style={{ 
                height: '40px', 
                borderRadius: '0.5rem', 
                fontSize: '1rem', 
                border: '1px solid #d1d5db', 
                padding: '0.5rem',
                width: '100%' // Set width to 100%
              }}
              placeholder="Huejutla"
              id="Municipio"
              onChange={(e) => setMunicipio(e.target.value)}
            />
          </div>

          <div>
            <label 
              htmlFor="Estado" 
              style={{ 
                fontSize: '1rem', 
                color: '#4A5568',
                marginBottom: '0.5rem',
                display: 'block' // Make the label a block element
              }}
            >
              Estado
            </label>
            <input
              type="text"
              style={{ 
                height: '40px', 
                borderRadius: '0.5rem', 
                fontSize: '1rem', 
                border: '1px solid #d1d5db', 
                padding: '0.5rem',
                width: '100%' // Set width to 100%
              }}
              placeholder="Hidalgo"
              id="Estado"
              onChange={(e) => setEsado(e.target.value)}
            />
          </div>

          <div>
            <label 
              htmlFor="CP" 
              style={{ 
                fontSize: '1rem', 
                color: '#4A5568',
                marginBottom: '0.5rem',
                display: 'block' // Make the label a block element
              }}
            >
              C.P.
            </label>
            <input
              type="number"
              style={{ 
                height: '40px', 
                borderRadius: '0.5rem', 
                fontSize: '1rem', 
                border: '1px solid #d1d5db', 
                padding: '0.5rem',
                width: '100%' // Set width to 100%
              }}
              placeholder="43000"
              id="CP"
              onChange={(e) => setCP(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label 
            htmlFor="Referencias" 
            style={{ 
              fontSize: '1rem', 
              color: '#4A5568',
              marginBottom: '0.5rem',
              display: 'block' // Make the label a block element
            }}
          >
            Referencias
          </label>
          <textarea
            style={{ 
              borderRadius: '0.5rem', 
              border: '1px solid #d1d5db', 
              height: '120px', 
              fontSize: '1rem', 
              padding: '0.5rem',
              width: '100%' // Set width to 100%
            }}
            placeholder="Referencias a lado de un pozo color azul"
            id="Referencias"
            onChange={(e) => setInformacionAdicional(e.target.value)}
          />
        </div>

        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            marginTop: '1.25rem' 
          }}
        >

            

          <Button 
            type="submit"
            color="primary"
            style={{ 
              fontSize: '0.875rem', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '0.5rem', 
              width: 'auto' 
            }}
            variant="contained"
          >
            Guardar
          </Button>

        </div>
      </form>
    </div>






        <div 
  style={{ 
    transition: 'all 0.3s', 
    display: formVisible ? 'none' : 'block' 
  }}
>
  <div 
    style={{ 
      marginTop: '0.75rem', 
      marginLeft: '2.5rem', 
      marginRight: '2.5rem', 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: '1rem', 
      justifyContent: 'flex-start' 
    }}>
          {direcciones.length > 0 ? (
          direcciones.map((midirecciones) => (
  
            <Card 
            style={{ 
              width: '100%', 
              maxWidth: '45rem', 
              display: 'flex', 
              flexDirection: 'row' 
            }}>
            <CardHeader
              shadow={false}
              floated={false}
              style={{ 
                margin: 0, 
                width: '22rem', 
                flexShrink: 0, 
                borderTopRightRadius: 0, 
                borderBottomRightRadius: 0 
              }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29994.591853071897!2d-98.43775867731902!3d21.140299887558825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d726e6a957507f%3A0x9817745b73d7d2cd!2sHuejutla%20de%20Reyes%2C%20Hgo.%2C%20M%C3%A9xico!5e0!3m2!1ses!2sus!4v1689111604704!5m2!1ses!2sus"
                width="100%"
                height="100%"
                title="sjsd"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </CardHeader>
            <CardBody 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-start' 
              }}>
              <Typography 
                variant="h6" 
                color="gray" 
                style={{ marginBottom: '1rem', textTransform: 'uppercase' }}>
                Tu Dirección
              </Typography>
              <Typography 
                variant="h4" 
                color="blue-gray" 
                style={{ marginBottom: '0.5rem' }}>
                {midirecciones.Colonia}, {midirecciones.Calle}
              </Typography>
              <Typography 
                color="gray" 
                style={{ marginBottom: '2rem', fontWeight: 'normal', fontSize: '13px' }}>
                Referencias de apoyo:
                {midirecciones.Referencias}
              </Typography>
              <a style={{ display: 'inline-block' }}>
                <Button 
                  variant="text" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    fontSize: '12px' 
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"  
                  onClick={() => direccionEspecifica(midirecciones.DireccionID)}
                >
                  Editar dirección
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ height: '1.75rem', width: '1.75rem' }}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </a>
            </CardBody>
          </Card>
          
    
            ))
          ) : (
            <p>No hay direcciones disponibles.</p>
          )}   
          </div>
        </div>
      </div>
      
           <div
           class="modal fade"
            id="exampleModal2"
            
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
                  <div
                    style={{ 
                      position: 'relative', 
                      margin: '1.75rem auto', 
                      maxWidth: '500px', 
                      width: '100%' 
                    }}
                    className="modal-dialog"
                  >
                    <div
                      style={{ 
                        position: 'relative', 
                        backgroundColor: '#fff', 
                        borderRadius: '0.375rem', 
                        boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.2)', 
                        border: '1px solid rgba(0, 0, 0, 0.125)' 
                      }}
                      className="modal-content" >
                    <div 
                      style={{ 
                        padding: '0.5rem', 
                        marginTop: '0.5rem', 
                        marginRight: '0.5rem', 
                        display: 'flex', 
                        justifyContent: 'flex-end' 
                      }} >
        <Button
          variant="text"
          color="gray"
          data-bs-dismiss="modal"
          style={{ 
            padding: 0, 
            minWidth: '2rem' 
          }}
        >
                <svg
                  style={{ 
                    height: '1.5rem', 
                    width: '1.5rem' 
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
             
            </div>
            <form onSubmit={handleSubmit}>
            <div
                style={{ 
                  paddingRight: '4rem', 
                  paddingLeft: '4rem', 
                  paddingBottom: '0.75rem' 
                }}
              >
                <h1 
                  style={{ 
                    fontWeight: 'bold', 
                    marginBottom: '0.5rem', 
                    fontSize: '1.875rem' 
                  }}
                >
                  Actualizacion de los datos de direccion
                </h1>
                <div 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: '0.75rem' 
                  }}
                >
                  <div 
                    style={{ 
                      gridColumn: 'span 2' 
                    }}
                  >
                    <label 
                      htmlFor="Nombre" 
                      style={{ 
                        fontSize: '0.9375rem', 
                        color: '#4B5563' 
                      }}
                    >
                      Calle
                    </label>
                    <input
                      type="text"
                      style={{ 
                        height: '30px', 
                        borderRadius: '0.5rem', 
                        fontSize: '1.25rem', 
                        width: '100%' 
                      }}
                      value={calleE}
                      placeholder="ingresa tu calle aqui"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setCalleE(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />

                  
                  </div>
                  <div>
                      <label 
                        htmlFor="NPersonas" 
                        style={{ 
                          fontSize: '0.9375rem', 
                          color: '#4B5563' 
                        }}
                      >
                        Numero Exterior
                      </label>
                      <input
                        type="number"
                        value={numeroExteriorE}
                        style={{ 
                          height: '30px', 
                          borderRadius: '0.5rem', 
                          fontSize: '1.25rem', 
                          width: '100%', 
                          border: '1px solid #D1D5DB' // Asumiendo que el borde es gris claro
                        }}
                        placeholder="203"
                        id="Nombre"
                        aria-describedby=""
                        onChange={(e) => setNumeroExteriorE(e.target.value)}
                        //onBlur={() => validateNombre(nombre)}
                      />
                   
                  </div>
                  <div>
                    <label 
                      htmlFor="NPersonas" 
                      style={{ 
                        fontSize: '0.9375rem', 
                        color: '#4B5563' 
                      }}
                    >
                      Numero Interior
                    </label>
                    <input
                      type="text"
                      value={numeroInteriorE}
                      style={{ 
                        height: '30px', 
                        borderRadius: '0.5rem', 
                        fontSize: '1.25rem', 
                        width: '100%', 
                        border: '1px solid #D1D5DB' // Asumiendo que el borde es gris claro
                      }}
                      placeholder="Hidalgo"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setNumeroInteriorE(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                        <label 
                          htmlFor="NPersonas" 
                          style={{ 
                            fontSize: '0.9375rem', 
                            color: '#4B5563' 
                          }}
                        >
                          Colonia
                        </label>
                        <input
                          type="text"
                          value={coloniaE}
                          style={{ 
                            height: '30px', 
                            borderRadius: '0.5rem', 
                            fontSize: '1.25rem', 
                            width: '100%', 
                            border: '1px solid #D1D5DB' // Asumiendo que el borde es gris claro
                          }}
                          placeholder="5 de Mayo"
                          id="Nombre"
                          aria-describedby=""
                          onChange={(e) => setColoniaE(e.target.value)}
                          //onBlur={() => validateNombre(nombre)}
                        />
                  </div>




                  <div>
                    <label 
                      htmlFor="NPersonas" 
                      style={{ 
                        fontSize: '0.9375rem', 
                        color: '#4B5563' 
                      }}
                    >
                      Municipio
                    </label>
                    <input
                      type="text"
                      value={municipioE}
                      style={{ 
                        height: '30px', 
                        borderRadius: '0.5rem', 
                        fontSize: '1.25rem', 
                        width: '100%', 
                        border: '1px solid #D1D5DB' // Asumiendo que el borde es gris claro
                      }}
                      placeholder="Huejutla"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setMunicipioE(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                  </div>


                  <div>
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                      Estado
                    </label>
                    <input
                      type="text"
                      value={estadoE}
                      style={{height:'30px'}}
                      class="form-control rounded-lg text-xl"
                      placeholder="Hidalgo"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setEsadoE(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                   
                  </div>
                 
                  <div>
                    <label 
                      htmlFor="NPersonas" 
                      style={{ 
                        fontSize: '0.9375rem', 
                        color: '#4B5563' // El color gris claro para el texto de la etiqueta
                      }}>
                      C.P.
                    </label>
                    <input
                      type="number"
                      value={cpE}
                      style={{ 
                        height: '30px', 
                        borderRadius: '0.5rem', 
                        fontSize: '1.25rem', 
                        width: '100%', 
                        border: '1px solid #D1D5DB' // Borde gris claro para coincidir con el estilo de formulario
                      }}
                      placeholder="43000"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setCPE(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
/>
                  </div>


                  <div 
                        style={{ 
                          gridColumn: 'span 3', 
                          display: 'flex', 
                          flexDirection: 'column' 
                        }}
                      >
                        <label 
                          htmlFor="NPersonas" 
                          style={{ 
                            fontSize: '0.9375rem', 
                            color: '#4B5563', // Gris claro para el texto de la etiqueta
                            marginBottom: '0.5rem' // Espacio debajo de la etiqueta
                          }}
                        >
                          Referencias
                        </label>
                        <textarea
                          value={InformacionAdicionalE}
                          style={{ 
                            height: '10rem', // Altura de 40 píxeles aproximadamente
                            borderRadius: '0.5rem', 
                            fontSize: '1.25rem', 
                            width: '100%', 
                            border: '1px solid #D1D5DB', // Borde gris claro
                            padding: '0.5rem' // Espacio interno en el área de texto
                          }}
                          placeholder="Referencias a lado de un pozo color azul"
                          id="Nombre"
                          aria-describedby=""
                          onChange={(e) => setInformacionAdicionalE(e.target.value)}
                          //onBlur={() => validateNombre(nombre)}
                        />
                      </div>

                </div>

              
              </div>
              <div 
                  style={{ 
                    paddingRight: '4rem', 
                    paddingLeft: '4rem', 
                    marginBottom: '0.75rem', // Espacio debajo del contenedor
                    display: 'flex', 
                    justifyContent: 'center' // Centra el contenido horizontalmente
                  }}
                >
                  <div style={{ width: '100%' }}>
                    <Button 
                      onClick={() => actualizarDireccion()}
                      color="blue"
                      style={{ 
                        fontSize: '0.75rem', // Tamaño de texto de 12 píxeles
                        width: '100%' // Ancho completo del contenedor
                      }}
                      variant="filled"
                    >
                      Actualizar
                    </Button>
                  </div>
                </div>
            </form>
            
          </div>
        </div>
      </div>
    </div>
    </PerfilLayout>
    </Layout> 
  );
};

export default Direcciones;
