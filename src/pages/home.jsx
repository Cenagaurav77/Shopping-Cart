import { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";
import ProductTile from "../components/product-Tile";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchListOfProducts() {
    setLoading(true);

    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      const data = res.data;
      console.log(data);

      if (data) {
        setLoading(false);
        setProducts(data);
      }
    } catch (err) {
      console.error("Error fetching in products: ", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListOfProducts();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="min-h-screen w-full flex justify-center items-center">
          <Circles
            height={"120"}
            width={"120"}
            color="rgb(127,29,29)"
            visible={true}
          />
        </div>
      ) : (
        <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto p-3">
          {products && products.length
            ? products.map((productItem) => (
                <ProductTile key={productItem.id} product={productItem} />
              ))
            : null}
        </div>
      )}
    </div>
  );
}
