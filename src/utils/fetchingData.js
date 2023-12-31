//* FUNCTION fetch category description *//
export async function fetchCategoryDescriptions() {
  try {
    const response = await fetch(`data/descriptions.json`);
    return await response.json();
  } catch (err) {
    console.log("Error fetching categories", err);
    return [];
  }
  }
  
  
//* FUNCTION fetch products *//
export async function fetchProducts(category) {
    try {
      const response = await fetch(`data/${category}.json`);
      return await response.json();
    } catch (err) {
      console.error("Error fetching products:", err);
      return [];
    }
  }

