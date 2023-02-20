# cmd-style
A super simplecommand line tool for styling text

## Example
Centered bold text with a red foreground and a blue background:
```bash
echo Hello World! | style bold | style fg red | style bg blue | style center
```
Output:  
![image](https://user-images.githubusercontent.com/35741152/219922570-e20bbfa7-b9d1-4136-a8b5-0bba5547aebd.png)

__NOTE__: If you pipe `style center` into something, it will center the text, but not in the center of the screen.