const books = require('../models/bookModel')

// add book
exports.addBookController = async (req,res)=>{
    console.log('inside addBookController');
  
    // get book details from req body,upload file from request files and seller mail from req payload

const { title,author,pages,price,discountPrice,imageURL,abstract,language, publisher, isbn, category} = req.body
const uploadImages = req.files.map(item=>item.filename)
const sellerMail = req.payload

console.log(title,author, pages, price, discountPrice, imageURL,abstract, language,publisher,isbn,category,uploadImages,sellerMail);

  try{
    // check book already exists
    const existingBook = await books.findOne({title,sellerMail})
    if(existingBook){
      res.status(401).json("uploaded book is already exists...request failed")
    }else{
      const newBook = await books.create({
        title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category,uploadImages,sellerMail
      })
      res.status(200).json(newBook)
    }
  }catch(error){
    console.log(error);
    res.status(500).json(error)
    
  } 
    
}