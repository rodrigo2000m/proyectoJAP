//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

  function guardar(userName, pwd){  
    if (userName==="" || pwd===""){  
    alert("Ingrese su nombre y contraseña");
    }    else{
      let datosUsuario={
        name: userName,
        pwd: pwd
      };
      localStorage.setItem('usuario', JSON.stringify(datosUsuario));


    /*localStorage.setItem("usuario", userName); 
    localStorage.setItem("password", pwd); */
    alert ("Bienvenido/a " + datosUsuario.name); 
    window.open("index.html");
    }
  }


  