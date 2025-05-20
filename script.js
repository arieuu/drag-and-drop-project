// Functions and other required things

// Functions that take the events

function dragstart(e) {

}

function dragend(e) {

}

function getImgData(file, emptyBox) {
    const getFile = file.files[0];
    const image = document.createElement("img");
    const fill = document.createElement("div");
    image.className = "image";
    fill.className = "fill";

    emptyBox.appendChild(fill);

    // addDeleteIcon(fill, file); // Function to add the icon afterwards

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