import { Dimensions, Platform } from "react-native"
import { IStylesVariable } from "../types/types"

export const linking: any = {
    config: {
      screens: {
        Home: "",
        LogIn: "login",
        SignUp: "signup",
        Main: "home",
        NewFlashcard: 'newflashcard',
        FlashcardsList: {
          path: "flashcards/:range",
          parse: {
            range: (range: string) => range,
          },
        },
        FlashcardsSet: {
          path: "flashcardsset/:id",
          parse: {
            id: (id: number) => id,
          },
        },
      }
    }
  }
  
export const StylesVariables: IStylesVariable = {
    LogoSize: Dimensions.get('window').width*0.10*(Platform.OS === 'web' ? 0.3 : 1),

    ButtonSize: Dimensions.get('window').height*0.06,

    InputSize: Dimensions.get('window').height*0.07
}