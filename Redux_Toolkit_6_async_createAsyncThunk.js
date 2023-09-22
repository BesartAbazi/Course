import { fetchRecipes } from '../../app/api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const loadRecipes = createAsyncThunk(
	'allRecipes/loadRecipes',
	async (arg, thunkAPI) => {
		const data = await fetchRecipes()
		const json = await data.json()
		return json
	}
)

/*	
	The above call to createAsyncThunk will generate following three action types:
		1.allRecipes/loadRecipes/pending
		2.allRecipes/loadRecipes/fulfilled
		3.allRecipes/loadRecipes/rejected
		
	If you need to access the individual pending/fulfilled/rejected action creators, you can reference them like this:
		loadRecipes.pending
		loadRecipes.fulfilled
		loadRecipes.rejected
*/

export const allRecipesSlice = createSlice({
	name: 'allRecipes',
	initialState: {
		recipes: [],
		isLoading: false,
		hasError: false,
	},
	reducers: {
		addRecipes(state, action) {
			state.recipes = action.payload
		}
	},	
});

export default allRecipesSlice.reducer;
