
		//Globales Zeug
		let zaehler = 0;
		let aktuellesAuto;
		let kastenSize = 40;
		let RTK = [];
		//Button


		//Autos	
		function newAuto(Ix, Iy) //Erstellen
		{
			return { x: Ix, y: Iy, xV: 0, yV: 0 };
		}

		let auto1 = newAuto(5, 5); //Auto erstellen
		aktuellesAuto = auto1;

		function AutoBewegen(auto, punkti) //Auto fahren
		{
			auto.xV = punkti.x - auto.x;
			auto.yV = punkti.y - auto.y;

			auto.x = punkti.x;
			auto.y = punkti.y;
		}


		function autoRendern(auto, ctx) //Auto malen
		{
			ctx.fillRect(auto.x * kastenSize - 8, auto.y * kastenSize - 8, 15, 15);
		}

		//Punkte
		function newPoint(Ix, Iy) //Grid dinger 
		{
			return { x: Ix, y: Iy };
		}

//--------------------------------------------------------------------------------------------------------------------
		function punkteMachen() {
			for (let i = 0; i < 30; i = i + 1) //Vert
			{
				for (let j = 0; j < 30; j = j + 1) //Horz
				{
					let pnt = newPoint(i * kastenSize, j * kastenSize);
					RTK.push(pnt);
				}
			}
		}

//--------------------------------------------------------------------------------------------------------------------
		function gutePunkte(x, y) {
			if (x * kastenSize < 3 * kastenSize | x * kastenSize > 23 * kastenSize) {
				return false;
			}
			else if (y * kastenSize < 3 * kastenSize | y * kastenSize > 24 * kastenSize) {
				return false;

			}
			else {
				return true;

			}
		}

//--------------------------------------------------------------------------------------------------------------------
//Anfang des Spiels
		function main() { 
			let c = document.getElementById("canvas");
			let ctx = c.getContext("2d");
			punkteMachen();

			c.addEventListener('mouseup', function (evt) { //Binden Maus event 
				var mousePos = getMousePos(c, evt);
				start(ctx, mousePos);
			}, false);
			console.error(RTK.length);
			for (let i = 0; i < RTK.length; i = i + 1)
			{
                ctx.strokeStyle = `rgb(3, 51, 105)`;

				ctx.moveTo(RTK[i].x, RTK[i].y); //Geht an ersten Punkt
				ctx.lineTo(RTK[i].x + kastenSize, RTK[i].y); //Malt in x Richtung
				ctx.stroke();

				ctx.moveTo(RTK[i].x, RTK[i].y); //Geht an ersten Punkt
				ctx.lineTo(RTK[i].x, RTK[i].y + kastenSize); //Malt in y Richung
				ctx.stroke();

				ctx.fillRect(RTK[i].x, RTK[i].y, 1, 1); //Malt aus mit 1 Dicke
			}
			ctx.fillStyle = "blue";
			autoRendern(aktuellesAuto, ctx);
		}
