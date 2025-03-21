import { useState } from 'react'

export default function usePersistedState(stateKey, initState) {
    const [state, setState] = useState(() => {
        const persistedState = localStorage.getItem(stateKey);

        if(!persistedState){
            return typeof initState === 'function' ? initState(): initState
        }

        const persistedData = JSON.parse(persistedState);
        return persistedData
    });

    const setPersistedState = (userData) => {
        const data = typeof userData === 'function' ? userData(state): userData;
        const userAccTokenStr = JSON.stringify(data);

        localStorage.setItem(stateKey, userAccTokenStr);
        setState(data);
    }

    return [
        state,
        setPersistedState
    ]
}
