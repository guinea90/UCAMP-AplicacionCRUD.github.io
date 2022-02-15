arranque()

function agregarRenglones() {
    let NameA = document.getElementById("NameA").value
    let FirstName = document.getElementById("FirstName").value
    let LastName = document.getElementById("LastName").value
    let Correo = document.getElementById("Correo").value
    let Cargo = document.getElementById("Cargo").value
    let Tel = document.getElementById("Tel").value

    if (NameA == "" || NameA == null) {
        alert ('<< El campo "Nombre" es obligatorio >>')
    } else if(FirstName == "" || FirstName == null) {
        alert ('<< El campo "Apellido Paterno" es obligatorio >>')
    } else if (LastName == "" || LastName == null) {
        alert ('<< El campo "Apellido Materno" es obligatorio >>')
    } else if (Correo =="" || Correo == null) {
        alert ('<< El campo "Correo electrónico" es obligatorio >>')
    } else if (Cargo == "" || Cargo == null) {
        alert ('<< El campo "Nombre del Puesto" es obligatorio >>')
    }else if (Tel == "" || Tel == null) {
        alert ('<< El campo "Teléfono" es obligatorio >>')
    } else if(isNaN(Tel)) {
        alert ('<< Los datos del campo "Teléfono" deber ser números >>')
    }else if (Tel.length < 10) {
        alert ('<< El número telefónico debe ser de 10 dígitos >>')
    }else {

        let index = localStorage.getItem('linea')
        index = parseInt(index)
        index = index + 1

        let renglones = document.getElementById("renglones")

        let fila = document.createElement("tr")
        fila.className = "fila"
        fila.id = index

        let campoName = document.createElement("td")
        campoName.id = "NameAid" + index
        campoName.className = "rowNameA"
        let textoNombre = document.createTextNode(NameA + ' ' + FirstName + ' ' + LastName)
        campoName.appendChild(textoNombre)

        let campoCorreo = document.createElement("td")
        campoCorreo.id = "CorreoId" + index
        campoCorreo.className = "rowCorreo"
        let textoCorreo = document.createTextNode(Correo)
        campoCorreo.appendChild(textoCorreo)

        let campoCargo = document.createElement("td")
        campoCargo.id = "CargoId"+ index
        campoCargo.className = "rowCargo"
        let textoCargo = document.createTextNode(Cargo)
        campoCargo.appendChild(textoCargo)

        let campoTel = document.createElement("td")
        campoTel.id = "TelId" + index
        campoTel.className = "rowTel"
        let numTel = document.createTextNode(Tel)
        campoTel.appendChild(numTel)

        let boton1 = document.createElement("td")
        let botonEditar = document.createElement('button')
        botonEditar.className = "boton-Editar"
        botonEditar.type = 'submit'
        botonEditar.addEventListener('click', editarRenglon, false)
        botonEditar.innerText = 'Editar'
        boton1.appendChild(botonEditar)

        let boton2 = document.createElement("td")
        let botonEliminar = document.createElement('button')
        botonEliminar.className = "boton-Eliminar"
        botonEliminar.type = 'submit'
        botonEliminar.setAttribute('onclick', 'eliminarRenglon(this)')
        botonEliminar.innerText = 'Eliminar'
        boton2.appendChild(botonEliminar)

        fila.appendChild(campoName)
        fila.appendChild(campoCorreo)
        fila.appendChild(campoCargo)
        fila.appendChild(campoTel)
        fila.appendChild(boton1)
        fila.appendChild(boton2)

        renglones.appendChild(fila)

        localStorage.setItem('linea', index)

        let registro = {
            nombre: NameA + ' ' + FirstName + ' ' + LastName,
            correo: Correo,
            cargo: Cargo,
            tel: Tel
        }

        localStorage.setItem('registro' + index, JSON.stringify(registro))
        
        mostrarTabla()
        limpiarCampos()
    }
}

