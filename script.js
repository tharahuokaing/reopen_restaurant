const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

// កំណត់ទំហំ Canvas តាមអេក្រង់
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ថ្នាក់បង្កើតភាគល្អិតកាំជ្រួច (Particle)
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        // បង្កើតទិសដៅផ្ទុះរាយប៉ាយ
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.friction = 0.95;
        this.gravity = 0.1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.015; // ឱ្យវាបាត់ទៅៗ
    }
}

let fireworks = [];

function createFirework(x, y) {
    const colors = ['#ff0055', '#00ffcc', '#ffcc00', '#ff6600', '#cc00ff', '#00ff00'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // បង្កើតភាគល្អិតចំនួន ៥០ សម្រាប់ការផ្ទុះមួយគ្រាប់
    for (let i = 0; i < 50; i++) {
        fireworks.push(new Particle(x, y, randomColor));
    }
}

// រង្វិលជុំគូរចលនា (Animation Loop)
function animate() {
    ctx.fillStyle = 'rgba(11, 12, 16, 0.2)'; // បង្កើតកន្ទុយព្រិលៗ
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            fireworks.splice(index, 1);
        } else {
            particle.update();
            particle.draw();
        }
    });

    requestAnimationFrame(animate);
}

// បាញ់កាំជ្រួចស្វ័យប្រវត្តិនរៀងរាល់ ១ វិនាទី
setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height * 0.6); // ឱ្យផ្ទុះនៅពាក់កណ្តាលអាកាសលើ
    createFirework(x, y);
}, 1000);

// បាញ់បន្ថែមពេលចុចប៊ូតុង
document.getElementById('celebrateBtn').addEventListener('click', () => {
    for(let i=0; i<3; i++) {
        setTimeout(() => {
            createFirework(Math.random() * canvas.width, Math.random() * (canvas.height * 0.5));
        }, i * 200);
    }
});

// ចាប់ផ្តើមដំណើរការចលនា
animate();
