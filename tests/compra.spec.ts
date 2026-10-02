
//lo primero que hacemos es importar las librerias con las que vamos a trabajar
import {test, expect} from "@playwright/test";

//ahora para escribir nuestras pruebas
test("TC compras-01 carrito de compras", async({page})=>{

    //ahora el paso a paso de mi test o prueba paso 1 abrir la url
    await page.goto("https://practicesoftwaretesting.com/");

    //validar que el titulo corresponde a la pagina correcta que he abierto
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");

    //paso 2 clic en iniciar sesion
    await page.getByTestId("nav-sign-in").click();

    //paso 3 llenar usuario
    await page.getByTestId("email").fill("customer@practicesoftwaretesting.com");

    //paso 4 llenar el password
    await page.getByTestId("password").fill("welcome01");

    //paso 5 hacer clic en el boton iniciar session
    await page.getByTestId("login-submit").click();

    //paso 6 validar que iniciamos session correctamente
    await expect(page.getByTestId("page-title")).toContainText("My account");

    //ahora vamos para el inicio clic
    await page.getByTestId("nav-home").click();

    //buscar producto "Court Hammer"
    await page.getByTestId("search-query").fill("Court Hammer");

    //clic en buscar
    await page.getByTestId("search-submit").click();

    //seleccionar el producto del catalogo
    const tarjetas = page.locator('[data-test="search_completed"] a.card');

    //verificar que se muestra el producto Court Hammer
    await expect(
        tarjetas.filter({hasText:"Court Hammer"}).first()
    ).toBeVisible();

    //hacer clic en Court Hammer
    await tarjetas.filter({hasText:"Court Hammer"}).first().click();

    //verificar que estamos en la pagina del producto
    await expect(page.getByTestId("add-to-cart")).toBeVisible();

    //agregar Court Hammer al carrito de compras
    await page.getByTestId("add-to-cart").click();

    //agregar el segundo producto al carrito

    //clic en el boton de inicio
    await page.getByTestId("nav-home").click();

    //buscar producto "Square Ruler"
    await page.getByTestId("search-query").fill("Square Ruler");

    //clic en buscar
    await page.getByTestId("search-submit").click();

    //seleccionar el producto del catalogo
    const tarjetas2 = page.locator('[data-test="search_completed"] a.card');

    //verificar que se muestra el producto Square Ruler
    await expect(
        tarjetas2.filter({hasText:"Square Ruler"}).first()
    ).toBeVisible();

    //hacer clic en Square Ruler
    await tarjetas2.filter({hasText:"Square Ruler"}).first().click();

    //verificar que estamos en la pagina del producto
    await expect(page.getByTestId("add-to-cart")).toBeVisible();

    //agregar Square Ruler al carrito de compras
    await page.getByTestId("add-to-cart").click();

    //ahora vamos al carrito de compra
    await page.getByTestId("nav-cart").click();

    //verificar que Court Hammer se encuentra en el carrito
    await expect(
        page.getByText("Court Hammer", {exact:false})
    ).toBeVisible();

    //verificar que Square Ruler se encuentra en el carrito
    await expect(
        page.getByText("Square Ruler", {exact:false})
    ).toBeVisible();

    //verificar que el boton proceder al pago esta disponible
    await expect(
        page.getByRole("button", {
            name:"Proceed to checkout",
            exact:true
        })
    ).toBeVisible();

});
