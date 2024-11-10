// JavaScript code for handling note functionality and counting
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const noteListEl = document.getElementById("note-list");
const counterBoxEl = document.getElementById("counter-box");

let totalNotes = 0;
let completedNotes = 0;

// Update the counter display
function updateCounter() {
    const percentage = totalNotes > 0 ? Math.round((completedNotes / totalNotes) * 100) : 0;
    counterBoxEl.innerHTML = `Total: ${totalNotes}<br>Completed: ${completedNotes} (${percentage}%)`;
}

// Add note
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value.trim();
    if (inputValue) {
        addNoteToList(inputValue);
        clearInputField();
    } else {
        alert("Please enter a note.");
    }
});

// Clear input field after adding
function clearInputField() {
    inputFieldEl.value = "";
}

// Add note to the list
function addNoteToList(note) {
    // Remove "No items here..." message
    const noItemsEl = document.querySelector(".no-items");
    if (noItemsEl) noItemsEl.remove();

    // Create list item for the note
    let newEl = document.createElement("li");

    // Create a checkbox for marking completion
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "completion-checkbox";

    // Event listener for marking as completed
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            newEl.classList.add("completed");
            completedNotes++;
        } else {
            newEl.classList.remove("completed");
            completedNotes--;
        }
        updateCounter();
    });

    // Create a span to hold the note text
    let noteText = document.createElement("span");
    noteText.textContent = note;
    noteText.className = "note-text";

    // Create "Delete" button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.style.backgroundColor = "#e3d91e";
    deleteButton.style.border = "none";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.padding = "5px";

    // Add event listener to delete the note
    deleteButton.addEventListener("click", function() {
        // Adjust completedNotes count if the note was completed
        if (checkbox.checked) completedNotes--;

        // Remove the note and update counters
        newEl.remove();
        totalNotes--;
        updateCounter();

        // If all notes are removed, show "No items here..." message
        if (totalNotes === 0) {
            displayNoItemsMessage();
        }
    });

    // Append checkbox, text, and delete button to the note item
    newEl.appendChild(checkbox);
    newEl.appendChild(noteText);
    newEl.appendChild(deleteButton);

    // Append the new note item to the list
    noteListEl.append(newEl);
    totalNotes++;
    updateCounter();
}

// Display "No items here..." message
function displayNoItemsMessage() {
    noteListEl.innerHTML = "<li class='no-items'>No items here...</li>";
}

// Initial call to display message if the list is empty
displayNoItemsMessage();
