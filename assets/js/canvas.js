function drawText(text, x, y, color, size) {
	ctx.font = `${size} "Poppins"`;
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
}

function drawArc(x, y, radius, start, end, clockwise)
{
	ctx.beginPath();
	ctx.arc(x, y, radius, start, end, clockwise);
}

function drawCircle(x, y, radius, start, end, clockwise, color, type, thickness) {
	switch (type) {
		case 'fill':
			ctx.fillStyle = color;
			drawArc(x, y, radius, start, end, clockwise)
			ctx.fill();
			break;
		case 'stroke':
			ctx.strokeStyle = color;
			ctx.lineWidth = thickness;
			drawArc(x, y, radius, start, end, clockwise)
			ctx.stroke();
			break
	}
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// set the start point of the hour, minute and second hand to top
const threePIByTwo = (3 * Math.PI) / 2;

console.log(threePIByTwo);

let amOrPm = 'AM';

// Define colors for hour, minute and second hand
const hourActiveColor = '#39D98A',
	minuteActiveColor = '#3E7BFA',
	secondActiveColor = '#FDAC42';

// Define inactive colors for hour, minute and second hand
const hourInactiveColor = '#3C4043',
	minuteInactiveColor = '#2E3134',
	secondInactiveColor = '#282A2D';

const timerBg = '#282A2D';

function init()
{
	canvas.width = document.documentElement.clientWidth - 35;
	canvas.height = document.documentElement.clientHeight - 45;

	// This calls the draw function repeatedly at a rate of 60 times per second
	window.requestAnimationFrame(draw);	
}

function draw()
{
	// Finding center point of canvas
	const centerX = canvas.width / 2,
		centerY = canvas.height / 2;

	const date = new Date();

	let hr = date.getHours();
	let min = date.getMinutes();
	let sec = date.getSeconds();
	let ms = date.getMilliseconds();

	if(hr > 12)
	{
		amOrPm = 'PM';
		hr -= 12;
	}

	/* Defines how much radians each hand should move */
	let radH = 0.000008333 * ( ( hr * 60 * 60 * 1000 ) + ( min * 60 * 1000 ) + ( sec * 1000 ) + ms );
	let radM = 0.0001 * ( ( min * 60 * 1000 ) + ( sec * 1000 ) + ms );
	let radS = 0.006 * ( ( sec * 1000 ) + ms );


	// Hour Hand

	// // Minute Hand
	// drawCircle(centerX, centerY, 180, 0, 360, false, minuteInactiveColor, 'stroke', 50);
	// drawCircle(centerX, centerY, 180, threePIByTwo, rad(radM) + threePIByTwo, false, minuteActiveColor, 'stroke', 50);

	// Second Hand
	drawCircle(centerX, centerY, 110, 0, 360, false, secondInactiveColor, 'stroke', 30);
	drawCircle(centerX, centerY, 110, threePIByTwo, rad(radS) + threePIByTwo, false, secondActiveColor, 'stroke', 30);

	// Digital Timer
	drawCircle(centerX, centerY, 90, 0, 360, false, timerBg, 'fill', '50');
	drawText(`${hr.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")} ${amOrPm}`, canvas.width / 2 - 60, canvas.height / 2 + 15, '#ffffff', '28px');

	window.requestAnimationFrame(draw);
}

init();

// Convert degree to radians
function rad(deg){
	return  (Math.PI / 180) * deg;
}
