const state = {
    taskList: [],
};

//DOM operations here
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal_body");

// console.log(taskContents);
// console.log(taskModal);

//****************Template for the card on */
// elem indentifier key=${id} is been missing on line 15
const htmlTaskContent = ({id,title, description , type, url})=>`
<div class="col-md-6 col-lg-4  mt-3 " id=>${id}>

        <div class="card shadow-sm task__card">

        <div class="card-header d-flex justify-content-end task__card__header">
           <button type="button" class='btn btn-outline-info' name=${id}>
           <i class='fas fa-pencil-alt mr-1.5' name=${id}></i>
           </button>
           <button type="button" class='btn btn-outline-danger' name=${id}>
           <i class='fas fa-trash-alt mr-1.5' name=${id}></i>
           </button>
        </div>

        <div class='card-body'>
           ${
            url &&
            ` <img  alt='Card image' width='100%' src=${url} class='card-img-top md-3 rounded-lg' />`
           }
           <h4 class='card-title task__card_title'>${title}</h4>
           <p class='description trim-3-lines text-muted'>${description}</p>
           <div class='tags'>
           <span class='badge bg-primary m-1'>${type}</span>
           </div>
        </div>

        <div class='card-footer'>
        <button type='button' class='btn btn-outline-primary float-right'
        data-bs-toggle="modal" data-bs-target="#showTask">Open Task</button>
        </div>
        </div>
      </div>
`;

//Modal body on >> clk on open task
const htmlModalContent = ({id, title , description , url })=>{
const date = new Date(parseInt(id));
 return `
   <div id=${id}>
   ${
      url &&
      ` <img  alt='Card image' width='100%' src=${url} class='img-fluid place__holder__image mb-3' />`
     }
     <strong class='text-muted text-sm'>Created on: ${date.toDateString()}</strong>
     <h2 clas='my-3'>${title}</h2>
      <p class='text-muted'>${description}</p> 
   </div>
 `
};

// here we convert Json to string(for local storage)
const updateLocalStorage = () =>
{
   localStorage.setItem(
      "task",
      JSON.stringify({
         tasks: state.taskList,
      })
   );
};

//load initial data
//here we convert back from string to Json(for rendering the cards on the screen)
const loadInitialData = () =>{
   const localStorageCopy = JSON.parse(localStorage.tasks);

   if(localStorageCopy)
   {
      state.taskList = localStorageCopy.tasks;
   }
  
   state.taskList.map((cardDate)=>{
      taskContents.innerAdjacentHTML("beforeend",htmlTaskContent(cardDate));
   })
};

//when we update/edit... we need to save
const handleSubmit = (event) =>{
const id = `${Date.now()}`;
const input = {
   url : document.getElementById("imageUrl").value,
  title: document.getElementById("taskTitle").value,
  tags: document.getElementById("tags").value,
  taskDescription: document.getElementById("taskDesc").value,
};
taskContents.innerAdjacentHTML("beforeend",htmlTaskContent({...input,id}));

};