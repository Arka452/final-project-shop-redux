import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './reducer'

export const store = configureStore({
    reducer:{
        products: productsSlice
    }
})

