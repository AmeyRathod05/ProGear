import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice.js";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url : PRODUCTS_URL,

            }),
            keepUnusedDataFor : 5,
        }),
        getProductDetails : builder.query({
            query: (productId) => ({
                    url : `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor : 5,

        }),
        getTopProducts: builder.query({
            query :() => ({
                url : `${PRODUCTS_URL}/top`,

            }),
            keepUnusedDataFor : 5,
        })

    })
});

export const { useGetProductsQuery, useGetProductDetailsQuery ,useGetTopProductsQuery } = productApiSlice;