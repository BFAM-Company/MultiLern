const {
  enterTextByTestID,
  enterLoginPage,
  logout,
} = require("./custom-commands");

describe("SignUpPage", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    jest.setTimeout(180000);
    await device.reloadReactNative();
  });

  it("go to SignUpPage", async () => {
    await element(by.text("Zarejestruj się")).tap();
    await expect(element(by.text("Zarejestruj się"))).toBeVisible();
  });

  it("create account successfully", async () => {
    await element(by.text("Zarejestruj się")).tap();
    await expect(element(by.text("Zarejestruj się"))).toBeVisible();

    await enterTextByTestID("name", "123");
    await enterTextByTestID("email", "123@123");
    await enterTextByTestID("pass", "123");
    await element(by.text("MultiLern")).tap();
    await enterTextByTestID("rpass", "123");
    await element(by.text("MultiLern")).tap();

    await element(by.text("Zarejestruj się")).tap();

    await expect(element(by.text("Rejestracja powiodła się!"))).toBeVisible();
  });

  it("get email error", async () => {
    await element(by.text("Zarejestruj się")).tap();
    await expect(element(by.text("Zarejestruj się"))).toBeVisible();

    await enterTextByTestID("name", "123");
    await enterTextByTestID("email", "123");
    await enterTextByTestID("pass", "123");
    await element(by.text("MultiLern")).tap();
    await enterTextByTestID("rpass", "123");
    await element(by.text("MultiLern")).tap();

    await element(by.text("Zarejestruj się")).tap();

    await expect(element(by.id("emailError"))).toBeVisible();
  });

  it("get different password error", async () => {
    await element(by.text("Zarejestruj się")).tap();
    await expect(element(by.text("Zarejestruj się"))).toBeVisible();

    await enterTextByTestID("name", "123");
    await enterTextByTestID("email", "123");
    await enterTextByTestID("pass", "123");
    await element(by.text("MultiLern")).tap();
    await enterTextByTestID("rpass", "456");
    await element(by.text("MultiLern")).tap();

    await element(by.text("Zarejestruj się")).tap();

    await expect(element(by.id("rPasswordError"))).toBeVisible();
  });

  it("get all errors", async () => {
    await element(by.text("Zarejestruj się")).tap();
    await expect(element(by.text("Zarejestruj się"))).toBeVisible();

    await element(by.text("Zarejestruj się")).tap();

    await expect(element(by.id("usernameError"))).toBeVisible();
    await expect(element(by.id("emailError"))).toBeVisible();
    await expect(element(by.id("passwordError"))).toBeVisible();
    await expect(element(by.id("rPasswordError"))).toBeVisible();
  });
});
