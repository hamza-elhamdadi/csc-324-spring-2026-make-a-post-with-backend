import express from 'express';
import posts from './data/posts.json' with { type: 'json'};

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/data', function(req, res){
    res.json(posts);
});

app.post('/save-data', function(req, res){
    posts.push(req.body);
    console.log(posts);
})

app.listen(3000, function(){
    console.log('Server is listening on port 3000');
})