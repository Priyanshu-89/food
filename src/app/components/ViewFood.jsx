"use client"
import Image from 'next/image';
import Link from 'next/link';
import { MdCurrencyRupee } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ViewFood = ({ food }) => {
    let router=useRouter();
    const handleAddToCart = async () => {
        let data = await fetch(`http://localhost:3000/api/cart/add/${food._id}`)
        let res = await data.json();
        if (res.success) {
            toast.success(res.message)
            router.push("/cart")
        }
    }
    return (
        <div>
            <Image src={`/images/${food.coverImage}`} width={300} height={300} alt='Loading' className='w-full rounded-md' />
            <div className="flex flex-col gap-3 mt-2 min-w-[60%] ml-4" >
                <h2 className='text-xl font-semibold text-orange-800 capitalize'>{food.title}</h2>
                <p className='text-sm font-semibold text-orange-700 flex items-center'>Price:<MdCurrencyRupee size={15} />{food.discountPrice}/- <del className='text-orange-400 flex items-center'><MdCurrencyRupee size={15} />{food.price}/-</del></p>
                <p className='text-sm text-justify text-orange-800'>Description:- {food.description}</p>
                <p className='text-sm text-orange-700 font-semibold'>Ingredients:- {food.ingredients}</p>

                <div className='flex justify-around gap-x-6 items-center'>
                    <button onClick={handleAddToCart} type='button' className='flex items-center gap-1 bg-orange-800 text-orange-200 text-center py-2 px-8 rounded-md shadow-md hover:bg-[#A3775D] hover:text-orange-200 hover:transition-all hover:duration-300'>Add to Cart<FaCartPlus size={20} /></button>
                    <Link href={'#'} className='flex items-center gap-1 bg-orange-800 text-orange-200 text-center py-2 px-8 rounded-md shadow-md hover:bg-[#A3775D] hover:text-orange-200 hover:transition-all hover:duration-300'>Buy Now<RiArrowRightSLine size={20} /></Link>
                </div>


            </div>

        </div>
    )
}

export default ViewFood
