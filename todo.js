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


/* drag and drop div setup
* Allows Dropping
* <div ondrop="drop(event)" ondragover="allowDrop(event)"></div>
*
* Allows Dragging Object
* <div id=uuid draggable="true" ondragstart="drag(event)">
*   Title
*   Note
*   Date  Time
* </div>
*/