//--------------------------------------------------------------------------------------------------------------------

		//Gamelogik

		function GEEA(auto) //Gibt es valide Züge
		{
			let Optionen = bewegungsMoeglBerechnen(auto);
			let z = 0;
			for (let k = 0; k < Optionen.length; k++)  // Geht Optionen durch
			{
				if (gutePunkte(Optionen[k].x, Optionen[k].y) == true)
				{
					z = z + 1;
				}
				else 
				{
					z = z - 1;
				}
			}
			if (z > -9) {
				return true;
			}
			else {
				return false;
			}
		}
		function start(ctx, mousePos) { //Mausclick realisieren
			if (GEEA(aktuellesAuto) == true) {

				let bewegungsMoeglichkeiten = bewegungsMoeglBerechnen(aktuellesAuto);

				let wo = -1;

				for (let i = 0; i < bewegungsMoeglichkeiten.length; i++) {
					let punkt = newPoint(bewegungsMoeglichkeiten[i].x * kastenSize, bewegungsMoeglichkeiten[i].y * kastenSize);

					if ((punkt.x - 15 < mousePos.x && punkt.x + 15 > mousePos.x) &&
						(punkt.y - 15 < mousePos.y && punkt.y + 15 > mousePos.y)) {
						wo = i;
					}
				}
				if (wo != -1) {
					if (gutePunkte(bewegungsMoeglichkeiten[wo].x, bewegungsMoeglichkeiten[wo].y) == true) {
						AutoBewegen(aktuellesAuto, bewegungsMoeglichkeiten[wo]);
					}
					else {
						alert("Du fährst illegal");

					}
					autoBewegungAnzeigen(aktuellesAuto, ctx);

				}
			}
			else {
				auto1.xV = 0;
				auto1.yV = 0;
				autoBewegungAnzeigen(auto1, ctx);
			}
		}



		function autoBewegungAnzeigen(auto, ctx) {

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			for (let i = 0; i < RTK.length; i = i + 1) {
				ctx.moveTo(RTK[i].x, RTK[i].y);


				ctx.lineTo(RTK[i].x + kastenSize, RTK[i].y);
				ctx.stroke();



				ctx.moveTo(RTK[i].x, RTK[i].y);


				ctx.lineTo(RTK[i].x, RTK[i].y + kastenSize);
				ctx.stroke();




				ctx.fillRect(RTK[i].x, RTK[i].y, 1, 1);

				autoRendern(auto1, ctx);

			}

			let moeglichkeiten = []; //Mögl. Auflisten
			moeglichkeiten.push(newPoint(auto.x + auto.xV, auto.y + auto.yV));
			moeglichkeiten.push(newPoint(auto.x + auto.xV + 1, auto.y + auto.yV));
			moeglichkeiten.push(newPoint(auto.x + auto.xV - 1, auto.y + auto.yV));
			moeglichkeiten.push(newPoint(auto.x + auto.xV - 1, auto.y + auto.yV - 1));
			moeglichkeiten.push(newPoint(auto.x + auto.xV, auto.y + auto.yV - 1));
			moeglichkeiten.push(newPoint(auto.x + auto.xV + 1, auto.y + auto.yV - 1));
			moeglichkeiten.push(newPoint(auto.x + auto.xV - 1, auto.y + auto.yV + 1));
			moeglichkeiten.push(newPoint(auto.x + auto.xV, auto.y + auto.yV + 1));
			moeglichkeiten.push(newPoint(auto.x + auto.xV + 1, auto.y + auto.yV + 1));


			for (var i = 0; i < moeglichkeiten.length; i++) // Malen
			{
				ctx.fillRect(moeglichkeiten[i].x * kastenSize - 8, moeglichkeiten[i].y * kastenSize - 8, 10, 10);
			}
		}


		function bewegungsMoeglBerechnen(auto) { //wohin darf ich fahren
			let moeglichkeiten = [];
			moeglichkeiten.push(newPoint(auto.x + auto.xV, auto.y + auto.yV));
			moeglichkeiten.push(newPoint(auto.x + auto.xV + 1, auto.y + auto.yV));
			moeglichkeiten.push(newPoint(auto.x + auto.xV - 1, auto.y + auto.yV));
			moeglichkeiten.push(newPoint(auto.x + auto.xV - 1, auto.y + auto.yV - 1));
			moeglichkeiten.push(newPoint(auto.x + auto.xV, auto.y + auto.yV - 1));
			moeglichkeiten.push(newPoint(auto.x + auto.xV + 1, auto.y + auto.yV - 1));
			moeglichkeiten.push(newPoint(auto.x + auto.xV - 1, auto.y + auto.yV + 1));
			moeglichkeiten.push(newPoint(auto.x + auto.xV, auto.y + auto.yV + 1));
			moeglichkeiten.push(newPoint(auto.x + auto.xV + 1, auto.y + auto.yV + 1));

			return moeglichkeiten;
		}

		function getMousePos(canvas, evt) {
			var rect = canvas.getBoundingClientRect();
			return newPoint(evt.clientX - rect.left, evt.clientY - rect.top);
		}
