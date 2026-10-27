
interface sortProps{
    onSortChange:(filters:{sort:string}) => void;
}

export default function  SortProducts({onSortChange}:sortProps){
    
    const handleSort = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const data = e.target.value;
        let sort;

        if(data === "price-low"){
            sort = "ASC";
        } else if(data === 'price-high' || data === 'name-za') {
            sort = "DESC";
        } else if (data === 'name-az'){
            sort = 'A-Z'
        } else if (data === 'za'){
            sort = 'Z-A'
        }else{
            sort = "";
        }
        onSortChange({sort});
    };

    return(
        <div className="flex justify-end w-full">
                  <div className="  inline-flex font-mono mt-1 text-center rounded-lg outline-none  ">
                      <select id="sort-selection"
                              onChange={handleSort}
                              defaultValue="" 
                              className="appearance-none bg-transparent outline-none text-center cursor-pointer">
                        <option value="">sort ☷ </option>
                        <option value="price-low">
                            Low - High
                        </option>  {/* 1, 2, 3, 4 */}

                        <option value="price-high">
                            High - Low
                        </option>  {/*  9, 8, 7, 2, 1 */}

                        <option value="name-az">
                            A - Z
                        </option>

                        <option value="za">
                            Z - A
                        </option>
                      </select>
                  </div>
              </div>
    );
};