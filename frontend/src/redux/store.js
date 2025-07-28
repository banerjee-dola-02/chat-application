// import {configureStore} from "@reduxjs/toolkit";
// import  userReducer from "./userSlice.js";
// import messageReducer from "./messageSlice.js";
// import socketReducer from "./socketSlice.js";


// const store=configureStore({
//     reducer:{
//         user:userReducer,
//         message:messageReducer,
//         socket:socketReducer
//     },
// });
// export default store;



//******************** */
// import {combineReducers, configureStore} from "@reduxjs/toolkit";
// import userReducer from "./userSlice.js";
// import messageReducer from "./messageSlice.js";
// import socketReducer from "./socketSlice.js";
// import {
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from 'redux-persist';
//   import storage from 'redux-persist/lib/storage'

//   const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
//   }

//   const rootReducer = combineReducers({
//     user:userReducer,
//     message:messageReducer,
//     socket:socketReducer
//  })

// const persistedReducer = persistReducer(persistConfig, rootReducer)


// const store = configureStore({
//     reducer:persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
// export default store;



//************************************ */
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice.js";
// import messageReducer from "./messageSlice.js";
// // import socketReducer from "./socketSlice.js"; // 👈 REMOVED
// import {
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
// };

// const rootReducer = combineReducers({
//     user: userReducer,
//     message: messageReducer,
//     // socket: socketReducer // 👈 REMOVED
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// });

// export default store;






import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import {
    persistStore, // 👈 1. IMPORT THIS
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 2. EXPORT THE STORE
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// 3. CREATE AND EXPORT THE PERSISTOR
export const persistor = persistStore(store);