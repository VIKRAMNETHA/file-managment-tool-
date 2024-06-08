function listFiles() {
    const directory = document.getElementById('directory').value;
    fetch(`/list?directory=${encodeURIComponent(directory)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('result').textContent = data.error;
            } else {
                const fileList = document.getElementById('fileList');
                fileList.innerHTML = '';
                data.files.forEach(file => {
                    const li = document.createElement('li');
                    li.textContent = file;
                    fileList.appendChild(li);
                });
            }
        });
}

function copyFile() {
    const src = document.getElementById('src').value;
    const dst = document.getElementById('dst').value;
    fetch('/copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src, dst })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').textContent = data.message || data.error;
        });
}

function moveFile() {
    const src = document.getElementById('src').value;
    const dst = document.getElementById('dst').value;
    fetch('/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src, dst })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').textContent = data.message || data.error;
        });
}

function deleteFile() {
    const filePath = document.getElementById('filePath').value;
    fetch('/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').textContent = data.message || data.error;
        });
}
