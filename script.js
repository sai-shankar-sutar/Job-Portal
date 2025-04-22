function openEditDialog() {
    document.getElementById('editProfileModal').style.display = 'flex';
}

function closeEditDialog() {
    document.getElementById('editProfileModal').style.display = 'none';
}

document.getElementById('editProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let designation = document.getElementById('designation').value;

    localStorage.setItem('userName', name);
    localStorage.setItem('userDesignation', designation);

    document.querySelector('.user-name').innerText = name;
    document.querySelector('.user-designation').innerText = designation;

    closeEditDialog();
});

function updateProfilePhoto() {
    const fileInput = document.getElementById('profilePicInput');
    const profilePic = document.getElementById('profile-pic');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePic.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function toggleGraph() {
    const graphSection = document.getElementById('graph-section');
    if (graphSection.style.display === 'none') {
        graphSection.style.display = 'block';
        generateGraph();
        
        
    } else {
        graphSection.style.display = 'none';
    }
}
function handleFileUpload() {
    const fileInput = document.getElementById('cv-upload');
    const file = fileInput.files[0];
    
    if (file) {
        // Check if the file is a PDF
        if (file.type === 'application/pdf') {
            // Handle the PDF file
            alert(`File selected: ${file.name}`);
        } else {
            // Inform the user if the file is not a PDF
            alert('Please upload a PDF file.');
            fileInput.value = ''; // Clear the file input
        }
    }
}

function generateGraph() {
    const ctx = document.getElementById('jobChart').getContext('2d');
    const applied = Math.floor(Math.random() * 100);
    const pending = Math.floor(Math.random() * 50);
    const accepted = Math.floor(Math.random() * 30);
    
    document.getElementById('appliedJobs').innerText = applied;
    document.getElementById('pendingJobs').innerText = pending;
    document.getElementById('acceptedJobs').innerText = accepted;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Applied Jobs', 'Pending Jobs', 'Accepted Jobs'],
            datasets: [{
                label: 'Job Status',
                data: [applied, pending, accepted],
                backgroundColor: ['#3498db', '#e67e22', '#2ecc71']
            }]
        }
    });
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const messageList = document.getElementById('dm-section');
    const messageText = input.value.trim();

    if (messageText) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'user-message');
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${messageText}</p>
            </div>
        `;
        messageList.appendChild(messageDiv);
        input.value = '';
        messageList.scrollTop = messageList.scrollHeight; // Auto-scroll to the latest message
    }
}



window.onload = function() {
    // Load profile data from localStorage if available
    const savedName = localStorage.getItem('userName');
    const savedDesignation = localStorage.getItem('userDesignation');

    if (savedName) {
        document.querySelector('.user-name').innerText = savedName;
    }
    if (savedDesignation) {
        document.querySelector('.user-designation').innerText = savedDesignation;
    }

    // Set up event listeners
    document.getElementById('openEditDialogBtn').addEventListener('click', openEditDialog);
    document.getElementById('closeEditDialogBtn').addEventListener('click', closeEditDialog);
    document.getElementById('profilePicInput').addEventListener('change', updateProfilePhoto);
    document.getElementById('toggleGraphBtn').addEventListener('click', toggleGraph);
    document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
    
};
