export function saveItem(key,item){
    if(window.localStorage){
        localStorage.setItem(key, item);
    }    
}

export function removeItem(key) {
    if(window.localStorage) {
        localStorage.removeItem(key);
    }
}

export function getItem(key) {
    if(window.localStorage){
        return localStorage.getItem(key);
    }
}

export function clear() {
    if(window.localStorage){
        localStorage.clear();
    }
}