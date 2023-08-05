Product Listing Page is a dynamic web application crafted using Vanilla JavaScript, HTML, CSS, and the Vite build tool. The project presents assortment of beauty products divided into four distinct categories. These categories are fetched from JSON files, ensuring users have seamless access to a wide variety of products. The application offers a user-friendly interface, filtering and sorting, all designed to enhance user experience.
There were several challenges encountered while building this app like UX and Data handling, but the most significant one was definitely the implementation of the filtering system.



Key Functionality and Implementation:

* Styling and Layout: The application utilizes CSS stylesheets, including normalization and custom styling, to achieve a consistent and visually appealing layout across different devices.

* Navigation Menus: The code includes functions to create navigation menus for both desktop and mobile views. These menus are dynamically generated based on an array of categories, and event listeners are added to handle user interactions.

* Product Loading and Display: The loadProductsByCategory function fetches product data based on the selected category using the fetchProducts utility. Products are displayed in a grid layout, with each product's image, name, description, price, and rating.

* Product Filtering: The createFilterListForCategory function generates a filter list for the selected category. Users can filter products by brand and price range using checkboxes and input fields. The "Filter" button triggers the application of selected filters, updating the displayed products accordingly. Within the createFilterListForCategory function, the minimum and maximum prices for the products in the selected category are determined using the minProductPrice and maxProductPrice functions. These functions analyze the product data to find the minimum and maximum prices, which are then used to set the initial values and ranges for the price input fields in the filter section.

* Product Sorting: The dropdown element (dropDownEl) enables users to sort products based on different criteria, such as price and name. When the sorting option is changed, the displayed products are reorganized using the sortProducts utility.

* "Load More" Button: The application implements a "Load More" button that dynamically loads additional products onto the page as the user clicks on it. Pagination is achieved by adjusting the startIndex and endIndex variables to control the range of products displayed.
When the "Load More" button is clicked, the script checks if there are more products to load. If there are, the startIndex and endIndex are adjusted accordingly, and additional products are loaded using the createProductElement function.
