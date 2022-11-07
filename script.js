// function generateHashtag(str) {
//   let strSplit = str.split(" ");
//   console.log(strSplit);
//   function capitalizeWords(element) {
//     return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
//   }
//   let result = strSplit.map(capitalizeWords);
//   console.log(result);
//   let finishResult = result.join("");
//   return "#" + finishResult;
// }

// generateHashtag("Hello world");

function generateHashtag(str) {
  if (str =='' || str.length > 140){
    return false;
  }
  const stringWithCamelCase = str
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');
  return "#" + stringWithCamelCase;
}

console.log(generateHashtag(""))
