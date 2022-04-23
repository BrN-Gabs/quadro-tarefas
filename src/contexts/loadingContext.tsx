import { createContext, ReactNode, useState } from "react";

interface PropsLoadingProvider {
    children: ReactNode;
}

interface interfaceLoadingContext {
    loading: boolean;
    funLoading: (data: boolean) => Promise<void>;
}

export const LoadingContext = createContext({} as interfaceLoadingContext);
export function LoadingProvider(props: PropsLoadingProvider) {
    const [loading, setLoading] = useState(false);

    async function funLoading(data: boolean) {
        setLoading(data);
    }

    return (
        <LoadingContext.Provider
            value={{
                loading,
                funLoading,
            }}
        >
            {props.children}
        </LoadingContext.Provider>
    );
}
