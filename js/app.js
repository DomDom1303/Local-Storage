const listaTweets = document.getElementById('lista-tweets');


//Event Listeners

eventListeners();

function eventListeners(){

    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

  // Borrar tweets
  listaTweets.addEventListener('click', borrarTweet);

  //Contenido cargado

  document.addEventListener('DOMContentLoaded', localStorageListo);
}



//Funciones

//A;adir tweet del formulario
function agregarTweet(e) {
e.preventDefault();

//Leer el valor del text area
const tweet = document.getElementById('tweet').value;
//Crear boton de eliminar
const botonBorrar = document.createElement('a');
botonBorrar.classList = 'borrar-tweet';
botonBorrar.innerText ='X';


//Crear elemento a la lista
const li = document.createElement('li');
li.innerText = tweet;
//A;ade elboton de borrar al tweet
li.appendChild(botonBorrar);
//A;ade el tweet a la lista
listaTweets.appendChild(li);

//A;adir a Local Storage
agregarTweetLocalStorage(tweet)
}

//Elimina tweet del DOM
function borrarTweet(e){
e.preventDefault();
if(e.target.className == 'borrar-tweet'){
    borrarTweetLocalStorage(e.target.parentElement.innerText);
   } 
}

//Mostrar datos de local storage en la lista
function localStorageListo () {
    let tweets;

    tweets = obtenerTweetsLocalStorage ();

    tweets.forEach(function(tweet){
        //Crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText ='X';

        //Crear elemento a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        //A;ade elboton de borrar al tweet
        li.appendChild(botonBorrar);

    });
}

//Agrega tweet a local storage
function agregarTweetLocalStorage (tweet){
 let tweets;
 tweets = obtenerTweetsLocalStorage();
 //A;adir el nuevo tweet
 tweets.push(tweet);
 //Convertir de string a arreglo para Local Storage
 localStorage.setItem('tweets', JSON.stringify(tweets)); 
}

//Comprobar que haya elementos en local storage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
    //Revisamos los valores de local Storage
    if(localStorage.getItem('tweets') == null) {
        tweets =[];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//Eliminar tweet de Local Storage

function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    //Elimina la X del tweet
    tweetBorrar= tweet.substring(0,tweet.length -1);

    tweets= obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
     if(tweetBorrar === tweet){
         tweets.splice(index,1);
     }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}

