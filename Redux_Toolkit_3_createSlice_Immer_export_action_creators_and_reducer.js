import { createSlice } from '@reduxjs/toolkit';

/*
	actions:
	========
	Action creators that correspond to each case reducer function we provide will be automatically generated, so we don’t need to worry about defining those ourselves.
	Once we export the action creators, we can use them to dispatch actions in a structured way throughout our application.
	Theoretically, you could export the entire slice object returned by createSlice(). But, following the Redux community’s “ducks” pattern pattern, we suggest exporting named action creators separately from the reducer
	
	reducer:
	========
	Exporting the reducer from a slice is like giving each part of your app its own special box with instructions on how to handle its data. 
	This box is stored in a central place, the store, where the data management of your app comes together!
*/

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

/*
	favoriteRecipesSlice object look like this:
		{
			name: 'favoriteRecipes',
			reducer: (state, action) => newState,
			actions: {
				addRecipe: (payload) => ({type: 'favoriteRecipes/addRecipe', payload}),
				removeRecipe: (payload) => ({type: 'favoriteRecipes/removeRecipe', payload})
			}
		}
*/


export const { addRecipe, removeRecipe} = favoriteRecipesSlice.actions;
export default favoriteRecipesSlice.reducer;	// -> Store import: import favoriteRecipesReducer from '../features/favoriteRecipes/favoriteRecipesSlice.js';
