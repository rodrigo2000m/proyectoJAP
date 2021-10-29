//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function mostrarPerfil(){
    usuario=JSON.parse(localStorage.getItem('usuario'))
    let photo;
    if(usuario.photo!="" || usuario==null){
      photo=`
      <img class="w-100 rounded" src="${usuario.photo}" alt="">
      `
    }else{
      photo=`
        <i class="fas fa-image fa-7x"></i>
      `
    }
    htmlContentToAppend=`
    <span class="badge badge-primary">Perfil de usuario</span>
    <div class="d-md-flex justify-content-center m-2">
      <div class="p-3 col-md-6 d-flex justify-content-center align-items-center">
      ${photo}
      </div>
      <div class="p-3 col-md-6">
        <h3 class="my-2">Datos</h3>
        <p>Nombre de usuario: ${usuario.name +" " +usuario.surname}</p>
        <p>Edad: ${usuario.edad}</p>
        <p>E-mail: ${usuario.email}</p>
        <p>Teléfono de contacto: ${usuario.phone}</p>
        <button class="btn btn-secondary btn-sm  rounded" onclick="editarPerfil()">Editar perfil</button>
      </div>
    </div>
    `
    document.getElementById("userProfile").innerHTML=htmlContentToAppend
};

function editarPerfil(){
    htmlContentToAppend=`
    <span class="badge badge-primary">Perfil de usuario</span>
    <form action="" class="d-md-flex justify-content-center m-2">
      <div class="p-3 col-md-6">
        <h3 class="my-2">Datos</h3>
        <div class="form-group">
          <label for="userName">Nombre:</label>
          <input class="form-control" type="text" name="userName" id="userName" value="${usuario.name}">
        </div>
        <div class="form-group">
          <label for="surname">Apellido:</label>
          <input class="form-control" type="text" name="surname" id="surname"  value="${usuario.surname}">
        </div>
        <div class="form-group">
          <label for="imgProfil">Foto de perfil</label>
          <input class="form-control" type="url" name="imgProfil" id="imgProfil"  value="${usuario.photo}">
        </div>
        <div class="form-group">
            <label for="edad">Edad:</label>
            <input class="form-control" type="number" name="edad" id="edad"  value="${usuario.edad}">
        </div>
      </div>
      <div class="p-3 col-md-6">
        <div class="form-group">
          <label for="email">Email:</label>
          <input class="form-control" type="email" name="email" id="email" value="${usuario.email}">
        </div>
        <div class="form-group">
          <label for="phone">Teléfono:</label>
          <input class="form-control" type="tel" name="phone" id="phone" value="${usuario.phone}">
        </div>
        <div class="form-group">
          <label for="">Contraseña:</label>
          <input class="form-control" type="password" name="pwd" id="pwd"  value="${usuario.pwd}">
        </div>
        <button class="btn btn-secondary btn-sm  rounded" type="submit" onclick="guardar(userName.value, surname.value, imgProfil.value, edad.value, email.value, phone.value, pwd.value)">Guardar cambios</button>
      </div>

    </form>
    `
    document.getElementById("userProfile").innerHTML=htmlContentToAppend
}

function guardar(name,surname,photo,edad,email,phone, pwd){  
    if (name==="" || pwd===""){  
    alert("Ingrese su nombre y contraseña");
    }    else{
      let datosUsuario={
        name:name,
        surname:surname,
        photo:photo,
        edad:edad,
        email: email,
        phone:phone,
        pwd: pwd
      };
      localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    mostrarPerfil()
    }
  }

document.addEventListener("DOMContentLoaded", function (e) {
    mostrarPerfil();
});