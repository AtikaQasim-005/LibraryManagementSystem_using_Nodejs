
const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


//for image
app.get('/image', (req, res) => { 
  const imagePath = __dirname + '/public/libraryBGimg1.jpg'; 
  res.sendFile(imagePath); 
}); 
const books = [
  {
    bookName: "Jannat Ke Pattay",
    bookAuthor: "Nimra Ahmed",
    bookPages: 544,
    bookPrice: 1500,
    bookState: "Available"
  }
];
app.get('/', (req, res) => {
  res.render('index', { book: books })
})

app.post('/addbooks', (req, res) => {
  let bookname = req.body.bookName;
  let bookauthor = req.body.bookAuthor;
  let bookpages = req.body.bookPages;
  let bookprice = req.body.bookPrice;
  let bookstate = req.body.bookState;
  books.push({
    bookName: bookname,
    bookAuthor: bookauthor,
    bookPages: bookpages,
    bookPrice: bookprice,
    bookState: bookstate
  })
  res.render('index', { book: books })

})

app.post('/issue',(req,res)=>{
  let issuebook=req.body.bookName
  books.forEach((book)=>{
    if(book.bookName == issuebook)
    {
      book.bookState="Issued";
    }
  })
  res.render('index', { book: books })

})
app.post('/delete',(req,res)=>{
  let deletebook=req.body.bookName
  books.forEach((book)=>{
    if(book.bookName == deletebook)
    {
      books.splice(books.indexOf(book),1);
    }
  })
  res.render('index', { book: books })
})
app.post('/return',(req,res)=>{
  let returnbook=req.body.bookName
  books.forEach((book)=>{
    if(book.bookName == returnbook)
    {
      book.bookState="Available";
    }
  })
  res.render('index', { book: books })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})