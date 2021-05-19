export const Item = function({item}) {
  <section>
    <img src={item.image} />
    <div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <h3>{item.price}</h3>
    </div>
  </section>
}