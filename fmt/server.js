const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/list', (req, res) => {
    const directory = req.query.directory;
    fs.readdir(directory, (err, files) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.send({ files });
    });
});

app.post('/copy', (req, res) => {
    const { src, dst } = req.body;
    fs.copyFile(src, dst, (err) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.send({ message: `File ${src} copied to ${dst}.` });
    });
});

app.post('/move', (req, res) => {
    const { src, dst } = req.body;
    fs.rename(src, dst, (err) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.send({ message: `File ${src} moved to ${dst}.` });
    });
});

app.delete('/delete', (req, res) => {
    const filePath = req.body.filePath;
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.send({ message: `File ${filePath} deleted.` });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
