
import Dbconnect from "@/app/db/Connect";
import Order from "@/app/models/Order";



const FoodShowPage = async () => {
    await Dbconnect();
    let callingOrder = await Order.find({"ordered":false}).populate(["userId", "address"])
    return (
        <div className="container mx-auto">
            <div className="flex flex-1 justify-between">
                <h1 className="text-2xl font-bold mb-4">All Orders- {callingOrder.length}</h1>

            </div>
            <div className="">
                <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th> */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>


                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {callingOrder.map((order, i) => {

                            return (
                                <tr key={i}>
                                    <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.userId.name}</td>

                                    <td className="px-6 py-4 whitespace-nowrap">{order.dateOfOrder.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.address.area} ({order.address.city})</td>
                                   
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


