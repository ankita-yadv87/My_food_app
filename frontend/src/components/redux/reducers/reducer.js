
const initialState = {
    carts: []
};

const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case "ADD_CART":
            const ElementIndex = state.carts.findIndex((element) => element.id === action.payload.id);

            if (ElementIndex >= 0) {
                state.carts[ElementIndex].qnty += 1;
                return { ...state, carts: [...state.carts] }

            }
            else {
                const temp = { ...action.payload, qnty: 1 };
                return { ...state, carts: [...state.carts, temp] };
            }
        // return { ...state, carts: [...state.carts, action.payload] };

        case "DEL_CART":
            const data = state.carts.filter((element) => element.id !== action.payload);
            return { ...state, carts: data };

        case "REMOVE_QTY":
            const itmIndex = state.carts.findIndex((element) => element.id === action.payload.id);

            if (state.carts[itmIndex].qnty >= 1) {
                const dltitem = state.carts[itmIndex].qnty -= 1;
                console.log([...state.carts,dltitem]);
                return { ...state, carts: [...state.carts] }

            }else if(state.carts[itmIndex].qnty === 1 ){
                const ndata = state.carts.filter((x)=>x.id !== action.payload);

                return {
                    ...state,
                    carts: ndata
                }
            }

        default:
            return state;
    }
}

export default cartReducer;