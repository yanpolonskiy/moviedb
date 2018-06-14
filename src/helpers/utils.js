export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function isNeedToLoad() {
    let B = document.body;
    let DE = document.documentElement;
    let O = Math.min(B.clientHeight, DE.clientHeight);    
    if (!O) O = B.clientHeight;
    let S = Math.max(B.scrollTop, DE.scrollTop, window.pageYOffset);
    let C = Math.max(B.scrollHeight, DE.scrollHeight);
    if(S == 0) return false;
    if (O + S < C-150)
    return false;
    return true;
}

export function filtration(array, properties, word) {
    console.log(array);
    if (array.length < 1) return [];
    if (word === "") return array;
    return array.filter((item) => {
        let flag = false;
        for (let i = 0; i < properties.length; i++) {
            if (item[properties[i]].toLowerCase().indexOf(word.toLowerCase()) !== -1)
                flag = true;
        }
        return flag;
    })
}