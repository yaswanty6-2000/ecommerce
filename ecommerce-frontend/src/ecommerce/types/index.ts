export type Product = {
    _id: string,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    createdAt: Date
}

export type WishList = {
    products: Product[]
}

export type Cart = {
    productId: string,
    quantity: string
}