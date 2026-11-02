from playwright.sync_api import sync_playwright
import json

res = {}
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    errores = []
    pg.on("console", lambda m: errores.append(m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: errores.append(str(e)))
    pg.goto("http://127.0.0.1:8098/", wait_until="networkidle")
    pg.wait_for_timeout(800)

    # 1. tabs
    pg.click('[data-tab="montaje"]')
    pg.wait_for_timeout(350)
    res["tab_activo"] = pg.get_attribute('[data-tab="montaje"]', "aria-selected")
    res["panel_visible"] = pg.is_visible("#panel-montaje")
    res["panel_oculto"] = pg.is_visible("#panel-ingenieria")
    res["titulo_panel"] = pg.inner_text("#panel-montaje h3")

    # 2. formulario vacío
    pg.click('#form-cotizacion button[type="submit"]')
    pg.wait_for_timeout(300)
    res["error_vacio"] = pg.inner_text("#form-status")

    # 3. formulario con email inválido
    pg.fill("#f-nombre", "Prueba")
    pg.fill("#f-empresa", "Empresa")
    pg.fill("#f-email", "correo-malo")
    pg.fill("#f-msg", "Montaje de pasarela en planta.")
    pg.click('#form-cotizacion button[type="submit"]')
    pg.wait_for_timeout(300)
    res["error_email"] = pg.inner_text("#form-status")

    # 4. datos duros de la página
    res["h1"] = pg.eval_on_selector_all("h1", "els=>els.length")
    res["h2"] = pg.eval_on_selector_all("h2", "els=>els.map(e=>e.textContent.trim())")
    res["placeholders"] = pg.evaluate("(document.body.innerText.match(/\\{\\{/g)||[]).length")
    res["scrollW"] = pg.evaluate("document.documentElement.scrollWidth")
    res["anclas"] = pg.eval_on_selector_all('a[href^="#"]', "els=>els.map(e=>e.getAttribute('href'))")
    res["anclas_muertas"] = pg.evaluate("""(() => {
      const hs = [...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(h=>h.length>1);
      return [...new Set(hs)].filter(h=>!document.querySelector(h));
    })()""")
    res["imgs_sin_alt"] = pg.eval_on_selector_all("img", "els=>els.filter(e=>!e.alt).length")
    res["errores_consola"] = errores
    res["peso_html"] = len(pg.content())
    b.close()
print(json.dumps(res, ensure_ascii=False, indent=1))
