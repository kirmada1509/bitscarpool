import { createContext, PropsWithChildren, useContext } from "react";
import { Dimensions, ScaledSize } from "react-native";

const DimensionContext = createContext<ScaledSize>(Dimensions.get("screen"));

export function DimensionsProvider({ children }: PropsWithChildren) {
    return (
        <DimensionContext.Provider value={Dimensions.get("screen")}>
            {children}
        </DimensionContext.Provider>
    );
}

export default function useDimensionsContext() {
    return useContext(DimensionContext);
}
