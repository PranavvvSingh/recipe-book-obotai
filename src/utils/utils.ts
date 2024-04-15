export function stripHtml(htmlString: string) {
   // This regular expression finds HTML tags and replaces them with an empty string
   return htmlString.replace(/<[^>]*>/g, "")
}
export function getFirstLine(text: string) {
   // Split the string into an array of lines and return the first one
   return text.split(".")[0]+"."
}

export function splitContent(text: string){
   return text.replace(/<[^>]*>/g, "").split(".")
}
