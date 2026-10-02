// src/pages/Menu.jsx

import React from "react";
import "./Menu.css";

const menuItems = [
  { id: 1, name: "Truffle Burger", desc: "Prime beef, black truffle aioli, aged cheddar", price: "$18", img: "/images/truffle-burger.jpg" },
  { id: 2, name: "Margherita Pizza", desc: "San Marzano tomatoes, fresh mozzarella, basil", price: "$15", img: "/images/margherita-pizza.jpg" },
  { id: 3, name: "Caesar Salad", desc: "Crisp romaine, parmesan shavings, garlic croutons", price: "$12", img: "/images/caesar-salad.jpg" },
  { id: 4, name: "Grilled Salmon", desc: "Fresh Atlantic salmon, lemon butter sauce", price: "$22", img: "/images/grilled-salmon.jpg" },
  { id: 5, name: "Lobster Bisque", desc: "Creamy lobster soup with cognac", price: "$16", img: "/images/lobster-bisque.jpg" },
  { id: 6, name: "Ribeye Steak", desc: "Juicy ribeye, garlic herb butter", price: "$28", img: "/images/ribeye-steak.jpg" },
  { id: 7, name: "Penne Alfredo", desc: "Creamy parmesan sauce, grilled chicken", price: "$17", img: "/images/penne-alfredo.jpg" },
  { id: 8, name: "Tandoori Chicken", desc: "Spiced yogurt marinade, clay oven roasted", price: "$20", img: "/images/tandoori-chicken.jpg" },
  { id: 9, name: "Sushi Platter", desc: "Assorted nigiri and rolls", price: "$25", img: "/images/sushi-platter.jpg" },
  { id: 10, name: "Greek Salad", desc: "Feta, olives, cucumber, tomato", price: "$13", img: "/images/greek-salad.jpg" },
  { id: 11, name: "BBQ Ribs", desc: "Slow-cooked pork ribs, smoky BBQ sauce", price: "$24", img: "/images/bbq-ribs.jpg" },
  { id: 12, name: "Butter Chicken", desc: "Creamy tomato curry, naan bread", price: "$18", img: "/images/butter-chicken.jpg" },
  { id: 13, name: "Pad Thai", desc: "Rice noodles, shrimp, peanuts", price: "$16", img: "/images/pad-thai.jpg" },
  { id: 14, name: "Falafel Wrap", desc: "Chickpea fritters, tahini sauce", price: "$12", img: "/images/falafel-wrap.jpg" },
  { id: 15, name: "Shawarma Plate", desc: "Marinated beef, garlic sauce, pita", price: "$15", img: "/images/shawarma.jpg" },
  { id: 16, name: "Veggie Burger", desc: "Grilled veggie patty, avocado, sprouts", price: "$14", img: "/images/veggie-burger.jpg" },
  { id: 17, name: "Chicken Biryani", desc: "Fragrant basmati rice, spiced chicken", price: "$19", img: "/images/chicken-biryani.jpg" },
  { id: 18, name: "French Onion Soup", desc: "Caramelized onions, melted gruyere", price: "$11", img: "/images/french-onion-soup.jpg" },
  { id: 19, name: "Chocolate Lava Cake", desc: "Warm chocolate cake, molten center", price: "$10", img: "/images/lava-cake.jpg" },
  { id: 20, name: "Cheesecake", desc: "Classic New York style cheesecake", price: "$9", img: "/images/cheesecake.jpg" },
];

function Menu() {
  return (
    <section className="menu-page">
      <h1>🍷 Our Signature Menu</h1>

      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.img} alt={item.name} />

            <h3>{item.name}</h3>

            <p>{item.desc}</p>

            <p className="price">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;