
export interface TagAlias{
    name: String,
    type: String
}

export function getAlias(alias: String): TagAlias{
    var element = supportedAliases.find(el=> alias === el.name);
    if(element)
        return Object.assign({},element);
    else
        return {name: alias, type: "string"}
}

export const supportedAliases : TagAlias[] = [
    {
        name: "title",
        type: "string"
    },
    {
        name: "artist",
        type: "string"
    },
    {
        name: "language",
        type: "string"
    },
    
    {
        name: "album",
        type: "string"
    },
    
    {
        name: "genre",
        type: "string"
    },
    {
        name: "year",
        type: "number"
    },
    {
        name: "trackNumber",
        type: "number"
    },
    {
        name: "image",
        type: "image"
    },
    {
        name: "unsynchronisedLyrics",
        type: "lyrics"
    },
    {
        name: "composer",
        type: "string"
    },
    {
        name: "time",
        type: "time"
    },
    {
        name: "date",
        type: "date"
    },
    {
        name: "publisher",
        type: "string"
    }   
]

export const supportedAliasesNames =
             supportedAliases.map(el => el.name).sort();

export const aliasesPrototypes = {
    "string" : () => "",
    "number" : () => 2000,
    "time"   : () => new Date(),
    "date"   : () => new Date(),
    "lyrics" : () =>  { return { language: "en",
                                 text: "your lyrics" } },
    "image"  : () => { return {} }
    
}