import HomePageBox from "./homePageBox";
import { ProductType } from "../../types/index";

const HomePageBoxes = (props: { productData: ProductType[] }) => {
  const { productData } = { ...props };

  let NewProduct;

  if (productData !== undefined) {
    NewProduct = productData
      .slice(0, 8)
      .map((item) => (
        <HomePageBox
          key={item._id}
          name={item.name}
          imgUrl={item.imgUrl}
          price={item.price}
          cartImg={item.cartImg}
          style={item.style}
        />
      ));
  }

  return <div className="product-boxes">{NewProduct}</div>;
};

export default HomePageBoxes;
