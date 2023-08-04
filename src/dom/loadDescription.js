import { fetchCategoryDescriptions } from "../utils/fetchingData";

async function createCategoryDescriptions(category) {
  const descriptionsArr = await fetchCategoryDescriptions();
  const categoryDescriptionEl = document.querySelector(
    ".main-category-description"
  );
  const description = descriptionsArr[0][category];
  categoryDescriptionEl.textContent = description;
}

export default createCategoryDescriptions;