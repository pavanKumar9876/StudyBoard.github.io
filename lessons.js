// Get subject from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get('subject');

// Set subject title
document.getElementById('subject-title').textContent = subject;

// Store lessons in localStorage
let lessons = JSON.parse(localStorage.getItem(`lessons_${subject}`)) || [];

const lessonList = document.getElementById('lesson-list');
const addLessonBtn = document.getElementById('add-lesson-btn');
const themeToggleBtn = document.getElementById('theme-toggle');

// Function to save lessons to localStorage
function saveLessons() {
    localStorage.setItem(`lessons_${subject}`, JSON.stringify(lessons));
}

// Function to render lessons
function renderLessons() {
    lessonList.innerHTML = '';
    lessons.forEach((lesson, index) => {
        const lessonCard = document.createElement('div');
        lessonCard.classList.add('lesson-card');
        lessonCard.innerHTML = `
            <h2>${lesson}</h2>
            <button onclick="openTopics(${index})">Open</button>
            <button onclick="deleteLesson(${index})">Delete</button>
        `;
        lessonList.appendChild(lessonCard);
    });
}

// Function to add a new lesson
function addLesson() {
    const lessonName = prompt('Enter lesson name:');
    if (lessonName && !lessons.includes(lessonName)) {
        lessons.push(lessonName);
        saveLessons();
        renderLessons();
    }
}

// Function to delete a lesson
function deleteLesson(index) {
    if (confirm('Are you sure you want to delete this lesson?')) {
        lessons.splice(index, 1);
        saveLessons();
        renderLessons();
    }
}

// Function to open topics page
function openTopics(index) {
    window.location.href = `topics.html?subject=${encodeURIComponent(subject)}&lesson=${encodeURIComponent(lessons[index])}`;
}

// Function to toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
}

// Event listener for add lesson button
addLessonBtn.addEventListener('click', addLesson);

// Event listener for theme toggle button
themeToggleBtn.addEventListener('click', toggleTheme);

// Initial render
renderLessons();

// Apply saved theme preference
if (localStorage.getItem('darkTheme') === 'true') {
    document.body.classList.add('dark-theme');
}