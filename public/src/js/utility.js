let dbPromise = idb.open('posts-store', 1, db => {
    db.createObjectStore('posts', { keyPath: 'id' })
    db.createObjectStore('sync-posts', { keyPath: 'id' })
});

function writeData(st, data) {
    return dbPromise.then(db => {
        let tx = db.transaction(st, 'readwrite');
        let store = tx.objectStore(st);

        store.put(data);

        return tx.complete;
    })
}

function readAllData(st) {
    return dbPromise.then(db => {
        let tx = db.transaction(st, 'readonly');
        let store = tx.objectStore(st);

        return store.getAll()
    })
}

function getItemFromData(st, key) {
    return dbPromise.then(db => {
        let tx = db.transaction(st, 'readonly');
        let store = tx.objectStore(st);

        return store.get(key);
    })
}

function clearAllData(st) {
    return dbPromise
        .then(db => {
            let tx = db.transaction(st, 'readwrite');
            let store = tx.objectStore(st);

            store.clear();

            return tx.complete;
        })
}

function deleteItemFromData(st, key) {
    return dbPromise.then(db => {
        let tx = db.transaction(st, 'readwrite');
        let store = tx.objectStore(st);

        store.delete(key);

        return tx.complete;
    })
}