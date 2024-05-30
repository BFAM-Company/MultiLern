import { Dimensions, Platform } from "react-native";
import { IStylesVariable } from "../types/types";

export const linking: any = {
  config: {
    screens: {
      Auth: "",
      Home: "home",
      LogIn: "login",
      SignUp: "signup",
      Notes: "notes",
      Main: "main",
      CreatePost: "create-post",
      Excercises: {
        path: "exercises/:description",
        parse: {
          description: (description: string) => description,
        },
      },
      UserExcercises: {
        path: "exercises/:description",
        parse: {
          description: (description: string) => description,
        },
      },
      PostByCategory: {
        path: "exercises/:description",
        parse: {
          description: (description: string) => description,
        },
      },
      NewFlashcard: "newflashcard",
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
    },
  },
};

export const SubjectCategories = {
  Math: require("./../assets/matematyka-icon.png"),
  Polish: require("./../assets/polski-icon.png"),
  ForeignLanguages: require("./../assets/obce-icon.png"),
  Geography: require("./../assets/geografia-icon.png"),
  Physics: require("./../assets/fizyka-icon.png"),
  Biology: require("./../assets/biologia-icon.png"),
  Chemistry: require("./../assets/chemia-icon.png"),
  IT: require("./../assets/informatyka-icon.png"),
};


export const StylesVariables: IStylesVariable = {
  LogoSize:
    Dimensions.get("window").width * 0.1 * (Platform.OS === "web" ? 0.3 : 1),

  ButtonSize: Dimensions.get("window").height * 0.06,

  InputSize: Dimensions.get("window").height * 0.07,
};


export const BackendVariables = {
  basicURL: 'multilern-production.up.railway.app'
}
