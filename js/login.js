//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

  function guardar(userName, pwd){  
    if (userName==="" || pwd===""){  
    alert("Ingrese su nombre y contraseña");
    }    else{
    sessionStorage.setItem("usuario", userName); 
    sessionStorage.setItem("password", pwd); 
    alert ("Bienvenido/a " + userName); 
    window.open("index.html");
    }
  }


  