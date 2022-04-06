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

function createCalendar() {
    setMonthName(offset);
    containerForDates.textContent = '';
    
    let daysCount = getDaysCountInMonth();
    let emptySlotCount = getFirstDayOfMonth();

    for (let i = 0; i<emptySlotCount; i++){
        let dates = document.createElement('div');
        dates.className = 'calendar_empty_cell';
        containerForDates.append(dates);
    }

    for (let i = 1; i <= daysCount; i++) {
        let dates = document.createElement('div');
        dates.textContent = i;
        if (i === today.getDate()) {
            dates.className = 'today_calendar_cell';
        } else dates.className = 'calendar_cell';
        containerForDates.append(dates);
        dates.addEventListener("click", addNewTask);
    }
    
}
function updateCalendarNext(){
    offset++;
    createCalendar();
}

function updateCalendarPrevious(){
    offset--;
    createCalendar();
}

createCalendar();
// Добавление и удаление заметок
const addTasks = document.getElementById('create_new_task');
addTasks.addEventListener("click", addNewTask); 
const fieldForNote = document.querySelector('.add_tasks');

function addNewTask() {
let dayWithTaskDate = document.querySelector('.notes_head_date');
dayWithTaskDate.textContent = '';
// let clickarea = document.querySelector('calendar_cell');
// clickarea.addEventListener('click', event => {
//     dayWithTaskDate.textContent = nameOfCurrentMonth + ', ' + event.target.textContent;
// })

let newTask = document.createElement("textarea");

fieldForNote.append(newTask);
newTask.className = 'input_for_new_task';
}
