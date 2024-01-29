//types.ts

import { DimensionValue } from "react-native"


export interface PageSwitchTemplateProps {
    navigation: any //typy do dopracowania
    children: any
}

export interface IStylesVariable{
    PCRatio: DimensionValue | undefined
    LogoSize:  number
    ButtonSize:  DimensionValue | undefined
    InputSize: number
}
