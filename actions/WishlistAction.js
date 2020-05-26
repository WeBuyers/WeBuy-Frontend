export const IMPORT_WISHLIST = "IMPORT_WISHLIST";
export const IMPORT_PLAN = "IMPORT_PLAN";

export function importWishlist(array) {
    return {
        type: IMPORT_WISHLIST,
        payload: array
    }
}

export function importPlan(array){
    return {
        type: IMPORT_PLAN,
        payload: array
    }
}
