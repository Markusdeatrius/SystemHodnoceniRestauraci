-- Vložení ukázkových restaurací
INSERT INTO restaurants (name, address) VALUES 
('Pizzeria Italia', 'Hlavní 123, Česká Lípa'),
('Sushi Bar Sakura', 'Nádražní 45, Česká Lípa'),
('Burger King', 'Obchodní 78, Česká Lípa'),
('Restaurace U Medvěda', 'Náměstí 10, Česká Lípa');

-- Vložení ukázkových recenzí
INSERT INTO reviews (restaurant_id, user_name, rating, comment) VALUES 
(1, 'Jan Novák', 5, 'Výborná pizza, doporučuji!'),
(1, 'Petra Svobodová', 4, 'Dobré jídlo, ale dlouhé čekání'),
(2, 'Martin Dvořák', 5, 'Nejlepší sushi ve městě'),
(3, 'Lucie Černá', 3, 'Průměrné burgery'),
(4, 'Tomáš Veselý', 5, 'Skvělá česká kuchyně');
