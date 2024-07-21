const express=require("express");
const app=express();
const port =8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
//used method overmode in html you have use only tow request get post show override and use other request like delete patch so we use methos override tools
const methodOverride=require("method-override");
app.use(methodOverride("_method"))
;
//uuidv4 use for uniquely assign each post of its id it very useful tools to assign id of any unique indenfier
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
//access urlencode string data as query string
app.use(express.urlencoded({extended:true}));
app.set("view engine" ,"ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
let posts=[
    { 
        id : uuidv4(),
        username : "nitin",
        content:"i love Life is like riding a bicycle. To keep your balance, you must keep moving"
    },
    {
        id : uuidv4(),
        username : "piyush",
        content: "Imagination is more important than knowledge. Knowledge is limited."

    },
    {
        id:uuidv4(),
        username : "nitin patel",
        content : "Don’t let the noise of others’ opinions drown out your own inner voice."
    },
    {
        id:uuidv4(),
        username : "piyush",
        content : "Do know even one life has breathed easier because you have lived. This is to have succeeded."
    }
]
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})
//main where we all posts
app.get("/posts",(req,res)=>{
    // res.send("server working well");
    res.render("index.ejs",{posts});
})
//create new post take username and post content
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
//after succesfull post we add in main post section render that new.wjs data to /posts{add new post}
app.post("/posts",(req,res)=>{
  let {username,content}=req.body;
  let id=uuidv4();
  posts.push({id,username,content});
   console.log(req.body);
    // res.send("post request working");
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    console.log(post); 
    res.render("show.ejs",{post});
});
//update speciic post using patch
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    // console.log(id);
    // console.log(newcontent);
    console.log(post);
    res.redirect("/posts");

})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
    res.redirect("/posts")


})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})
app.use((req,res)=>{
    res.render("home.ejs");
//    res.send("Welcome to our qoura website");
});

//redirect direct when you create new post and show in main post dashboard;
//res => redirect("url");

//implement get/posts/:id


//create id for packet
// uuid pacakge
// we uploaded on github
