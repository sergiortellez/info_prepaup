/*<------------------------------------------------->
<!--	Parámetros	-->
<!------------------------------------------------->*/

const URLChartsData = "https://sheets.googleapis.com/v4/spreadsheets/1ZX90uRbL2zQcVfPiMp_Y3K-WI0BxQPooSgr00QLPS_g/values/charts!A1:F36?key=AIzaSyDzdEQYUcSwjzEmZNZhYd2vh1E_P6ykPAY"

// Load google charts
google.charts.load('current', {
    'packages': ['corechart','bar']
});

/*<!------------------------------------------------->
<!--	end Parámetros	-->
<!------------------------------------------------->*/

/*<------------------------------------------------->
<!--	onPageLoad	-->
<!-------------------------------------------------->
* Descripción:
    Se ejecuta cuando la página carga y llama al resto de las funciones
* Parámetros:
    -ninguno
* Dependencias: buildData()
* Devuelve/resultado: ejecuta las demás funciones cuando la página termine de cargar. 
<!------------------------------------------------->*/
window.onload = function() {
  buildDataCharts(URLChartsData);
};
/*<!------------------------------------------------->
<!--	end onPageLoad	-->
<!------------------------------------------------->*/


/*<------------------------------------------------->
<!--	buildDataCharts	-->
<!-------------------------------------------------->
* Descripción:
  Usa un URL para hacer fetch a los datos de Jason, transforma esos datos en objetos que tienen arreglos, pasa como parámetro uno de esos arreglos ".values" a la función buildTable(). 
* Parámetros:
  -URLdata: string
* Dependencias: fillTable()
* Devuelve/resultado: genera un arreglo "data" y lo pasa como parámetro a las funciónes que construyen las tablas y gráficas
<!------------------------------------------------->*/
function buildDataCharts(URLdata){
  var dataCharts = [];
  fetch(URLdata)
  .then(function(response){
      return response.json();
  })
  .then(object => {
    dataCharts = object.values;
      //funciones a ejecutar con la data
      createDataDrawCharts(dataCharts);
      console.log(dataCharts)
  });    
}
/*<!------------------------------------------------->
<!--	end buildDataCharts	-->
<!------------------------------------------------->*/
/*<------------------------------------------------->
<!--	createDataDrawCharts	-->
<!-------------------------------------------------->
* Descripción:
    Esta función usa los datos que provienen de la URL y con ella construye los arreglos que alimentan las gráficas, después llama a la función que dibuja cada gráficaa 
* Parámetros:
    -data: arreglo con datos de la url
* Dependencias: 
* Devuelve/resultado: construye los datos y llama a las funciones que construyen las tablas.
<!------------------------------------------------->*/
function createDataDrawCharts(data){
  //construye el arreglo
  let datosTablaAvisosAcademicos = [
    ['Perido', '1º Aviso', '2º Aviso','3º Aviso','4º aviso'],
    ['1º', data[2][1], data[2][2],data[2][3],data[2][4]],
    ['2º', data[3][1], data[3][2],data[3][3],data[3][4]],
    ['3º', data[4][1], data[4][2],data[4][3],data[4][4]],
    ['4º', data[5][1], data[5][2],data[5][3],data[5][4]],
    ['5º', data[6][1], data[6][2],data[6][3],data[6][4]]
  ];
  //llama a la función que dibuja la gráfica
  google.setOnLoadCallback(function() { drawAvisosAdemicos(datosTablaAvisosAcademicos);});
  
}
/*<!------------------------------------------------->
<!--	end createDataDrawCharts	-->
<!------------------------------------------------->*/


 //Barras avisoss académicos

 function drawAvisosAdemicos(array) {
    var data = google.visualization.arrayToDataTable(array);

    var options = {
      chart: {
        title: 'Avisos Académicos',
        subtitle: 'Reporte por periodo',
      },
      chartArea: {
        backgroundColor: 'transparent'
      },
      bars: 'vertical',
      
      vAxis: {      
      textStyle: {
        color: '#FFF'
        },
        titleTextStyle: {
        color: '#fff',
        fontSize: 15,
        bold: true
        }
     },
     hAxis: {
        textStyle: {
            color: '#fff',
        }
      },
      height: 400,
      colors: ['white','#1b9e77', 'gold','red'],
      backgroundColor: {
        fill: 'transparent',
        },
        legend: {
            color: '#fff',
            position: 'none',
            textStyle: {
                color: '#fff'
            }
        }
    };

    var chart = new google.charts.Bar(document.getElementById('grafica-avisos-academicos'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }

//Barras avisoss disciplinaress

function drawAvisosDisciplinares() {
  var data = google.visualization.arrayToDataTable([
    ['Grado', '1º Aviso', '2º Aviso','3º Aviso'],
    ['Cuarto', 3, 4,2],
    ['Quinto', 7, 3,3],
    ['Sexto', 1, 5,1],
  ]);

  var options = {
    chart: {
      title: 'Avisos Disciplinares por grado',
      subtitle: 'Reporte acumulado',
    },
    chartArea: {
      backgroundColor: 'transparent'
    },
    bars: 'vertical',
    
    vAxis: {      
    textStyle: {
      color: '#FFF'
      },
      titleTextStyle: {
      color: '#fff',
      fontSize: 15,
      bold: true
      }
   },
   hAxis: {
      textStyle: {
          color: '#fff',
      }
    },
    height: 400,
    colors: ['#1b9e77', 'gold','red'],
    backgroundColor: {
      fill: 'transparent',
      },
      legend: {
          color: '#fff',
          position: 'none',
          textStyle: {
              color: '#fff'
          }
      }
  };

  var chart = new google.charts.Bar(document.getElementById('grafica-avisos-disciplinares'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}




//#reprobadas
function drawReprobadas() {

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'X');
  data.addColumn('number', 'Tendencia');

  data.addRows([
    [0, 0],   [1, 30],  [2, 70],  [3, 25],  [4, 44], [5, 16]
  ]);

  var options = {

    hAxis: {
      title: 'Periodo',
      textStyle: {
          color: '#FFF'
      },
      titleTextStyle: {
          color: '#fff',
          fontSize: 15,
          bold: true
       }
    },
    vAxis: {
      title: '# Materias reprobadas',
      textStyle: {
          color: '#fff'
      },
      titleTextStyle: {
          color: '#fff',
          fontSize: 15,
          bold: true
       }
    },
    'width': '100%',
    'height': '100%',
    colors: ['#278527', '#e0440e'],
    backgroundColor: {
        fill: 'transparent'
    },
    legend: {
        color: '#fff',
        position: 'bottom',
        textStyle: {
            color: '#fff'
        }
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('numReprobadas'));

  chart.draw(data, options);
}


// PieChart Presupuesto
function drawPresupuestoChart() {
  var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Ejercido', 1.24],
      ['Disponible', 98.86],

  ]);

  // Optional; add a title and set the width and height of the chart
  var options = {
      'title': 'Presupuesto ejercido',
      pieHole: 0.4,
      titleTextStyle: {
          color: '#fff',
          fontSize: 20,
      },
      legend: {
          color: '#fff',
          position: 'bottom',
          textStyle: {
              color: '#fff'
          }
      },
      'width': '100%',
      'height': '100%',
      colors: ['#278527', '#e0440e'],
      backgroundColor: {
          fill: 'transparent'
      }
  };
  
  // Display the chart inside the <div> element with id="piechart"
  var chartPres = new google.visualization.PieChart(document.getElementById('piechart-presupuesto'));
  chartPres.draw(data, options);
}

//Barras ingresos egresos

function drawIngresos() {
  var data = google.visualization.arrayToDataTable([
    ['Mes', 'Real', 'Presupuestado'],
    ['Agosto', 229731.00, 271496.00],
    ['Septiembre', 391915.95, 988369.00],
    ['Octubre', 744251.00, 1973621.00],
    ['Noviembre', 1030, 540],
    ['Diciembre', 1000, 400],
    ['Enero', 1170, 460],
    ['Febrero', 660, 1120],
    ['Marzo', 1030, 540],
    ['Abril', 1000, 400],
    ['Mayo', 1170, 460],
    ['Junio', 660, 1120],
    ['Julio', 1030, 540]
  ]);

  var options = {
    chart: {
      title: 'Ingresos: Real vs Presupuestado',
      subtitle: 'Reporte mensual',
    },
    chartArea: {
      backgroundColor: 'transparent'
    },
    bars: 'vertical',
    
    vAxis: {
      format:'$###,###',  
    textStyle: {
      color: '#FFF'
      },
      titleTextStyle: {
      color: '#fff',
      fontSize: 15,
      bold: true
      }
   },
   hAxis: {
      textStyle: {
          color: '#fff'
      }
    },
    height: 400,
    colors: ['#1b9e77', '#d95f02'],
    backgroundColor: {
      fill: 'transparent',
      },
      legend: {
          color: '#fff',
          position: 'none',
          textStyle: {
              color: '#fff'
          }
      }
  };

  var chart = new google.charts.Bar(document.getElementById('ingresos'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}


//Barras presupuestado

function drawEgresos() {
  var data = google.visualization.arrayToDataTable([
    ['Mes', 'Real', 'Presupuestado'],
    ['Agosto', 1000000, 400000],
    ['Septiembre', 1170000, 460000],
    ['Octubre', 660000, 1120000],
    ['Noviembre', 1030000, 540000],
    ['Diciembre', 1000000, 400000],
    ['Enero', 1170000, 460000],
    ['Febrero', 660000, 1120000],
    ['Marzo', 1030000, 540000],
    ['Abril', 1000000, 400000],
    ['Mayo', 1170000, 460000],
    ['Junio', 660000, 1120000],
    ['Julio', 1030000, 540000]
  ]);

  var options = {
    chart: {
      title: 'Egresos: Real vs Presupuestado',
      subtitle: 'Reporte mensual',
    },
    chartArea: {
      backgroundColor: 'transparent'
    },
    bars: 'vertical',
    
    vAxis: {      
    format:'$###,###',  
    textStyle: {
      color: '#FFF'
      },
      titleTextStyle: {
      color: '#fff',
      fontSize: 15,
      bold: true
      }
   },
   hAxis: {
      textStyle: {
          color: '#fff'
      }
    },
    height: 400,
    colors: ['#1b9e77', '#d95f02'],
    backgroundColor: {
      fill: 'transparent',
      },
      legend: {
          color: '#fff',
          position: 'none',
          textStyle: {
              color: '#fff'
          }
      }
  };

  var chart = new google.charts.Bar(document.getElementById('egresos'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}



//Barras contribución

function drawContribucion() {
var data = google.visualization.arrayToDataTable([
  ['Mes', 'Real', 'Presupuestado'],
  ['Agosto', 229731.00, 271496.00],
  ['Septiembre', 391915.95, 988369.00],
  ['Octubre', 744251.00, 1973621.00],
  ['Noviembre', 1030, 540],
  ['Diciembre', 1000, 400],
  ['Enero', 1170, 460],
  ['Febrero', 660, 1120],
  ['Marzo', 1030, 540],
  ['Abril', 1000, 400],
  ['Mayo', 1170, 460],
  ['Junio', 660, 1120],
  ['Julio', 1030, 540]
]);

var options = {
  chart: {
    title: 'Contribución: Real vs Presupuestado',
    subtitle: 'Reporte mensual',
  },
  chartArea: {
    backgroundColor: 'transparent'
  },
  bars: 'vertical',
  
  vAxis: {
    format:'$###,###',  
  textStyle: {
    color: '#FFF'
    },
    titleTextStyle: {
    color: '#fff',
    fontSize: 15,
    bold: true
    }
 },
 hAxis: {
    textStyle: {
        color: '#fff'
    }
  },
  height: 400,
  colors: ['#1b9e77', '#d95f02'],
  backgroundColor: {
    fill: 'transparent',
    },
    legend: {
        color: '#fff',
        position: 'none',
        textStyle: {
            color: '#fff'
        }
    }
};

var chart = new google.charts.Bar(document.getElementById('contribucion'));

chart.draw(data, google.charts.Bar.convertOptions(options));
}



//servicio social



// Piechart Servicio social
function drawChart() {
  var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['% cumplido ', 5],
      ['% faltante', 5]


  ]);

  // Optional; add a title and set the width and height of the chart
  var options = {
      'title': 'Servicio Social',
      titleTextStyle: {
          color: '#fff',
          fontSize: 20,
      },
      legend: {
          color: '#fff',
          position: 'bottom',
          textStyle: {
              color: '#fff'
          }
      },
      'width': '100%',
      'height': '100%',
      colors: ['#afa120', '#e0440e'],
      backgroundColor: {
          fill: 'transparent'
      }
  };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart-servicio'));
  chart.draw(data, options);
}

//  Asesorias
function drawAsesoriasChart() {
  let prueba = 512;
  var data = google.visualization.arrayToDataTable([
      ['Element', 'Asesorías','Meta', {
          role: 'style'
      }, {
          role: 'annotation'
      }],
      ['', prueba, 500, '#b87333', '1º Periodo'],
      ['', 433,900, '#b87333', '2º Periodo'],
      ['', 814, 900, '#b87333', '3º Periodo'],
      ['', 0, 900,'#b87333', '4º Periodo'],
      ['', 0, 900,'#b87333', '5º Periodo']
  ]);

  var view = new google.visualization.DataView(data);
  view.setColumns([0, 1,
      {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation"
      },
      2
  ]);

  // Optional; add a title and set the width and height of the chart
  var options = {
      'title': 'Asesorías por periodo',
      titleTextStyle: {
          color: '#fff',
          fontSize: 20,
      },
      legend: {
          color: '#fff',
          position: 'none',
          textStyle: {
              color: '#fff'
          }
      },
      hAxis: {
          textStyle: {
              color: '#fff'
          }
        },
      'width': '100%',
      'height': '100%',
      colors: ['#afa120', '#e0440e'],
      backgroundColor: {
          fill: 'transparent'
      }
  };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.BarChart(document.getElementById('bars-asesorias'));
  chart.draw(data, options);
}



 