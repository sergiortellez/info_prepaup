
//Import data from URL and create custom table

//TODO: restrict API in https://console.cloud.google.com/apis

/*<------------------------------------------------->
<!--	Parámetros	-->
<!------------------------------------------------->*/
const URLcuarto = "https://sheets.googleapis.com/v4/spreadsheets/1ZX90uRbL2zQcVfPiMp_Y3K-WI0BxQPooSgr00QLPS_g/values/academicos!A3:F?key=AIzaSyDzdEQYUcSwjzEmZNZhYd2vh1E_P6ykPAY"

const URLquinto = "https://sheets.googleapis.com/v4/spreadsheets/1ZX90uRbL2zQcVfPiMp_Y3K-WI0BxQPooSgr00QLPS_g/values/academicos!G3:L?key=AIzaSyDzdEQYUcSwjzEmZNZhYd2vh1E_P6ykPAY"

const URLsexto = "https://sheets.googleapis.com/v4/spreadsheets/1ZX90uRbL2zQcVfPiMp_Y3K-WI0BxQPooSgr00QLPS_g/values/academicos!M3:S?key=AIzaSyDzdEQYUcSwjzEmZNZhYd2vh1E_P6ykPAY"

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
* Devuelve/resultado: Tabla construida en HTML
<!------------------------------------------------->*/
function selectorListener(){
    let grado = document.getElementById('grados').value;
    
    switch(grado){
        case 'cuarto':
            buildData(URLcuarto);
            break;
        case 'quinto':
            buildData(URLquinto);
            break;
        case 'sexto':
            buildData(URLsexto);
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
    -URL: string
* Dependencias: buildTable(),clearTable()
* Devuelve/resultado: genera un objeto "data" y llama la función buildTable()
<!------------------------------------------------->*/
function buildData(url){
    var data = [];
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(object => {
        data = object.values;
        buildTable(data, "avisos-academicos");
    });    
}
/*<!------------------------------------------------->
<!--	end buildData	-->
<!------------------------------------------------->*/

/*<------------------------------------------------->
<!--	buildTable	-->
<!-------------------------------------------------->
* Descripción:
    Usa los arreglos generados por buildTable para construir una tabla en HTML y la inserta en el id indicado. 
* Parámetros:
    -data: arreglo de arreglos con los avisos académicos (un arreglo por alumno)
    -idTabla: id de la tabla donde queremos construir la tabla
* Dependencias: clearTable()
* Devuelve/resultado: Dibuja tabla en HTML con los datos que vien como parámetro.
<!------------------------------------------------->*/
function buildTable(data, idTabla){
    //se asegura de que la tabla está vacía
    clearTable("avisos-academicos");
    //construcción del parámetro que apunta al cuerpo de la tabla
    let param = "#"+idTabla+">"+"tbody";
    let tableBody = document.querySelector(param);
    if(data == null){
        let emptyTable = document.createElement('tr');
        emptyTable.textContent = "no hay avisos para mostrar";
        tableBody.append(emptyTable);
    }else{
        //usamos el selector para añadir elementos
        for(i=0; i<data.length; i++){ //regula la fila
            let newTableRow = document.createElement('tr');
            tableBody.append(newTableRow);
            for(j=0;j<data[i].length;j++){ //regula la columna
                let newTableData = document.createElement('td');
                newTableData.textContent = data[i][j];
                newTableRow.append(newTableData);
            }
        }
    }
}
/*<!------------------------------------------------->
<!--	end buildTable	-->
<!------------------------------------------------->*/

/*<------------------------------------------------->
<!--	clearTable	-->
<!-------------------------------------------------->
* Descripción:
    busca una tabla con el id que pasó como parámetro y borra todo lo que tiene en el body. 
* Parámetros:
    -idTabla: string
* Dependencias:ninguna
* Devuelve/resultado:Elimina los elementos del body de la tabla que corresponde al id del parámetro. 
<!------------------------------------------------->*/
function clearTable(idTabla){
    //construcción del parámetro
    let param = "#"+idTabla+">"+"tbody";
    let tableBody = document.querySelector(param);
    tableBody.innerHTML = '';
}
/*<!------------------------------------------------->
<!--	end clearTable	-->
<!------------------------------------------------->*/



   
