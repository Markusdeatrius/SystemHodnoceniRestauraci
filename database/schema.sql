CREATE TABLE IF NOT EXISTS restaurants ( 
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL, 
  address TEXT NOT NULL
);

-- Vytvoření tabulky "reviews"
CREATE TABLE IF NOT EXISTS reviews ( 
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  restaurant_id INTEGER NOT NULL,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (id)
);