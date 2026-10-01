//lo primero que hacemos es importar las librerias con las que vamos a trabajar
import{test, expect} from "@playwright/test";
//ahora pra escribir nuestras pruebas 
test("TC01-Validar usuario con credenciales validas",async({page})=>{
    //ahora el paso a paso de mi test o prueba  pasos del test o prueba 1 abril la url  
    await page.goto("https://practicesoftwaretesting.com/");
    //validar que el titulo corresponde a la pagina correcta que he abierto
    await expect (page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");

    //paso 2 clic en iniciar sesion
    await page.getByTestId("nav-sign-in").click();
    //paso 3 llenar usuario 
    await page.getByTestId("email").fill("customer@practicesoftwaretesting.com");
    //paso 4 llenar el password
    await page.getByTestId("password").fill("welcome01");
    // paso 5 hacer clic en el boton iniciar session
    await page.getByTestId("login-submit").click();
    //paso 5 validar que iniciamos session correctamente y verificamos el titulo al iniciar session
    await expect(page.getByTestId("page-title")).toContainText("My account");
     //hora vamos para el inicio  clic 

    await page.getByTestId("nav-home").click();

    //obtener una lista 
    const itemsAntes = page.getByTestId("product-name");
    await expect (itemsAntes.first()).not.toHaveText('');
    const primmerTextoInicial = await itemsAntes.first().innerText();

    console.log(primmerTextoInicial);
    

    //ordenar de manera ascendente usando filtro cuando hay otro occiones
    await page.getByTestId("sort").selectOption({ label: 'Name (A - Z)' });
    //validar 


});