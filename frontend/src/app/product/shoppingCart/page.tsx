


export default function ShoppingCartProducts(){
    return (
        <div className="grid justify-center items-center min-h-[100vh] p-30 bg-[#f3f6fb] ">
            <div className="w-full min-w-0 border-1 p-2 px-4 py-2 bg-[#ffff] rounded-lg border-slate-50">
                <div className="font-mono text-2xl border-b pb-2 border-slate-300">
                    <h2>ShopEase</h2>
                </div>

                <div className="font-mono ">
                    <h1 className="text-2xl mt-4">Shopping Cart</h1>
                    <p>Review your items before checkout</p>
                </div>

                <div className="felx border min-h-50">
                    <p> Product detail like img, name, price, no.of items total price</p>
                </div>

                <div className="font-mono border-b pb-2 border-slate-300 ">
                    <p>Subtotal 
                        <span>Rs</span>
                    </p>
                    <p>Shipping</p>
                </div>

                <div className="mt-4">
                    <p className="text-xl">Total </p>
                    <button type="button" 
                            className="border w-full rounded-lg bg-blue-500 text-white p-2 font-mono text-sm hover:shadow-md outline-none hover:text-xl"
                    >
                        proceed to Checkout
                    </button>
                </div>

                <div className="font-mono text-xs text-center mt-1 hover:text-sm">
                    <p>Continue Shopping</p>
                </div>
            </div>
        </div>
    );
};