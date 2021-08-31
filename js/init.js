const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Queria que la pagina demorara algunos segundo en enviar a login


function CloseSession(){
  alert("Nos vemos "+usuario.name);
  localStorage.removeItem(`usuario`);
  window.location.href="login.html";
}


var usuario = localStorage.getItem("usuario");
if(usuario==null){
  setTimeout(function(){
    window.location="login.html"
  },2000)
}else{
  /*localStorage.setItem('usuario', JSON.stringify(datosUsuario));
  persona = JSON.parse(localStorage.getItem('usuario'));*/
  usuario=JSON.parse(localStorage.getItem('usuario'))
  let htmlContentToAppend=`
    <a class="d-none d-md-inline-block text-white btn" href="my-profile.html" ><i class="fas fa-user"></i>`+"  "+usuario.name+`</a>
    
    <button onclick="CloseSession()" class="btn px-3 mx-5 bg-dark text-white">Salir</button>
    `
    //Falta agregar la funcion para que salga el usuario
    document.getElementById('user-profile').innerHTML= htmlContentToAppend;
}

  
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  //Guardo el nombre en una variable y la uso para checkear si esta completa o no(estoy repitiendo lo del login)

});  