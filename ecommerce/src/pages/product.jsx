import React ,{useContext} from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrums from '../components/Breadcrums/Breadcrums';
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";


const Product = () => {
    // const [menu,setMenu] = useState("shop");
    const {all_products} = useContext(ShopContext);
    

    const {productId} = useParams();
    
    const product = all_products.find((e)=> e.id===Number(productId));
    return (
        <div>
            <Breadcrums product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox />
            <RelatedProducts />
        </div>
    )
}

export default Product
