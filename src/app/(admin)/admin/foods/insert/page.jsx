
import InsertForm from "@/app/components/InsertForm";
import Dbconnect from "@/app/db/Connect";
import Category from "@/app/models/Category";
import Link from "next/link";

const FoodInsertPage = async () => {
    await Dbconnect()

    let callingCat = await Category.find().lean()
 return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Insert Food</h1>
                <Link href={'/admin/foods'} className="underline">Go Back</Link>
            </div>
           <InsertForm callingCat={callingCat}/>
        </div>

    );
};

export default FoodInsertPage;
