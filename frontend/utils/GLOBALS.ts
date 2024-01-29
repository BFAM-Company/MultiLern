import { Dimensions, Platform } from "react-native"
import { IStylesVariable } from "../types/types"

export const linking: any = {
    config: {
      screens: {
        Home: "",
        SignUp: "signUp"
      }
    }
  }
  




export const StylesVariables: IStylesVariable = {
    PCRatio: Platform.OS === 'web' ? 0.4 : 1,

    LogoSize: Dimensions.get('window').width*0.10*(Platform.OS === 'web' ? 0.4 : 1),

    ButtonSize: Dimensions.get('window').height*0.06,

    InputSize: Dimensions.get('window').height*0.07
}