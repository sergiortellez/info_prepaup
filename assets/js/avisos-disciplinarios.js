
//Import data from URL and create custom table

//TODO: restrict API in https://console.cloud.google.com/apis

/*<------------------------------------------------->
<!--	Parámetros	-->
<!------------------------------------------------->*/
const URLcuarto = "https://sheets.googleapis.com/v4/spreadsheets/1ZX90uRbL2zQcVfPiMp_Y3K-WI0BxQPooSgr00QLPS_g/values/disciplinares!A2:I?key=AIzaSyDzdEQYUcSwjzEmZNZhYd2vh1E_P6ykPAY"

const URLquinto = "https://sheets.googleapis.com/v4/spreadsheets/1ZX90uRbL2zQcVfPiMp_Y3K-WI0BxQPooSgr00QLPS_g/values/disciplinares!J2:R?key=AIzaSyDzdEQYUcSwjzEmZNZhYd2vh1E_P6ykPAY"

const URLsexto = "https://sheets.googleapis.com/v4/spreadsheets/1ZX90uRbL2zQcVfPiMp_Y3K-WI0BxQPooSgr00QLPS_g/values/disciplinares!S2:AA?key=AIzaSyDzdEQYUcSwjzEmZNZhYd2vh1E_P6ykPAY"

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
        buildTable(data, "avisos-disciplinarios");
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
    clearTable("avisos-disciplinarios");
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
            for(j=0;j<2;j++){ //regula la columna
                //casillas para nombre y grupo
                let newTableData = document.createElement('td');
                newTableData.textContent = data[i][j];
                newTableRow.append(newTableData);
            }
            //Tabla para motivos

            //Creamos una casilla en la tabla principal
            let newMotivosTable = document.createElement('table');
            newTableRow.append(newMotivosTable);
            newMotivosTable.classList.toggle('motivos');
            //creando encabezados
            let headerMotivos = document.createElement('thead');
            newMotivosTable.append(headerMotivos);
            let headerMotivosNumAviso = document.createElement('th');
            headerMotivosNumAviso.textContent = "#aviso";
            headerMotivos.append(headerMotivosNumAviso);
            let headerMotivosMotivo = document.createElement('th');
            headerMotivosMotivo.textContent = "Motivo";
            headerMotivos.append(headerMotivosMotivo);
            let headerMotivosFecha = document.createElement('th');
            headerMotivosFecha.textContent = "Fecha";
            headerMotivos.append(headerMotivosFecha);
            //estructura de cuerpo
            let bodyMotivos = document.createElement('tbody');
            newMotivosTable.append(bodyMotivos);
            //contenido de tabla
 
            //ciclo que llena los motivos de cada aviso, junto con su número y la fecha
            for(k=2; k<=8; k=k+2){
                if(data[i][k]){
                    let newRowMotivos = document.createElement('tr');
                    bodyMotivos.append(newRowMotivos);
                    //#aviso
                    let contentMotivosNumAviso = document.createElement('td');
                    //deretrminar si corresponde 1º, 2º, 3º aviso o especial
                    switch(k){
                        case 2:
                            contentMotivosNumAviso.textContent = "1º Aviso";
                            break;
                        case 4:
                            contentMotivosNumAviso.textContent = "2º Aviso";
                            break;
                        case 6:
                            contentMotivosNumAviso.textContent = "3º Aviso";
                            break;
                        case 8:
                                contentMotivosNumAviso.textContent = "Especial";
                                break;
                    } 
                    newRowMotivos.append(contentMotivosNumAviso);
                    //motivo
                    let contentMotivosMotivo = document.createElement('td');
                    contentMotivosMotivo.textContent = data[i][k];
                    newRowMotivos.append(contentMotivosMotivo);
                    contentMotivosMotivo.classList.toggle('motivoCell');
                    //fecha
                    let contentMotivosFecha = document.createElement('td');
                    contentMotivosFecha.textContent = data[i][k+1];
                    newRowMotivos.append(contentMotivosFecha);

                }
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



   
