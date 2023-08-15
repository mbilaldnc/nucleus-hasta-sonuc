// from selenium import webdriver
// from selenium.webdriver.chrome.service import Service as ChromeService
// from selenium.webdriver.common.by import By
// import time

// service = ChromeService(executable_path="C:/Users/mbdnc/Desktop/PYTHON/Selenium/Nucleus_Sonuç_Yazdırma_Programı/chromedriver.exe")
// driver = webdriver.Chrome(service=service)
// driver.get("https://onlinehbys.kocaeli.edu.tr:20108/nucleus-mobile/login")
// # time.sleep(2)
// # driver.switch_to.frame(driver.findElements(By.TAG_NAME, "iframe")[0])
// usernameParent = driver.findElement(By.css("#ironform > form > vaadin-vertical-layout > vaadin-text-field"))
// usernameShadowRoot = driver.executeScript("return arguments[0].shadowRoot", usernameParent)
// username = usernameShadowRoot.findElement(By.css("input"))
// username.send_keys("mbdnc")

// passwordParent = driver.findElement(By.css("#ironform > form > vaadin-vertical-layout > vaadin-password-field"))
// passwordShadowRoot = driver.executeScript("return arguments[0].shadowRoot", passwordParent)
// password = passwordShadowRoot.findElement(By.css("input"))
// password.send_keys("Welcomebd$650bd")

// loginButtonParent = driver.findElement(By.css("#submitbutton"))
// loginButtonShadowRoot = driver.executeScript("return arguments[0].shadowRoot", loginButtonParent)
// loginButton = loginButtonShadowRoot.findElement(By.css("button"))
// loginButton.click()

// time.sleep(2)

// hastaIslemleri = driver.findElement(By.css("body > vaadin-app-layout > div > div > div > div.view-frame__content > div > div > div > div.mobilmenu__group > div > div > span"))
// hastaIslemleri.click()

// time.sleep(2)

// hastaSorgulaParent = driver.findElement(By.css("#overlay > flow-component-renderer > div > div.view-frame-dialog__footer > vaadin-horizontal-layout > vaadin-button:nth-child(1)"))
// hastaSorgulaShadowRoot = driver.executeScript("return arguments[0].shadowRoot", hastaSorgulaParent)
// hastaSorgula = hastaSorgulaShadowRoot.findElement(By.css("button"))
// hastaSorgula.click()

// time.sleep(2)

// hastaListesi = driver.findElements(By.css("body > vaadin-app-layout > div > div > div > div.view-frame__content > vaadin-grid > vaadin-grid-cell-content")[3:])
// print(hastaListesi.__len__())
// for i in range(hastaListesi.__len__()):
//     print(i.__str__() + "-" + hastaListesi[i].text)
//     # only prints 25 patients. when scrolled down, it swaps new patients with old ones starting from index 0.

// time.sleep(5)

const path = require("path");
const { ServiceBuilder } = require("selenium-webdriver/chrome");
const { Builder, By, until } = require("selenium-webdriver");

const chromeDriver = path.join(__dirname, "chromedriver.exe"); // or wherever you've your geckodriver
const serviceBuilder = new ServiceBuilder(chromeDriver);
const excludedValueNames = ["MDRD", "eGFR", "FIB", "SERUM INDEX", "LIPEMIA", "ICTERUS", "HEMOLYSİS"];

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
async function findAsyncSequential(array, predicate) {
	for (const t of array) {
		if (await predicate(t)) {
			return t;
		}
	}
	return undefined;
}

