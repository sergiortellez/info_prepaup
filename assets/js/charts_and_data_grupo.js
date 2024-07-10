//creates charts and numbers

/*<------------------------------------------------->
<!--	Parámetros	-->
<!------------------------------------------------->*/

const URLdata = "https://sheets.googleapis.com/v4/spreadsheets/1ZX90uRbL2zQcVfPiMp_Y3K-WI0BxQPooSgr00QLPS_g/values/analGrupo!A2:K23?key=AIzaSyDzdEQYUcSwjzEmZNZhYd2vh1E_P6ykPAY"

// Load google charts
google.charts.load('current', {
    'packages': ['corechart','bar']
});

/*<!------------------------------------------------->
<!--	end Parámetros	-->
<!------------------------------------------------->*/


/*<------------------------------------------------->
<!--	selectorListener	-->
<!-------------------------------------------------->
* Descripción: 
    Se ejecuta cuando el selector (elemento HTML) cambia, guarda el valor y actúa de acuerdo a lo obtenido, llama buildData para construir los arreglos, quien llama a buildTable para construir la tabla.
* Parámetros: ninguno
* Dependencias: buildData(), buildTable(),clearTable()
* Devuelve/resultado: Resuelve los parámetros fila y filaGrado para pasarlos como parámetros a la función que construye los arreglos con datos.
<!------------------------------------------------->*/
function selectorListener(){
    //evaluemos el grupo
    let grupo = document.getElementById('grupos').value;
    var fila;
    var filaGrado;
    switch(grupo){
        case 'cuartoA':
             fila = 0;
             filaGrado = 19;
             buildData(URLdata, fila, filaGrado);
        break;
        case 'cuartoB':
             fila = 1;
             filaGrado = 19;
             buildData(URLdata, fila, filaGrado);
        break;
        case 'cuartoC':
             fila = 2;
             filaGrado = 19;
             buildData(URLdata, fila, filaGrado);
        break;
        case 'cuartoD':
             fila = 3;
             filaGrado = 19;
             buildData(URLdata, fila, filaGrado);
        break;
        case 'cuartoE':
             fila = 4;
             filaGrado = 19;
             buildData(URLdata, fila, filaGrado);
        break;
        case 'cuartoF':
             fila = 5;
             filaGrado = 19;
             buildData(URLdata, fila, filaGrado);
        break;
        case 'quintoA':
             fila = 6;
             filaGrado = 20;
             buildData(URLdata, fila, filaGrado);
        break;
        case 'quintoB':
             fila = 7;
             filaGrado = 20;
             buildData(URLdata, fila, filaGrado);
        break;
        case 'quintoC':
             fila = 8;
             filaGrado = 20;
             buildData(URLdata, fila, filaGrado);
        break;
        case 'quintoD':
             fila = 9;
             filaGrado = 20;
             buildData(URLdata, fila, filaGrado);
        break;
        case 'quintoF':
             fila = 11;
             filaGrado = 20;
             buildData(URLdata, fila, filaGrado);
        break;
        case 'areaA1':
             fila = 12;
             filaGrado = 21;
             buildData(URLdata, fila, filaGrado);
        break;
        case 'areaB1':
             fila = 13;
             filaGrado = 21;
             buildData(URLdata, fila, filaGrado);
        break; 
        case 'areaA2':
             fila = 14;
             filaGrado = 21;
             buildData(URLdata, fila, filaGrado);
        break;  
        case 'areaA3':
             fila = 15;
             filaGrado = 21;
             buildData(URLdata, fila, filaGrado);
        break;
        case 'areaB3':
            fila = 16;
             filaGrado = 21;
             buildData(URLdata, fila, filaGrado);
        break;  
        case 'areaC3':
            fila = 17;
             filaGrado = 21;
             buildData(URLdata, fila, filaGrado);
        break; 
        case 'areaA4':
            fila = 18;
             filaGrado = 21;
             buildData(URLdata, fila, filaGrado);
        break;  
    } 
}

