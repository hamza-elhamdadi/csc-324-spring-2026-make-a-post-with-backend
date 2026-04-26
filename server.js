import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/data', function(req, res){
    const data = [
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
    res.json(data);
});

app.listen(3000, function(){
    console.log('Server is listening on port 3000');
})