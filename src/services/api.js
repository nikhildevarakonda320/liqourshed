import axios from 'axios';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

// Popular liquors to display as "products"
const POPULAR_LIQUORS = [
  "Vodka", "Gin", "Rum", "Tequila", "Whiskey", "Scotch", 
  "Bourbon", "Brandy", "Cognac", "Vermouth", "Champagne", 
  "Red Wine", "White Wine", "Beer", "Cider", "Sake"
];

export const getLiquors = async () => {
  // Simulating fetching a curated list of liquors
  // In a real app, this might come from a database
  // Here we construct objects compatible with our display
  
  return POPULAR_LIQUORS.map(name => ({
    idStr: name,
    strIngredient: name,
    strDescription: `Premium ${name}`,
    strType: 'Liquor',
    strABV: '40' // Placeholder
  }));
};

export const getCocktailsByLiquor = async (liquorName) => {
  try {
    const response = await axios.get(`${BASE_URL}/filter.php?i=${liquorName}`);
    return response.data.drinks;
  } catch (error) {
    console.error(`Error fetching cocktails for ${liquorName}:`, error);
    return [];
  }
};

export const getLiquorImageUrl = (liquorName) => {
  return `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(liquorName)}.png`;
};
