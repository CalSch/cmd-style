#!/usr/bin/env node
import { Command } from 'commander';
import { createInterface } from 'readline';
import stringWidth from'string-width';
const app=new Command();

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});  

const borderStyles={
	retro: {
		tl: "+",
		tm: "-",
		tr: "+",
		l:  "|",
		r:  "|",
		bl: "+",
		bm: "-",
		br: "+",
	},
	normal: {
		tl: "┌",
		tm: "─",
		tr: "┐",
		l:  "│",
		r:  "│",
		bl: "└",
		bm: "─",
		br: "┘",
	},
	round: {
		tl: "╭",
		tm: "─",
		tr: "╮",
		l:  "│",
		r:  "│",
		bl: "╰",
		bm: "─",
		br: "╯",
	},
	double: {
		tl: "╔",
		tm: "═",
		tr: "╗",
		l:  "║",
		r:  "║",
		bl: "╚",
		bm: "═",
		br: "╝",
	},
	heavy: {
		tl: "┏",
		tm: "━",
		tr: "┓",
		l:  "┃",
		r:  "┃",
		bl: "┗",
		bm: "━",
		br: "┛",
	},
}

String.prototype.oldRepeat=String.prototype.repeat;
String.prototype.repeat=function(n){
	return this.oldRepeat(Math.max(n,0))
}

let input=""
rl.on('line',(i)=>{
	input+=i;
	input+="\n"
})

rl.on('close',()=>{
	if (input.endsWith("\n")) input=input.substring(0,input.length-1)
	app.parseAsync(process.argv).then(()=>{
		process.stdout.write(output);
	});
})

let output="";

function getWidth(str) {
	let w=0;
	for (let line of str.split("\n")) {
		let lineWidth=stringWidth(line);
		if (w<lineWidth) {
			w=lineWidth;
		}
	}

	return w;
}

function getHeight(str) {
	let h=0;
	for (let line of str.split("\n")) {
		h++;
	}

	return h;
}

app
.name("Command Line Styler")
.version('1.0.0');

app.command("bold").action(function() {
	output=`\x1b[1m${input}\x1b[0m`;
});

app.command("italic").action(function() {
	output=`\x1b[3m${input}\x1b[0m`;
});

app.command("underline").action(function() {
	output=`\x1b[4m${input}\x1b[0m`;
});

app.command("fg <color>").action(function(color) {
	let codes={
		black:  30,
		red:    31,
		green:  32,
		yellow: 33,
		blue:   34,
		magenta:35,
		cyan:   36,
	}
	if (typeof codes[color] === "undefined") {
		app.error(`<color> (${color}) must be one of ${Object.keys(codes)}`)
	}
	output="";
	for (let line of input.split("\n")) {
		output+=`\x1b[${codes[color]}m${line}\x1b[0m\n`;
	}
});

app.command("bg <color>").action(function(color) {
	let codes={
		black:  40,
		red:    41,
		green:  42,
		yellow: 43,
		blue:   44,
		magenta:45,
		cyan:   46,
	}
	if (typeof codes[color] === "undefined") {
		app.error(`<color> (${color}) must be one of ${Object.keys(codes)}`)
	}
	output="";
	for (let line of input.split("\n")) {
		output+=`\x1b[${codes[color]}m${line}\x1b[0m\n`;
	}
});

app.command("center").action(function(){
	let s;
	if (process.stdout.getWindowSize) {
		s=process.stdout.getWindowSize();
	} else {
		s=[
			getWidth(input),
			getHeight(input)
		]
	}
	for (let line of input.split("\n")) {
		output+=`${" ".repeat(Math.floor(s[0]/2-stringWidth(line)/2))}${line}\n`
	}
});

app.command("pad [x] [y]").action(function(x,y) {
	x=x||1;
	y=y||0;
	let newWidth=getWidth(input)+x*2;
	output=`${(" ".repeat(newWidth)+"\n").repeat(y)}`;
	for (let line of input.split("\n")) {
		let len=stringWidth(line);
		output+=`${" ".repeat(x)}${line}${" ".repeat(newWidth-len-x)}\n`
	}
	output+=`${(" ".repeat(newWidth)+"\n").repeat(y)}`;
});

app.command("border [style]").action(function(style) {
	style=style||"normal"
	if (typeof borderStyles[style] === "undefined") {
		app.error(`Border style (${style}) must be one of ${Object.keys(borderStyles)}`)
	}
	let b=borderStyles[style];
	let width=getWidth(input);
	output=b.tl+b.tm.repeat(width)+b.tr+"\n";
	for (let line of input.split("\n")) {
		let len=stringWidth(line);
		output+=`${b.l}${line}${" ".repeat(width-len)}${b.r}\n`
	}
	output+=b.bl+b.bm.repeat(width)+b.br;
});