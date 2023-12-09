const Controller = require('../../main/controller');

const Category = require('../../../models/category');

module.exports = new class extends Controller{

    async showPage(req,res){
        try{
            const categories = await Category.find({}).populate('parent');
            
            res.render('pages/admin/category/category',{categories})

        }catch(err){
            console.error(err)
        }
    }


    async showCreatePage(req,res){
        try{
            const categories = await Category.find({parent:null});
    
            res.render('pages/admin/category/createCategory',{massages:req.flash('errors'),success:req.flash('success'),categories})
        }catch(err){
            console.error(err)
        }

    }

    validator(req,res,next){
        this.validation(req,res,next);
    }

    async createCategory(req,res){

        try{
    
            const {name,parent} = req.body;
    
    
            const newCategory = new Category({
                name,
                parent : parent ? parent : null
            });
    
            await newCategory.save();
    
            req.flash('success','category added');
            return this.back(req,res);

        }catch(err){
            console.error(err)
        }
    }

    async destroy(req,res){

        try{
    
            const deleteCategory = await Category.findByIdAndDelete(req.params.id).populate('childs');
            if(!deleteCategory)
               throw new Error('category not found');
        
            deleteCategory.childs.forEach(async(child) => await Category.findByIdAndDelete(child._id));
    
            return this.back(req,res);

        }catch(err){
            console.error(err)
        }
    }


    async showEditPage(req,res){
        try{
            const categories = await Category.find({parent:null});
            const category = await Category.findById(req.params.id).populate('parent');   
            
            res.render('pages/admin/category/editCategory',{massages:req.flash('errors'),categories,category});
        }catch(err){
            console.error(err)
        }
    }


    async update(req,res){
        try{
            const {name,parent} = req.body;
            
            const updateCategory = await Category.findByIdAndUpdate(req.params.id,{$set:{
                name,
                parent : parent ? parent : null
            }});
            if(!updateCategory)
                throw new Error('category not found');
            
            res.redirect('/admin/category');

        }catch(err){
            console.error(err)
        }
    }
}