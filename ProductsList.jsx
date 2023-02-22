import React, { useState } from 'react'; 

export default function ProductsList() {

    const [products, setProducts] = useState([]);
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(100000)
    const [intervall, setIntervall] = useState(0)

    //getProducts gets called after user sets minimal and maximal price range
    const getProducts = async (minPrice, maxPrice, intervall) => {

      //adapting url with query parameters
      const url = `https://api.ecommerce.com/products?minPrice=${minPrice}&maxPrice=${maxPrice}`
      
      //making the fetch request with the url
      const response = await fetch (url);
      const data = await response.json();
      //setting products array to previous products plus concatenated data from fetch
      setProducts((prevProducts) => prevProducts.concat(data));
      //going to the next range of products by adding 1000 to the intervall
      setIntervall(intervall+1000)
      
      //recursively get the products if the length of the data array is 1000 - if it's less, do it one more time
      do {
      getProducts(minPrice, maxPrice, intervall)
      } while (data.length === 1000)
      
    }

    //user sets price range
    //onClick event to fetch data
    //outputting the data for the user to see 
  return (
    <div>
      <h2>List of Products</h2>
      <p>What is the price range you would like to search?</p>
      <input type="text" placeholder="minimal Price" onChange={() => setMinPrice(e.target.value)}/>
      <input type="text" placeholder="maximal Price" onChange={() => setMaxPrice(e.target.value)}/>
      <button onClick={() => getProducts(minPrice, maxPrice)}>Get Products</button>

      {products && 
        products.map((product, key) => (
          <div key={key} className="product-item">{product}</div>
        ))
      }
    </div>
  )
}

/*expectations this code relies on:
- products are in the same order everytime - to not depend on that, keys should be checked to prevent duplicates
- API must support the query parameters - to not depend on that, the data could be fetched beforehand and possible query parameters set up as variables for the url
- another approach to handle these struggles would be to use pagination for the requests
*/
