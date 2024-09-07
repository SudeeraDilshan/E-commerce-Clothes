import React, { useEffect,useState} from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

export const ListProduct = () => {
  const [allproducts,setAllProducts] = useState([]);
  const fetchinfo = async ()=>{
    await fetch('http://localhost:4000/allproducts',
      {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        Accept:'application/json'
      }
    }
  ).then(res=>res.json()).then((data)=>  setAllProducts(data));
  }

  useEffect(()=>{
    fetchinfo();
  },[]);

  const remove_product = async(id)=>{
    await fetch(`http://localhost:4000/removeproduct`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        Accept:'application/json'
      },body:JSON.stringify({id:id})

    })
    await fetchinfo();
    // .then(res=>res.json()).then((data)=>{
    //   data.success?alert("Product Removed Successfully"):alert("Product Not Removed");
    //   fetchinfo();
    // });
  }

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {
          allproducts.map((product,index)=>{
            return(<>
             <div  key={index} className="listproduct-format-main listproduct-format" >
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>{product.old_price}</p>
              <p>{product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{remove_product(product.id)}} className="listproduct-remove-icon" src={cross_icon} alt="" />
             </div>
              <hr />
             </>
            )
          })
        }
      </div>
    </div>
  )
}
 
export default ListProduct
