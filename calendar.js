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
    let daysCount = getDaysCountInMonth();
    let emptySlotCount = getFirstDayOfMonth();

    setMonthName(offset);
    containerForDates.textContent = '';
    
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
        } else {dates.className = 'calendar_cell';}
        if (((emptySlotCount + i) % 7 === 0) || ((emptySlotCount + i) % 7 === 1 )){
           dates.className = 'calendar_weekend';
        }
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
    event.preventDefault()
    const elementCliked = event.target;

    if (elementCliked.className != "calendar_empty_cell")
    {
        elementCliked.classList.add('cliked_cell');
        let uniqueId = elementCliked.innerText + ' ' + nameOfCurrentMonth.innerText;
        
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

        
        let buttonSaver = document.createElement('button');
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
            elementCliked.classList.remove('cliked_cell');
            //elementCliked.classList.add('calendar_cell');
        })

        containerForDates.removeEventListener('click', createTaskList);

        buttonCreator.addEventListener('click', writeYourTasks);

        

        function writeYourTasks() {
            let tasksHolder = document.createElement('div');
            tasksHolder.className = 'add_tasks';
            notesContainer.append(tasksHolder);
            let yourNewTask = document.createElement('input'); 
            yourNewTask.className = 'input_for_new_task';
            yourNewTask.id = uniqueId
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
                console.log(delItem);
            });
            

            buttonSaver.addEventListener('click', () => {

                let arr = localStorage.getItem(uniqueId)
                arr != null ? arr = JSON.parse(localStorage.getItem(uniqueId)) : arr = []
                arr.push(yourNewTask.value);
                localStorage.setItem(uniqueId, JSON.stringify(arr))
                
            });

            
            
        }
        
        
        // buttonSaver.addEventListener('click', saveTasks);
        // function saveTasks(arr) {
        //     array.forEach(yourNewTask => {
                
        //     });
        //     localStorage.setItem(uniqueId, JSON.stringify(arr))
        // }
        
    } 
} 

