document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const blobUrlContainer = document.getElementById('blobUrlContainer');
    const blobUrl = document.getElementById('blobUrl');
  
    form.onsubmit = async function(event) {
      event.preventDefault();
      const file = fileInput.files[0];
      if (!file) {
        alert("No file selected");
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await fetch('/api/avatar/upload', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        blobUrl.href = result.url;
        blobUrl.textContent = result.url;
        blobUrlContainer.classList.remove('hidden');
      } catch (error) {
        console.error('Upload failed:', error);
      }
    };
  });

function checkPassword() {
    var passwordEntered = document.getElementById('passwordInput').value;
    var correctPassword = 'admin';
  
    if (passwordEntered === correctPassword) {
      // Correct password, show the upload container
      document.getElementById('uploadContainer').classList.remove('hidden');
      document.getElementById('loginContainer').classList.add('hidden');
      return false; // Prevent form submission
    } else {
      // Incorrect password, alert the user
      alert('Acesso Negado.');
      return false; // Prevent form submission
    }
  }  