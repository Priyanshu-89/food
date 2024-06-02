
import { handleCatDelete } from '@/app/action';
import CategoryForm from '@/app/components/CategoryForm';
import Dbconnect from '@/app/db/Connect'
import Category from '@/app/models/Category'
import { FaTrashAlt } from "react-icons/fa";


const CategoryPage = async () => {
    await Dbconnect()
    let callingCat = await Category.find().lean();



    return (
        <>
            <div className="flex flex-col">
                <div className="flex-1">
                    <h2 className='text-xl font-semibold text-orange-700 pb-3'>Manage Categories - {callingCat.length}</h2>
                </div>
                <div className="flex gap-3">
                    <div className="w-3/4 border">
                        <table className='w-full text-center'>
                            <thead>
                                <tr>
                                    <th className='border p-2 text-orange-700 text-lg'>ID</th>
                                    <th className='border p-2 text-orange-700 text-lg'>CatTitle</th>
                                    <th className='border p-2 text-orange-700 text-lg'>CatDesc</th>
                                    <th className='border p-2 text-orange-700 text-lg'>Action</th>
                                </tr>

                            </thead>
                            <tbody>

                                {
                                    callingCat.map((cat, i) => {
                                        let id=cat._id
                                        let handleDeleteWithId=handleCatDelete.bind(null, id)
                                        return (
                                            <tr key={i}>
                                                <td className='border p-2'>{i + 1}</td>

                                                <td className='border p-2'>{cat.catTitle}</td>

                                                <td className='border p-2'>{cat.catDesc}</td>
                                                <td className='border p-2'>
                                                    <form action={handleDeleteWithId} method='POST'>
                                                        <button type="submit" className='text-red-600 font-semibold'><FaTrashAlt /></button>
                                                    </form>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="w-1/2 ml-4">
                        <div className="bg-orange-300 shadow-lg p-2 rounded-md px-4">
                            <CategoryForm />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryPage
