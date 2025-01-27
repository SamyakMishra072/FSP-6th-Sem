// Function to get students data from localStorage
function getStudents() {
    const students = localStorage.getItem('students');
    return students ? JSON.parse(students) : [];
}

// Function to save students data to localStorage
function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

// Function to display students in the table
function displayStudents() {
    const students = getStudents();
    const tableBody = document.getElementById("studentsTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ""; // Clear the table

    students.forEach((student, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = student.name;
        row.insertCell(1).innerText = student.age;
        row.insertCell(2).innerText = student.course;
        
        // Create Edit button
        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.classList.add("edit-btn");
        editButton.onclick = () => editStudent(index);

        // Create Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = () => deleteStudent(index);

        const actionsCell = row.insertCell(3);
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}

// Function to handle form submission (Add or Update)
document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const name = document.getElementById("studentName").value;
    const age = document.getElementById("studentAge").value;
    const course = document.getElementById("studentCourse").value;
    const index = document.getElementById("studentIndex").value;

    const students = getStudents();

    if (index === "") {
        // Add new student
        students.push({ name, age, course });
    } else {
        // Update existing student
        students[index] = { name, age, course };
    }

    // Save updated students to localStorage
    saveStudents(students);

    // Reset form and update table
    document.getElementById("studentForm").reset();
    document.getElementById("studentIndex").value = "";
    document.getElementById("submitBtn").innerText = "Add Student";

    displayStudents();
});

// Function to edit student
function editStudent(index) {
    const students = getStudents();
    const student = students[index];
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentAge").value = student.age;
    document.getElementById("studentCourse").value = student.course;
    document.getElementById("studentIndex").value = index;
    document.getElementById("submitBtn").innerText = "Update Student";
}

// Function to delete student
function deleteStudent(index) {
    const students = getStudents();
    students.splice(index, 1); // Remove student from the array
    saveStudents(students); // Save updated students to localStorage
    displayStudents(); // Update table
}

// Initial display of students
displayStudents();
