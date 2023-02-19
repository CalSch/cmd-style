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
	output=`\x1b[${codes[color]}m${input}\x1b[0m`;
});

app.command("bg <color>").action(function(color) {
	let codes={
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
	output=`\x1b[${codes[color]}m${input}\x1b[0m`;
});

app.command("center").action(function(){
	let s=process.stdout.getWindowSize()
	for (let line of input.split("\n")) {
		output+=`\x1b[${Math.floor(s[0]/2-stringWidth(line)/2)}G${line}\n`
	}
});

app.command("pad [x] [y]").action(function(x,y) {
	x=x||1;
	y=y||0;
	output=`${"\n".repeat(y)}${" ".repeat(x)}${input}${"\n".repeat(y)}${" ".repeat(x)}`
});