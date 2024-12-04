const {
  enterTextByTestID,
  enterLoginPage,
  logout,
} = require("./custom-commands");

describe("LoginScreen", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should have home screen", async () => {
    await expect(element(by.id("logoText"))).toBeVisible();
  });

  it("should click login button and move to login screen", async () => {
    await enterLoginPage();

    await expect(element(by.text("Discord"))).toBeVisible();
  });

  it("should go to LoginPage, type wrong data and try to login", async () => {
    await enterLoginPage();

    await enterTextByTestID("input_email", "dupa1");
    await enterTextByTestID("passwordInput", "dupa2");

    await element(by.text("Zaloguj się")).tap(); //to close keyboard
    await element(by.text("Zaloguj się")).tap();

    await expect(element(by.text("Login Failed"))).toBeVisible();

    await element(by.text("OK")).tap();
  });

  it("should go to LoginPage, type correct data and try to login", async () => {
    await enterLoginPage();

    await enterTextByTestID("input_email", "asd");
    await enterTextByTestID("passwordInput", "asd");

    await element(by.text("Zaloguj się")).tap(); //to close keyboard
    await element(by.text("Zaloguj się")).tap();

    await expect(element(by.id("MainScreen"))).toBeVisible();

    await logout();
  });
});
