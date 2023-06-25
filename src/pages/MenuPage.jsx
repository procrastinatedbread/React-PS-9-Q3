import { useContext, useEffect, useState } from "react";
import { fakeFetch } from "../constants";
import { MenuContext } from "../contexts/MenuContext";

const MenuPage = () => {
  const { cartItems, handleAddCart } = useContext(MenuContext);
  const [menu, setMenu] = useState([]);
  const [isVeg, setIsVeg] = useState(false);
  const [isSpicy, setIsSpicy] = useState(false);
  const [sortedOrder, setSortedOrder] = useState(null);
  const [searchedItem, setSearchedItem] = useState("");
  useEffect(() => {
    const innerFunction = async () => {
      try {
        const { data } = await fakeFetch("https://example.com/api/menu");
        setMenu(data.menu);
      } catch (e) {
        console.error(e);
      }
    };
    innerFunction();
  }, []);
  let filteredItems =
    searchedItem === ""
      ? menu
      : menu.filter((item) =>
          item.name.toLowerCase().includes(searchedItem.toLowerCase())
        );
  const filterVeg = isVeg
    ? filteredItems.filter(({ is_vegetarian }) => is_vegetarian)
    : filteredItems;
  const filterSpicy = isSpicy
    ? filterVeg.filter(({ is_spicy }) => is_spicy)
    : filterVeg;

  const sortItems =
    sortedOrder === null
      ? filterSpicy
      : filterSpicy.sort((a, b) =>
          sortedOrder === "highToLow" ? a.price - b.price : b.price - a.price
        );

  const handleVeg = () => {
    setIsVeg(!isVeg);
  };

  const handleSpicy = () => {
    setIsSpicy(!isSpicy);
  };

  const sortingOrder = (orderType) => {
    setSortedOrder(orderType);
  };
  const searchHandler = (text) => {
    setSearchedItem(text);
  };

  return (
    <>
      <MenuList
        menu={sortItems}
        handleAddCart={handleAddCart}
        cartItems={cartItems}
        handleVeg={handleVeg}
        handleSpicy={handleSpicy}
        sortingOrder={sortingOrder}
        searchHandler={searchHandler}
        // onChangeHandler={onChangeHandler}
      />
    </>
  );
};
function MenuList({
  menu,
  handleAddCart,
  cartItems,
  handleVeg,
  handleSpicy,
  sortingOrder,
  searchHandler
  // onChangeHandler
}) {
  return (
    <div>
      <h3>Filters:</h3>
      <input
        placeholder="search food items"
        onChange={(e) => searchHandler(e.target.value)}
      />

      <input
        type="checkBox"
        value="is_vegetarian"
        onChange={() => handleVeg()}
        //onChange={(e)=>console.log(e.target.checked)}
      />
      <label htmlFor="vegBox">Veg</label>

      <input type="checkBox" value="is_spicy" onChange={() => handleSpicy()} />
      <label htmlFor="spicy">Spicy</label>

      <input
        type="radio"
        name="sort"
        value="lowToHigh"
        onChange={(e) => sortingOrder(e.target.value)}
      />
      <label>sort(price) Low to high</label>

      <input
        type="radio"
        name="sort"
        value="highToLow"
        onChange={(e) => sortingOrder(e.target.value)}
      />
      <label>sort(price) High to low</label>
      <h3>Menu</h3>
      <div style={{ display: "flex" }}>
        {menu.map((item) => {
          const isItemAdded = cartItems.find(
            (cartItem) => cartItem.id === item.id
          );
          return (
            <div key={item.id} style={{ border: "2px solid", margin: "4px" }}>
              <img
                src={item.image}
                alt="food"
                height="220"
                width="120"
                style={{ marginTop: "8px" }}
              />
              <p>{item.name}</p>
              <p>description: {item.description}</p>
              <p>Price: {item.price}</p>
              <p>Time:{item.delivery_time}</p>
              <button onClick={() => handleAddCart(item)}>
                {isItemAdded ? "Go to" : "Add to"} cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MenuPage;
