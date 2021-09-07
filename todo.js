let noteArray = [];

// Create or set noteArray in localStorage
if (!localStorage.getItem(noteArray)) localStorage.setItem('noteArray', noteArray);
else noteArray = localStorage.getItem('noteArray');

// Note prototype
function Note(title, note, date, time ) {
  this.id = uuid();
  this.title = title;
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

document.querySelector('.create-btn').addEventListener('click', () => {
  let note = new Note(
    document.querySelector('#title').value,
    document.querySelector('#note').value,
    document.querySelector('#date').value,
    document.querySelector('#time').value
  )
  noteArray.push(note);
  console.log(noteArray);
})

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