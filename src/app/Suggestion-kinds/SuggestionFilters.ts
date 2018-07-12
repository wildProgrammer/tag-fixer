export interface TextFilter{
    apply(text: String) : String;
}

export class ClearTextBetweenCharsFilter implements TextFilter{
    constructor(private start: String, private end: String){}

    apply(text: String): String{
        console.log("APPLY")
        var buffer: String = "";
        var deleting: number = 0;
        for(let i=0; i<text.length; i++){
            if(text[i]===this.start){
                deleting++;
                
            }else if(text[i] === this.end){
                if(deleting > 0) deleting--;
            }else if(deleting === 0){
                buffer += text[i];
            }
        }
        console.log("BUFFER: " + buffer)
        return buffer;
    }
}

export class RemoveCharFilter implements TextFilter{
    constructor(private char: String){}

    apply(text: String): String{
        var buffer = "";
        for(var i=0; i<text.length; i++){
            if(text[i]!==this.char)
                buffer+=text[i];
        }
        return buffer;
    }
}


    