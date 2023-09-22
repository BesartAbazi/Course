// Import combineReducers from redux here.
import { createStore, combineReducers } from 'redux';
import allRecipesData from './data.js';

// Action Creators
////////////////////////////////////////

export const addRecipe = (recipe) => {
	return { 
		type: 'favoriteRecipes/addRecipe', 
		payload: recipe 
	};
}

export const removeRecipe = (recipe) => {
	return { 
		type: 'favoriteRecipes/removeRecipe', 
		payload: recipe 
	};
}

export const setSearchTerm = (term) => {
	return {
		type: 'searchTerm/setSearchTerm',
		payload: term
	}
}

export const clearSearchTerm = () => {
	return {
		type: 'searchTerm/clearSearchTerm'
	}; 
}

export const loadData = () => {
	return { 
		type: 'allRecipes/loadData', 
		payload: allRecipesData
	};
}

// Reducers
////////////////////////////////////////

const initialAllRecipes = [];
const allRecipesReducer = (allRecipes = initialAllRecipes, action) => {
	switch(action.type) {
		case 'allRecipes/loadData': 
			return action.payload
		default:
			return allRecipes;
	}
}

const initialSearchTerm = '';
const searchTermReducer = (searchTerm = initialSearchTerm, action) => {
	switch(action.type) {
		case 'searchTerm/setSearchTerm':
			return action.payload
		case 'searchTerm/clearSearchTerm':
			return ''
		default: 
			return searchTerm;
	}
}

const initialFavoriteRecipes = [];
const favoriteRecipesReducer = (favoriteRecipes = initialFavoriteRecipes, action) => {
	switch(action.type) {
		case 'favoriteRecipes/addRecipe':
			return [...favoriteRecipes, action.payload]
		case 'favoriteRecipes/removeRecipe':
			return favoriteRecipes.filter(recipe => {
				return recipe.id !== action.payload.id
			});
		default:
			return favoriteRecipes;
	}
}

// Create your `rootReducer` here using combineReducers().
const reducers = {
	allRecipes: allRecipesReducer,
	favoriteRecipes: favoriteRecipesReducer,
	searchTerm: searchTermReducer
};

const rootReducer = combineReducers(reducers);
export const store = createStore(rootReducer);
