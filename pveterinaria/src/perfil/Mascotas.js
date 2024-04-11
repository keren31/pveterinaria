import React, {useState, useEffect} from 'react'
import Layout from '../Layout'
import PerfilLayout from './PerfilLayout'
import { arraycitas } from './ArrayCitas';
import Chart from 'chart.js/auto';
import { drawLineChart } from './chart.js';


function Mascotas() {

    const [fechas, setFechas] = useState(arraycitas);
    const [fechaInicialSeleccionada, setFechaInicialSeleccionada] = useState(null);
    const [fechaFinalSeleccionada, setFechaFinalSeleccionada] = useState(null);
    const [infoFechaSeleccionada, setInfoFechaSeleccionada] = useState(null);
    const [infoFechaSeleccionada2, setInfoFechaSeleccionada2] = useState(null);
    const [mesSeleccionado, setMesSeleccionado] = useState("");
    const [peso1, setPeso1] = useState(0);
    const [peso2, setPeso2] = useState(0);
    const [peso3, setPeso3] = useState(0);

    const [resultado, setResultado] = useState({
        peso: "",
        altura: "",
        imc: "",
        alimento: ""
    });
    

    useEffect(() => {
        if (fechaInicialSeleccionada !== null) {
            const fechaSeleccionada = fechas.find(item => item.id === fechaInicialSeleccionada);
            setInfoFechaSeleccionada(fechaSeleccionada);
        }
    }, [fechaInicialSeleccionada, fechas]);

    useEffect(() => {
        if (fechaFinalSeleccionada !== null) {
            const fechaSeleccionada2 = fechas.find(item => item.id === fechaFinalSeleccionada);
            setInfoFechaSeleccionada2(fechaSeleccionada2);
        }
    }, [fechaFinalSeleccionada, fechas]);

    const fechasFiltradas = fechas.filter(item => item.id > fechaInicialSeleccionada);

    const handleFechaInicialChange = (event) => {
        const fechaSeleccionada = parseInt(event.target.value);
        setFechaInicialSeleccionada(fechaSeleccionada);
    };

    const handleFechaFinalChange = (event) => {
        const fechaSeleccionada = parseInt(event.target.value);
        setFechaFinalSeleccionada(fechaSeleccionada);
    };

    const handleMesChange = (event) => {
        const mesSeleccionado = event.target.value;
        setMesSeleccionado(mesSeleccionado);
    };

    const meses = [{ mes: 1 }, { mes: 2 }, { mes: 3 }, { mes: 4 }, { mes: 5 }, { mes: 6 }, { mes: 7 }, { mes: 8 }, { mes: 9 }, { mes: 10 }, { mes: 11 }, { mes: 12 }];

    const ed = () => {
        if (infoFechaSeleccionada && infoFechaSeleccionada2 && mesSeleccionado) {
            let pesoInicial = parseFloat(infoFechaSeleccionada.peso);
            let pesoFinal = parseFloat(infoFechaSeleccionada2.peso);
            setPeso1(pesoInicial)
            setPeso2(pesoFinal)
            let alturaInicial = parseFloat(infoFechaSeleccionada.altura);
            let alturaFinal = parseFloat(infoFechaSeleccionada2.altura);
            let tiempoFinal = parseFloat(infoFechaSeleccionada2.id - infoFechaSeleccionada.id);
            let t = parseInt(mesSeleccionado) + (infoFechaSeleccionada2.id - infoFechaSeleccionada.id);
            
            let k2peso = Math.log(pesoFinal / pesoInicial) / tiempoFinal;
            let kpeso = k2peso.toFixed(4);
            
            let k2altura = Math.log(alturaFinal / alturaInicial) / tiempoFinal;
            let kaltura = k2altura.toFixed(4)
            
            let resultLogPeso = Math.exp(kpeso * t).toFixed(4);
            let resultLogAltura = Math.exp(kaltura * t).toFixed(4);
            
            let peso = (pesoInicial * resultLogPeso).toFixed(2);
            let altura = (alturaInicial * resultLogAltura).toFixed(2);
            let imc = peso / (altura * altura);
            let alimento = peso * 0.025;
            let gramos = alimento * 1000;
            
            setPeso3(peso)
            setResultado({
                peso: peso,
                altura: altura,
                imc: imc,
                alimento: alimento,
                gramos: gramos
            });
        }
    };


    useEffect(() => {
        ed();
    }, [infoFechaSeleccionada, infoFechaSeleccionada2, mesSeleccionado]);

    useEffect(() => {
        ed();
    }, [fechaInicialSeleccionada, fechaFinalSeleccionada]);

    drawLineChart(meses, fechas, resultado);

    React.useEffect(() => {
        const ctx = document.getElementById('grafico').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ["Mes 1", "Mes 2", "Mes calculado"],
            datasets: [{
              label: 'Peso',
              data: [peso1, peso2, peso3],
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1
            }]
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Número de mes'
                },
                beginAtZero: true
              },
              y: {
                title: {
                  display: true,
                  text: 'kilos'
                },
                beginAtZero: true
              }
            }
          }
        });
    
        // Limpia el gráfico cuando el componente se desmonta
        return () => {
          myChart.destroy();
        };
      }, [ peso1, peso2, peso3]);

    return (
        <Layout>
            <PerfilLayout>
                <div style={{marginLeft: "40px"}}>
                    <h1 style={{fontSize: "3em"}}>Calculo del alimento de mi mascota</h1>

                    <div style={{background: "blue"}}>
                        <h1>Seleccione una fecha</h1>
                        {fechaInicialSeleccionada === null
                            ?
                                <select
                                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    id="fechaInicial"
                                    onChange={handleFechaInicialChange}
                                    value={fechaInicialSeleccionada || ""}
                                >
                                    <option value="">Seleccione un fecha inicial</option>
                                    {fechas.map((item, index) => (
                                        <option key={index} value={item.id} className='bg-secondaryBlue text-primaryBlue'>
                                            {item.fecha}
                                        </option>
                                    ))}
                                </select>
                            :
                                <div className="flex justify-between w-full">
                                    <div className="border border-secondaryBlue w-1/4">
                                        <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                            <h1 className="text-center font-bold">Datos</h1>
                                        </div>
                                        <div className="bg-secondaryBlue text-white">
                                            <h1 className="text-center">CI</h1>
                                        </div>
                                    </div>

                                    <div className="border border-secondaryBlue w-1/4">
                                        <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                            <h1 className="text-center font-bold">Numero cita</h1>
                                        </div>
                                        <div className="bg-secondaryBlue text-white">
                                            <h1 className="text-center">Cita 1</h1>
                                        </div>
                                    </div>

                                    <div className="border border-secondaryBlue w-1/4">
                                        <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                            <h1 className="text-center font-bold">Fecha</h1>
                                        </div>
                                        <div className="bg-secondaryBlue text-white">
                                            <h1 className="text-center">{infoFechaSeleccionada?.fecha}</h1>
                                        </div>
                                    </div>

                                    <div className="border border-secondaryBlue w-1/4">
                                        <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                            <h1 className="text-center font-bold">Peso Kg</h1>
                                        </div>
                                        <div className="bg-secondaryBlue text-white">
                                            <h1 className="text-center"> {infoFechaSeleccionada?.peso}</h1>
                                        </div>
                                    </div>

                                </div>
                        }
                    </div>

                    {fechaInicialSeleccionada && (
                        <>
                            <h1 className="bg-secondaryBlue text-primaryBlue p-2 mt-8 mb-2">- Seleccione una fecha final</h1>
                            {fechaFinalSeleccionada === null
                                ?
                                <div style={{background: "blue"}}>
                                    <select
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                            focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                        id="fechaFinal"
                                        onChange={handleFechaFinalChange}
                                        value={fechaFinalSeleccionada || ""}
                                    >
                                        <option value="">Seleccione un fecha final</option>
                                        {fechasFiltradas.map((item, index) => (
                                            <option key={index} value={item.id} className='bg-secondaryBlue text-primaryBlue'>
                                                {item.fecha}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                :
                                <div className="flex justify-between w-full">
                                    <div className="border border-secondaryBlue w-1/4">
                                        <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                            <h1 className="text-center font-bold">Datos</h1>
                                        </div>
                                        <div className="bg-secondaryBlue text-white">
                                            <h1 className="text-center" style={{color: "blue"}}>K</h1>
                                        </div>
                                    </div>

                                    <div className="border border-secondaryBlue w-1/4">
                                        <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                            <h1 className="text-center font-bold">Numero cita</h1>
                                        </div>
                                        <div className="bg-secondaryBlue text-white">
                                            <h1 className="text-center" style={{color: "blue"}}>Cita 2</h1>
                                        </div>
                                    </div>

                                    <div className="border border-secondaryBlue w-1/4">
                                        <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                            <h1 className="text-center font-bold">Fecha</h1>
                                        </div>
                                        <div className="bg-secondaryBlue text-white">
                                            <h1 className="text-center" style={{color: "blue"}}>{infoFechaSeleccionada2?.fecha}</h1>
                                        </div>
                                    </div>

                                    <div className="border border-secondaryBlue w-1/4">
                                        <div className="bg-white text-secondaryBlue border-b border-secondaryBlue p-1">
                                            <h1 className="text-center font-bold">Peso</h1>
                                        </div>
                                        <div className="bg-secondaryBlue text-white">
                                            <h1 className="text-center" style={{color: "blue"}}>{infoFechaSeleccionada2?.peso}</h1>
                                        </div>
                                    </div>
                                </div>
                            }
                        </>
                    )}

                    {fechaFinalSeleccionada && (
                        <>
                            <h1 className="bg-secondaryBlue text-primaryBlue p-2 mt-8 mb-2">- Seleccione para predecir hasta 12 meses adelante de la fecha final</h1>
                            <div className="">
                                <select
                                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                        focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                    id="fecha12Meses"
                                    onChange={handleMesChange}
                                    value={mesSeleccionado}
                                >
                                    <option value="">Seleccione una fecha a 12 meses adelante</option>
                                    {meses.map((item, index) => (
                                        <option key={index} value={item.mes} className='bg-secondaryBlue text-primaryBlue'>
                                            Mes {item.mes}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    {mesSeleccionado !== "" && fechaInicialSeleccionada && fechaFinalSeleccionada &&
                        <div className="my-10">
                            <h1 className="bg-secondaryBlue text-primaryBlue p-2 text-2xl text-center">Resultados</h1>
                            <div className="flex space-x-10 mt-5">
                                <div className="w-full">
                                    <h1>Peso: Kg</h1>
                                    <input
                                        disabled
                                        value={resultado.peso}
                                    />
                                </div>
                                <div className="w-full">
                                    <h1>Porción diaria de alimento: Kg</h1>
                                    <input
                                        disabled
                                        value={resultado.alimento}
                                    />
                                </div>
                                <div className="w-full">
                                    <h1>Porción diaria de alimento: gr</h1>
                                    <input
                                        disabled
                                        value={resultado.gramos}
                                    />
                                </div>
                                

                            </div>
                        </div>
                    }
                     <div className="mt-12 mb-8 flex flex-col gap-12">
            <canvas id="grafico" width="100" height="100"></canvas>
          </div>
                </div>
            </PerfilLayout>
       
         
      
        </Layout>
        
    )
}

export default Mascotas