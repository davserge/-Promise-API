let form = document.getElementById('form');

form.addEventListener('submit', e => {
    e.preventDefault()  
    const startDate = form.startdate.value;
    const endDate = form.enddate.value; 

    if (startDate < endDate) {
        let rangeDates = getDate(startDate, endDate)
        request(rangeDates)
    } else {        
       alert('Check input fields. Incorrect date range');        
       return
    }
})

function getDate(startDate, endDate) {
    let result = []
    startDate = Date.parse(startDate)
    endDate = Date.parse(endDate) 

    for (let i = startDate; i <= endDate; i = i + 86400000){

//когда startDate и endDate объекты даты, можно преобразовать их в количество миллисекунд с полуночи 1 января 1970 года, например:
//  let startTime = startDate.getTime(), endTime = endDate.getTime();
// можно переходить от одного к другому, увеличивая циклическое время на 86400000 (1000*60*60*24) — количество миллисекунд в одном дне.

        result.push(new Date(i).toString().substring(0, 10)) 
        
//Местное время: let date = new Date();
//date = date.toJSON().slice(0, 10);

//Время UTC: let date = new Date().toISOString();
//date = date.substring(0, 10);
//Дата будет напечатана 15 июня 20.... г. 
// toISOString() возвращает дату по стандарту ISO, котораяYYYY-MM-DDTHH:mm:ss.sssZ
//Код занимает первые 10 символов, которые нужны для формата ГГГГ-ММ-ДД.

    }
    return result
}

function request(range) {
    let requests = range.map(date => fetch(`https://www.nbrb.by/api/exrates/rates/USD?parammode=2&ondate=${date}`))

    Promise.all(requests)
        .then(responses => Promise.all(responses.map(item => item.json())))
        .then(dates => {
            let result = [];

            dates.forEach(date => {
                result.push({
                date: date.Date.toString().substr(0, 10), 
                cur: date.Cur_OfficialRate
                })
            });         

            solution(result)
        })
        .catch(error => alert(`Request Error ${error.message}`))
}

function solution(range) {
    
    range.sort((a,b) => {

        if(a.cur < b.cur) return -1;
        if (a.cur > b.cur) return 1;

//как следует сортировать первое значение по отношению ко второму:
// -1 означает, что первое идет перед вторым, 1 означает, что оно идет после, 
//0 означает, что они эквивалентны.

        // если курсы равны - сортируем по дате

        if(a.date < b.date) return -1;
        if (a.date > b.date) return 1;
            
        return 0;
    })   
    document.getElementById('result').value = `Min currency rate: ${range[0].cur} Date: ${range[0].date}\n\n Max currency rate: ${range[range.length-1].cur} Date: ${range[range.length-1].date}`
}



























































/*


const startDate = document.getElementById('startdate');
const endDate = document.getElementById('enddate');
let error = document.getElementById('error');

form.addEventListener('submit', e=>{
    e.preventDefault()
    const start = startDate.value;
    const end = endDate.value
    if(start < end){
        let allDates = getAllDates(start, end)
        request(currencyArr)
    }else{
        startDate.classList.add('error-date');
        endDate.classList.add('error-date');
        alert('Check input dates');
        return
    }
})

form.addEventListener('blur', (event)=> {
    if(event.target === 'input'){
        event.target.classList.remove('focus');
    }
});

form.addEventListener('focus', (event)=>{
    if(event.target === 'input'){
     document.querySelectorAll('input').forEach(element=> element.classList.remove('error-date'))
     event.target.classList.add('focus');
    }
});
function addError(input){
    input.classlist.add('error-date');
}

function getAllDates(start, end){
    let result = []
    start = Date.parse(start)
    end = Date.parse(end)
    for (let i = start; i <= end; i = i + 86400000){
        result.push(new Date(i).toString().substring(0, 10))
    }
    return result
}

//когда startDate и endDate объекты даты, можно преобразовать их в количество миллисекунд с полуночи 1 января 1970 года, например:
//  let startTime = startDate.getTime(), endTime = endDate.getTime();
// можно переходить от одного к другому, увеличивая циклическое время на 86400000 (1000*60*60*24) — количество миллисекунд в одном дне.

//Местное время: let date = new Date();
//date = date.toJSON().slice(0, 10);

//Время UTC: let date = new Date().toISOString();
//date = date.substring(0, 10);
//Дата будет напечатана 15 июня 20.... г. 
// toISOString() возвращает дату по стандарту ISO, котораяYYYY-MM-DDTHH:mm:ss.sssZ
//Код занимает первые 10 символов, которые нужны для формата ГГГГ-ММ-ДД.



function request(datesArr){
    let url = `https://www.nbrb.by/api/exrates/rates/USD?parammode=2&ondate=${date}`;
    let request = currencyArr.map(date => fetch(url))

    Promise.all(request)
        .then(responses => Promise.all(responses.map(element => element.JSON())))
        .then(dates => {
            let result = dates.map(({Date, currencyRate}) => ({
               date: Date.toString().substring(0, 10),
               currency: currencyRate
            })
        )
        final(result)
        })
        .catch(error => alert('Error request'))
}

function final(currencyArr) {
    currencyArr.sort((a,b) => {
        if (a.currency < b.currency)
        return -1;
        if(a.currency > b.currency)
        return 1;

//как следует сортировать первое значение по отношению ко второму:
// -1 означает, что первое идет перед вторым, 1 означает, что оно идет после, 
//0 означает, что они эквивалентны.
        
    // если курсы равны, сортировка по дате: 
        if (a.date< b.date)
        return -1;
        if(a.date > b.date)
        return 1;

        return 0;
    })
    
    document.getElementById('result').value = `минимальный курс:  ${currencyArr[0].currency} дата: ${currencyArr[0].date}\n  
    максимальный курс: ${currencyArr[currencyArr.length-1].currency} Date: ${currencyArr[currencyArr.length-1].date}`

}
*/