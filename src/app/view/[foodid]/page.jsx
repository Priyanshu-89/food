
import Food from '@/app/models/Food'

import FoodCard from '@/app/components/FoodCard';
import ViewFood from '@/app/components/ViewFood';

const ViewPage = async ({ params }) => {
    let { foodid } = params;
    const food = await Food.findById(foodid).lean()
    const relatedFood = await Food.find({ "_id": { $ne: foodid } }).lean()
  
    return (

        <>


            <div className="flex flex-col md:flex-row max-w-5xl mx-auto  bg-orange-200 p-6 shadow-md rounded-md m-4">
              <ViewFood food={food}/>
            </div>
            <div className='flex items-center justify-start max-w-5xl mx-auto'>
                <h1 className='text-2xl m-3 text-orange-800 font-semibold'>You may also Like:</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-6xl mx-auto">
                
                    {relatedFood.map((food, i) => <FoodCard food={food} key={i} />)}
                </div>
        </>
    )
}

export default ViewPage
