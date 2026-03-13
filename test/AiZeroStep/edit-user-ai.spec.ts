import { expect } from "@playwright/test";
import { test } from "./ai-import-fixture.spec";

test.describe("EA website testing", () => {
  test("Create employee using AI automation", async ({ page, ai }) => {


    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    await page.goto("http://eaapp.somee.com/");

    await ai("Click the Login link");
    await ai("Type admin in the username field");
    await ai("Type password in the password field");
    await ai("Check the keep me signed in checkbox");
    await ai("Click the Sign In button");

    await page.waitForURL("http://eaapp.somee.com/");

    await ai("Click the Employee List link");
    await page.waitForURL("**/Employee");

    
    await ai("click on the Edit link for user Jane Smith on the table");
    await page.waitForURL("**/Employee/Edit/*");

    await ai("edit the name with saranEdit");
    await page.getByRole("button", { name: "Save Changes" }).click();
    var value = await ai("Get the edited value from the table");
    console.log(value);
    expect(value).not.toBeNull();

    // Assert created employee data exists
  });
});
