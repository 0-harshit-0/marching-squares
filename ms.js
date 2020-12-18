let wireframe = document.querySelector('#wire');

let rF = document.querySelector('#rf');
let rA = document.querySelector('#ra');
let rS = document.querySelector('#rs');
let range = document.querySelectorAll('input');
range.forEach(x => {
	x.addEventListener('change', (e) => {
		ctx.clearRect(0,0,canvas.width, canvas.height);
		lacunarity = parseInt(rF.value);
		persistance = parseInt(rA.value);
		res = parseInt(rS.value);
		if (wireframe.checked) {
			animation(true);
		}else {
			animation();
		}
	});
});

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight/1.1;

let s = new Shapes(ctx);

let res = 50, octaves=4, lacunarity=0.6, persistance=0.52;
const radii = 8;

function getState(a, b, c, d) {
	return a*8 + b*4 + c*2 + d*1;
}
function lineVec(v1, v2, a=0) {
	s.line(v1.x, v1.y, v2.x, v2.y);
	s.stroke('black');
}

function animation(frame = false) {
	let rows = Math.floor(canvas.width/res);
	let cols = Math.floor(canvas.height/res);
	let field = new Array(rows);

	for (var i = 0; i < rows; i++) {
		field[i] = new Array(cols);
		for (var j = 0; j < cols; j++) {
			let amp = 1;
			let fre = 1;
			let noiseHeight = 0;
			for (var o = 0; o < octaves; o++) {
				let temp = Math.abs(perlin(i/res*fre, j/res*fre));
				noiseHeight += temp*amp;
				amp *= persistance;
				fre *= lacunarity;
			}
			if (noiseHeight < 0.2) {
				field[i][j] = 0;
			}else {
				field[i][j] = 1;
			}
		}
	}

	for (var i = 1; i < rows-1; i++) {
		for (var j = 1; j < cols-1; j++) {

			if (field[i][j] == 1 && !frame) {
				s.box(i*res, j*res, res, res);
				//s.complex(res, i*res, j*res, 4);
				s.fill('rgba(0,0,0,1)');
			}else if (frame) {
				let x = i*res;
				let y = j*res;

				let a = new Vector2D(x+res*0.5, y);
				let b = new Vector2D(x+res, y+res*0.5);
				let c = new Vector2D(x+res*0.5, y+res);
				let d = new Vector2D(x, y+res*0.5);

				let state = getState(field[i][j], field[i+1][j], field[i+1][j+1], field[i][j+1]);
				switch(state) {
					case 1:
						lineVec(c, d, 315);
						break;
					case 2:
						lineVec(b, c, 225);
						break;
					case 3:
						lineVec(b, d, 270);
						break;
					case 4:
						lineVec(a, b, 135);
						break;
					case 5:
						lineVec(a, d, 225);
						lineVec(b, c, 405);
						break;
					case 6:
						lineVec(a, c, 180);
						break;
					case 7:
						lineVec(a, d, 225);
						break;
					case 8:
						lineVec(a, d, 405);
						break;
					case 9:
						lineVec(a, c, 360);
						break;
					case 10:
						lineVec(a, b, 405);
						lineVec(c, d, 585);
						break;
					case 11:
						lineVec(a, b, 315);
						break;
					case 12:
						lineVec(b, d, 450);
						break;
					case 13:
						lineVec(b, c, 405);
						break;
					case 14:
						lineVec(c, d, 495);
						break;
				}
			}
		}
	}
	
}
animation(true);