(async () => {
	const driver = await new Builder().forBrowser("chrome").setChromeService(serviceBuilder).build();
	try {
		await driver.get("https://onlinehbys.kocaeli.edu.tr:20108/nucleus-mobile/login");
		await driver.wait(until.elementLocated(By.css("#ironform > form > vaadin-vertical-layout > vaadin-text-field")), 5000);
		let usernameParent = await driver.findElement(By.css("#ironform > form > vaadin-vertical-layout > vaadin-text-field"));
		let usernameShadowRoot = await driver.executeScript("return arguments[0].shadowRoot", usernameParent);
		let username = await usernameShadowRoot.findElement(By.css("input"));
		await username.sendKeys("mbdnc");
		let passwordParent = await driver.findElement(By.css("#ironform > form > vaadin-vertical-layout > vaadin-password-field"));
		let passwordShadowRoot = await driver.executeScript("return arguments[0].shadowRoot", passwordParent);
		let password = await passwordShadowRoot.findElement(By.css("input"));
		await password.sendKeys("Welcomebd$650bd");
		let loginButtonParent = await driver.findElement(By.css("#submitbutton"));
		let loginButtonShadowRoot = await driver.executeScript("return arguments[0].shadowRoot", loginButtonParent);
		let loginButton = await loginButtonShadowRoot.findElement(By.css("button"));
		await loginButton.click();

		await driver.wait(
			until.elementLocated(
				By.css(
					"body > vaadin-app-layout > div > div > div > div.view-frame__content > div > div > div > div.mobilmenu__group > div > div > span"
				),
				5000
			)
		);
		let hastaIslemleri = await driver.findElement(
			By.css("body > vaadin-app-layout > div > div > div > div.view-frame__content > div > div > div > div.mobilmenu__group > div > div > span")
		);
		await hastaIslemleri.click();

		await driver.wait(
			until.elementLocated(
				By.css(
					"#overlay > flow-component-renderer > div > div.view-frame-dialog__footer > vaadin-horizontal-layout > vaadin-button:nth-child(1)"
				),
				5000
			)
		);
		let hastaSorgulaParent = await driver.findElement(
			By.css("#overlay > flow-component-renderer > div > div.view-frame-dialog__footer > vaadin-horizontal-layout > vaadin-button:nth-child(1)")
		);
		let hastaSorgulaShadowRoot = await driver.executeScript("return arguments[0].shadowRoot", hastaSorgulaParent);
		let hastaSorgula = await hastaSorgulaShadowRoot.findElement(By.css("button"));
		await hastaSorgula.click();

		await sleep(2000);
		let hastaListesi = await driver.findElements(
			By.css("body > vaadin-app-layout > div > div > div > div.view-frame__content > vaadin-grid > vaadin-grid-cell-content")
		);
		hastaListesi = hastaListesi.slice(3);
		// console.log(hastaListesi.length);
		// console.log((await hastaListesi[0].getText()).split("\n")[1]);
		let hastaİsimleri = [];
		for (const i in hastaListesi) {
			hastaİsimleri.push((await hastaListesi[i].getText()).split("\n")[1]);
			// console.log(i + "-" + (await hastaListesi[i].getText()).split("\n")[1]);
		}
		let hastaTablosu = await driver.findElement(By.css("body > vaadin-app-layout > div > div > div > div.view-frame__content > vaadin-grid"));
		let hastaTablosuShadowRoot = await hastaTablosu.getShadowRoot();
		let table = await hastaTablosuShadowRoot.findElement(By.css("table"));
		await driver.executeScript("arguments[0].scrollBy(0, arguments[0].scrollHeight);", table);
		for (const i in hastaListesi) {
			const hastaİsmi = (await hastaListesi[i].getText()).split("\n")[1];
			if (hastaİsmi && !hastaİsimleri.includes(hastaİsmi) && !hastaİsmi.includes("-")) {
				hastaİsimleri.push(hastaİsmi);
			}
			// console.log(i + "-" + (await hastaListesi[i].getText()).split("\n")[1]);
		}

		console.log("Toplam hasta sayısı: ", hastaİsimleri.length);
		console.log(hastaİsimleri);

		await driver.executeScript("arguments[0].scrollBy(0, -arguments[0].scrollHeight);", table);

		const allData = {};
		//click patient
		for (const hastaİsmi of [hastaİsimleri[9]]) {
			console.log("Searching for: ", hastaİsmi);
			if (!(hastaİsmi in allData)) allData[hastaİsmi] = {};
			let hastaSonuçları = allData[hastaİsmi];
			let hasta = await findAsyncSequential(hastaListesi, async (item) => (await item.getText()).includes(hastaİsmi));
			if (!hasta) {
				await driver.executeScript("arguments[0].scrollBy(0, arguments[0].scrollHeight);", table);
				hasta = await findAsyncSequential(hastaListesi, async (item) => (await item.getText()).includes(hastaİsmi));
			}
			if (!hasta) throw new Error("Hasta bulunamadı: " + hastaİsmi);
			console.log("Found: ", await hasta.getText());
			await hasta.click();
			await driver.wait(
				until.elementLocated(
					By.css(
						"body > vaadin-app-layout > div > div > div > div.view-frame__content > div > div > div > div.mobilmenu__group > div > div"
					)
				)
			);
			let sonuçlarıGösterButton = await driver.findElement(
				By.css("body > vaadin-app-layout > div > div > div > div.view-frame__content > div > div > div > div.mobilmenu__group > div > div")
			);
			await sonuçlarıGösterButton.click();
			await driver.wait(until.elementLocated(By.css("vaadin-tab")), 5000);

			let tableParent = await driver.findElement(
				By.css(
					"body > vaadin-app-layout > div > div > div > div.view-frame__wrapper > div.view-frame__content > vaadin-vertical-layout > div > vaadin-vertical-layout > vaadin-grid"
				)
			);
			let tableShadowRoot = await tableParent.getShadowRoot();
			let table = await tableShadowRoot.findElement(By.css("table"));
			let scrollHeight = await driver.executeScript("return arguments[0].scrollHeight", table);
			let scroll = 0;
			while (scroll <= scrollHeight + 300) {
				let gridCellContents = await driver.findElements(
					By.css(
						"body > vaadin-app-layout > div > div > div > div.view-frame__wrapper > div.view-frame__content > vaadin-vertical-layout > div > vaadin-vertical-layout > vaadin-grid > vaadin-grid-cell-content"
					)
				);
				gridCellContents = gridCellContents.slice(3);
				for (const i in gridCellContents) {
					let text = await gridCellContents[i].getText();
					if (excludedValueNames.some((excludedValue) => text.includes(excludedValue))) continue;
					if (text.split("\n").length === 1) continue;
					if (text.split("\n")[0].includes("Teknik Onaylı")) {
						text = text.split("\n").slice(1).join("\n");
					}
					if (text.split("\n").length > 64) {
						// which means hemogram
						let rows = text.split("\n");
						let dateRegex = /^(\d{2}\.\d{2}\.\d{2})/;
						let dateResult = dateRegex.exec(rows[1]);
						if (!rows[0].includes("Hemogram") || !dateResult) continue;
						if (!(dateResult[0] in hastaSonuçları)) hastaSonuçları[dateResult[0]] = {};
						let dateObj = hastaSonuçları[dateResult[0]];
						for (let j = 2; j < rows.length; j++) {
							if ((j - 2) % 4 === 0 && rows[j] && rows[j + 1] && rows[j + 2] && rows[j + 3]) {
								let valueRegex = /^((-|<|>)?\d+,?\d*)/;
								let valueResult = valueRegex.exec(rows[j + 1]);
								if (!valueResult) continue;
								if (!dateObj[rows[j]]) dateObj[rows[j]] = valueResult[0];
							}
						}
					} else {
						// biyokimya veya diğer
					}
					console.log(i + "-" + text);
					// console.log(i + "-" + text.split("\n").at(-1));
				}
				console.log(hastaSonuçları);
				scroll += 300;
				await driver.executeScript("arguments[0].scrollTo(0, arguments[1]);", table, scroll);
				scrollHeight = await driver.executeScript("return arguments[0].scrollHeight", table);
				await sleep(1000);
			}
		}

		// kan sonucu regexi ^((-|<|>)?\d+,?\d*)
		// tarih regexi ^(\d{2}\.\d{2}\.\d{2})
		await sleep(5000);
		await driver.quit();
	} catch (e) {
		console.error(e);
		await driver.quit();
	}
})();
