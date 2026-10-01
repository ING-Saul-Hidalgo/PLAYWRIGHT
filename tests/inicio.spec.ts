import { test, expect } from "@playwright/test";

test("TC-inicio - ordenar alfabeticamente", async ({ page }) => {
    // 1. Abrir la URL
    await page.goto("https://practicesoftwaretesting.com/");
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");

    // 2. Iniciar sesión
    await page.getByTestId("nav-sign-in").click();
    await page.getByTestId("email").fill("customer@practicesoftwaretesting.com");
    await page.getByTestId("password").fill("welcome01");
    await page.getByTestId("login-submit").click();

    // 3. Validar sesión e ir a Home
    await expect(page.getByTestId("page-title")).toContainText("My account");
    await page.getByTestId("nav-home").click();

    // 4. Capturar el primer producto antes de ordenar
    const items = page.getByTestId("product-name");
    await expect(items.first()).not.toHaveText('');
    const primerTextoInicial = await items.first().innerText();

    // 5. Cambiar el orden a A - Z
    await page.getByTestId("sort").selectOption({ label: 'Name (A - Z)' });

    // 6. ESPERAR a que la interfaz actualice la lista de productos
    // Esperamos a que el primer producto sea DISTINTO al que estaba antes de ordenar
    await expect(items.first()).not.toHaveText(primerTextoInicial);

    // 7. Extraer y limpiar los títulos ordenados por la web
    const actualTitles = (await items.allTextContents()).map(text => text.trim());
    console.log("Títulos en pantalla:", actualTitles);

    // 8. Crear la copia esperada y ordenarla localmente
    const expectedTitles = [...actualTitles].sort((a, b) => a.localeCompare(b));

    // 9. Validar que la lista de la pantalla coincida con el orden alfabético
    expect(actualTitles).toEqual(expectedTitles);
});