// w pliku test-helper.js lub innym pliku pomocniczym
import { element, by } from "detox";

// Funkcja, która będzie stanowić niestandardową komendę
export async function tapElementByTestID(testID) {
  await element(by.id(testID)).tap();
}

export async function tapElementByTheText(text) {
  await element(by.text(text)).tap();
}

// Możesz też zdefiniować komendy z dodatkowymi akcjami
export async function enterTextByTestID(testID, text) {
  await element(by.id(testID)).tap();
  await element(by.id(testID)).typeText(text);
}

export async function enterLoginPage() {
  await expect(element(by.text("Zaloguj się"))).toBeVisible();
  await element(by.text("Zaloguj się")).tap();
}

export async function logout() {
  await element(by.id("userModalButton")).tap();
  await element(by.text("Wyloguj się")).tap();
}
