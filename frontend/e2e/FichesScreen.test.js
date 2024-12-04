const {
  enterTextByTestID,
  enterLoginPage,
  logout,
} = require("./custom-commands");

describe("FichesScreen", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("open fiches and learn", async () => {
    await element(by.text("Kontynuuj jako gość")).tap();
    await waitFor(element(by.text("Twoje Fiszki")))
      .toBeVisible()
      .whileElement(by.id("mainScroll")) // where some is your ScrollView testID
      .scroll(200, "down");

    await element(by.id("seeAllFiches")).tap();
    await element(by.id("flashcard65")).tap();
    await element(by.id("swipeable-flashcard")).swipe("right");
    await expect(
      element(by.text("Nauczyłeś się juz wszystkiego! Zacznij teraz od nowa!"))
    ).toBeVisible();
  });

  it("your fiches button", async () => {
    await element(by.text("Kontynuuj jako gość")).tap();
    await waitFor(element(by.text("Twoje Fiszki")))
      .toBeVisible()
      .whileElement(by.id("mainScroll")) // where some is your ScrollView testID
      .scroll(200, "down");

    await element(by.id("myPageSwitcher")).tap();

    await expect(element(by.text("Twoje fiszki"))).toBeVisible();
  });

  it("try to create fiches as guest", async () => {
    await element(by.text("Kontynuuj jako gość")).tap();
    await waitFor(element(by.text("Nowe Fiszki")))
      .toBeVisible()
      .whileElement(by.id("mainScroll")) // where some is your ScrollView testID
      .scroll(200, "down");

    await element(by.text("Nowe Fiszki")).tap();

    await expect(
      element(by.text("Zaloguj się aby stworzyć fiszki!"))
    ).toBeVisible();
  });

  it("create fiches as user", async () => {
    await enterLoginPage();

    await enterTextByTestID("input_email", "asd");
    await enterTextByTestID("passwordInput", "asd");

    await element(by.text("Zaloguj się")).tap(); //to close keyboard
    await element(by.text("Zaloguj się")).tap();
    await waitFor(element(by.text("Nowe Fiszki")))
      .toBeVisible()
      .whileElement(by.id("mainScroll")) // where some is your ScrollView testID
      .scroll(200, "down");

    await element(by.text("Nowe Fiszki")).tap();
    await element(by.text("Tytuł twojego zestawu!")).tap();
    await element(by.text("Tytuł twojego zestawu!")).typeText("xdxdxdx");

    await enterTextByTestID("foreignTranslation", "dupa1");
    await enterTextByTestID("polishTranslation", "dupa2");

    await element(by.id("submitButton")).tap();
    await element(by.id("submitButton")).tap();
    await expect(element(by.text("Success!"))).toBeVisible();
    await element(by.text("OK")).tap();
    await logout();
  });

  it("error while creating fiches", async () => {
    await enterLoginPage();

    await enterTextByTestID("input_email", "asd");
    await enterTextByTestID("passwordInput", "asd");

    await element(by.text("Zaloguj się")).tap(); //to close keyboard
    await element(by.text("Zaloguj się")).tap();
    await waitFor(element(by.text("Nowe Fiszki")))
      .toBeVisible()
      .whileElement(by.id("mainScroll")) // where some is your ScrollView testID
      .scroll(200, "down");

    await element(by.text("Nowe Fiszki")).tap();
    await element(by.text("Tytuł twojego zestawu!")).tap();
    await element(by.text("Tytuł twojego zestawu!")).typeText("xdxdxdx");

    await enterTextByTestID("foreignTranslation", "dupa1");

    await element(by.id("submitButton")).tap();
    await element(by.id("submitButton")).tap();
    await expect(element(by.id("fichesError"))).toBeVisible();
  });
});
