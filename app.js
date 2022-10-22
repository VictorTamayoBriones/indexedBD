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

//manejo de errores
request.onerror = e => {
    console.log('DB error: ', e.target.error);
} 

//insertar datos 
request.onsuccess = e => {
    let db = e.target.result;
    let heroesData = [
        {id: '111', heroe: 'Spiderman', mensaje:'Aqui Spiderman'},
        {id: '222', heroe: 'Hulk', mensaje:'Aqui Hulk'},
        {id: '222', heroe: 'Ironman', mensaje:'Aqui Ironman'}
    ];
    let heroesTransaction = db.transaction('heroes', 'readwrite');
    heroesTransaction.onerror = e => {
        console.log('Error guardado', e.target.error);
    };
    //informa sobre el exito de la transaccion
    heroesTransaction.oncomplete = e => {
        console.log('Transaccion Hecha', e);
    };
    let heroesStore = heroesTransaction.objectStore('heroes');
    for(let heroe of heroesData){
        heroesStore.add(heroe);
    };
    heroesStore.onsuccess = e => {
        console.log('Nuevo item agregado');
    };
}