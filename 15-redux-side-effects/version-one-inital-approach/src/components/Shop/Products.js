import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const MOCK_DATA = [
    {
      id: 1,
      title: "Test Item One",
      price: 6,
      totalPrice: 6,
      description: "This is a first product - amazing!",
    },
    {
      id: 2,
      title: "Test Item Two",
      price: 12,
      totalPrice: 12,
      description: "Another item",
    },
  ];

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {MOCK_DATA.map((item) => {
          return (
            <ProductItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              totalPrice={item.price}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;

/*  
        <ProductItem
          title='Test'
          price={6}
          description='This is a first product - amazing!'
        />
*/