function editarRenglon() {
    mostrarActualiza()
    deshabilitaEliminar(1)

    let editCampos = $(this).parents("tr").attr('id')
    let editNameA = $(this).parents('tr').find('td')[0].innerHTML
    let editCorreo = $(this).parents('tr').find('td')[1].innerHTML
    let editCargo = $(this).parents('tr').find('td')[2].innerHTML
    let editTel = $(this).parents('tr').find('td')[3].innerHTML

    let separaName = editNameA.split(' ')
    editNameA = separaName [0]
    let editFirstName = separaName[1]
    let editLastName = separaName[2]

    document.getElementById("NameA").value = editNameA
    document.getElementById("FirstName").value = editFirstName
    document.getElementById("LastName").value = editLastName
    document.getElementById("Correo").value = editCorreo
    document.getElementById("Cargo").value = editCargo
    document.getElementById("Tel").value = editTel

    localStorage.setItem("renEditado", editCampos)
}

function actualizarDatos() {
    let indice = localStorage.getItem('renEditado')
    if(indice == null || indice == "") {
        return
    }

    if (document.getElementById("NameA").value == "" || document.getElementById("NameA").value == null) {
        alert ('<< El campo "Nombre" es obligatorio >>')
    } else if(document.getElementById("FirstName").value == "" || document.getElementById("FirstName").value == null) {
        alert ('<< El campo "Apellido Paterno" es obligatorio >>')
    } else if (document.getElementById("LastName").value == "" || document.getElementById("LastName").value == null) {
        alert ('<< El campo "Apellido Materno" es obligatorio >>')
    } else if (document.getElementById("Correo").value =="" || document.getElementById("Correo").value == null) {
        alert ('<< El campo "Correo electrónico" es obligatorio >>')
    } else if (document.getElementById("Cargo").value == "" || document.getElementById("Cargo").value == null) {
        alert ('<< El campo "Nombre del Puesto" es obligatorio >>')
    }else if (document.getElementById("Tel").value == "" || document.getElementById("Tel").value == null) {
        alert ('<< El campo "Teléfono" es obligatorio >>')
    } else if(isNaN(document.getElementById("Tel").value)) {
        alert ('<< Los datos del campo "Teléfono" deber ser números >>')
    }else if (document.getElementById("Tel").value.length < 10) {
        alert ('<< El número telefónico debe ser de 10 dígitos >>')
    }else {
    let indNameA = "NameAid" + indice
    let indCorreo = "CorreoId" + indice
    let indCargo = "CargoId" + indice
    let indTel = "TelId" + indice

    document.getElementById(indNameA).innerHTML = document.getElementById("NameA").value + " " + document.getElementById("FirstName").value + " " + document.getElementById("LastName").value
    document.getElementById(indCorreo).innerHTML = document.getElementById("Correo").value
    document.getElementById(indCargo).innerHTML = document.getElementById("Cargo").value
    document.getElementById(indTel).innerHTML = document.getElementById("Tel").value
    
    localStorage.setItem('renEditado', '')
    
    let registro = {
        nombre: document.getElementById("NameA").value + " " + document.getElementById("FirstName").value + " " + document.getElementById("LastName").value,
        correo: document.getElementById("Correo").value,
        cargo: document.getElementById("Cargo").value,
        tel: document.getElementById("Tel").value
    }

    localStorage.setItem('registro' + indice, JSON.stringify(registro))

    limpiarCampos()
    ocultarActualiza()
    deshabilitaEliminar(2)
    }
}

function eliminarRenglon(i) {
    let indice = $(i).closest("tr").attr('id')
    if (confirm('Eliminar registro ?') == true) {
        $(i).closest("tr").remove()
        localStorage.removeItem('registro' + indice)
    } else {}
    ocultarTabla()
}

function NoActualizarDatos() {
    deshabilitaEliminar(2)
    localStorage.getItem('renEditado')
        limpiarCampos()
    localStorage.setItem('renEditado', '')
    ocultarActualiza()
}

function mostrarActualiza() {
    document.getElementById("botonActualiza").className = "muestra-Actualiza"
    document.getElementById("botonAgrega").className = "oculta-botonAgrega"
    document.getElementById("botonNoActualizar").className = "muestra-NoActualizar"
    
}

function ocultarActualiza() {
    document.getElementById("botonActualiza").className = "boton-Actualiza"
    document.getElementById("botonAgrega").className = "boton-Agregar"
    document.getElementById("botonNoActualizar").className = "boton-NoActualizar"
}

