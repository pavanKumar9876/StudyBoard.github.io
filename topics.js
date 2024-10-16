// Get subject and lesson from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get('subject');
const lesson = urlParams.get('lesson');

// Set lesson title
document.getElementById('lesson-title').textContent = `${subject} - ${lesson}`;

// Set up back button
const backBtn = document.getElementById('back-btn');
backBtn.href = `lessons.html?subject=${encodeURIComponent(subject)}`;

// Store topics in localStorage
let topics = JSON.parse(localStorage.getItem(`topics_${subject}_${lesson}`)) || [];

const topicList = document.getElementById('topic-list');
const addTopicBtn = document.getElementById('add-topic-btn');
const themeToggleBtn = document.getElementById('theme-toggle');

// Function to save topics to localStorage
function saveTopics() {
    localStorage.setItem(`topics_${subject}_${lesson}`, JSON.stringify(topics));
}

// Function to render topics
function renderTopics() {
    topicList.innerHTML = '';
    topics.forEach((topic, index) => {
        const topicCard = document.createElement('div');
        topicCard.classList.add('topic-card');
        topicCard.innerHTML = `
            <h2>${topic.name}</h2>
            <ul>
                ${topic.links.map((link, linkIndex) => `
                    <li>
                        <a href="${link.url}" target="_blank">${link.name}</a>
                        <button onclick="deleteLink(${index}, ${linkIndex})">Delete Link</button>
                    </li>
                `).join('')}
            </ul>
            <button onclick="addLink(${index})">Add Link</button>
            <button onclick="deleteTopic(${index})">Delete Topic</button>
        `;
        topicList.appendChild(topicCard);
    });
}

// Function to add a new topic
function addTopic() {
    const topicName = prompt('Enter topic name:');
    if (topicName) {
        topics.push({ name: topicName, links: [] });
        saveTopics();
        renderTopics();
    }
}

// Function to delete a topic
function deleteTopic(index) {
    if (confirm('Are you sure you want to delete this topic?')) {
        topics.splice(index, 1);
        saveTopics();
        renderTopics();
    }
}

// Function to add a link to a topic
function addLink(topicIndex) {
    const linkName = prompt('Enter link name:');
    const linkUrl = prompt('Enter link URL:');
    if (linkName && linkUrl) {
        topics[topicIndex].links.push({ name: linkName, url: linkUrl });
        saveTopics();
        renderTopics();
    }
}

// Function to delete a link from a topic
function deleteLink(topicIndex, linkIndex) {
    if (confirm('Are you sure you want to delete this link?')) {
        topics[topicIndex].links.splice(linkIndex, 1);
        saveTopics();
        renderTopics();
    }
}

// Function to toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
}

// Event listener for add topic button
addTopicBtn.addEventListener('click', addTopic);

// Event listener for theme toggle button
themeToggleBtn.addEventListener('click', toggleTheme);

// Initial render
renderTopics();

// Apply saved theme preference
if (localStorage.getItem('darkTheme') === 'true') {
    document.body.classList.add('dark-theme');
}