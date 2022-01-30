# In Floop

In Floop is a "shor iso vi kod", as the cool kids say.

## Basics

In Floop has four variables, `n`, `o`, `r`, and `s`. You can "focus" a variable by typing its name:

    n
    
You can use `+` and `-` to increment or decrement the focused variable:

    n+

In Floop's control flow is its most important feature. If blocks look like this:

    s[n+]

Whatever's in the `[]` will be run, but only if the focused variable is not `0`.

As for looping, as the name of the language suggests, In Floop runs in an Inf(inite) Loop. Once you hit the end of the program, you cycle around to the start. Of course, you'll need a way to stop it, which is where `;` comes in:

    n+;

Once `;` is reached, the program will instantly stop, and the focused variable's contents will be outputted. To control when you stop, you'll want something along the lines of `[;]`. Speaking of output, you'll need to be able to take input too, which is where `?` comes in. It'll read one number or code point of a string from input, and store it in the focused variable. If no input is left, it won't do anything. Tough luck.

Oh, I should probably mention, `n` is initially focused. But be careful! When the program loops around, the focused variable is kept, so relying on `n` being focused at the start of the program might not be a good idea.

Now, we move on to the last of In Floop's important features: the array. In Floop has an infinite array, initially filled with `0`s. To access it, use `@`, which will focus a pointer to an index in the array (negative indics work, by the way). For example:

    n++@

In the above program, instead of a variable being focused, the item in the array at index `2` is. It'll behave identically to a variable. I promise.

Oh, and would you look at the time! I simply must be going. That's all of In Floop's 11 instructions, but you're on your own if you want to do anything useful with them. As a parting gift, here's an example program that doubles the first input:

    s+n[s-]s[n-?+[n-s-]s[o;]]n[-o++]
