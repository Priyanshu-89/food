"use client"

import { z } from "zod";
import { handleSubmitFoodInsert } from "../action"
import toast from "react-hot-toast";


const InsertForm = async({callingCat}) => {
    let formDataSchema = z.object({
        title: z.string().min(3, {message:"Title should be between 3 and 50 characters long"}), 
        description: z.string().min(10),
        price: z.number(),
        discountPrice: z.number(),
        category: z.string(),
        ingredients: z.string().min(1), 
       
    });
    const insertFoodAction=async(formData)=>{
        let records = {
            title: formData.get("title"),
            description: formData.get("description"),
            price: parseFloat(formData.get("price")),
            discountPrice: parseFloat(formData.get("discountPrice")),
            category: formData.get("category"),
            ingredients: formData.get("ingredients"),
          
        };
        let data = formDataSchema.safeParse(records);
        if (!data.success) {
            let errorMsg = "";
            data.error.issues.forEach((issue) => {
                errorMsg += issue.path[0] + ":" + issue.message + "\n"
            })

            toast.error(errorMsg)

        }
        else {


        toast.success("Food Inserted successfully"); 
        }
        await handleSubmitFoodInsert(formData)
        
    }
  return (
    <div>
       <form action={insertFoodAction} method="POST" className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                    <input type="text" id="title" name="title" className="border-gray-300 border rounded-md p-2 w-full " />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea id="description" name="description" className="border-gray-300 border rounded-md p-2 w-full "></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                    <select name="category" id="category" className="border-gray-300 border rounded-md p-2 w-full" defaultValue="">
                        <option value="" disabled>--Select Category--</option>
                        {callingCat.map((cat, i) => (
                            <option key={i} value={cat.catTitle}>{cat.catTitle}</option>
                        ))}
                    </select>


                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                    <input type="text" id="price" name="price" className="border-gray-300 border rounded-md p-2 w-full " />
                </div>

                <div className="mb-4">
                    <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700">Discount Price:</label>
                    <input type="text" id="discountPrice" name="discountPrice" className="border-gray-300 border rounded-md p-2 w-full " />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients:</label>
                    <textarea id="ingredients" name="ingredients" className="border-gray-300 border rounded-md p-2 w-full "></textarea>
                </div>


                <div className="mb-4">
                    <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image:</label>
                    <input type="file" id="coverImage" name="coverImage" className="border-gray-300 border rounded-md p-2 w-full " />
                </div>
                <button type="submit" className="text-orange-300 bg-orange-800 py-2 px-4 rounded hover:bg-blue-600">Submit</button>
            </form>
    </div>
  )
}

export default InsertForm
