class SocialMediaPost {
    constructor(parentElement, text, profilePicURL){
        this.parentElement = parentElement;
        this.text = text;
        this.profilePicURL = profilePicURL;

        // build the profile pic img
        const image = document.createElement("img");
        image.classList.add("profile-pic");
        image.src = this.profilePicURL;

        // build the post text paragraph
        const p = document.createElement('p');
        p.textContent = this.text;

        // create the div to hold both the img and the paragraph
        this.div = document.createElement("div");
        this.div.classList.add("post");
        this.div.appendChild(image);
        this.div.appendChild(p);

        // adds the div to the parentElement in the DOM
        this.addToDOM();
    }

    // compare this post with another
    localeCompare(otherPost){
        // returns -1 if this.text lexicographically comes before otherPost.text
        // returns  1 if this.text lexicographically comes after otherPost.text
        // returns  0 if this.text === otherPost.text
        return this.text.localeCompare(otherPost.text);
    }

    // removes the div from the DOM
    remove(){
        this.div.remove();
    }

    // adds the div to the DOM
    addToDOM(){
        this.parentElement.appendChild(this.div);
    }
}

class App {
    constructor(){
        this.postContainer = document.getElementById("post-container");
        this.textInput = document.getElementById('post-body');
        this.postForm = document.getElementById("add-post");
        this.sortButton = document.getElementById('sort');
        this.posts = [];

        // bind any App method that (1) is passed as an event handler and (2) uses "this"
        //      Note: createPost and refreshPosts both use "this", but neither function is passed to addEventListener
        this.submitPost = this.submitPost.bind(this);
        this.sortPosts = this.sortPosts.bind(this);        

        // load the posts that already exist in data/posts.json
        this.loadPosts();
    }

    // this method loads the existing posts from data/posts.json
    // and creates a SocialMediaPost object for each post object
    //          Note: data/posts.json contains an array of objects in the format { text: "...", profilePic: "..." }
    async loadPosts(){
        const response = await fetch('data/posts.json');

        const data = await response.json(); // data is an array of objects { text: "...", profilePic: "..." }
        
        // create a new post with each data object in the data array
        for(const obj of data){
            this.createPost(obj);
        }

        // the post form is already disabled in the HTML (see line 29 of index.html)
        // We only enable it here in this loadPosts method AFTER we fetch the data from posts.json and load all of the posts (lines 66 through 73 above)
        // this way, the user can't submit new social media posts until all of the existing posts have been loaded

        // enable the post form and give it a submit listener
        this.postForm.addEventListener('submit', this.submitPost);
        this.postForm.disabled = false;

        // enable the sort button and give it a click listener
        this.sortButton.addEventListener("click", this.sortPosts);
    }

    createPost(obj){
        const post = new SocialMediaPost(this.postContainer, obj.text, obj.profilePic);
        this.posts.push(post);
    }

    submitPost(event){
        // createPost takes as an argument an object with properties: text and profilePic
        // here, we build the object first
        const obj = {
            text: this.textInput.value,
            profilePic: "images/tree-icon.png"
        }

        this.createPost(obj); // then we pass the object to createPost
        this.textInput.value = "";

        event.preventDefault();
    }

    sortPosts(){
        this.posts.sort((post1, post2) => post1.localeCompare(post2));
        this.refreshPosts();
    }

    refreshPosts(){
        for(const post of this.posts){
            post.remove();
            post.addToDOM();
        }
    }

}

export default App;

