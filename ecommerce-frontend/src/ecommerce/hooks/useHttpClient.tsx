import httpClient from "../httpClient"
import { Cart } from "../types"
import { BASE_URLS } from "../utils"

export const useHttpClient = () => {
    return {
        fetchProducts: () => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/api/products`)
        },
        fetchCartItems: () => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/api/cart`)
        },
        getCartItemById: (id: string | undefined) => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/api/cart/${id}`)
        },
        addCartItem: (body: any) => {
            return httpClient.post(`${BASE_URLS.EXPRESS_URL}/api/cart/add`, body)
        },
        fetchWishlistItems: () => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/api/wishlist`)
        },
        addWishlistItem: (body: any) => {
            return httpClient.post(`${BASE_URLS.EXPRESS_URL}/api/wishlist/add`, body)
        },
        checkWishlistItem: (productId: string | undefined) => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/api/wishlist/check?productId=${productId}`,)
        },
        removeWishlistItem: (productId: string) => {
            return httpClient.delete(`${BASE_URLS.EXPRESS_URL}/api/wishlist/remove/${productId}`)
        },
        removeCartItem: (productId: string) => {
            return httpClient.delete(`${BASE_URLS.EXPRESS_URL}/api/cart/remove/${productId}`)
        },
    }
}