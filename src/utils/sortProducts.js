export function sortProducts(arr,criteria,order) {

    if (criteria === "price") {
        if (order === "ascending") {
            arr.sort((a,b)=> Number(a.price) - Number(b.price));
            return arr;
        }

        if (order === "descending") {
            arr.sort((a,b)=> Number(b.price) - Number(a.price));
            return arr;
        }
    }

    if (criteria === "name") {
        if (order === "ascending") {
            arr.sort((a,b)=> a.name.localeCompare(b.name));
            return arr;
        }

        if (order === "descending") {
            arr.sort((a,b)=> b.name.localeCompare(a.name));
            return arr;
        } 
    }
}


