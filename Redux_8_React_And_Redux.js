// Filesystem
// =========================================================
src/
|-- index.js
|-- app/
    |-- App.js (+)
    |-- store.js
|-- components/
    |-- FavoriteButton.js (+)
    |-- Recipe.js (+)
|-- features/
    |-- allRecipes/
        |-- AllRecipes.js (+)
        |-- allRecipesSlice.js
    |-- favoriteRecipes/
        |-- FavoriteRecipes.js (+)
        |-- favoriteRecipesSlice.js
    |-- searchTerm/
        |-- SearchTerm.js (+)
        |-- searchTermSlice.js




// store.js
// =========================================================
import { createStore, combineReducers } from 'redux';
import { favoriteRecipesReducer } from '../features/favoriteRecipes/favoriteRecipesSlice.js';
import { searchTermReducer } from '../features/searchTerm/searchTermSlice.js';
import { allRecipesReducer } from '../features/allRecipes/allRecipesSlice.js';

export const store = createStore(combineReducers({
	favoriteRecipes: favoriteRecipesReducer,
	searchTerm: searchTermReducer,
	allRecipes: allRecipesReducer
}));




// Index.js
// =========================================================
import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/App.js';
// Import 'store' here.
import { store } from './app/store.js';

const root = createRoot(document.getElementById('root'));
const render = () => {
	// Pass `state` and `dispatch` props to <App />
	root.render(
		<App 
		state = {store.getState()}
		dispatch = {store.dispatch}
		/>,
	)
}
render();
// Subscribe render to changes to the `store`
store.subscribe(render);




// App.js
// =========================================================
import React from 'react';

import { AllRecipes } from '../features/allRecipes/AllRecipes.js';
import { SearchTerm } from '../features/searchTerm/SearchTerm.js';

export function App(props) {
	const {state, dispatch} = props;

	const visibleAllRecipes = getFilteredRecipes(state.allRecipes, state.searchTerm);
	const visibleFavoriteRecipes = getFilteredRecipes(state.favoriteRecipes, state.searchTerm);

// You'll add the <FavoriteRecipes /> component in the next exercise!
	return (
		<main>
			<section>
				<SearchTerm
					searchTerm={state.searchTerm}
					dispatch={dispatch}
				/>
			</section>
			<section>
				<h2>Favorite Recipes</h2>
				
			</section>
			<hr />
			<section>
				<h2>All Recipes</h2>
				<AllRecipes
					allRecipes={visibleAllRecipes} 
					dispatch={dispatch}
				/>
			</section>
		</main>
	)
}

/* Utility Helpers */

function getFilteredRecipes(recipes, searchTerm) {
	return recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
}