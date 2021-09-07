// Note prototype
function Note( note, date, time ) {
  this.id = uuid();
  this.note = note;
  this.date = date;
  this.time = time;
  this.complete = false;
}

// Create a UUID for notes
function uuid() {
  return 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (item) => {
    let random = Math.random() * 16 | 0, id = item == 'x' ? random : (random & 0x3 | 0x8);
    return id.toString(16);
  });
}

// Create notes display
function createNoteDisplay(item) {
  let dateP = document.createElement('p');
  dateP.innerHTML = item.date;
  let timeP = document.createElement('p');
  timeP.innerHTML = item.time;
  let checkbox = document.createElement('input');
  checkbox.type = checkbox;
  checkbox.value = item.id;
  let deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.value = item.id;
  let deleteBtnImg = document.createElement('img');
  deleteBtnImg.src = './trashcan-icon.png';
  deleteBtn.appendChild(deleteBtnImg);
  let notesDiv = document.createElement('div');
  notesDiv.className = 'notes-div';
  notesDiv.appendChild(dateP);
  notesDiv.appendChild(timeP);
  notesDiv.appendChild(checkbox);
  notesDiv.appendChild(deleteBtn);
  let noteTitle = document.createElement('p');
  noteTitle.innerHTML = item.note;
  let updateBtn = document.createElement('button');
  updateBtn.className = 'update-btn';
  updateBtn.value = item.id;
  updateBtn.innerHTML = 'Update';
  let notes = document.createElement('div');
  notes.className = 'notes';
  notes.id = item.id;
  notes.draggable = 'true';
  notes.ondragstart = 'drag(event)';
  notes.appendChild(noteTitle);
  notes.appendChild(notesDiv);
  notes.appendChild(updateBtn);
  document.querySelector('#note-canvas').appendChild(notes);
}

// Set noteArray from localStorage item
let noteArray = [];
if (!localStorage.getItem('noteArray')) {
  localStorage.setItem('noteArray', JSON.stringify(noteArray));
} else {
  noteArray = JSON.parse(localStorage.getItem('noteArray'));
}
noteArray.map(createNoteDisplay);


// Create new note
document.querySelector('.create-btn').addEventListener('click', () => {
  let note = new Note(
    document.querySelector('#note').value,
    document.querySelector('#date').value,
    document.querySelector('#time').value
  );
  noteArray.push(note);
  localStorage.setItem('noteArray', JSON.stringify(noteArray))
  console.log(noteArray);

  createNoteDisplay(note.id, note.note, note.date, note.time);
})

/*
document.querySelector('.delete-btn').addEventListener('click', () => {
  alert('Delete Button Clicked');
})

document.querySelector('.update-btn').addEventListener('click', () => {
  alert('Update Button Clicked');
})



// Check Box
document.querySelector('.checked').addEventListener('click', () => {
  let status = document.querySelector('.checked').value;
  alert(status);
})



// Dragable elements
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
}

*/