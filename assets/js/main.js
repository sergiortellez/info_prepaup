/*<------------------------------------------------->
<!--	Parámetros	-->
<!------------------------------------------------->*/

const URLdata = "https://sheets.googleapis.com/v4/spreadsheets/1ZX90uRbL2zQcVfPiMp_Y3K-WI0BxQPooSgr00QLPS_g/values/main!A1:A58?key=AIzaSyDzdEQYUcSwjzEmZNZhYd2vh1E_P6ykPAY";
const URLChartsData = "https://sheets.googleapis.com/v4/spreadsheets/1ZX90uRbL2zQcVfPiMp_Y3K-WI0BxQPooSgr00QLPS_g/values/charts!A1:L36?key=AIzaSyDzdEQYUcSwjzEmZNZhYd2vh1E_P6ykPAY";

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
    buildData(URLdata);
    buildDataCharts(URLChartsData);
    checkIfLoggedIn();
  };
/*<!------------------------------------------------->
<!--	end onPageLoad	-->
<!------------------------------------------------->*/

/*<------------------------------------------------->
<!--	google sing in	-->
<!-------------------------------------------------->
* Descripción:
  Ejecuta los comandos necesarios para manejar las credenciales en google. 
* Parámetros:
  -nunguno
* Dependencias: ninguna
* Devuelve/resultado: Muestra los módulos correctos dependiendo del tipo de usuario. 
<!------------------------------------------------->*/
function onSignIn(googleUser) {
  
  //creación del perfil de usuario
  var profile = googleUser.getBasicProfile();
  
  //arreglo con tipos de usuarios
  let users = [
    "jmartine@up.edu.mx",
    "rlira@up.edu.mx",
    "dgarciap@up.edu.mx",
    "etovar@up.edu.mx",
    "jgbarrios@up.edu.mx",
    "mcarreon@up.edu.mx",
    "bhikichi@up.edu.mx",
    "mfernandez@up.edu.mx",
    "jlbetancourt@up.edu.mx",
    "jgomezt@up.edu.mx",
    "sergio@huin.mx"
  ];
  let admins = [
    "obarajas@up.edu.mx",
    "hberriolope@up.edu.mx",
    "syamal@up.edu.mx",
    "stellez@up.edu.mx",
    "forduno@up.edu.mx",
    "agperez@up.edu.mx"
  ];


  //escribe la fecha.
  const photoSelector = document.getElementById('photoUser');
  if(profile.getImageUrl() != null){
  photoSelector.src = profile.getImageUrl();
  }
  const mailSelector = document.getElementById('mail');
  mailSelector.textContent = profile.getName();

  if(users.includes(profile.getEmail())){
    //user is an admin
    const administracionSelector =  document.getElementById('administracion');
    administracionSelector.style.display = 'none';
    const administracionMenuSelector =  document.getElementById('administracion-menu');
    administracionMenuSelector.style.display = 'none';
  }

}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    window.open("index.html","_self");
  });
}

function checkIfLoggedIn(){
const test = gapi.auth2.getAuthInstance().isSignedIn.get();

  if(!test){  
    window.open("index.html","_self");
  } 
}

/*<!------------------------------------------------->
<!--	end google sing in	-->
<!------------------------------------------------->*/

/*<------------------------------------------------->
<!--	buildData	-->
<!-------------------------------------------------->
* Descripción:
    Usa un URL para hacer fetch a los datos de Jason, transforma esos datos en objetos que tienen arreglos, pasa como parámetro uno de esos arreglos ".values" a la función buildTable(). 
* Parámetros:
    -URLdata: string
* Dependencias: fillTable()
* Devuelve/resultado: genera un arreglo "data" y lo pasa como parámetro a las funciónes que construyen las tablas y gráficas
<!------------------------------------------------->*/
function buildData(URLdata){
    var data = [];
    fetch(URLdata)
    .then(function(response){
        return response.json();
    })
    .then(object => {
        data = object.values;
        //funciones a ejecutar con la data
        fillPageData(data);
    });    
}
/*<!------------------------------------------------->
<!--	end buildData	-->
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
    });    
  }
  /*<!------------------------------------------------->
  <!--	end buildDataCharts	-->
  <!------------------------------------------------->*/

/*<------------------------------------------------->
<!--	fillTable	-->
<!-------------------------------------------------->
* Descripción:
    Usa los datos que vienen de buildData para llenar el HTML con el valor numérico de los números correspondientes.
* Parámetros:
    -data: arreglo con datos de la url
    -fila: num, que indica la fila que se definió para cada grado. 
* Dependencias: progressBar()
* Devuelve/resultado: alimenta los datos en el HTML para las tablas de materias reprobadas y primedios
<!------------------------------------------------->*/

