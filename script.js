// Functions and other required things

// Functions that take the events

let empty;
let selected;
let doesExist;
let swapElement;

function dragStart(e) {

    // "this" will refer to the object/div where this callback function is being invoked

    selected = this;
    this.className += " hold" // Class to add style (border to selected div)

    // Wait for a little bit before hiding content of div so that we have the image visible after dragging

    setTimeout(() => {
        this.style.visibility = "hidden"
    }, 0);
}

function dragEnd(e) {
}

function onDeleteBtnClick(fill, file) {
    // Function to delete image from square

    fill.remove();
    file.value = ""; // To completely wipe the value of img after we remove it
}

function addDeleteIcon(fill, file) {
    const deleteIcon = document.createElement("div");
    deleteIcon.className = "delete";
    deleteIcon.innerText = "X";
    fill.appendChild(deleteIcon);

    // An event listener that will call a function to remove the respective image when the delete icon is clicked

    deleteIcon.addEventListener("click", () => onDeleteBtnClick(fill, file));

}

function getImgData(file, emptyBox) {
    const getFile = file.files[0];
    const image = document.createElement("img");
    const fill = document.createElement("div");
    image.className = "image";
    fill.className = "fill";

    emptyBox.appendChild(fill);

    addDeleteIcon(fill, file); // Function to add the icon afterwards

    /**
     * Creating a javascript file reader to know when a file has been done loading and
     * to get the file (data) url so that we can use it to add the src to the image
     */

    const reader = new FileReader();

    reader.onloadend = function() {
        image.src = reader.result // This result will come after the reader is done
    }

    if(getFile) {
        reader.readAsDataURL(getFile);
        
        // dinamically adding things where they belong

        fill.appendChild(image);

        // Also adding some event listeners that will later call the functions when we drag the imgs

        fill.addEventListener("dragstart", dragStart);
        fill.addEventListener("dragend", dragEnd);
    }

}

const gridContainer = document.querySelector(".gridContainer")

/** Nested loops to add all 9 squares we need for our grid
 * We add all the elements and their appropriate class name, then afterwards we 
 * append them to their appropriate place.
 */

for(let i = 0; i < 3; i++) {
    for(let j =0; j < 3; j++) {

        const emptyBox = document.createElement("div");
        const addIcon = document.createElement("div");
        const file = document.createElement("input");

        emptyBox.className = "empty";
        addIcon.className = "addIcon";
        addIcon.innerText = "+";
        file.type = "file";
        file.className = "file";

        gridContainer.appendChild(emptyBox);
        emptyBox.appendChild(addIcon);
        emptyBox.appendChild(file);

        // Event listener that will tell us when the user interacted w the input so we can do smt

        // We need access to the specific empty box too so we can append everything to it
        file.addEventListener("change", () => getImgData(file, emptyBox))

    }
}

/**
 * After we're done populating all the divs we also need to add event listeners to
 * all the empty divs so that we can detect if we dragged something inside them, outside or over
 * and then have each one of them act accordingly
 */

empties = document.querySelectorAll(".empty"); // This will be a nodelist

// Creating the callback functions those event listeners will call to

function dragOver(e) {
    /**
     * When drag over we want to add a class of .hover if there isn't any and paint the particular 
     * div red
     */

    e.preventDefault();

    if(!this.className.includes("hovered")) {
        this.className += " hovered"
    }

}

function dragEnter() {
    e.preventDefault();

    if(this.querySelector(".fill") !== null) { // Check if smt is there (img)
        doesExist = true;
        const elements = this.querySelectorAll(".fill");
        swapElement = elements[0];

    } else {

        // If there's no image already there we just need to drop the new one there

        doesExist = false
    }
}

function dragLeave() {
    this.className = "empty"
}

function dragDrop() {
    this.className = "empty";
    
    // Making the image visible again and then appending it to the new div

    selected.style.visibility = "visible";
    this.append(selected);
}

for (const empty of empties) {
    empty.addEventListener("dragover", dragOver);
    empty.addEventListener("dragenter", dragEnter);
    empty.addEventListener("dragleave", dragLeave);
    empty.addEventListener("drop", dragDrop);
}