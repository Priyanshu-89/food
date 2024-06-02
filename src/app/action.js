"use server"
import { redirect } from "next/navigation";
import Category from "./models/Category";

import { join } from "path"
import { writeFile } from "fs/promises";
import Food from "./models/Food";
import Dbconnect from "./db/Connect";
import User from "./models/User";
import bcrypt from 'bcryptjs'
import Address from "./models/Address";

export const handleSubmit = async (formData) => {

    let catTitle = formData.get('catTitle');
    let catDesc = formData.get('catDesc');
    let record = { catTitle, catDesc }
    let data = await Category.create(record)
    redirect("/admin/category")
}

export const handleSubmitFoodInsert = async (formData) => {
    try {
        let title = formData.get('title');
        let description = formData.get('description');
        let price = formData.get('price');
        let discountPrice = formData.get('discountPrice');
        let categoryName = formData.get('category');
        let coverImage = formData.get('coverImage');
        let ingredients = formData.get('ingredients');

        // Find the Category document based on the category name
        let category = await Category.findOne({ catTitle: categoryName });
        if (!category) {
            throw new Error('Category not found');
        }

        //image
        let bytes = await coverImage.arrayBuffer();
        let buffer = Buffer.from(bytes);
        let path = join("./public", "images", coverImage.name);
        await writeFile(path, buffer);

        let record = { title, description, price, discountPrice, category: category._id, coverImage: coverImage.name, ingredients };
        let data = await Food.create(record);
        console.log("Data", data);
        redirect("/admin/foods");
    } catch (error) {
        console.log("Error", error)
    }
};

    //deleted button
    export const handleBookDelete=async(id)=>{
        try {
           let data=await Food.findByIdAndDelete(id)
           redirect("/admin/foods")
        } catch (error) {
            console.error("Error occurred while deleting food item:", error);
            
    
        }
    }

    //category delete
    export const handleCatDelete=async(id)=>{
        await Category.findByIdAndDelete(id);
        redirect("/admin/category")
    }

    //register form

    export const handleCreateAccount=async(formData)=>{
        let name=formData.get("name");
        let email=formData.get("email");
        
        let salt=await bcrypt.genSalt(10);
        let password=await bcrypt.hash(formData.get("password"), salt) 
        let contact=formData.get("contact");
        let record={name, email, password, contact}
        await User.create(record);
        redirect("/")

    }

    //address action

    export const handleCreateAddress=async(formData)=>{
        let name=formData.get("name");
        let contact=formData.get("contact");
        let city=formData.get("city");
        let state=formData.get("state");
        let landmark=formData.get("landmark");
        let pincode=formData.get("pincode");
        let area=formData.get("area");
        let user=formData.get("user");

        let record={name, contact, city, state, landmark, pincode, area, user};
        let data=await Address.create(record)
    }
