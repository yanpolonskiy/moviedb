export function isNeedToLoad() {
    let B = document.body;
    let DE = document.documentElement;
    let O = Math.min(B.clientHeight, DE.clientHeight);    
    if (!O) O = B.clientHeight;
    let S = Math.max(B.scrollTop, DE.scrollTop, window.pageYOffset);
    let C = Math.max(B.scrollHeight, DE.scrollHeight);
    if(S === 0) return true;
    if (O + S < C-200)
    return false;
    return true;
}

export function filtration(array, properties, word) {
    if (array.length < 1) return [];
    if (word === "") return array;
    return array.filter((item) => {
        let flag = false;
        for (let i = 0; i < properties.length; i++) {
            if (item[properties[i]].toLowerCase().indexOf(word.toLowerCase()) !== -1)
                flag = true;
                break;
        }
        return flag;
    })
}

export function formatNum(str) {
    str = str.replace(/(\.(.*))/g, '');
    let arr = str.split('');
    let str_temp = '';
    if (str.length > 3) {
        for (let i = arr.length - 1, j = 1; i >= 0; i--, j++) {
            str_temp = arr[i] + str_temp;
            if (j % 3 == 0) {
                str_temp = ' ' + str_temp;
            }
        }
        return str_temp;
    } else {
        return str;
    }
}