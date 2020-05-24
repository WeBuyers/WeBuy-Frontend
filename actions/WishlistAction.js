export const IMPORT_WISHLIST = "IMPORT_WISHLIST";

export function importWishlist(array) {
    return {
        type: IMPORT_WISHLIST,
        payload: array
    }
}