//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

  function guardar(userName, pwd){  
    if (userName==="" || pwd===""){ //Chequea que el dato recibido no esté vacío. 
    alert("Ingrese su nombre y contraseña");
    }    else{
    sessionStorage.setItem("usuario", userName); //setItem almacena el dato en la posición "usuario"
    sessionStorage.setItem("password", pwd); // Almaceno la contraseña
    alert ("Bienvenido/a " + userName); 
    window.open("index.html");
    }
  }


  