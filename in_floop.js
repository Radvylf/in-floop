var in_floop = async (code, input, logging = 0) => {
    var instrs = code.split("").filter(x => !["\t", "\n", "\r", "\f", " "].includes(x));
    
    var inc_instr = instrs.find(i => !["[", "]", "n", "o", "r", "s", "+", "-", "@", "?", ";"].includes(i));
    
    if (inc_instr)
        throw "Instr: '" + inc_instr + "' (0x" + inc_instr.toString(16).padStart(2, "0") + ")";
    
    var format = (input) => {
        if (Array.isArray(input))
            return input.flatMap(x => format(x));
        
        if (typeof input == "string")
            return [...input].map(x => BigInt(x.codePointAt()));
        
        if (typeof input == "number" && !Number.isNaN(input) && Number.isFinite(input)) {
            if (!Number.isSafeInteger(input))
                throw "Input: '" + String(input) + "' (type '" + (typeof input) + "', !Number.isSafeInteger)";
            
            return [BigInt(input)];
        }
        
        if (typeof input == "bigint")
            return [input];
        
        if (typeof input == "boolean")
            return input ? [1n] : [0n];
        
        if (input == null)
            return [];
        
        throw "Input: '" + String(input) + "' (type '" + (typeof input) + "')";
    };
    
    var vars = {
        n: 0n,
        o: 0n,
        r: 0n,
        s: 0n
    };
    
    var stors = {};
    
    var inputs = format(input);
    
    var focus = "n";
    var focus_stor = 0;
    
    var instr_count = BigInt(instrs.length);
    
    var instr = 0n;
    
    var stop = 0;
    
    if(logging) logging.stop = () => (stop = 1);
    
    var i, d;
    
    while (!stop) {
        if (logging && !(logging.instrs && !logging.instrs.some(i => (BigInt(i) % instr_count + instr_count) % instr_count == instr)))
            console.log(instrs[instr], focus_stor ? "@" + String(focus) : focus, vars);
        
        switch (instrs[instr]) {
            case "[":
                if (focus_stor ? stors[focus] == 0n : vars[focus] == 0n) {
                    d = 1n;

                    for (i = instr + 1n; i < instr_count; i++) {
                        if (instrs[i] == "[")
                            d++;
                        if (instrs[i] == "]")
                            d--;

                        if (d == 0n)
                            break;
                    }

                    instr = i;
                }
                
                break;
            case "]":
                break;
            case "n":
                focus = "n";
                focus_stor = 0;
                
                break;
            case "o":
                focus = "o";
                focus_stor = 0;
                
                break;
            case "r":
                focus = "r";
                focus_stor = 0;
                
                break;
            case "s":
                focus = "s";
                focus_stor = 0;
                
                break;
            case "+":
                if (focus_stor) {
                    stors[focus] = (focus in stors) ? stors[focus] + 1n : 1n;
                    
                    break;
                }
                
                vars[focus] += 1n;
                
                break;
            case "-":
                if (focus_stor) {
                    stors[focus] = (focus in stors) ? stors[focus] - 1n : -1n;
                    
                    break;
                }
                
                vars[focus] -= 1n;
                
                break;
            case "@":
                focus = focus_stor ? ((focus in stors) ? stors[focus] : 0n) : vars[focus];
                focus_stor = 1;

                break;
            case "?":
                if (inputs.length) {
                    if (focus_stor) {
                        stors[focus] = inputs.shift();

                        break;
                    }

                    vars[focus] = inputs.shift();
                }
                
                break;
            case ";":
                stop = 1;
                
                break;
        }
        
        if (logging)
            await new Promise((r) => setTimeout(r, (
                logging.instrs && !logging.instrs.some(i => (BigInt(i) % instr_count + instr_count) % instr_count == instr)
            ) ? 0 : logging.tick ?? 1000 / 2));
        
        if (++instr % instr_count == 0n) {
            instr = 0n;
            
            if (!logging)
                await new Promise((r) => setTimeout(r, 0));
        }
    }
    
    if (focus_stor)
        return stors[focus];

    return vars[focus];
};
