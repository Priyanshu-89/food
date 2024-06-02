import { handleBookDelete } from "@/app/action";
import Dbconnect from "@/app/db/Connect";
import Food from "@/app/models/Food";
import Image from "next/image";
import Link from "next/link";


const FoodShowPage = async () => {
    await Dbconnect();
    let callingFood = await Food.find().populate('category').lean()
    return (
        <div className="container mx-auto">
            <div className="flex flex-1 justify-between">
                <h1 className="text-2xl font-bold mb-4">All Foods- {callingFood.length}</h1>
                <Link href={'/admin/foods/insert'} className="text-lg font-bold bg-[#610F03] text-orange-100 px-4 py-2 rounded-md mb-2">Insert Food</Link>
            </div>
            <div className="">
                <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th> */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount Price</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CoverImage</th>
                            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingredients</th> */}
                            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {callingFood.map((food, i) =>
                       
                        {
                            let id =food._id
                            let handleBookDeletewithId=handleBookDelete.bind(null, id)
                        return(
                            <tr key={i}>
                                <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{food.title}</td>
                                {/* <td className="px-6 py-4 whitespace-nowrap">{food.description}</td> */}
                                <td className="px-6 py-4 whitespace-nowrap">{food.category ? food.category.catTitle : "N/A"}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{food.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{food.discountPrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Image src={`/images/${food.coverImage}`} width={50} height={50} alt="Loading" />
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap">{food.ingredients}</td> */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <form action={handleBookDeletewithId} method="POST">
                                        <button type="submit" className="text-red-700 font-semibold">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        )})}

                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default FoodShowPage;


