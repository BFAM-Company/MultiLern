const {
  enterTextByTestID,
  enterLoginPage,
  logout,
} = require("./custom-commands");

describe("PostsScreen", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("open post", async () => {
    await element(by.text("Kontynuuj jako gość")).tap();
    await waitFor(element(by.id("e2")))
      .toBeVisible()
      .whileElement(by.id("mainScroll")) // where some is your ScrollView testID
      .scroll(500, "down");

    await element(by.id("e2")).tap();
    await expect(element(by.id("title2"))).toBeVisible();
  });

  it("create post", async () => {
    await enterLoginPage();

    await enterTextByTestID("input_email", "asd");
    await enterTextByTestID("passwordInput", "asd");

    await element(by.text("Zaloguj się")).tap(); //to close keyboard
    await element(by.text("Zaloguj się")).tap();

    await waitFor(element(by.text("Zadaj pytanie")))
      .toBeVisible()
      .whileElement(by.id("mainScroll")) // where some is your ScrollView testID
      .scroll(500, "down");

    await element(by.text("Zadaj pytanie")).tap();
    await expect(
      element(by.text("Dodaj tytuł do swojego pytania"))
    ).toBeVisible();

    await enterTextByTestID("title", "dupa");
    await element(by.text("Dodaj tytuł do swojego pytania")).tap();
    await enterTextByTestID("content", "dupa dupa dupa dupa dupa dupa dupa");
    await element(by.text("Dodaj tytuł do swojego pytania")).tap();

    await waitFor(element(by.id("submit")))
      .toBeVisible()
      .whileElement(by.id("createPostScroll")) // where some is your ScrollView testID
      .scroll(100, "down");

    await element(by.id("submit")).tap();
    await expect(element(by.text("Twoje pytania i odpowiedzi"))).toBeVisible();
  });
});
