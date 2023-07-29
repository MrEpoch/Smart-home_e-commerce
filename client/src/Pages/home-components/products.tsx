export default function Products(): React.ReactElement {
  const [search_shown, setSearch_shown] = useState<boolean>(false);

  return (
    <section className="products__section">
      <h1 className="products__section__title">Product Overview</h1>
      <div className="products__section__filters">
        <div className="products__section__filters__categories">
          <h2 className="products__section__filters__categories__all">
            All products
          </h2>
          <h2 className="products__section__filters__categories__locks">
            Smart Locks
          </h2>
          <h2 className="products__section__filters__categories__cameras">
            Security cameras
          </h2>
          <h2 className="products__section__filters__categories__doorbells">
            Bluetooth doorbells
          </h2>
          <h2 className="products__section__filters__categories__lights">
            Controllable Lights
          </h2>
          <h2 className="products__section__filters__categories__thermostats">
            Wifi Thermostats
          </h2>
        </div>
        <div className="products__section__filters__sort">
          <button className="products__section__filters__sort__filter">
            Filter by
          </button>
        </div>
      </div>
    </section>
  );
}
