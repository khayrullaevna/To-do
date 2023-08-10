let toDoArray = [
	{
		id: 0,
		todo: "Listening",
        created: "01.08.2023",
		isCompleted: false,
	},
	{
		id: 1,
		todo: "Reading",
        created: "02.08.2023",
		isCompleted: true,
	},
    {
		id: 2,
		todo: "Writing",
        created: "03.08.2023",
		isCompleted: false,
	},
	{
		id: 3,
		todo: "Speaking",
        created: "04.08.2023",
		isCompleted: true,
	},
];

const elInputName = document.querySelector(".input-name");
const elInputDate = document.querySelector(".input-date")
const elForm = document.querySelector("#form");
const elCard = document.querySelector(".card");

function toDo(array, parent){
    parent.innerHTML = null;
    for (let i=0; i<array.length; i++){
        const newTask = document.createElement("div");
        newTask.className = "task p-2 m-1";
        newTask.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div class="card-title ${array[i].isCompleted ? "text-decoration-line-through" : ""}"><b>${i+1}. ${array[i].todo}</b></div>
            <p>Date: ${array[i].created}</p>
            <img data-id=${array[i].id} class="mb-3" id="edit-icon" src="./img/edit.png" width="20" height="25">
            <img data-id=${array[i].id} class="mb-3" id="delete-icon" src="./img/trash.png" width="20" height="25">
        </div>
        `;
        parent.appendChild(newTask);
    }
}
toDo(toDoArray, elCard);

function editToDoItem(id) {
    const itemIndex = toDoArray.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        const editedTask = prompt("Edit the task:", toDoArray[itemIndex].todo);
        if (editedTask !== null) {
            toDoArray[itemIndex].todo = editedTask;
            toDo(toDoArray, elCard);
        }
    }
}

elCard.addEventListener("click", function(evt){
    if (evt.target.id === "edit-icon") {
        const id = Number(evt.target.dataset.id);
        editToDoItem(id);
    }
});

elCard.addEventListener("click", function(evt){
    if(evt.target.id === "delete-icon"){
        const id = Number(evt.target.dataset.id);
        const newToDoArray = [];
        for (let i=0; i<toDoArray.length; i++){
            const element = toDoArray[i];
            if(element.id !== id){
                newToDoArray.push(element);
            }
        }
        toDoArray = newToDoArray;
        toDo(toDoArray, elCard);
    }
});

elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    if(elInputName.value!==""){
        elCard.innerHTML = null;
        const newToDo = {
            id: toDoArray.length === 0 ? 0 : toDoArray[toDoArray.length-1].id+1,
            todo: elInputName.value,
            created: elInputDate.value,
            isCompleted: false,
        }
        toDoArray.push(newToDo)
        toDo(toDoArray, elCard);
        elForm.reset()
    }

    else{
        alert("Error")
    }

});