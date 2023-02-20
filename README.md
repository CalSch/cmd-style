# cmd-style
A super simplecommand line tool for styling text

## Examples
Centered bold text with a red foreground and a blue background:
```bash
echo Hello World! | style bold | style fg red | style bg blue | style center
```
Output:  
![image](https://user-images.githubusercontent.com/35741152/219922570-e20bbfa7-b9d1-4136-a8b5-0bba5547aebd.png)

Padded text from FIGlet with a red background, padded again, with a round border, padded _again_, and centered.
```bash
figlet "Hello World!" | style pad 4 1 | style bg red | style pad 3 1 | style border round | style pad 1 12 | style center
```

Output:
![image](https://user-images.githubusercontent.com/35741152/220005973-24bbf36b-4644-4f66-b94e-2bfd2aa74212.png)


__NOTE__: If you pipe `style center` into something, it will center the text, but not in the center of the screen.
