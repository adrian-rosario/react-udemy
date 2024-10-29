import { Link, useParams } from "react-router-dom";
export default function ProductDeatail() {
  const params = useParams();
  const theId = params.id;

  // - building example for dynamic path parameters example
  const EXAMPLE_DATA = [
    { id: "abc1", title: "Product One - Amazing solution!" },
    { id: "abc2", title: "Product Two - Retro nostagia!" },
  ];

  return (
    <>
      <div>
        <h1>Product detail page</h1>
        <p>Show item number: {theId}</p>
        <div>
          <ul>
            {EXAMPLE_DATA.map((item) => {
              return (
                <li>
                  <Link to={`/product-details/${item.id}`}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