function fillPageData(data){
    
    /*<--	*** Coordinación general ***	-->*/
    //inscritos
    let inscritosNum = document.getElementById("inscritosNum");
    inscritosNum.textContent = data[0][0];
    //bajas
    let bajasNum = document.getElementById("bajasNum");
    bajasNum.textContent = data[1][0];
    //1º aviso académico
    let primAvisoAcNum = document.getElementById("primAvisoAcNum");
    primAvisoAcNum.textContent = data[2][0];
    //2º aviso académico
    let segAvisoAcNum = document.getElementById("segAvisoAcNum");
    segAvisoAcNum.textContent = data[3][0];
    //3º aviso académico
    let terAvisoAcNum = document.getElementById("terAvisoAcNum");
    terAvisoAcNum.textContent = data[4][0];
    //4º aviso académico
    let cuarAvisoAcNum = document.getElementById("cuarAvisoAcNum");
    cuarAvisoAcNum.textContent = data[5][0];
    //1º aviso disciplinario
    let primAvisoDicNum = document.getElementById("primAvisoDicNum");
    primAvisoDicNum.textContent = data[6][0];
    //2º aviso disciplinario
    let segAvisoDicNum = document.getElementById("segAvisoDicNum");
    segAvisoDicNum.textContent = data[7][0];
    //3º aviso disciplinario 
    let terAvisoDicNum = document.getElementById("terAvisoDicNum");
    terAvisoDicNum.textContent = data[8][0];
    /*<--	*** end Coordinación general ***	-->*/
    
    /*<--	*** secretaría académica ***	-->*/
    //Asistencia capacitación
    let asisitenciaCapNum = document.getElementById("asisitenciaCapNum");
    asisitenciaCapNum.textContent = data[9][0];
    //Acreditación capacitación
    let acreditCapNum = document.getElementById("acreditCapNum");
    acreditCapNum.textContent = data[10][0];
    //Avance GAC
    let gacNum = document.getElementById("gacNum");
    gacNum.textContent = data[11][0];
    //Reprobación 
    let reprobacionNum = document.getElementById("reprobacionNum");
    reprobacionNum.textContent = data[12][0];
    /*<--	*** end secretaría académica ***	-->*/
   
    /*<--	*** comunicación ***	-->*/
    //Publicaciones
    let publicacionesNum = document.getElementById("publicacionesNum");
    publicacionesNum.textContent = data[13][0];
    //Meta Publicaciones
    progressBar(parseFloat(data[14][0]),'publicacionesBar');
    //boletín pantera
    let boletinNum = document.getElementById("boletinNum");
    boletinNum.textContent = data[15][0];
    //Meta Publicaciones
    progressBar(parseFloat(data[16][0]),'boletinBar');
    //Eventos S. Alumnos
    let socAlumnosNum = document.getElementById("socAlumnosNum");
    socAlumnosNum.textContent = data[17][0];
    //Meta Publicaciones
    progressBar(parseFloat(data[18][0]),'socAlumnosBar');
    /*<--	*** end comunicación ***	-->*/

    /*<--	*** administración ***	-->*/
    //ingresos
    let ingresosRealNum = document.getElementById("ingresosRealNum");
    ingresosRealNum.textContent = data[19][0];
    let ingresosEsplNum = document.getElementById("ingresosEsplNum");
    ingresosEsplNum.textContent = data[20][0];
    progressBar(parseFloat(data[21][0]),'ingresosBar');
     //egresos
     let egresosRealNum = document.getElementById("egresosRealNum");
     egresosRealNum.textContent = data[22][0];
     let egresosEsplNum = document.getElementById("egresosEsplNum");
     egresosEsplNum.textContent = data[23][0];
     progressBar(parseFloat(data[24][0]),'egresosBar');
     //contribucion
     let contribucionRealNum = document.getElementById("contribucionRealNum");
     contribucionRealNum.textContent = data[25][0];
     let contribucionEsplNum = document.getElementById("contribucionEsplNum");
     contribucionEsplNum.textContent = data[26][0];
     progressBar(parseFloat(data[27][0]),'contribucionBar');
     //ahorro
     let ahorroRealNum = document.getElementById("ahorroRealNum");
     ahorroRealNum.textContent = data[28][0];
     let ahorroEsplNum = document.getElementById("ahorroEsplNum");
     ahorroEsplNum.textContent = data[29][0];
     progressBar(parseFloat(data[30][0]),'ahorroBar');

    //presupuesto becas
    let presupBecasNum = document.getElementById("presupBecasNum");
    presupBecasNum.textContent = data[31][0];
    //alumnos con beca
    let alumnosBecasNum = document.getElementById("alumnosBecasNum");
    alumnosBecasNum.textContent = data[32][0];
    //becas repartidas
    let repartidasBecasNum = document.getElementById("repartidasBecasNum");
    repartidasBecasNum.textContent = data[33][0];
    //Alumnos solicitantes
    let solicitantesBecasNum = document.getElementById("solicitantesBecasNum");
    solicitantesBecasNum.textContent = data[34][0];    
    
    /*<--	*** end administración ***	-->*/

    /*<--	*** Extraescolares ***	-->*/
     //Asistencia cursos
     let asistenciaCursosNum = document.getElementById("asistenciaCursosNum");
     asistenciaCursosNum.textContent = data[35][0];
     progressBar(parseFloat(data[36][0]),'asistenciaCursosBar');
     //# cursos
     let cursosNum = document.getElementById("cursosNum");
     cursosNum.textContent = data[37][0];
     progressBar(parseFloat(data[38][0]),'cursosBar');
     //comite
     let comiteNum = document.getElementById("comiteNum");
     comiteNum.textContent = data[39][0];
     //citas psic
     let citasPsiqNum = document.getElementById("citasPsiqNum");
     citasPsiqNum.textContent = data[40][0];
     //conferencias
     let conferenciasNum = document.getElementById("conferenciasNum");
     conferenciasNum.textContent = data[41][0];
     //alumnos selec
     let alumnosSelecNum = document.getElementById("alumnosSelecNum");
     alumnosSelecNum.textContent = data[42][0];
    /*<--	*** end Extraescolares ***	-->*/

    /*<--	*** admisiones ***	-->*/
    //inscritos
    let inscritosNuevosNum = document.getElementById("inscritosNuevosNum");
    inscritosNuevosNum.textContent = data[43][0];
    progressBar(parseFloat(data[44][0]),'inscritosNuevosBar');
    //inscritos vespertina
    let inscritosVespNum = document.getElementById("inscritosVespNum");
    inscritosVespNum.textContent = data[45][0];
    //prospectos atendidos
    let prospectosAtendidosNum = document.getElementById("prospectosAtendidosNum");
    prospectosAtendidosNum.textContent = data[46][0];
    //potencial de alumnos vivos
    let potencialVivosNum = document.getElementById("potencialVivosNum");
    potencialVivosNum.textContent = data[47][0];
    //aceptados
    let aceptadosNum = document.getElementById("aceptadosNum");
    aceptadosNum.textContent = data[48][0];
    //colegios visitados
    let colegiosVisitadosNum = document.getElementById("colegiosVisitadosNum");
    colegiosVisitadosNum.textContent = data[49][0];
    //contactos logrados
    let contactosLogradosNum = document.getElementById("contactosLogradosNum");
    contactosLogradosNum.textContent = data[50][0];
    //eventos realizados
    let eventosRealizadosNum = document.getElementById("eventosRealizadosNum");
    eventosRealizadosNum.textContent = data[51][0];
    //alcance
    let alcanceNum = document.getElementById("alcanceNum");
    alcanceNum.textContent = data[52][0];
    //engagement
    let engagementNum = document.getElementById("engagementNum");
    engagementNum.textContent = data[53][0];
    //exito
    let exitoNum = document.getElementById("exitoNum");
    exitoNum.textContent = data[54][0];
    /*<--	*** end admisiones ***	-->*/

    /*<--	*** formación ***	-->*/
    //exito
    let asesoriasNum = document.getElementById("asesoriasNum");
    asesoriasNum.textContent = data[55][0];
    progressBar(parseFloat(data[56][0]),'asesoriasBar');
    //platicas sacerdote
    let platicasSacerdoteNum = document.getElementById("platicasSacerdoteNum");
    platicasSacerdoteNum.textContent = data[57][0];
    /*<--	*** end formación ***	-->*/

}
/*<!------------------------------------------------->
<!--	end fillTable	-->
<!------------------------------------------------->*/

