import Shop__page_filter from "../shop-components/Shop__page-filter";
import "./products.css";

export default function Products(): React.ReactElement {


  return (
    <section className="products__section">
      <h1 className="products__section__title">Product Overview</h1>
      <Shop__page_filter />
    </section>
  );
}
