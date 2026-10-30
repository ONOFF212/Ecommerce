
'use client'
import { useState } from "react";


interface categoryProps{
    onFilterChange:(filters:{category:string;
                              minPrice:number;
                              maxPrice:number;
                              sort?:string;
    }) =>void;
}

export default function SideBar({onFilterChange}:categoryProps){
    
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)  =>{
        const {value, checked} = e.target;
        const newCategory = checked ? value :"";
        setCategory(newCategory);
        onFilterChange({category:newCategory,
                        minPrice:minPrice,
                        maxPrice:maxPrice
        });
    };

    const handlePrice = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const price = Number(value);
        console.log(price);

        let newMinPrice = minPrice;
        let newMaxPrice = maxPrice;
        if(name === "minPrice"){
            newMinPrice = price;
            setMinPrice(newMinPrice);
            setMaxPrice(0);
        }else if(name === "maxPrice"){
            newMaxPrice = price;
            setMaxPrice(newMaxPrice);
            setMinPrice(0);
        }
        onFilterChange({category:category,
                        minPrice:newMinPrice,
                        maxPrice:newMaxPrice
        });
    };

    const handleReset = () => {
        setCategory("");
        setMaxPrice(0);
        setMinPrice(0);
        onFilterChange({category:"",
             minPrice:0, maxPrice:0, sort:""
        });
    };

    return(
        <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#DBE1EA]">
                <h2 className="font-bold text-sm">Filters</h2>
                <span> ☷ </span>
            </div>

            <div className="flex pt-4 items-center justify-between">
                <h2 className="font-bold text-sm">Categories</h2>
            </div>

            <div>
                <div>
                    <label className="flex pt-4 mx-4 gap-4">
                        <input type="checkbox"
                               value="Health & Beauty"
                               checked={category === "Health & Beauty"}
                               onChange={(e) => {handleChange(e)}}
                        />
                        <span>Health & Beauty</span>
                    </label>
                </div>
                <div>
                    <label className="flex pt-4 mx-4 gap-4">
                        <input type="checkbox"
                               value="Electronics & Media"
                               checked={category === "Electronics & Media"}
                               onChange={(e) => {handleChange(e)}}
                        />
                        <span>Electronics & Media</span>
                    </label>
                </div>
                <div>
                    <label className="flex pt-4 mx-4 gap-4">
                        <input type="checkbox"
                               value="Fashion & Apparel"
                               checked={category === "Fashion & Apparel"}
                               onChange={(e) => {handleChange(e)}}
                        />
                        <span>Fashion & Apparel</span>
                    </label>
                </div>
                <div>
                    <label className="flex pt-4 pb-4 mx-4 gap-4">
                        <input type="checkbox"
                               value="Home & Lifestyle"
                               checked={category === "Home & Lifestyle"}
                               onChange={(e) => {handleChange(e)}}
                        />
                        <span>Home & LifeStyle</span>
                    </label>
                </div>
            </div>

            <div className="border-t border-[#DBE1EA] pt-6">
                <h2 className="font-bold text-sm">Price Range</h2>

                <div className="flex flex-col pt-4 pb-4 border-b border-[#DBE1EA]">
                    <label htmlFor="minPrice" className="text-center">Min-Price</label>
                    <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        step="50"
                        min="1"
                        value={minPrice || ""}
                        onChange={(e) => {handlePrice(e)}}
                        className="border text-center font-bold rounded-lg outline-none border-[#DBE1EA] p-2 mx-20"
                    />
                    <label htmlFor="maxPrice" className="mt-4 text-center">Max-Price</label>
                    <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        step="100"
                        max="1000"
                        value={maxPrice || ""}
                        onChange={(e) => {handlePrice(e)}}
                        className="border text-center font-bold rounded-lg outline-none border-[#DBE1EA] p-2 mx-20"
                    />
                </div>
            </div>

            <div className="text-center bg-[#4F46E5] text-white font-bold rounded-3xl m-4 p-2 hover:bg-yellow-500 hover:text-black">
                <button
                     type="button"
                     className="font-mono"
                     onClick={handleReset}
                >
                    Reset-Filters
                </button>
            </div>
        </div>
    );
};