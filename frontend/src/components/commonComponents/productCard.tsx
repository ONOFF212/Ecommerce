
interface productDetail {
        id : number,
        imgUrl:string,
        Name : string,
        Stock: string,
        Price:string,
        Description:string
}

interface productDetailProps {
    product : productDetail;
}


const URL = process.env.NEXT_PUBLIC_API_URL;
export function ProductCard({product}:productDetailProps) {
    return(
        <div className="h-[350px] overflow-hidden rounded-lg border border-slate-900 bg-white shadow-md transition-all duration-300 hover:scale-105">
            <img src={`${URL}/img/${product.imgUrl}`} alt={product.imgUrl}  className='h-50 w-full p-4 object-contain' />
            <h3 className='mb-2  px-3 font-semibold text-gray-800'>{product.Name}</h3>
            <div className='text-sm font-bold  m-4'>
                <p className="text-black "> {product.Description}</p>
                <p className='text-green-500'>Price: {product.Price}</p>
                <p className='text-red-600'>Stock: {product.Stock}</p>
            </div>
        </div>
    );
};