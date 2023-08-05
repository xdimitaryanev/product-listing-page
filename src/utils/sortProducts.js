export function sortProducts(arr, criteria, order) {
    if (criteria === "price") {
      if (order === "ascending") {
        arr.sort((a, b) => {
          const aPrice = Number(a.price);
          const bPrice = Number(b.price);
          const aDiscount = a.discount ? Number(a.discount) : 0;
          const bDiscount = b.discount ? Number(b.discount) : 0;
  
          return (
            aPrice - (aDiscount * aPrice) / 100 - (bPrice - (bDiscount * bPrice) / 100)
          );
        });
        return arr;
      } else if (order === "descending") {
        arr.sort((a, b) => {
          const aPrice = Number(a.price);
          const bPrice = Number(b.price);
          const aDiscount = a.discount ? Number(a.discount) : 0;
          const bDiscount = b.discount ? Number(b.discount) : 0;
  
          return (
            bPrice - (bDiscount * bPrice) / 100 - (aPrice - (aDiscount * aPrice) / 100)
          );
        });
        return arr;
      }
    } else if (criteria === "name") {
      if (order === "ascending") {
        arr.sort((a, b) => a.name.localeCompare(b.name));
      } else if (order === "descending") {
        arr.sort((a, b) => b.name.localeCompare(a.name));
      }
      return arr;
    }
  }