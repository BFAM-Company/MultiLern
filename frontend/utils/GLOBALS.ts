import { Dimensions, Platform } from "react-native"
import { IStylesVariable } from "../types/types"

export const linking: any = {
    config: {
      screens: {
        Home: "",
        LogIn: "login",
        SignUp: "signup",
        Main: "home",
        Excercises: {
          path: "exercises/:description",
          parse: {
            description: (description: string) => description,
          },
        },
      }
    }
  }

export const SubjectCategories = {
  Math: require('./../assets/matematyka-icon.png'),
  Polish: require('./../assets/polski-icon.png'),
  ForeignLanguages: require('./../assets/obce-icon.png'),
  Geography: require('./../assets/geografia-icon.png'),
  Physics: require('./../assets/fizyka-icon.png'),
  Biology: require('./../assets/biologia-icon.png'),
  Chemistry: require('./../assets/chemia-icon.png'),
  IT: require('./../assets/informatyka-icon.png')
}
  
export const StylesVariables: IStylesVariable = {
    LogoSize: Dimensions.get('window').width*0.10*(Platform.OS === 'web' ? 0.3 : 1),

    ButtonSize: Dimensions.get('window').height*0.06,

    InputSize: Dimensions.get('window').height*0.07
}