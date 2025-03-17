document.addEventListener("DOMContentLoaded", function() {

    const container = document.getElementById("container");
    const button1 = document.getElementById("button1");
    const firstScreen = document.querySelector(".screen_one");
    const thirdScreen = document.querySelector(".third_screen");
    const images = document.querySelectorAll('.age_img');
    const arrow = document.querySelector(".arrow"); 
    const elips = document.querySelector(".elips"); 
    const secScreen = document.querySelector(".second_screen"); 
    const houseButton = document.querySelector(".house_container"); 
    const triangles = document.querySelector(".triangles"); 


    
    let index = 0;
     
    const texts = [
        {
            element: document.getElementById('min_left_text'),
            text: "Our platform offers an immersive journey into recollection, featuring dynamic typography, visual storytelling, and a unique navigation system that allows users to explore time in a new way. Every memory matters, and Undoframe ensures they remain alive."
        },
        {
            element: document.getElementById('min_right_text'),
            text: "Through a simple yet immersive interface, users can navigate memories, explore forgotten fragments, and rediscover the emotions tied to them. Every element of Undoframe is designed to preserve what time tries to erase."
        }
    ];

    async function typeWriter({ element, text }) {
        element.textContent = '';
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await new Promise(resolve => setTimeout(resolve, 50)); 
        }
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        requestAnimationFrame(() => typeWriter({ element, text })); 
    }

    texts.forEach(typeWriter);

   
    const numRectangles = 6;
    
    for (let i = 0; i < numRectangles; i++) {
        let rect = document.createElement("div");
        rect.classList.add("rectangle");
        let size = 10 + i * 5;
        rect.style.width = `${size}vw`;
        rect.style.height = `${size * 0.75}vw`;
        rect.style.animation = `rotate 4s linear infinite`;
        rect.style.animationDelay = `${i * 0.2}s`;
        rect.style.borderColor = `white`;
        container.appendChild(rect);
    }

    let angle = 0;
    function animate() {
        angle += 1;
        document.querySelectorAll(".rectangle").forEach((rect, index) => {
            let direction = index % 2 === 0 ? 1 : -1;
            rect.style.transform = `translate(-50%, -50%) rotate(${angle * direction}deg)`;
        });
        requestAnimationFrame(animate);
    }
    animate(); 

    button1.addEventListener("click", function () {
        firstScreen.style.display = "none";
        thirdScreen.style.display = "none";
        secScreen.style.display = "block"; 
    });

    function morphImages() {
    images.forEach(img => img.classList.remove('active')); 
    images[index].classList.add('active'); 
    index = (index + 1) % images.length; 
}

setInterval(morphImages, 3000);

elips.addEventListener("click", () => {

    setTimeout(() => {
        arrow.style.transition = "transform 1s ease-in-out";
        arrow.style.transform = "rotate(360deg)";
    }, 10);

    setTimeout(() => {
        secScreen.style.display = "none";
        thirdScreen.style.display = "block";
    }, 1000); 
});

houseButton.addEventListener("click", function () {
    thirdScreen.style.display = "none";
    secScreen.style.display = "none"; 
    firstScreen.style.display = "block"; 
});


document.addEventListener("mousemove", (e) => {
    const arrow1 = document.querySelector(".arrow_red1");
    const arrow2 = document.querySelector(".arrow_red2");

    if (!arrow1 || !arrow2) return;

    // Берем родительский контейнер `.arrow_red`
    const arrowContainer = document.querySelector(".arrow_red");
    const rect = arrowContainer.getBoundingClientRect();
    
    // Центр стрелки
    const arrowX = rect.left + rect.width / 2;
    const arrowY = rect.top + rect.height / 2;

    // Вычисляем угол поворота к курсору
    const angle = Math.atan2(e.clientY - arrowY, e.clientX - arrowX) * (180 / Math.PI);

    // Применяем вращение
    arrow1.style.transform = `rotate(${angle}deg)`;
    arrow2.style.transform = `rotate(${angle}deg)`;
});

const arms = document.querySelector(".arms_move");

document.addEventListener("mousemove", (e) => {
  let moveAmount = (e.clientX / window.innerWidth - 0.5) * 20;
  arms.style.transform = `rotate(${moveAmount}deg)`;
});


triangles.addEventListener('click', function() {
    this.classList.toggle('zoomed');
});
    
});
