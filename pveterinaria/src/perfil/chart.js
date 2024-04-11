import Chart from 'chart.js/auto';

let myChart = null; // Variable para almacenar la referencia al gráfico

const drawLineChart = (meses, resultados) => {
    const canvas = document.getElementById('line-chart');

    if (canvas) {
        const ctx = canvas.getContext('2d');

        // Destruir el gráfico anterior si existe
        if (myChart) {
            myChart.destroy();
        }

        // Crear un nuevo gráfico
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: meses.map(item => `Mes ${item.mes}`),
                datasets: [{
                    label: 'Peso de la mascota',
                    data: resultados.map(resultado => resultado.peso), // Aquí usamos los resultados que deseas mostrar
                    borderColor: 'blue',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
};

export { drawLineChart };
