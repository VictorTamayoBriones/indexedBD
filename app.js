// indexedDB: Reforzamiento
let request = window.indexedDB.open('mi-database', 1);

//actuzaliza cunado se crea o se sube version de db
request.onupgradeneeded = e => {
    console.log('Actualizacion de BD');
    let db = e.target.result;
    db.createObjectStore('heroes', {
        keyPath: 'id'
    })
}
