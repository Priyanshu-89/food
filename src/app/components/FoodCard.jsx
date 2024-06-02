import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MdCurrencyRupee } from "react-icons/md";
const FoodCard = ({food}) => {
  return (
    <>
        <div  className="flex-1 bg-orange-200 p-6 shadow-md rounded-md m-4">
              <Image src={`/images/${food.coverImage}`} width={300} height={300} alt='loading' className='w-full h-52 rounded-md' />
              <div className="flex flex-col gap-2 mt-2">
                <h2 className='text-xl font-semibold text-orange-800 capitalize'>{food.title}</h2>
                <p className='text-sm font-semibold text-orange-700 flex items-center'>Price:<MdCurrencyRupee size={15} />{food.discountPrice}/- <del className='text-orange-400 flex items-center'><MdCurrencyRupee size={15} />{food.price}/-</del></p>
                <Link href={`/view/${food._id}`} className='bg-orange-800 text-orange-200 text-center py-2 rounded-md shadow-md hover:bg-orange-700 hover:text-orange-300 hover:transition-all hover:duration-300'>Know More</Link>
              </div>
            </div>
    </>
  )
}

export default FoodCard
