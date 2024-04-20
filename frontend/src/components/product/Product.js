import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import axios from 'axios';

export default function Product ({product, col}) {
   

    // Function to handle click on the heart icon
    const handleClickHeart = async() => {
        if(!product.wishlist){
           

            try {
            
                await axios.patch(`http://localhost:8000/api/v1/wishlist/${product._id}`);
                
              } catch (error) {
                console.error('Error fetching data:', error);
              }
              }
    }
    return (

        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card p-3 rounded">
                {product.images.length > 0 &&
                <img
                className="card-img-top mx-auto"
                src={product.images[0].image}
                alt={product.name}
                />}
                <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h5>
                <div className="ratings mt-auto">
                    <div className="rating-outer">
                    <div className="rating-inner" style={{width: `${product.ratings/ 5 * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                </div>
                <p className="card-text">${product.price}</p>
                <p style={{ color: product.wishlist ? 'red' : 'black' }} onClick={handleClickHeart}><FaHeart /></p>


                <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
    )
}