function limpiarCampos() {
    document.getElementById("NameA").value = ""
    document.getElementById("FirstName").value = ""
    document.getElementById("LastName").value = ""
    document.getElementById("Correo").value = ""
    document.getElementById("Cargo").value = ""
    document.getElementById("Tel").value = ""
}

function mostrarTabla() {
    document.getElementById("tabla").className = "muestra-Tabla"
    document.getElementById("msjInicial").className = "ocultar-msjCamposVacios"
    document.getElementById("secEdicion").className = "muestraEdicion"
}

function ocultarTabla() {
    let renglones = document.getElementsByClassName("fila")
    if(renglones.length === 0) {
        document.getElementById("tabla").className = "tabla-Datos"
        document.getElementById("msjInicial").className = "msjCamposVacios"
        document.getElementById("secEdicion").className = "edicionOculta"
    }
}

function deshabilitaEliminar(accion) {
    if(accion==1){
        let ren = document.getElementsByClassName("boton-Eliminar")
        for(let i = 0; i<ren.length; i++) {
            ren[i].disabled = true
            ren[i].innerHTML = "********"
        }
    }
    if(accion==2){
        let ren = document.getElementsByClassName("boton-Eliminar")
        for(let i = 0; i<ren.length; i++) {
            ren[i].disabled = false
            ren[i].innerHTML = "Eliminar"
        }
    }
}

function cargaDatos() {
    for (let x = 0; x < localStorage.length; x++) {
        if(localStorage.key(x).substring(8,0) === 'registro') {
            
            let existente = JSON.parse(localStorage.getItem(localStorage.key(x)))
            let NameA = existente.nombre
            let Correo = existente.correo
            let Cargo = existente.cargo
            let Tel = existente.tel
            
            let index = localStorage.key(x).replace("registro", '')
            index = parseInt(index)

            let renglones = document.getElementById("renglones")

            let fila = document.createElement("tr")
            fila.className = "fila"
            fila.id = index

            let campoName = document.createElement("td")
            campoName.id = "NameAid" + index
            campoName.className = "rowNameA"
            let textoNombre = document.createTextNode(NameA)
            campoName.appendChild(textoNombre)

            let campoCorreo = document.createElement("td")
            campoCorreo.id = "CorreoId" + index
            campoCorreo.className = "rowCorreo"
            let textoCorreo = document.createTextNode(Correo)
            campoCorreo.appendChild(textoCorreo)

            let campoCargo = document.createElement("td")
            campoCargo.id = "CargoId"+ index
            campoCargo.className = "rowCargo"
            let textoCargo = document.createTextNode(Cargo)
            campoCargo.appendChild(textoCargo)

            let campoTel = document.createElement("td")
            campoTel.id = "TelId" + index
            campoTel.className = "rowTel"
            let numTel = document.createTextNode(Tel)
            campoTel.appendChild(numTel)

            let boton1 = document.createElement("td")
            let botonEditar = document.createElement('button')
            botonEditar.className = "boton-Editar"
            botonEditar.type = 'submit'
            botonEditar.addEventListener('click', editarRenglon, false)
            botonEditar.innerText = 'Editar'
            boton1.appendChild(botonEditar)

            let boton2 = document.createElement("td")
            let botonEliminar = document.createElement('button')
            botonEliminar.className = "boton-Eliminar"
            botonEliminar.type = 'submit'
            botonEliminar.setAttribute('onclick', 'eliminarRenglon(this)')
            botonEliminar.innerText = 'Eliminar'
            boton2.appendChild(botonEliminar)

            fila.appendChild(campoName)
            fila.appendChild(campoCorreo)
            fila.appendChild(campoCargo)
            fila.appendChild(campoTel)
            fila.appendChild(boton1)
            fila.appendChild(boton2)

            renglones.appendChild(fila)
                        
            mostrarTabla()
            limpiarCampos()
        }
    }
}

function arranque() {
    if(localStorage.getItem("linea") === null) {
        localStorage.setItem('linea', 0)
    } else cargaDatos()
}