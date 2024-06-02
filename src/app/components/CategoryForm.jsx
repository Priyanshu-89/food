"use client"

import toast from "react-hot-toast"
import { handleSubmit } from "../action"
import { z } from "zod"


const CategoryForm = () => {

    let category = z.object({
        catTitle: z.string().min(3, { message: "Category title must be at least 3 characters long" }),
        catDesc: z.string().min(10, { message: "Category description must be at least 10 characters long" }),
    })
    let clientAction = async (formData) => {
        let records = {
            catTitle: formData.get("catTitle"),
            catDesc: formData.get("catDesc")
        }
        let data = category.safeParse(records)
        if (!data.success) {
            let errorMsg = "";
            data.error.issues.forEach((issue) => {
                errorMsg += issue.path[0] + ":" + issue.message + "\n"
            })

            toast.error(errorMsg)

        }
        else {


            toast.success("Category created successfully"); // Display success message
        }

        await handleSubmit(formData)
    }
    return (
        <div>
            <form action={clientAction} method='POST'>
                <div className="mb-3 flex flex-col">
                    <label htmlFor="catTitle" className='text-orange-800 font-semibold text-lg'>Category Title</label>
                    <input type="text" id='catTitle' name='catTitle' className='border outline-none px-3 py-2 rounded-sm' placeholder='Enter Category Title' />
                </div>

                <div className="mb-3 flex flex-col">
                    <label htmlFor="catDesc" className='text-orange-800 font-semibold text-lg'>Category Description</label>
                    <textarea rows={7} type="text" id='catDesc' name='catDesc' className='border outline-none px-3 py-2 rounded-sm' placeholder='Enter Category Description' />
                </div>

                <div className="mb-3 flex flex-col">
                    <button type="submit" className='bg-orange-700 text-orange-100 px-8 py-2 rounded-md hover:bg-orange-900 hover:text-orange-200 hover:transition-all hover:duration-300'>Create Category</button>
                </div>
            </form>

        </div>
    )
}

export default CategoryForm
