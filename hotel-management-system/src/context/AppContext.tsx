import React, { createContext, useContext, useReducer } from 'react';

interface AppState {
  currentReservation: any | null;
  selectedRoom: any | null;
  selectedGuest: any | null;
}

type Action = 
  | { type: 'SET_CURRENT_RESERVATION'; payload: any }
  | { type: 'SET_SELECTED_ROOM'; payload: any }
  | { type: 'SET_SELECTED_GUEST'; payload: any }
  | { type: 'CLEAR_ALL' };

const initialState: AppState = {
  currentReservation: null,
  selectedRoom: null,
  selectedGuest: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_CURRENT_RESERVATION':
      return { ...state, currentReservation: action.payload };
    case 'SET_SELECTED_ROOM':
      return { ...state, selectedRoom: action.payload };
    case 'SET_SELECTED_GUEST':
      return { ...state, selectedGuest: action.payload };
    case 'CLEAR_ALL':
      return initialState;
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
