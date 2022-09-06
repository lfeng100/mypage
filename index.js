let descriptorElement = document.getElementById("descriptorElement");
let descriptors = ["luminary", "entrepreneur", "activist", "trendsetter", "innovator"];
descriptorElement.addEventListener("click", function(){
  let randNum = Math.floor(Math.random() * 5);
  element.innerHTML = descriptors[randNum];
  element.href = "https://www.merriam-webster.com/dictionary/" + descriptors[randNum];
});
