document.getElementById("compare-btn").addEventListener("click", function(){
   
    let expectedOutput = document.getElementById("expected").value;
    let actualOutput = document.getElementById("actual").value;
    let resultList = document.getElementById("result");
    

    resultList.innerHTML = "";

    if (expectedOutput.trim() === "" && actualOutput.trim() === "") {
        alert("Please enter text to compare");
        return;
    }
    
    
    if (expectedOutput.trim() === "") {
        alert("Please enter text in the Expected output area");
        return;
    }
    
    
    if (actualOutput.trim() === "") {
        alert("Please enter text in the Actual output area.");
        return;
    }
    
   
    let expectedLines = expectedOutput.split(/\r?\n/);
    let actualLines = actualOutput.split(/\r?\n/);
    
  
    let maxLines = Math.max(expectedLines.length, actualLines.length);
    let differences = [];
    
   
    for (let i = 0; i < maxLines; i++) {
        
        let expectedLine = expectedLines[i] || "";
        let actualLine = actualLines[i] || "";
        
        
        if (expectedLine !== actualLine) {
        
            differences.push("Line " + (i + 1) + ": < " + expectedLine + " > " + actualLine);
        }
    }
    
   
    if (expectedLines.length !== actualLines.length) {
        differences.push("Lengths differ: < " + expectedLines.length + ", > " + actualLines.length);
    }
    
   
    if (differences.length === 0) {
       
        let li = document.createElement("li");
        li.textContent = "No differences found";
        resultList.appendChild(li);
        
        
        resultList.className = "nochange";
    } else {
       
        let headerMessage = document.createElement("div");
        headerMessage.textContent = "Texts are different";
        headerMessage.style.fontWeight = "bold";
        headerMessage.style.marginBottom = "10px";
        resultList.appendChild(headerMessage);
        
   
        for (let i = 0; i < differences.length; i++) {
            let li = document.createElement("li");
            li.textContent = differences[i];
            resultList.appendChild(li);
        }
        
      
        resultList.className = "change";
    }
});


document.getElementById("clear-btn").addEventListener("click", function(){
  
    document.getElementById("expected").value = "";
    document.getElementById("actual").value = "";
    
    
    let resultList = document.getElementById("result");
    resultList.innerHTML = "";
    
  
    resultList.className = "";
});