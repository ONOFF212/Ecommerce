


export function AdminFooter(){
    return(
        <div>
            <footer className="text-mono font-bold text-sm text-center">
                <p>© {new Date().getFullYear()}/{ new Date().getMonth()+1}/{new Date().getDate()} </p>
                    <h4>
                        Shopify Admin Panel Admin support · Privacy · Help
                    </h4>
            </footer>
        </div>
    );
};