import { AppPage } from './app.po';
import { browser, by, element, ExpectedConditions, logging } from 'protractor';
import { TIMEOUT } from 'dns';



describe('Proyecto Agenda escolar', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    
  });





  

   it('Debe iniciar sesión como Coordinador', async () => {
    await page.navigateToRoot();
    await element(by.css("select[name='selectTipoUsuario']")).click().then(res=>{
      element(by.css("option[value='admin']")).click();
    });
    await browser.sleep(1000);
    await element(by.css("input[name='lg_username']")).sendKeys("Admin@gmail.com");
    await browser.sleep(1000);
    await element(by.css("input[name='lg_password']")).sendKeys("Admin.123");
    await browser.sleep(2000);
    await element(by.css("button[name='btnLogin']")).click();
    await browser.sleep(2000);

  });


    it('Debe crear un docente', async () => {
    await page.navigateTo("gestion-asignaturas");
  });

  it('Debe crear un grado', async () => {
    await page.navigateTo("gestion-docentes");
  });

  /*

  it('Debe crear una asignatura', async () => {
    await page.navigateTo("gestion-asignaturas");
    await element(by.css("input[name='nombre']")).sendKeys("Eduación fisica");
    await browser.sleep(2000);
    await element(by.css("button[name='guardar']")).click();
    await browser.sleep(3500);
    await page.navigateTo("menu-admin");
    await browser.sleep(2000);
  });

  it('Debe crear un docente', async () => {
    await page.navigateTo("gestion-docentes");
    await element(by.css("input[name='idDocente']")).sendKeys("1074321423");
    await browser.sleep(1000);
    await element(by.css("input[name='nombreDocente']")).sendKeys("Ramiro José");
    await browser.sleep(1000);
    await element(by.css("input[name='apellidoDocente']")).sendKeys("De la hoz Rodriguez");
    await browser.sleep(1000);
    await element(by.css("input[name='inputfecha']")).sendKeys("1990-04-10");
    await browser.sleep(1000);
    await element(by.css("input[name='inputTelefonoDocente']")).sendKeys("3024567634");
    await browser.sleep(1000);
    await element(by.css("input[name='inputCorreoDocente']")).sendKeys("Ramiro.hoz@gmail.com");
    await browser.sleep(1000);
    await element(by.css("button[name='btnguardar']")).click();
    await browser.sleep(5000);
    await page.navigateTo("menu-admin");
    await browser.sleep(2000);
  });


  it('Debe asignarle una asignatura a un docente', async () => {
    await page.navigateTo("gestion-docentes");
    await browser.sleep(2000);
    await element(by.css("input[name='inputbuscardocente']")).sendKeys("1074321423");
    await browser.sleep(2000);
    await element(by.css("button[name='btnbuscardocente']")).click();
    await browser.sleep(2000);
    await element(by.css("select[name='selectasignar']")).click().then(res=>{
      element(by.css('select option:nth-child(3)')).click();
    });
    await browser.sleep(2000);
    await element(by.css("button[name='btnAsignar']")).click();
    await browser.sleep(3500);
    await page.navigateTo("menu-admin");
    await browser.sleep(2000);
  });
 
  it('Debe iniciar sesión como Docente', async () => {
    await page.navigateToRoot();
    await element(by.css("select[name='selectTipoUsuario']")).click().then(res=>{
      element(by.css("option[value='docente']")).click();
    });
    await browser.sleep(1000);
    await element(by.css("input[name='lg_username']")).sendKeys("ramiro.hoz@gmail.com");
    await browser.sleep(1000);
    await element(by.css("input[name='lg_password']")).sendKeys("1074321423");
    await browser.sleep(1500);
    await element(by.css("button[name='btnLogin']")).click();
    await browser.sleep(2000);
      
  });

  it('Debe registrar una calificación', async () => {
    await page.navigateTo("registro-nota");
    await browser.sleep(1000);
    await element(by.css("select[name='asignatura']")).click().then(res=>{
      element(by.css('select option:nth-child(3)')).click();
    });
    await browser.sleep(1000);
    await element(by.css("select[name='curso']")).click().then(async res=>{
      await browser.sleep(1000);
      element(by.css('#curso option:nth-child(2)')).click();
    });
    await browser.sleep(700);
    await element(by.css("select[name='alumno']")).click().then(async res=>{
      await browser.sleep(1000);
      element(by.css('#alumno option:nth-child(2)')).click();
    });
    await browser.sleep(700);
    await element(by.css("input[name='nota']")).sendKeys("80");
    await browser.sleep(700);
    await element(by.css("input[name='periodo']")).sendKeys("1");
    await browser.sleep(700);
    await element(by.css("input[name='porcentaje']")).sendKeys("50");
    await browser.sleep(700);
    await element(by.css("input[name='descripcion']")).sendKeys("Examen");
    await browser.sleep(700);
    await element(by.css("button[name='btnguardar']")).click();
    await browser.sleep(3500);
    await page.navigateTo("menu-docente");
    await browser.sleep(2000);
  });
  */


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
 
});
