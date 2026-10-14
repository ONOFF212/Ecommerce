

interface productDetail {
        id : number,
        img_url:string,
        name : string,
        stock: string,
        price:string,
        description:string
}

interface productDetailProps {
    product : productDetail;
}


const URL = process.env.NEXT_PUBLIC_API_URL;
export function ProductCard({product}:productDetailProps) {
    return(
        <div className="h-[350px] overflow-hidden rounded-lg border border-slate-900 bg-white shadow-md transition-all duration-300 hover:scale-105">
            <img src={`${URL}/img/${product.img_url}`} alt={product.img_url}  className='h-50 w-full p-4 object-contain' />
            <h3 className='mb-2  px-3 font-semibold text-gray-800'>{product.name}</h3>
            <div className='text-sm font-bold  m-4'>
                <p className="text-black "> {product.description}</p>
                <p className='text-green-500'>Price: {product.price}</p>
                <p className='text-red-600'>Stock: {product.stock}</p>
            </div>
        </div>
    );
};