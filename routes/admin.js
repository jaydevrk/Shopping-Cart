const { response } = require('express');
var express=require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var producthelper=require('../helpers/product-helpers')


/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    res.render('admin/view-products',{admin:true,products})
  })
  
});
router.get('/addproduct',function(req,res){
  
  res.render('admin/addproduct')

})

router.post('/addproduct',(req,res)=>{
 

  producthelper.addProduct(req.body,(id)=>{
    let  Images=req.files.image
    
    Images.mv('./public/product-images/'+id+'.jpg',(err)=>{
      if(!err){
        
        res.render("admin/addproduct")
      }else{
        console.log(err)
      }
    })
    
  })
  
})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin')
  })
})
router.get('/edit-product/:id',async (req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  res.render('admin/edit-product',{product})
})
router.post('/edit-product/:id',(req,res)=>{
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.image){
      let  Images=req.files.image
    
      Images.mv('./public/product-images/'+id+'.jpg')
    }

  })
})
module.exports = router;
