<script>
    // Efeito de partículas para o fundo
    class Particle {
        constructor(canvas, ctx) {
            this.canvas = canvas;
            this.ctx = ctx;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = this.getRandomColor();
        }

        getRandomColor() {
            const colors = [
                'rgba(16, 185, 129, 0.6)', // AI color
                'rgba(14, 165, 233, 0.6)', // Cloud color
                'rgba(245, 158, 11, 0.6)'  // Dev color
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebater nas bordas
            if (this.x > this.canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > this.canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }

        draw() {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    class ParticleNetwork {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.numberOfParticles = 100;
            this.maxDistance = 100;

            this.initCanvas();
            this.createParticles();
            this.animate();

            window.addEventListener('resize', () => this.resizeCanvas());
        }

        initCanvas() {
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.canvas.style.zIndex = '-1';
            this.canvas.style.pointerEvents = 'none';
            document.body.prepend(this.canvas);

            this.resizeCanvas();
        }

        resizeCanvas() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        createParticles() {
            this.particles = [];
            for (let i = 0; i < this.numberOfParticles; i++) {
                this.particles.push(new Particle(this.canvas, this.ctx));
            }
        }

        drawConnections() {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.maxDistance) {
                        const opacity = 1 - (distance / this.maxDistance);
                        this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.stroke();
                    }
                }
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Atualizar e desenhar partículas
            this.particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Desenhar conexões
            this.drawConnections();

            requestAnimationFrame(() => this.animate());
        }
    }

    // Inicializar quando o DOM estiver carregado
    document.addEventListener('DOMContentLoaded', () => {
        new ParticleNetwork();
    });
</script>