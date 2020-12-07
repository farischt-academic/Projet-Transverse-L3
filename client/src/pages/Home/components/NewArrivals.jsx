import React, { useState, useEffect } from "react";
import { listPagination, productsTotal } from "../../../api/product";
import ProductCard from "./ProductCard";
import ProductLoading from "./ProductLoading";
import CardColumns from "react-bootstrap/CardColumns";
import { Pagination } from "antd";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [countProducts, setCountProducts] = useState(1);
  const perPage = 3;
  const sort = "createdAt";
  const order = "desc";

  useEffect(() => {
    productsTotal().then((res) => setCountProducts(res.data));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await listPagination(sort, order, page);
      setProducts(response.data);
      setProductsLoading(false);
    } catch (err) {
      setProductsLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h4 className="text-center text-danger font-weight-bold mb-3">
        Nos formations les plus récentes
      </h4>
      <CardColumns className="shadow-lg mb-5 p-2 rounded">
        {productsLoading ? (
          <ProductLoading count={perPage} />
        ) : products.length ? (
          products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })
        ) : (
          <div className="text-center">
            <h5 className="font-weight-bold"> Aucun produit disponible </h5>
          </div>
        )}
      </CardColumns>

      <div className="text-center">
        {" "}
        <Pagination
          current={page}
          total={(countProducts / perPage) * 10}
          onChange={(value) => setPage(value)}
        />
      </div>
    </div>
  );
};

export default NewArrivals;