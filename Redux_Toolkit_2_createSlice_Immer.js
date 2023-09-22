import { createSlice } from '@reduxjs/toolkit';

/*
	IMPORTANT:
	==========
	One of the most crucial rules for Redux reducers is to avoid changing the state directly. This means that we need to make copies of each level of nesting to be updated. 
	We usually achieve this by using JavaScript’s array and object spread operators, as well as other functions that create copies of the original values.
	
	=>	Redux Toolkit has a solution to this problem: Called "Immer"! createSlice() uses a library called Immer to help avoid this mistake!
		"Immer" is used internally automatically, so there is nothing for you to do on your part to make sure it updates immutably!
		
	You don’t need to learn the "Immer" library. All you do need to know is that createSlice() takes advantage of it, allowing us to safely “mutate” our state.
	
	COMPARE THE CODE BELOW WITH THE CODE IN FILE "Redux_Toolkit_1_createSlice.js"
*/

const options = {
	name: "favoriteRecipes",
	initialState: [],
	reducers: {
		addRecipe: (state, action) => {
			state.push(action.payload);
		},
		removeRecipe: (state, action) => {
			state.filter(recipe => recipe.id !== action.payload.id)
		},
	},
});

export const favoriteRecipesSlice = createSlice(options);