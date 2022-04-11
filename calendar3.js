let containerForDates = document.querySelector('.dates_container');
let nameOfCurrentMonth = document.getElementById('name_of_month');
let today = new Date();

let offset = 0;

let toNextMonth = document.getElementById('to_next');
let toPreviousMonth = document.getElementById('to_previous');

toNextMonth.addEventListener("click", updateCalendarNext);
toPreviousMonth.addEventListener("click", updateCalendarPrevious);

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
function setMonthName() {

    let todayPlusOffset = new Date(today.getFullYear(), today.getMonth() + offset)

    nameOfCurrentMonth.innerText = monthNames[todayPlusOffset.getMonth()] + ' ' + todayPlusOffset.getFullYear();
}

function getDaysCountInMonth() {
    let firstDayNextMonth = new Date(today.getFullYear(), today.getMonth() + 1 + offset);
    let firstDayCurrentMonth = new Date(today.getFullYear(), today.getMonth() + offset);
    let diff = firstDayNextMonth - firstDayCurrentMonth;
    return diff / (1000 * 60 * 60 * 24);
}

function getFirstDayOfMonth() {
    return new Date(today.getFullYear(), today.getMonth() + offset).getDay();
}


//cоздание сетки календаря

function createCalendar() {
    let daysCount = getDaysCountInMonth();
    let emptySlotCount = getFirstDayOfMonth();

    setMonthName(offset);
    containerForDates.textContent = '';

    for (let i = 0; i < emptySlotCount; i++) {
        let dates = document.createElement('div');
        dates.className = 'calendar_empty_cell';
        containerForDates.append(dates);
    }

    for (let i = 1; i <= daysCount; i++) {
        let dates = document.createElement('div');
        dates.textContent = i;
        if (i === today.getDate() &&
            nameOfCurrentMonth.innerText == monthNames[today.getMonth()] + ' ' + today.getFullYear()
        ) {
            dates.className = 'today_calendar_cell';
        } else { dates.className = 'calendar_cell'; }
        if (((emptySlotCount + i) % 7 === 0) || ((emptySlotCount + i) % 7 === 1)) {
            dates.className = 'calendar_weekend';
        }

       //проверка лежит ли что-то в localStorage 

        let uniqueId = i + ' ' + nameOfCurrentMonth.innerText;
        let arr = JSON.parse(localStorage.getItem(uniqueId))
        if (arr != null && arr.length != 0) {
            dates.classList.add('busy')
        }

        containerForDates.append(dates);
    }
}
function updateCalendarNext() {
    offset++;
    createCalendar();
}

function updateCalendarPrevious() {
    offset--;
    createCalendar();
}

createCalendar();


// Добавление и удаление заметок
const addTasks = document.getElementById('create_new_task');
const placeForTasks = document.getElementById('calendar');
containerForDates.addEventListener('click', createTaskList);



function createTaskList(event) {
    event.preventDefault();
    const elementClicked = event.target;

    if (elementClicked.className != "calendar_empty_cell") {
        elementClicked.classList.add('cliked_cell');
        let uniqueId = elementClicked.innerText + ' ' + nameOfCurrentMonth.innerText;
        let arr = JSON.parse(localStorage.getItem(uniqueId))

        let notesContainer = document.createElement('div');
        let buttonSaver = document.createElement('button');


        notesContainer.className = 'notes_container';
        placeForTasks.append(notesContainer);

        let notesContainerHeader = document.createElement('header');
        notesContainerHeader.className = 'notes_head';
        notesContainer.append(notesContainerHeader);

        let headerName = document.createElement('div');
        headerName.className = 'notes_head_date';
        headerName.id = uniqueId;
        headerName.textContent = uniqueId;
        notesContainerHeader.append(headerName);

        let buttonCreator = document.createElement('button');
        buttonCreator.className = 'tasks_buttons';
        buttonCreator.id = 'create_new_task';
        buttonCreator.textContent = 'Add new task';
        notesContainer.append(buttonCreator);



        buttonSaver.className = 'tasks_buttons';
        buttonSaver.id = 'save_task';
        buttonSaver.textContent = 'Save task';
        notesContainer.append(buttonSaver);

        let buttonBack = document.createElement('button');
        buttonBack.className = 'tasks_buttons';
        buttonBack.id = 'back_task';
        buttonBack.textContent = 'return to calendar';
        notesContainer.append(buttonBack);

        buttonBack.addEventListener('click', () => {

            notesContainer.remove();
            containerForDates.addEventListener('click', createTaskList);
            elementClicked.classList.remove('cliked_cell');
        })

        containerForDates.removeEventListener('click', createTaskList);

        buttonCreator.addEventListener('click', writeYourTasks);

        if (arr != null) {
            arr.forEach((text) => {
                writeYourTasks(text)
            })


        }
        function writeYourTasks(text = '') {
            if (typeof text !== 'string') {
                text = ''
            }
            let tasksHolder = document.createElement('div');
            tasksHolder.className = 'add_tasks';
            notesContainer.append(tasksHolder);
            let yourNewTask = document.createElement('input');
            yourNewTask.className = 'input_for_new_task';
            yourNewTask.id = uniqueId
            yourNewTask.value = text
            tasksHolder.append(yourNewTask);
            let buttonDeleter = document.createElement('button');
            buttonDeleter.className = 'delete_button';
            buttonDeleter.id = 'delete_task';
            let deleterSpan = document.createElement('span');
            deleterSpan.textContent = 'X';
            buttonDeleter.appendChild(deleterSpan);
            tasksHolder.append(buttonDeleter);

            buttonDeleter.addEventListener('click', () => {

                arr = JSON.parse(localStorage.getItem(uniqueId));
                arr.splice(arr.indexOf(yourNewTask.value), 1)
                localStorage.setItem(uniqueId, JSON.stringify(arr))
                let delItem = yourNewTask.parentNode;
                delItem.remove();

                if (arr.length === 0) {
                    elementClicked.classList.remove('busy')

                }
            });


            buttonSaver.addEventListener('click', () => {

                let arr = localStorage.getItem(uniqueId)
                arr != null ? arr = JSON.parse(localStorage.getItem(uniqueId)) : arr = []
                if (!arr.includes(yourNewTask.value)) {
                    arr.push(yourNewTask.value);
                    localStorage.setItem(uniqueId, JSON.stringify(arr))
                    elementClicked.classList.add('busy')
                }
            });

        }

    }
}

//загрузчик погоды

async function loadWeather() {
    let response = await fetch('https://weather-it-academy.herokuapp.com/weather?offset=0',
    {
      headers: {
        'Authorization': 'a.dubovskaya'
      }
    });   
    let result =  await response.json();

    
    temperatureRender(result)
} 

loadWeather();
let threeContainers = document.querySelector('.today_calendar_cell');

function temperatureRender(result) {
    for(let i = 0; i < 3; i++) {
        let forecastContainer = document.createElement('div');
        let forecastImage = document.createElement('div');
        forecastContainer.textContent = `${result[i].temperature}`;
        forecastImage.innerHTML = `<img src="images/${result[i].weatherIcon}.svg" alt="picture">`;
        forecastImage.className = 'forecast_image';
        forecastContainer.className = 'forecast';
        threeContainers.style.position = 'relative';
        threeContainers.append(forecastContainer);
        threeContainers.append(forecastImage);
        threeContainers = threeContainers.nextSibling;
    }
}
