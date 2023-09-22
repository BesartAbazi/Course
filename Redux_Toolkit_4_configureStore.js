/*
	configureStore():
	=================
	-	Reducer: 	It combines todosReducer and filtersReducer into the root reducer function, which will handle a root state that looks like {todos, filters}, removing the need to call combineReducers(). 
					This lowers the amount of boilerplate code we need to write.
		
	-	Store: 		It creates a Redux store using that root reducer, removing the need to call createStore()
	- 	Middleware: It automatically adds middleware to check for common mistakes like accidentally mutating the state. In the traditional manual way, we’d need to set this up ourselves.
	-	DevTools: 	It automatically sets up the Redux DevTools Extension connection. In the traditional manual way, we’d also need to set this up ourselves.
*/

// store
// ==================================================================

import { configureStore } from '@reduxjs/toolkit';
 
import favoriteRecipesReducer from '../features/favoriteRecipes/favoriteRecipesSlice.js';
import { searchTermReducer } from '../features/searchTerm/searchTermSlice.js';
import { allRecipesReducer } from '../features/allRecipes/allRecipesSlice.js';

export const store = configureStore({
	reducer: {
		favoriteRecipes: favoriteRecipesReducer,
		searchTerm: searchTermReducer,
		allRecipes: allRecipesReducer
	} 
});




// favoriteRecipesReducer
// ==================================================================
import { createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../searchTerm/searchTermSlice.js';

export const favoriteRecipesSlice = createSlice({
	name: "favoriteRecipes",
	initialState: [],
	reducers: {
		addRecipe: (state, action) => {
			state.push(action.payload);
		},
		removeRecipe: (state, action) => {
			return state.filter(recipe => recipe.id !== action.payload.id)
		},
	},
});

export const {
	 addRecipe,
	 removeRecipe,
} = favoriteRecipesSlice.actions;

export default favoriteRecipesSlice.reducer;	// -> Store import: import favoriteRecipesReducer from '../features/favoriteRecipes/favoriteRecipesSlice.js';


// Selectors
export const selectFavoriteRecipes = (state) => state.favoriteRecipes;

export const selectFilteredFavoriteRecipes = (state) => {
	const favoriteRecipes = selectFavoriteRecipes(state);
	const searchTerm = selectSearchTerm(state);

	return favoriteRecipes.filter((recipe) =>
		recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
};


// searchTermReducer
// ==================================================================
const initialState = ''

export const searchTermReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'searchTerm/setSearchTerm':
			return action.payload;
		case 'searchTerm/clearSearchTerm':
			return '';
		default:
			return state;
	}
}

export function setSearchTerm(term) {
	return {
		type: 'searchTerm/setSearchTerm',
		payload: term
	}
}

export function clearSearchTerm() {
	return {
		type: 'searchTerm/clearSearchTerm'
	}
}

export const selectSearchTerm = (state) => state.searchTerm;


// allRecipesReducer
// ==================================================================
import allRecipesData from '../../data.js'
import { selectSearchTerm } from '../searchTerm/searchTermSlice.js';

export const loadData = () => {
	return {
		type: 'allRecipes/loadData',
		payload: allRecipesData
	}
}

const initialState = [];
export const allRecipesReducer = (allRecipes = initialState, action) => {
	switch (action.type) {
		case 'allRecipes/loadData':
			return action.payload;
		case 'favoriteRecipes/addRecipe':
			return allRecipes.filter(recipe => recipe.id !== action.payload.id);
		case 'favoriteRecipes/removeRecipe':
			return [...allRecipes, action.payload]
		default:
			return allRecipes;
	}
}

export const selectAllRecipes = (state) => state.allRecipes;

export const selectFilteredAllRecipes = (state) => {
	const allRecipes = selectAllRecipes(state);
	const searchTerm = selectSearchTerm(state);

	return allRecipes.filter((recipe) =>
		recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
};




// React components
// =======================================================================================


// index.js
// =================
import React from 'react'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'

import { App } from './app/App.js';
import { store } from './app/store.js';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
)


// App.js
// =================
import React from 'react';

