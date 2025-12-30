export interface Nutrition {
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface MenuItem {
  id: number;
  title: string;
  description: string;
  calories: number;
  image: string;
  recipeUrl: string;
  category: 'breakfast' | 'lunch' | 'dinner';
  nutrition?: Nutrition;
  options?: string[];
}

export const menuItems: MenuItem[] = [
  // Breakfast
  { id: 1, title: 'Classic Fried Eggs', description: 'Sunny-side-up eggs with a runny yolk, finished with a bit of fresh herbs.', calories: 200, image: '/images/breakfast/01_classic_fried_eggs_from_upload.webp', recipeUrl: 'https://www.allrecipes.com/recipe/220069/perfect-fried-eggs/', category: 'breakfast', nutrition: { calories: 200, protein: 13, carbs: 1, fat: 15 } },
  { id: 2, title: 'Fluffy Omelette', description: 'Soft omelette with your choice of cheese and veggies.', calories: 250, image: '/images/breakfast/02_fluffy_omelette_plain_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/200349/fluffy-omelette/', category: 'breakfast', nutrition: { calories: 250, protein: 14, carbs: 2, fat: 20 }, options: ['Ham', 'Cheese', 'None'] },
  { id: 3, title: 'Golden Croutons', description: 'Crunchy toasted bread cubes, great on salads or to snack on.', calories: 150, image: '/images/breakfast/03_golden_croutons_rect_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/216756/homemade-croutons/', category: 'breakfast', nutrition: { calories: 150, protein: 3, carbs: 20, fat: 6 } },
  { id: 4, title: 'Crispy Bacon', description: 'Thick-cut bacon, crisp edges and still juicy.', calories: 180, image: '/images/breakfast/04_crispy_bacon_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/158727/bacon-for-the-family-or-a-crowd/', category: 'breakfast', nutrition: { calories: 180, protein: 12, carbs: 0, fat: 14 } },
  { id: 5, title: 'Fluffy Pancakes', description: 'Stack of pancakes with maple syrup and berries.', calories: 300, image: '/images/breakfast/05_fluffy_pancakes_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/21014/good-old-fashioned-pancakes/', category: 'breakfast', nutrition: { calories: 300, protein: 6, carbs: 45, fat: 9 }, options: ['Strawberry jam', 'Rasberry jam', 'None'] },
  { id: 6, title: 'Syrniki', description: 'Cottage cheese pancakes, served with sour cream and jam.', calories: 280, image: '/images/breakfast/06_syrniki_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/258210/russian-syrniki-cottage-cheese-pancakes/', category: 'breakfast', nutrition: { calories: 280, protein: 12, carbs: 28, fat: 12 }, options: ['Strawberry jam', 'Rasberry jam', 'None'] },
  { id: 7, title: 'Creamy Oatmeal', description: 'Warm oats with cinnamon and a touch of brown sugar.', calories: 220, image: '/images/breakfast/07_creamy_oatmeal_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/228654/creamy-steel-cut-oats/', category: 'breakfast', nutrition: { calories: 220, protein: 6, carbs: 40, fat: 4 }, options: ['Strawberry', 'Rasberry', 'Banana', 'Honey', 'None'] },

  // Lunch
  { id: 8, title: 'Classic Caesar Salad', description: 'Romaine, croutons, parmesan, and creamy Caesar dressing.', calories: 350, image: '/images/lunch/08_classic_caesar_salad_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/229063/classic-caesar-salad/', category: 'lunch', nutrition: { calories: 350, protein: 12, carbs: 18, fat: 24 } },
  { id: 9, title: 'Olivier Salad', description: 'Potatoes, carrots, peas, pickles, and mayo (classic CIS style).', calories: 320, image: '/images/lunch/09_olivier_salad_from_upload.webp', recipeUrl: 'https://www.allrecipes.com/recipe/258211/russian-olivier-salad/', category: 'lunch', nutrition: { calories: 320, protein: 8, carbs: 22, fat: 22 } },
  { id: 10, title: 'Tomato & Onion Salad', description: 'Fresh tomatoes and red onion with a light vinaigrette.', calories: 120, image: '/images/lunch/10_tomato_onion_salad_uzbek_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/14133/tomato-and-onion-salad/', category: 'lunch', nutrition: { calories: 120, protein: 2, carbs: 10, fat: 8 } },
  { id: 11, title: 'Tomato & Cucumber Salad', description: 'Tomatoes and cucumbers with herbs and olive oil.', calories: 100, image: '/images/lunch/11_tomato_cucumber_salad_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/14385/cucumber-and-tomato-salad/', category: 'lunch', nutrition: { calories: 100, protein: 2, carbs: 7, fat: 7 } },
  { id: 12, title: 'Steamed Rice', description: 'Simple long-grain rice, fluffy and light.', calories: 200, image: '/images/lunch/12_steamed_rice_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/21438/perfect-steamed-rice/', category: 'lunch', nutrition: { calories: 200, protein: 4, carbs: 44, fat: 1 }, options: ['Add egg', 'Add soy sauce', 'None'] },
  { id: 13, title: 'Buttered Pasta', description: 'Al dente pasta tossed with butter and herbs.', calories: 350, image: '/images/lunch/13_buttered_pasta_from_upload.webp', recipeUrl: 'https://www.allrecipes.com/recipe/21438/perfect-steamed-rice/', category: 'lunch', nutrition: { calories: 350, protein: 10, carbs: 50, fat: 12 } },
  { id: 14, title: 'Crispy Fried Potatoes', description: 'Fried potato slices: crispy outside, soft inside.', calories: 280, image: '/images/lunch/14_crispy_fried_potatoes_slices_from_upload.webp', recipeUrl: 'https://www.allrecipes.com/recipe/222415/crispy-fried-potatoes/', category: 'lunch', nutrition: { calories: 280, protein: 5, carbs: 36, fat: 12 }, options: ['Oven', 'Pan', 'None'] },
  { id: 15, title: 'Creamy Mashed Potatoes', description: 'Smooth mash with butter and cream.', calories: 250, image: '/images/lunch/15_creamy_mashed_potatoes_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/24771/basic-mashed-potatoes/', category: 'lunch', nutrition: { calories: 250, protein: 5, carbs: 35, fat: 10 } },
  { id: 16, title: 'Assorted Pita Bread', description: 'Warm pita with a mix of fillings/spreads (varies).', calories: 200, image: '/images/lunch/16_assorted_pita_bread_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/228430/classic-pita-bread/', category: 'lunch', nutrition: { calories: 200, protein: 7, carbs: 32, fat: 5 } },

  // Dinner
  { id: 17, title: 'Carbonara', description: 'Creamy carbonara-style pasta with egg, cheese, and pancetta.', calories: 600, image: '/images/dinner/17_spaghetti_carbonara_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/245775/spaghetti-carbonara-the-traditional-italian-recipe/', category: 'dinner', nutrition: { calories: 600, protein: 24, carbs: 60, fat: 30 } },
  { id: 18, title: 'Ravioli', description: 'Stuffed ravioli with your choice of filling.', calories: 400, image: '/images/dinner/18_homemade_ravioli_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/213742/homemade-ravioli/', category: 'dinner', nutrition: { calories: 400, protein: 16, carbs: 55, fat: 12 } },
  { id: 19, title: 'Cheese Pasta', description: 'Pasta in a rich, cheesy sauce.', calories: 500, image: '/images/dinner/19_four_cheese_pasta_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/11679/four-cheese-pasta/', category: 'dinner', nutrition: { calories: 500, protein: 18, carbs: 58, fat: 22 }, options: ['Mac & Cheese', 'Cheddar cheese', 'None'] },
  { id: 20, title: 'Sweet and Sour Chicken', description: 'Crispy chicken in a sweet-and-sour glaze.', calories: 450, image: '/images/dinner/20_sweet_and_sour_chicken_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/8537/sweet-and-sour-chicken-i/', category: 'dinner', nutrition: { calories: 450, protein: 28, carbs: 45, fat: 18 } },
  { id: 21, title: 'Salmon', description: 'Salmon fillet with seasonal veg on the side.', calories: 520, image: '/images/dinner/21_grilled_salmon_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/12720/grilled-salmon-i/', category: 'dinner', nutrition: { calories: 520, protein: 35, carbs: 12, fat: 36 }, options: ['Pan fried', 'Oven baked', 'None'] },
  { id: 22, title: 'Burger', description: 'Beef burger with the usual fixings (bun, sauce, toppings).', calories: 700, image: '/images/dinner/22_classic_burger_pixel_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/25473/the-perfect-basic-burger/', category: 'dinner', nutrition: { calories: 700, protein: 35, carbs: 60, fat: 35 } },
  { id: 23, title: 'Ribeye Steak', description: 'Ribeye cooked your way, served with roasted vegetables.', calories: 600, image: '/images/dinner/23_ribeye_steak_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/240835/perfect-ribeye-steak/', category: 'dinner', nutrition: { calories: 600, protein: 45, carbs: 12, fat: 42 } },
  { id: 24, title: 'Fried Dumplings', description: 'Pan-fried dumplings with a pork-and-veg filling.', calories: 320, image: '/images/dinner/24_fried_dumplings_gyoza_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/228052/pot-stickers/', category: 'dinner', nutrition: { calories: 320, protein: 12, carbs: 34, fat: 15 } },
  { id: 25, title: 'Boiled Dumplings', description: 'Classic boiled dumplings with a savory filling.', calories: 280, image: '/images/dinner/25_boiled_dumplings_pelmeni_bowl_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/228052/pot-stickers/', category: 'dinner', nutrition: { calories: 280, protein: 12, carbs: 40, fat: 8 } },
  { id: 26, title: 'Sausages in Batter', description: 'Sausages in a crispy batter with dipping sauce.', calories: 450, image: '/images/dinner/26_sausages_in_batter_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/22180/battered-sausages/', category: 'dinner', nutrition: { calories: 450, protein: 16, carbs: 38, fat: 25 } },
  { id: 27, title: 'Seafood Pasta', description: 'Mixed seafood pasta in a creamy white wine sauce.', calories: 480, image: '/images/dinner/27_seafood_pasta_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/12891/seafood-pasta/', category: 'dinner', nutrition: { calories: 480, protein: 26, carbs: 55, fat: 17 } },
  { id: 28, title: 'Swedish Meatballs', description: 'Meatballs in creamy gravy with lingonberry jam.', calories: 420, image: '/images/dinner/28_swedish_meatballs_only_bg.webp', recipeUrl: 'https://www.allrecipes.com/recipe/216564/swedish-meatballs-svenska-kottbullar/', category: 'dinner', nutrition: { calories: 420, protein: 21, carbs: 30, fat: 24 } },

  // New Lunch items
  { id: 29, title: 'Lagman (Ugro-Osh)', description: 'Hand-pulled noodles in a rich beef and vegetable broth, Central Asian style.', calories: 420, image: '/images/lunch/ugra_osh.webp', recipeUrl: '#', category: 'lunch', nutrition: { calories: 420, protein: 24, carbs: 60, fat: 12 } },
  { id: 30, title: 'Borsht', description: 'Beetroot soup with cabbage, potatoes, and beef, topped with a dollop of sour cream.', calories: 280, image: '/images/lunch/borsht.webp', recipeUrl: '#', category: 'lunch', nutrition: { calories: 280, protein: 14, carbs: 32, fat: 10 } },
  { id: 31, title: 'Chicken Stock', description: 'Comforting clear chicken broth with aromatic herbs and vegetables.', calories: 150, image: '/images/lunch/chicken-stock.webp', recipeUrl: '#', category: 'lunch', nutrition: { calories: 150, protein: 12, carbs: 4, fat: 8 } },
  { id: 32, title: 'Plov', description: 'Uzbek-style rice pilaf with tender lamb, carrots, onions, and warm spices.', calories: 520, image: '/images/lunch/plov.webp', recipeUrl: '#', category: 'lunch', nutrition: { calories: 520, protein: 24, carbs: 58, fat: 22 } },
  { id: 33, title: 'Garlic Bread', description: 'Toasted bread with garlic butter and herbs, crisp on the outside and soft inside.', calories: 260, image: '/images/lunch/garlic_bread.webp', recipeUrl: '#', category: 'lunch', nutrition: { calories: 260, protein: 7, carbs: 34, fat: 10 } },
  { id: 34, title: 'Chicken Skewers', description: 'Juicy marinated chicken skewers grilled with peppers and onions.', calories: 380, image: '/images/lunch/chicken_skewers.webp', recipeUrl: '#', category: 'lunch', nutrition: { calories: 380, protein: 36, carbs: 10, fat: 22 } },

  // New Dinner items
  { id: 35, title: 'Spaghetti Bolognese', description: 'Classic Italian pasta with slow-cooked beef and tomato ragù.', calories: 560, image: '/images/dinner/bolognese.webp', recipeUrl: '#', category: 'dinner', nutrition: { calories: 560, protein: 28, carbs: 62, fat: 22 } },
  { id: 36, title: 'Tempura Shrimps', description: 'Lightly battered shrimp, fried until crisp and served with dipping sauce.', calories: 420, image: '/images/dinner/tempura-shrimps.webp', recipeUrl: '#', category: 'dinner', nutrition: { calories: 420, protein: 24, carbs: 32, fat: 22 } },
  { id: 37, title: 'Sushi Assortment', description: 'A selection of nigiri and maki rolls with fresh fish and rice.', calories: 380, image: '/images/dinner/sushi.webp', recipeUrl: '#', category: 'dinner', nutrition: { calories: 380, protein: 22, carbs: 52, fat: 8 } },
  { id: 38, title: 'Pizza Margherita', description: 'Neapolitan-style pizza with tomato, mozzarella, basil, and olive oil.', calories: 620, image: '/images/dinner/pizza_margherita.webp', recipeUrl: '#', category: 'dinner', nutrition: { calories: 620, protein: 26, carbs: 74, fat: 24 } },
  { id: 39, title: 'Pizza Pepperoni', description: 'Crisp pizza topped with tomato sauce, mozzarella, and spicy pepperoni.', calories: 690, image: '/images/dinner/pizza_pepperoni.webp', recipeUrl: '#', category: 'dinner', nutrition: { calories: 690, protein: 30, carbs: 70, fat: 32 } },
];