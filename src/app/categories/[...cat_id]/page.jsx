

import Dbconnect from "@/app/db/Connect";
import Category from "@/app/models/Category";
import Food from "@/app/models/Food";
import CategoryBadges from "@/app/components/CategoryBadges";
import FoodCard from "@/app/components/FoodCard";

export default async function Home({ params }) {
  await Dbconnect();
 
  const { cat_id } = params;
 
  let callingCategory = await Category.find().lean();
  let getCurrentCategory=await Category.findById(cat_id).lean()
  let callingFoods = await Food.find({category: cat_id}).lean();
 

  return (
    <>
     
      <div className="max-w-7xl mx-auto">
       <CategoryBadges data={callingCategory}/>

        <div className="flex-1 flex-col flex">
          <h1 className='text-2xl m-3 text-orange-800 font-semibold'>{getCurrentCategory.catTitle} - {callingFoods.length}</h1>
          <h1 className='text-sm text-[#efaa32] font-medium'>{getCurrentCategory.catDesc}</h1>
        </div>

        <div className="grid grid-cols-3 gap-4 justify-center flex-wrap max-w-7xl mx-auto">
          {callingFoods.map((food, i) => 
          <FoodCard food={food} key={i}/>
)}
        </div>
      </div>
    </>
  );
}
