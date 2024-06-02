import React from 'react'
import Link from 'next/link'
const CategoryBadges = ({data}) => {
  return (
    <div>
       <div className="container mx-auto">
          <div className="flex flex-wrap p-4">
            {data.map((cat, i) => (
              <div key={i} className=" p-2">
                <div className="bg-orange-300 text-orange-700 rounded-md px-4 py-2">
                  <Link href={`/categories/${cat._id}`} className="text-lg font-bold hover:text-[#610F03] hover:px-6 hover:py-2 hover:rounded-full hover:bg-[#fedca0] hover:transition-all hover:duration-300">{cat.catTitle}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default CategoryBadges
