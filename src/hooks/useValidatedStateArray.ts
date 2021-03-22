import { useState, useCallback, useRef } from 'react';
import { ProviderContextImpl } from '../core/extensions/SnackbarExtension';
import { validator } from "./useValidatedState"

export function useValidatedStateArray(...array: validator[]) {
    const validate = () => {
        const errors = new Array<string>();
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            const v = element.validate();
            if (v.hasError) {
                errors.push(v.errorMessage);
            }                
        }
        return {
            hasError: errors.length !== 0,
            errorMessage : errors.join("\n"),            
        }        
    };

    const validateToast = (toast : ProviderContextImpl) => {
        const errors = new Array<string>();
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            const v = element.validate();
            if (v.hasError) {
                errors.push(v.errorMessage);
            }            
        }

        if (errors.length !== 0) {
            toast.Error(errors.join("\n"));
            return false;
        }
        return true;
    };

    return { validate, validateToast };
}