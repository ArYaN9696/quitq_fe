import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.imageUrl || '/placeholder.png'}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-truncate">{product.description}</p>
        <p className="card-text">
          <strong>Price:</strong> Rs.{product.price}
        </p>
        <button className="btn btn-primary mt-auto">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
