import { expect, test } from "@playwright/test";
import { ai } from "@zerostep/playwright";

test.describe("EA website testing", () => {
  test("Create employee using AI automation", async ({ page }) => {
    const aiArgs = { page, test };

    const employeeName = "Jane Smith";
    const age = "30";
    const salary = "$5,000.00";
    const duration = "24 mo.";
    const grade = "Junior";
    const email = `jane.${Date.now()}@company.com`;

    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    await page.goto("http://eaapp.somee.com/");

    await ai("Click the Login link", aiArgs);
    await ai("Type admin in the username field", aiArgs);
    await ai("Type password in the password field", aiArgs);
    await ai("Check the keep me signed in checkbox", aiArgs);
    await ai("Click the Sign In button", aiArgs);

    await page.waitForURL("http://eaapp.somee.com/");

    await ai("Click the Employee List link", aiArgs);
    await page.waitForURL("**/Employee");

    await ai("Click the Create New button", aiArgs);
    await page.waitForURL("**/Employee/Create");

    await expect(page).toHaveURL(/\/Employee\/Create$/);

    await page.getByRole("textbox", { name: "Full Name" }).fill(employeeName);
    await page.getByRole("spinbutton", { name: "Age" }).fill(age);
    await page.getByRole("spinbutton", { name: "Monthly Salary" }).fill("5000");
    await page.getByRole("spinbutton", { name: "Duration Worked (months)" }).fill("24");
    await page.getByRole("combobox", { name: "Grade" }).selectOption({ label: grade });
    await page.getByRole("textbox", { name: "Email Address" }).fill(email);

    await page.getByRole("button", { name: /Create Employee/i }).click();

    await page.waitForURL("**/Employee");

    // Assert table is visible
    const table = page.locator("table");
    await expect(table).toBeVisible();

    // Assert created employee data exists
    await expect(table).toContainText(employeeName);
    await expect(table).toContainText(age);
    await expect(table).toContainText(salary);
    await expect(table).toContainText(duration);
    await expect(table).toContainText(grade);
    await expect(table).toContainText(email);

    // Better: assert the exact row
    const createdRow = page.locator("tbody tr").filter({ hasText: email });
    await expect(createdRow).toBeVisible();
    await expect(createdRow).toContainText(employeeName);
    await expect(createdRow).toContainText("30 yrs");
    await expect(createdRow).toContainText("$5,000.00");
    await expect(createdRow).toContainText("24 mo.");
    await expect(createdRow).toContainText("Junior");
    await expect(createdRow).toContainText(email);
  });
});


