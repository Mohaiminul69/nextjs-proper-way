import React from "react";
import Link from "next/link";
import { sanityClient } from "../../../utils/sanity/client";

const Products = ({ products }) => {
  return (
    <div>
      {products.length === 0 ? (
        <h1>Loading</h1>
      ) : (
        products.map((product) => (
          <Link key={product._id} href={`/product/isr/${product.slug}`}>
            <p>{product.title}</p>
          </Link>
        ))
      )}
    </div>
  );
};

export default Products;

export const getStaticProps = async () => {
  const products = await sanityClient.fetch(
    '*[_type=="product" && defined(slug.current) && !(_id in path("drafts.**"))]{..., "slug":slug.current}'
  );
  return {
    props: { products },
  };
};
