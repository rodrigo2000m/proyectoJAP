//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

  function guardar(userName, pwd){  
    if (userName==="" || pwd===""){  
    alert("Ingrese su nombre y contraseña");
    }    else{
      let datosUsuario={
        name:userName,
        surname:"",
        photo:"",
        edad:"",
        email: "",
        phone:"",
        pwd: pwd
      };
      localStorage.setItem('usuario', JSON.stringify(datosUsuario));
      
    alert ("Bienvenido/a " + datosUsuario.name); 
    window.open("index.html");
    //window.close("login.html")
    }
  }


  