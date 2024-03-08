import {} from "react";
import { ImmerHook, useImmer } from "use-immer";

type CFormObj = {
    [K in string]: number | boolean | string
};

export function useCForm<O extends CFormObj>(immer: ImmerHook<O>) {
    
    return {
        CForm: {
            CFormItem(props: { field: keyof O }) {
                
            }
        }
    };
}