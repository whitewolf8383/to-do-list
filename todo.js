// Note prototype
function Note( note, date = 'No Date', time = 'No Time' ) {
  this.id = uuid();
  this.note = note;
  this.date = date;
  this.time = time;
}

// Create a UUID for notes
function uuid() {
  return 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (item) => {
    let random = Math.random() * 16 | 0, id = item == 'x' ? random : (random & 0x3 | 0x8);
    return id.toString(16);
  });
}

// Create Notes and Display on Canvas
function createNoteDisplay(item) {
  let note = item.note;
  let date = item.date;
  let time = item.time;
  let id = item.id

  let dateP = document.createElement('p');
  dateP.innerHTML = date;

  let timeP = document.createElement('p');
  timeP.innerHTML = time;

  let checkbox = document.createElement('button');
  checkbox.type = 'button';
  checkbox.innerHTML = 'Complete';
  checkbox.className = 'checked';
  checkbox.id = `checked${id}`;
  checkbox.addEventListener('click', () => {
    if(!noteTitle.classList.contains('completed')){
      noteTitle.classList.add('completed');
      checkbox.innerHTML = 'Not Complete';
    }
    else {
      noteTitle.classList.remove('completed');
      checkbox.innerHTML = 'Complete';
    }
  })

  let deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.id = `delete${id}`;
  deleteBtn.addEventListener('click', () => {
    let index = 0;
    for (let i = 0; i < noteArray.length; i++){
      if (noteArray[i].id === id){
        index = i;
        break;
      }
    }
    noteArray.splice(index, 1);
    localStorage.setItem('noteArray', JSON.stringify(noteArray));
    location.reload();
  });

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
  noteTitle.innerHTML = note;

  // Draggable Element
  let notes = document.createElement('div');
  notes.className = 'notes';
  notes.id = id;
  notes.draggable = 'true';
  notes.appendChild(noteTitle);
  notes.appendChild(notesDiv);
  document.querySelector('.canvas').appendChild(notes);
  addListeners(notes);
}

// Set noteArray from localStorage item
let noteArray = [];
if (!localStorage.getItem('noteArray')) {
  localStorage.setItem('noteArray', JSON.stringify(noteArray));
} else {
  noteArray = JSON.parse(localStorage.getItem('noteArray'));
  noteArray.map(createNoteDisplay);
}

// Create new note
document.querySelector('.create-btn').addEventListener('click', () => {
  let note = new Note(
    document.querySelector('#note').value,
    document.querySelector('#date').value,
    document.querySelector('#time').value
  );
  noteArray.push(note);
  localStorage.setItem('noteArray', JSON.stringify(noteArray))
  createNoteDisplay(note);
})

// Dragable elements
const notes = document.querySelectorAll('.notes')
const canvas = document.querySelector('.canvas')

canvas.addEventListener('dragover', event => {
  event.preventDefault();
  const afterElement = getDragAfterElement(canvas, event.clientY);
  const note = document.querySelector('.dragging');
  if (afterElement == null) {
    canvas.appendChild(note);
  } else {
    canvas.insertBefore(note, afterElement);
  }
})

function addListeners(note) {
  note.addEventListener('dragstart', () => {
    note.classList.add('dragging');
  })
  note.addEventListener('dragend', () => {
    note.classList.remove('dragging');
  })
}

function getDragAfterElement(canvas, y) {
  const elements = [...canvas.querySelectorAll('.notes:not(.dragging)')]
  return elements.reduce((nextElement, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > nextElement.offset) {
      return { offset: offset, element: child }
    } else {
      return nextElement;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}