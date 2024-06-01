import React from 'react'
import ProductDetailComponent from '../../components/ProductDetail/ProductDetailComponent'

const ProductDetailPage = () => {
  return (
    <>
      <h5 style={{fontSize: '14px',padding: '0 120px'}}>Home Page</h5>
      <div style={{padding: '20px 120px',background: '#efefef', height: '1000px'}}>
        <ProductDetailComponent />
      </div>
    </>
  )
}

export default ProductDetailPage