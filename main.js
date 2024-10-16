// Store subjects in localStorage
let subjects = JSON.parse(localStorage.getItem('subjects')) || [];

const subjectList = document.getElementById('subject-list');
const addSubjectBtn = document.getElementById('add-subject-btn');
const themeToggleBtn = document.getElementById('theme-toggle');

// Function to save subjects to localStorage
function saveSubjects() {
    localStorage.setItem('subjects', JSON.stringify(subjects));
}

// Function to render subjects
function renderSubjects() {
    subjectList.innerHTML = '';
    subjects.forEach((subject, index) => {
        const subjectCard = document.createElement('div');
        subjectCard.classList.add('subject-card');
        subjectCard.innerHTML = `
            <h2>${subject}</h2>
            <button onclick="openLessons(${index})">Open</button>
            <button onclick="deleteSubject(${index})">Delete</button>
        `;
        subjectList.appendChild(subjectCard);
    });
}

// Function to add a new subject
function addSubject() {
    const subjectName = prompt('Enter subject name:');
    if (subjectName && !subjects.includes(subjectName)) {
        subjects.push(subjectName);
        saveSubjects();
        renderSubjects();
    }
}

// Function to delete a subject
function deleteSubject(index) {
    if (confirm('Are you sure you want to delete this subject?')) {
        subjects.splice(index, 1);
        saveSubjects();
        renderSubjects();
    }
}

// Function to open lessons page
function openLessons(index) {
    window.location.href = `lessons.html?subject=${encodeURIComponent(subjects[index])}`;
}

// Function to toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
}

// Event listener for add subject button
addSubjectBtn.addEventListener('click', addSubject);

// Event listener for theme toggle button
themeToggleBtn.addEventListener('click', toggleTheme);

// Initial render
renderSubjects();

// Apply saved theme preference
if (localStorage.getItem('darkTheme') === 'true') {
    document.body.classList.add('dark-theme');
}