import { AllRecipes } from '../features/allRecipes/AllRecipes.js';
import { SearchTerm } from '../features/searchTerm/SearchTerm.js';
import { FavoriteRecipes } from '../features/favoriteRecipes/FavoriteRecipes.js';

export function App() {
	return (
		<main>
			<section>
				<SearchTerm />
			</section>
			<section>
				<h2>Favorite Recipes</h2>
				<FavoriteRecipes />
			</section>
			<hr />
			<section>
				<h2>All Recipes</h2>
				<AllRecipes />
			</section>
		</main>
	)
}


// AllRecipes.js
// =================
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addRecipe } from '../favoriteRecipes/favoriteRecipesSlice.js';
import { loadData, selectFilteredAllRecipes } from './allRecipesSlice.js';
import FavoriteButton from "../../components/FavoriteButton";
import Recipe from "../../components/Recipe";

const favoriteIconURL = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/favorite.svg';

export const AllRecipes = () => {
	const allRecipes = useSelector(selectFilteredAllRecipes);
	const dispatch = useDispatch();

	const onFirstRender = () => {
		dispatch(loadData());
	}
	useEffect(onFirstRender, []);
	
	const onAddRecipeHandler = (recipe) => {
		dispatch(addRecipe(recipe));
	};

	return (
		<div className="recipes-container">
			{allRecipes.map((recipe) => (
				<Recipe recipe={recipe} key={recipe.id}>
					<FavoriteButton
						onClickHandler={() => onAddRecipeHandler(recipe)}
						icon={favoriteIconURL}
					>
						Add to Favorites
					</FavoriteButton>
				</Recipe>
			))}
		</div>
	);
};


// FavoriteSlice.js
// =================
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { removeRecipe, selectFilteredFavoriteRecipes } from './favoriteRecipesSlice.js';
import FavoriteButton from "../../components/FavoriteButton";
import Recipe from "../../components/Recipe";
const unfavoriteIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/unfavorite.svg';

export const FavoriteRecipes = () =>{
	const favoriteRecipes = useSelector(selectFilteredFavoriteRecipes);
	const dispatch = useDispatch();

	const onRemoveRecipeHandler = (recipe) => {
		dispatch(removeRecipe(recipe));
	};

	return (
		<div className="recipes-container">
			{favoriteRecipes.map(createRecipeComponent)}
		</div>
	);

	// Helper Function
	function createRecipeComponent(recipe) {
		return (
			<Recipe recipe={recipe} key={recipe.id}>
				<FavoriteButton
					onClickHandler={() => onRemoveRecipeHandler(recipe)}
					icon={unfavoriteIconUrl}
				>
					Remove Favorite
				</FavoriteButton>
			</Recipe>
		)
	} 
};


// SearchTerm.js
// =================
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSearchTerm, clearSearchTerm, selectSearchTerm } from './searchTermSlice.js';

const searchIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/search.svg';
const clearIconUrl = 'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/clear.svg';


export const SearchTerm = () => {
	const searchTerm = useSelector(selectSearchTerm);
	const dispatch = useDispatch();

	const onSearchTermChangeHandler = (e) => {
		const userInput = e.target.value;
		dispatch(setSearchTerm(userInput));
	};
	
	const onClearSearchTermHandler = () => {
		dispatch(clearSearchTerm());
	};

	return (
		<div id="search-container">
			<img id="search-icon" alt="" src={searchIconUrl} />
			<input
				id="search"
				type="text"
				value={searchTerm}
				onChange={onSearchTermChangeHandler}
				placeholder="Search recipes"
			/>
			{searchTerm.length > 0 && (
				<button
					onClick={onClearSearchTermHandler}
					type="button"
					id="search-clear-button"
				>
					<img src={clearIconUrl} alt="" />
				</button>
			)}
		</div>
	);
};


// Recipe.js
// =================
import React from "react";

export default function Recipe({ recipe, children }) {
	return (
		<div key={recipe.id} className="recipe" tabIndex={0}>
			<span className="recipe-container">
				<h3 className="recipe-name">{recipe.name}</h3>
				<div className="image-container">
					<img src={recipe.img} alt="" className="recipe-image" />
				</div>
			</span>
			{children}
		</div>
	);
}