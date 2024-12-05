const {
  enterTextByTestID,
  enterLoginPage,
  logout,
} = require("./custom-commands");

describe("NotesScreen", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    jest.setTimeout(180000);
    await device.reloadReactNative();
  });

  it("open notes and draw", async () => {
    await element(by.text("Kontynuuj jako gość")).tap();
    await waitFor(element(by.text("Nowa Notatka")))
      .toBeVisible()
      .whileElement(by.id("mainScroll")) // where some is your ScrollView testID
      .scroll(200, "down");

    await element(by.text("Nowa Notatka")).tap();
    await element(by.id("canvas")).swipe("down");
    await expect(element(by.id("canvas"))).toBeVisible();
  });
});
