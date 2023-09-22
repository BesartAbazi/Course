import { createSlice } from '@reduxjs/toolkit';

const options = {
	name: 'favoriteRecipes',
	initialState: [],
	reducers: {
		addRecipe: (state, action) => {
			return [...state, action.payload]
		},
		removeRecipe: (state, action) => {
			return state.filter(recipe => recipe.id !== action.payload.id)
		},
	},
}

export const favoriteRecipesSlice = createSlice(options);