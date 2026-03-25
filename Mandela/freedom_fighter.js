document.addEventListener("DOMContentLoaded", function() {

     const mainGallery = document.querySelector(".pics");
    const favoritesArea = document.querySelector(".favourites");
    const actionsList = document.getElementById("actions");
    const counterSpan = document.getElementById("counter");
 
    let selectedCount = 0;
    let totalImages = 0;

    if (mainGallery) {
    const images = mainGallery.querySelectorAll("img");
    totalImages = images.length;
    counterSpan.textContent = totalImages;
    }
     
    function updateCounter() {
        const remaining = totalImages - selectedCount;
        counterSpan.textContent = remaining;
        
      
        if (remaining === 0) {
            setTimeout(() => {
                alert("Congratulations! All images have been selected!");
            }, 100);
        }
    }
    
  
    function addAction(message) {
        const listItem = document.createElement("li");
        listItem.textContent = message;
        actionsList.appendChild(listItem);
        
        listItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
   
   
    function moveToFavorites(imageElement, imageNumber) {

        if (imageElement.classList.contains("selected")) {
            return;
        }
   
        imageElement.classList.add("selected");
        imageElement.style.border = "3px solid #4CAF50";
        
        if (!imageElement.dataset.originalOrder) {
            const children = Array.from(mainGallery.children);
            imageElement.dataset.originalOrder = children.indexOf(imageElement);
        }
     
        const clonedImage = imageElement.cloneNode(true);
        clonedImage.classList.add("selected");
        clonedImage.style.border = "3px solid #4CAF50";
    
        favoritesArea.appendChild(clonedImage);

        imageElement.remove();
        
        selectedCount++;
        updateCounter();
    
        const imageName = clonedImage.src.split("/").pop();
        
        addAction(`Moved ${imageName} to favorites (Favorite #${selectedCount})`);
    
        alert(`Image ${imageNumber} selected as favorite number ${selectedCount}`);
      
        if (clonedImage.alt) {
            clonedImage.title = clonedImage.alt;
        }
   
        clonedImage.addEventListener("click", function(event) {
            event.stopPropagation();
            revertToMain(this, imageNumber);
        });
    }
 
    function revertToMain(imageElement, imageNumber) {

        const clonedImage = imageElement.cloneNode(true);
        clonedImage.classList.remove("selected");
        clonedImage.style.border = "none";

        const originalOrder = imageElement.dataset.originalOrder;
        const children = Array.from(mainGallery.children);
        
        if (originalOrder && originalOrder < children.length) {
            mainGallery.insertBefore(clonedImage, children[originalOrder]);
        } else {
            mainGallery.appendChild(clonedImage);
        }
    
        imageElement.remove();
  
        selectedCount--;
        updateCounter();
    
        const imageName = clonedImage.src.split("/").pop();
   
        addAction(`Reverted ${imageName} back to main gallery`);
    
        alert(`Image ${imageNumber} has been reverted to main gallery`);
       
        clonedImage.addEventListener("click", function() {
            moveToFavorites(this, imageNumber);
        });
   
        if (clonedImage.alt) {
            clonedImage.title = clonedImage.alt;
        }
    }
   
    if (mainGallery) {
        const allImages = mainGallery.querySelectorAll("img");
        
        allImages.forEach((image, index) => {
            const imageNumber = index + 1;
        
            image.style.width = "150px";
            image.style.height = "150px";
            image.style.objectFit = "cover";
            image.style.margin = "10px";
            image.style.cursor = "pointer";
            image.style.borderRadius = "12px";
            image.style.transition = "all 0.3s ease";
        
            image.addEventListener("mouseenter", function() {
                this.style.transform = "scale(1.08)";
            });
            
            image.addEventListener("mouseleave", function() {
                this.style.transform = "scale(1)";
            });
          
            if (image.alt) {
                image.title = image.alt;
            }
     
            image.dataset.imageNumber = imageNumber;
          
            image.addEventListener("click", function() {
                moveToFavorites(this, imageNumber);
            });
        });
    }
  
    updateCounter();
 
    addAction("Gallery loaded! Click any image to add to favorites");
    addAction("Click images in favorites to revert them back");
});