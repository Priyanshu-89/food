import HomeSlider from "./components/HomeSlider";

import Dbconnect from "./db/Connect";
import Category from "./models/Category";

import Food from "./models/Food";
import CategoryBadges from "./components/CategoryBadges";
import FoodCard from "./components/FoodCard";

export default async function Home() {
  await Dbconnect();


  let callingCategory = await Category.find().lean();
  let callingFoods = await Food.find().lean();


  return (
    <>
      <HomeSlider />
      <div className="max-w-7xl mx-auto">
       <CategoryBadges data={callingCategory}/>

        <div className="flex-1 flex">
          <h1 className='text-2xl m-3 text-orange-800 font-semibold'>Latest Books - {callingFoods.length}</h1>
        </div>

        <div className="grid grid-cols-3 gap-4 justify-center flex-wrap max-w-7xl mx-auto">
          {callingFoods.map((food, i) => (
          <FoodCard food={food} key={i}/>
          ))}
        </div>
      </div>
    </>
  );
}