/*<------------------------------------------------->
<!--	progressBar	-->
<!-------------------------------------------------->
* Descripción:
    Con el número pasado como porcentaje 
    dibuja una barra de progreso.
* Parámetros:
    -porcentaje: num.
    -id: id de la barra de progrso
* Dependencias: ninguna
* Devuelve/resultado: dibuja una barra de progreso con el número proporcionado en el id indicado. 
<!------------------------------------------------->*/
function progressBar(porcentaje,id){
    
    let contenedor = document.getElementById(id);
    contenedor.style.width = 'Calc('+porcentaje+'% - 15%)';
    let barra = document.createElement('div');
    barra.textContent = porcentaje+'%';
    barra.classList.toggle('progress-bar');
    contenedor.append(barra);
}
/*<!------------------------------------------------->
<!--	end progressBar	-->
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
      ['1º', parseFloat(data[2][1]), parseFloat(data[2][2]), parseFloat(data[2][3]), parseFloat(data[2][4])],
      ['2º', parseFloat(data[3][1]), parseFloat(data[3][2]), parseFloat(data[3][3]), parseFloat(data[3][4])],
      ['3º', parseFloat(data[4][1]), parseFloat(data[4][2]), parseFloat(data[4][3]), parseFloat(data[4][4])],
      ['4º', parseFloat(data[5][1]), parseFloat(data[5][2]), parseFloat(data[5][3]), parseFloat(data[5][4])],
      ['5º', parseFloat(data[6][1]), parseFloat(data[6][2]), parseFloat(data[6][3]), parseFloat(data[6][4])]
    ];
    //llama a la función que dibuja la gráfica
    google.setOnLoadCallback(function() { drawAvisosAdemicos(datosTablaAvisosAcademicos);});

    //construye el arreglo
    let datosTablaAvisosDisciplinarios = [
        ['Grado', '1º Aviso', '2º Aviso','3º Aviso'],
          ['Cuarto', parseFloat(data[10][1]), parseFloat(data[10][2]),parseFloat(data[10][3])],
          ['Quinto',  parseFloat(data[11][1]), parseFloat(data[11][2]),parseFloat(data[11][3])],
          ['Sexto',  parseFloat(data[12][1]), parseFloat(data[12][2]),parseFloat(data[12][3])]
      ];
      //llama a la función que dibuja la gráfica
      google.setOnLoadCallback(function() { drawAvisosDisciplinares(datosTablaAvisosDisciplinarios);});

      //construye el arreglo
    let datosTablaReprobadas = [
        [1, parseFloat(data[15][0])],  [2, parseFloat(data[15][1])],  [3, parseFloat(data[15][2])],  [4, parseFloat(data[15][3])],  [5, parseFloat(data[15][4])]
      ];
      //llama a la función que dibuja la gráfica
      google.setOnLoadCallback(function() { drawReprobadas(datosTablaReprobadas);});

        //construye el arreglo
    let datosPiechartServicio = [
        ['Task', 'Hours per Day'],
        ['% cumplido ', parseFloat(data[17][1])],
        ['% faltante', parseFloat(data[17][2])]
        ];
        //llama a la función que dibuja la gráfica
        google.setOnLoadCallback(function() { drawChartServicio(datosPiechartServicio);});
    

      //construye el arreglo
    let datosPiechartPresupuesto = [
      ['Task', 'Hours per Day'],
      ['Ejercido', parseFloat(data[19][1])],
      ['Disponible', parseFloat(data[19][2])]
      ];
      //llama a la función que dibuja la gráfica
      google.setOnLoadCallback(function() { drawPresupuestoChart(datosPiechartPresupuesto);});

      //construye el arreglo
    let datosbarrasIngreso = [
        
            ['Mes', 'Real', 'Presupuestado'],
            ['Agosto', parseFloat(data[22][0]), parseFloat(data[23][0])],
            ['Septiembre', parseFloat(data[22][1]), parseFloat(data[23][1])],
            ['Octubre', parseFloat(data[22][2]), parseFloat(data[23][2]) ],
            ['Noviembre', parseFloat(data[22][3]), parseFloat(data[23][3])],
            ['Diciembre', parseFloat(data[22][4]), parseFloat(data[23][4])],
            ['Enero', parseFloat(data[22][5]), parseFloat(data[23][5])],
            ['Febrero', parseFloat(data[22][6]), parseFloat(data[23][6]) ],
            ['Marzo', parseFloat(data[22][7]), parseFloat(data[23][7]) ],
            ['Abril', parseFloat(data[22][8]), parseFloat(data[23][8])],
            ['Mayo', parseFloat(data[22][9]), parseFloat(data[23][9])],
            ['Junio', parseFloat(data[22][10]), parseFloat(data[23][10]) ],
            ['Julio', parseFloat(data[22][11]), parseFloat(data[23][11])]
          
        ];
        //llama a la función que dibuja la gráfica
        google.setOnLoadCallback(function() { drawIngresos(datosbarrasIngreso);});


         //construye el arreglo
    let datosbarrasEgreso = [
        
        ['Mes', 'Real', 'Presupuestado'],
        ['Agosto', parseFloat(data[26][0]), parseFloat(data[27][0])],
        ['Septiembre', parseFloat(data[26][1]), parseFloat(data[27][1])],
        ['Octubre', parseFloat(data[26][2]), parseFloat(data[27][2]) ],
        ['Noviembre', parseFloat(data[26][3]), parseFloat(data[27][3])],
        ['Diciembre', parseFloat(data[26][4]), parseFloat(data[27][4])],
        ['Enero', parseFloat(data[26][5]), parseFloat(data[27][5])],
        ['Febrero', parseFloat(data[26][6]), parseFloat(data[27][6]) ],
        ['Marzo', parseFloat(data[26][7]), parseFloat(data[27][7]) ],
        ['Abril', parseFloat(data[26][8]), parseFloat(data[27][8])],
        ['Mayo', parseFloat(data[26][9]), parseFloat(data[27][9])],
        ['Junio', parseFloat(data[26][10]), parseFloat(data[27][10]) ],
        ['Julio', parseFloat(data[26][11]), parseFloat(data[27][11])]
      
    ];
    //llama a la función que dibuja la gráfica
    google.setOnLoadCallback(function() { drawEgresos(datosbarrasEgreso);});


    //construye el arreglo
    let datosbarrasContribucion = [
        
        ['Mes', 'Real', 'Presupuestado'],
        ['Agosto', parseFloat(data[30][0]), parseFloat(data[31][0])],
        ['Septiembre', parseFloat(data[30][1]), parseFloat(data[31][1])],
        ['Octubre', parseFloat(data[30][2]), parseFloat(data[31][2]) ],
        ['Noviembre', parseFloat(data[30][3]), parseFloat(data[31][3])],
        ['Diciembre', parseFloat(data[30][4]), parseFloat(data[31][4])],
        ['Enero', parseFloat(data[30][5]), parseFloat(data[31][5])],
        ['Febrero', parseFloat(data[30][6]), parseFloat(data[31][6]) ],
        ['Marzo', parseFloat(data[30][7]), parseFloat(data[31][7]) ],
        ['Abril', parseFloat(data[30][8]), parseFloat(data[31][8])],
        ['Mayo', parseFloat(data[30][9]), parseFloat(data[31][9])],
        ['Junio', parseFloat(data[30][10]), parseFloat(data[31][10]) ],
        ['Julio', parseFloat(data[30][11]), parseFloat(data[31][11])]
      
    ];
    //llama a la función que dibuja la gráfica
    google.setOnLoadCallback(function() { drawContribucion(datosbarrasContribucion);});


     //construye el arreglo
     let datosPiechartAsesorias = [
        ['Element', '% completado', {
            role: 'style'
        }, {
            role: 'annotation'
        }],
        ['', parseFloat(data[35][0]), '#b87333', '1ª Entrevista'],
        ['', parseFloat(data[35][1]), '#b87333', '2ª Entrevista'],
        ['', parseFloat(data[35][2]), '#b87333', '3ª Entrevista'],
        ['', parseFloat(data[35][3]),'#b87333', '4ª Entrevista'],
        ['', parseFloat(data[35][4]),'#b87333', '5ª Entrevista'],
        ['', parseFloat(data[35][5]),'#b87333', '6ª Entrevista']    ];
        //llama a la función que dibuja la gráfica
        google.setOnLoadCallback(function() { drawAsesoriasChart(datosPiechartAsesorias);});
      
    
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
    
    function drawAvisosDisciplinares(array) {
        var data = google.visualization.arrayToDataTable(array);
      
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
function drawReprobadas(array) {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Tendencia');
  
    data.addRows(array);
  
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
  
// Piechart Servicio social
function drawChartServicio(array) {
    var data = google.visualization.arrayToDataTable(array);
  
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

    //// PieChart Presupuesto
function drawPresupuestoChart(array) {
    var data = google.visualization.arrayToDataTable(array);
  
    // Optional; add a title and set the width and height of the chart
    var options = {
        'title': 'Presupuesto',
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
  
  //  Asesorias
function drawAsesoriasChart(array) {

    var data = google.visualization.arrayToDataTable(array);
  
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
  

  //Barras ingresos 

function drawIngresos(array) {
    var data = google.visualization.arrayToDataTable(array);
  
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
  
   //Barras egresos 

function drawEgresos(array) {
    var data = google.visualization.arrayToDataTable(array);
  
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

function drawContribucion(array) {
    var data = google.visualization.arrayToDataTable(array);
  
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