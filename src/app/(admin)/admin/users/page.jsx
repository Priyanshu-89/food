import { handleBookDelete } from "@/app/action";
import Dbconnect from "@/app/db/Connect";

import User from "@/app/models/User";
import Image from "next/image";
import Link from "next/link";


const FoodShowPage = async () => {
    await Dbconnect();
    let callinguser = await User.find()
    return (
        <div className="container mx-auto">
            <div className="flex flex-1 justify-between">
                <h1 className="text-2xl font-bold mb-4">All Users- {callinguser.length}</h1>

            </div>
            <div className="">
                <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th> */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>


                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {callinguser.map((user, i) => {

                            return (
                                <tr key={i}>
                                    <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>


                                    <td className="px-6 py-4 whitespace-nowrap">{user.contact}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"></td>

                                    
                                   
                                    <td className="px-6 py-4 whitespace-nowrap">

                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default FoodShowPage;


