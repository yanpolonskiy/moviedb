export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function initializeVk(id) {
    VK.init({
        apiId: id
    });
}

export function loginVk() {
    VK.Auth.login(function(response) {
        if (response.session) {
            console.log('всё ок!');
        } else {
            alert('Не удалось авторизоваться');
        }
    }, 2);
}

export function loadFriendsData() {
    return new Promise((resolve, reject) => {
        let friendsData = {};
        VK.api('friends.get', {
            v: "5.78",
            fields: ["photo_50", "bdate", ""]
        }, function(response) {
            if (response.error) {
                reject(new Error(response.error.error_msg));
            } else {
                resolve(response);
            }
        });
    })
}

export function parseVkDate(date) {
    if (date === undefined) return null;
    let monthsArray = ['января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ]
    let dateArray = date.split('.');
    let year = dateArray[2] ? dateArray[2] + " года" : '';
    let month = monthsArray[dateArray[1]];
    let day = dateArray[0]
    return (`${day} ${month} ${year}`);
}

export function getVkAge(date) {
    if (date === undefined) return null;
    let dateArray = date.split('.');
    if (dateArray[2] === undefined) return null;
    let newDate = new Date();
    newDate.setDate(dateArray[0]);
    newDate.setMonth(dateArray[1]);
    newDate.setFullYear(dateArray[2]);
    return (new Date().getFullYear() - newDate.getFullYear()) + ' лет';
}

//тут какой-то треш, мне так кажется
export function vkFriendsSortByBirthDate(a, b) {
    if (a.bdate === undefined && b.bdate === undefined) return 0;
    if (a.bdate === undefined) return 1;
    if (b.bdate === undefined) return -1;
    let aDateArray = a.bdate.split('.');
    let bDateArray = b.bdate.split('.');
    if (aDateArray[2] === undefined && bDateArray === undefined) return 0;
    if (aDateArray[2] === undefined) return 1;
    if (bDateArray[2] === undefined) return -1;
    let aDate = new Date();
    let bDate = new Date();
    aDate.setDate(aDateArray[0]);
    aDate.setMonth(aDateArray[1]);
    aDate.setFullYear(aDateArray[2]);
    bDate.setDate(bDateArray[0]);
    bDate.setMonth(bDateArray[1]);
    bDate.setFullYear(bDateArray[2]);
    if (aDate > bDate) return -1;
    if (aDate < bDate) return 1;
    return 0;
}

/*
 
    VK.api('friends.get', {
        user_id,
        v: "5.78",
    }, function(data) {
        friendsData = data;
    });
     */