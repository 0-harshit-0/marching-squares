const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let s = new Shapes(ctx);

const res = 10;
const rows = Math.floor(canvas.width/res);
const cols = Math.floor(canvas.height/res);
let field = new Array(rows);
const radii = 8;


function animation() {
	s.box(0,0, canvas.width, canvas.height);
	s.fill('black');
	for (var i = 0; i < rows; i++) {
		field[i] = new Array(cols);
		for (var j = 0; j < cols; j++) {
			let temp = Math.abs(perlin(i/20, j/20));
			if (temp < 0.1) {
				field[i][j] = 0;
			}else {
				field[i][j] = 1;
			}
		}
	}

	for (var i = 1; i < rows-1; i++) {
		//field[i] = new Array(cols);
		for (var j = 1; j < cols-1; j++) {
			//s.box(i*res, j*res, res, res);
			if (field[i][j] == 0) {
				//s.circle(i*res, j*res, 40);
				s.box(i*res, j*res, res, res);
				s.fill('rgba(255,255,255,0.4)');
			}
		}
	}
	
}
animation();
