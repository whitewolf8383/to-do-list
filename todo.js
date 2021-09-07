function Note(title, date, time, message ) {
  id = uuid();
  this.title = title;
  this.date = date;
  this.time = time;
  this.message = message;
  complete = false;
}

function uuid() {
  return 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(item) {
    let random = Math.random() * 16 | 0, id = item == 'x' ? random : (random & 0x3 | 0x8);
    return id.toString(16);
  });
}

console.log(uuid());
console.log(new Note("testing", 01/02/1983, "2:12PM", "testing Message"));


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