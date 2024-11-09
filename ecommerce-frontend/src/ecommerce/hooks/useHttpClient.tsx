import httpClient from "../httpClient"
import { BASE_URLS } from "../utils"

export const useHttpClient = () => {
    const authToken = localStorage.getItem('auth_token') || '';
    const options = {
        headers: {
            'Authorization': `Bearer ${authToken}` || ""
        }
    }
    return {
        login: (body: any) => {
            return httpClient.post(`${BASE_URLS.EXPRESS_URL}/api/auth/login`, body)
        },
        signup: (body: any) => {
            return httpClient.post(`${BASE_URLS.EXPRESS_URL}/api/auth/signup`, body)
        },
        fetchProducts: () => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/api/products`, options)
        },
        fetchCartItems: () => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/api/cart`, options)
        },
        getCartItemById: (id: string | undefined) => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/api/cart/${id}`, options)
        },
        addCartItem: (body: any) => {
            return httpClient.post(`${BASE_URLS.EXPRESS_URL}/api/cart/add`, body, options)
        },
        fetchWishlistItems: () => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/api/wishlist`, options)
        },
        addWishlistItem: (body: any) => {
            return httpClient.post(`${BASE_URLS.EXPRESS_URL}/api/wishlist/add`, body, options)
        },
        checkWishlistItem: (productId: string | undefined) => {
            return httpClient.get(`${BASE_URLS.EXPRESS_URL}/api/wishlist/check?productId=${productId}`, options)
        },
        removeWishlistItem: (productId: string) => {
            return httpClient.delete(`${BASE_URLS.EXPRESS_URL}/api/wishlist/remove/${productId}`, options)
        },
        removeCartItem: (productId: string) => {
            return httpClient.delete(`${BASE_URLS.EXPRESS_URL}/api/cart/remove/${productId}`, options)
        },
    }
}