/*<!------------------------------------------------->
<!--	end selectorListener	-->
<!------------------------------------------------->*/

/*<------------------------------------------------->
<!--	buildData	-->
<!-------------------------------------------------->
* Descripción:
    Usa un URL para hacer fetch a los datos de Jason, transforma esos datos en objetos que tienen arreglos, pasa como parámetro uno de esos arreglos ".values" a la función buildTable(). 
* Parámetros:
    -URLdata: string
    -fila: num, que indica la fila que se definió para cada grado. 
    -filaGrado: num, indica cuál es la fila donde están las tendencias del grado.
* Dependencias: fillTable(),createDataDrawCharts()
* Devuelve/resultado: genera un arreglo "data" y lo pasa como parámetro a las funciónes que construyen las tablas y gráficas
<!------------------------------------------------->*/
function buildData(URLdata, fila, filaGrado){
    var data = [];
    fetch(URLdata)
    .then(function(response){
        return response.json();
    })
    .then(object => {
        data = object.values;
        fillTable(data, fila);
        createDataDrawCharts(data, fila, filaGrado);
    });    
}
/*<!------------------------------------------------->
<!--	end buildData	-->
<!------------------------------------------------->*/

/*<------------------------------------------------->
<!--	fillTable	-->
<!-------------------------------------------------->
* Descripción:
    Usa los datos que vienen de buildData para llenar el HTML con el valor numérico de los números correspondientes.
* Parámetros:
    -data: arreglo con datos de la url
    -fila: num, que indica la fila que se definió para cada grado. 
* Dependencias: ninguna
* Devuelve/resultado: alimenta los datos en el HTML para las tablas de materias reprobadas y primedios
<!------------------------------------------------->*/

function fillTable(data, fila){
    
    /*<--	*** asignar valores de primedios ***	-->*/
    //Primer periodo
    let promedioPrimerP = document.getElementById("promedio-primero");
    promedioPrimerP.textContent = data[fila][0];
    //Segundo periodo
    let promedioSegundoP = document.getElementById("promedio-segundo");
    promedioSegundoP.textContent = data[fila][1];
    //Tercero periodo
    let promedioTerceroP = document.getElementById("promedio-tercero");
    promedioTerceroP.textContent = data[fila][2];
    //Cuarto periodo
    let promedioCuartoP = document.getElementById("promedio-cuarto");
    promedioCuartoP.textContent = data[fila][3];
    //Quinto periodo
    let promedioQuintoP = document.getElementById("promedio-quinto");
    promedioQuintoP.textContent = data[fila][4];
    /*<--	*** end asignar valores de primedios ***	-->*/

    /*<--	*** asignar valores de reprobadas ***	-->*/
    //Primer periodo
    let reprobadasPrimerP = document.getElementById("reprobadas-primero");
    reprobadasPrimerP.textContent = data[fila][5];
    //Segundo periodo
    let reprobadasSegundoP = document.getElementById("reprobadas-segundo");
    reprobadasSegundoP.textContent = data[fila][6];
    //Tercero periodo
    let reprobadasTerceroP = document.getElementById("reprobadas-tercero");
    reprobadasTerceroP.textContent = data[fila][7];
    //Cuarto periodo
    let reprobadasCuartoP = document.getElementById("reprobadas-cuarto");
    reprobadasCuartoP.textContent = data[fila][8];
    //Quinto periodo
    let reprobadasQuintoP = document.getElementById("reprobadas-quinto");
    reprobadasQuintoP.textContent = data[fila][9];
    /*<--	*** end asignar valores de reprobadas ***	-->*/
    
    //asignar coordinador
    let coordinador = document.getElementById("coord");
    coordinador.textContent = data[fila][10];

}
/*<!------------------------------------------------->
<!--	end fillTable	-->
<!------------------------------------------------->*/

