import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/data', function(req, res){
    const obj = [
            {
                "text": "What a lovely day!",
                "profilePic": "images/tree-icon.png"
            },
            {
                "text": "Hey, how ya doing today?",
                "profilePic": "images/tree-icon.png"
            },
            {
                "text": "Sup.",
                "profilePic": "images/tree-icon.png"
            }
        ];
    res.json(obj);
});
s