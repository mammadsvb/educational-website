const Controller = require('../../main/controller');

const Category = require('../../../models/category');

module.exports = new class extends Controller{

    async showPage(req,res){
        const categories = await Category.find({}).populate('parent');

        // return res.json(categories)
        res.render('pages/admin/category/category',{categories})
    }


    async showCreatePage(req,res){
        const categories = await Category.find({parent:null});

        res.render('pages/admin/category/createCategory',{massages:req.flash('errors'),success:req.flash('success'),categories})

    }

    validator(req,res,next){
        this.validation(req,res,next);
    }

    async createCategory(req,res){
        const {name,parent} = req.body;


        const newCategory = new Category({
            name,
            parent : parent ? parent : null
        });
        
        // console.log(newCategory);

        await newCategory.save();

        req.flash('success','category added');
        return this.back(req,res);
    }

    async destroy(req,res){
        const deleteCategory = await Category.findByIdAndDelete(req.params.id).populate('childs');
        if(!deleteCategory)
            return res.json('this category doesn\'t exist');
    
        deleteCategory.childs.forEach(async(child) => await Category.findByIdAndDelete(child._id));

        return this.back(req,res);
    }


    async showEditPage(req,res){
        
        const categories = await Category.find({parent:null});
        const category = await Category.findById(req.params.id).populate('parent');   
        
        res.render('pages/admin/category/editCategory',{massages:req.flash('errors'),categories,category});
    }


    async update(req,res){

        const {name,parent} = req.body;
        
        const updateCategory = await Category.findByIdAndUpdate(req.params.id,{$set:{
            name,
            parent : parent ? parent : null
        }});

        res.redirect('/admin/category');
    }
}