/*<------------------------------------------------->
<!--	createDataDrawCharts	-->
<!-------------------------------------------------->
* Descripción:
    Esta función usa los datos que provienen de la URL y con ella construye dos arreglos que alimentan las gráficas, después llama a la función que dibuja las gráficas 
* Parámetros:
    -data: arreglo con datos de la url
    -fila: num, que indica la fila que se definió para cada grado. 
    -filaGrado: num, indica cuál es la fila donde están las tendencias del grado.
* Dependencias: drawReprobadas(), drawPromedios()
* Devuelve/resultado: construye los datos y llama a las funciones que construyen las tablas.
<!------------------------------------------------->*/
function createDataDrawCharts(data, fila, filaGrado){
    let datosTablaPromedios = [
        ['Periodo', 'Grupo', 'Tendencia'],
        ['1º',  parseFloat(data[fila][0]),  parseFloat(data[filaGrado][0])],
        ['2º',  parseFloat(data[fila][1]),  parseFloat(data[filaGrado][1])],
        ['3º',  parseFloat(data[fila][2]),  parseFloat(data[filaGrado][2])],
        ['4º',  parseFloat(data[fila][3]),  parseFloat(data[filaGrado][3])],
        ['5º',  parseFloat(data[fila][4]),  parseFloat(data[filaGrado][4])]
    ];
    google.setOnLoadCallback(function() { drawPromedios(datosTablaPromedios);});
    let datosTablaReprobadas = [
        ['Periodo', 'Grupo', 'Tendencia'],
        ['1º',  parseFloat(data[fila][5]),  parseFloat(data[filaGrado][5])],
        ['2º',  parseFloat(data[fila][6]),  parseFloat(data[filaGrado][6])],
        ['3º',  parseFloat(data[fila][7]),  parseFloat(data[filaGrado][7])],
        ['4º',  parseFloat(data[fila][8]),  parseFloat(data[filaGrado][8])],
        ['5º',  parseFloat(data[fila][9]),  parseFloat(data[filaGrado][9])]
    ];
    google.setOnLoadCallback(function() { drawReprobadas(datosTablaReprobadas);});
}
/*<!------------------------------------------------->
<!--	end createDataDrawCharts	-->
<!------------------------------------------------->*/

/*<------------------------------------------------->
<!--	drawPromedios	-->
<!-------------------------------------------------->
* Descripción:
    Dibuja una gráfico con los datos proporcionados. 
* Parámetros:
    -array: arreglo de datos
* Dependencias:nunguna
* Devuelve/resultado:dibuja una tabla en el id indicado.
<!------------------------------------------------->*/
function drawPromedios(array) {
    var data = google.visualization.arrayToDataTable(array);

    var options = {
      title: 'Grupo vs Tendencia(generación)',
      curveType: 'function',
      legend: { position: 'none' },
     
      
      colors: ['#278527', '#e0440e'],
      
      width:"100%",
      height:"200%"
    };
  
    var chart = new google.visualization.LineChart(document.getElementById('promediosGraph'));

    chart.draw(data, options);

};
/*<!------------------------------------------------->
<!--	end drawPromedios	-->
<!------------------------------------------------->*/

/*<------------------------------------------------->
<!--	drawReprobadas	-->
<!-------------------------------------------------->
* Descripción:
    Dibuja una gráfico con los datos proporcionados. 
* Parámetros:
    -array: arreglo de datos
* Dependencias:nunguna
* Devuelve/resultado:dibuja una tabla en el id indicado.
<!------------------------------------------------->*/
function drawReprobadas(array) {
    var data = google.visualization.arrayToDataTable(array);

    var options = {
      title: 'Grupo vs Tendencia(generación)',
      curveType: 'function',
      legend: { position: 'none' },
     
      
      colors: ['#278527', '#e0440e'],
      
      width:"100%",
      height:"200%"
    };
  
    var chart = new google.visualization.LineChart(document.getElementById('reprobadasGraph'));

    chart.draw(data, options);

};

/*<!------------------------------------------------->
<!--	end drawReprobadas	-->
<!------------------------------------------------->*/




