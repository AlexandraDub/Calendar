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
        if (i === today.getDate() &&
            nameOfCurrentMonth.innerText == monthNames[today.getMonth()] + ' ' + today.getFullYear()
        ) {
            dates.className = 'today_calendar_cell';
        } else dates.className = 'calendar_cell';
        containerForDates.append(dates);
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
const placeForTasks = document.getElementById('calendar');

containerForDates.addEventListener('click', createTaskList);


function createTaskList(event) {
    const elementCliked = event.target;
    console.log(elementCliked);
    console.log(elementCliked.className);
    if (elementCliked.className === "calendar_cell" || elementCliked.className === "today_calendar_cell")
    {
        elementCliked.className = 'cliked_cell'
        let uniqueId = elementCliked.innerText + ' ' + nameOfCurrentMonth.innerText;

        console.log(uniqueId);
        
        let notesContainer = document.createElement('div');
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

        let tasksHolder = document.createElement('div');
        tasksHolder.className = 'add_tasks';
        notesContainer.append(tasksHolder);

        let buttonSaver = document.createElement('button');
        buttonSaver.className = 'tasks_buttons';
        buttonSaver.id = 'save_task';
        buttonSaver.textContent = 'Save task';
        notesContainer.append(buttonSaver);

        let buttonDeleter = document.createElement('button');
        buttonDeleter.className = 'tasks_buttons';
        buttonDeleter.id = 'delete_task';
        buttonDeleter.textContent = 'Delete task';
        notesContainer.append(buttonDeleter);

        containerForDates.removeEventListener('click', createTaskList);
        buttonCreator.addEventListener('click', writeYourTasks);
        function writeYourTasks() {
            let yourNewTask = document.createElement('input');
            yourNewTask.className = 'input_for_new_task';
            yourNewTask.id = uniqueId
            tasksHolder.append(yourNewTask);
        }

        // let newNote = document.createElement('div');
        // newNote.id = uniqueId;
        // newNote.className = 'new_task_unique';
        // newNote.textContent = 'Приветики';
        // placeForTasks.append(newNote);
        
    } 
} 

