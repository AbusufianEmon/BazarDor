import React from 'react';
import Image from 'next/image';
import bannerImage from '@/assets/bazar-hero.png';



const date = new Date().toLocaleDateString("bn-BD",
        {
            dateStyle: "full",
        }
        );

const Banner = () => {
    return (
        <div className=" md:flex justify-between items-center bg-white container mx-auto px-4 py-6 gap-4 mt-4 mb-4 rounded-xl">
            <div className="flex flex-col  items-start gap-2">
                <p className="badge rounded-xl bg-green-100 p-4 text-green-600">{date}</p>
                <h2 className="text-3xl font-bold">আজকের বাজারের দাম এক নজরে</h2>
                <p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                <button className="btn btn-success bg-green-600 text-white rounded-lg px-5">সব পণ্য দেখুন</button>
            </div>
            <div>
                <Image
                    src={bannerImage}
                    alt="Banner Image"
                />
            </div>
            
        </div>
    );
};

export default Banner;