import { useState, useCallback, useRef, Dispatch } from 'react';
import { ProviderContextImpl } from '../core/extensions/SnackbarExtension';
import { WaitSite } from '../store/Overlay/action';

export function useWatingOverlay<T>(dispatch: Dispatch<any>, toast?: ProviderContextImpl) {
    return async (func: () => T) => {
        dispatch(WaitSite(true));
        try {
            return await func();    
        } catch (error) {
            if (toast) {
                toast.Error(error.toString());
            } else {
                throw error;   
            }            
        }
        finally {
            dispatch(WaitSite(false));
        }
    };
}
