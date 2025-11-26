//------------------------------------------------------ Setup

AOS.init();
gsap.registerPlugin(ScrollTrigger);

//------------------------------------------------------ Only Wide Screen

const _onlyWideScreen = document.getElementById("onlyWideScreen");
const html = document.documentElement

function onlyWideScreen() {
    const [w, h] = [window.innerWidth, window.innerHeight];
    if (w > h) { // PC
        html.classList.remove("overflow-hidden");
        _onlyWideScreen.style.display = 'none'
    } else { // Phone
        html.classList.add("overflow-hidden");
        _onlyWideScreen.style.display = 'flex'
    }
}

window.addEventListener("load", () => { onlyWideScreen() })
window.addEventListener("resize", () => { onlyWideScreen() })

//------------------------------------------------------ Header

const _hero = document.getElementById("hero");
if (_hero) {
    const gridBgMove = document.querySelector(".grid-bg-move");
    document.addEventListener("mousemove", e => {
        if (gridBgMove) {
            gridBgMove.style.setProperty("--x", `${e.clientX}px`);
            gridBgMove.style.setProperty("--y", `${e.clientY + window.scrollY}px`);
        }
    });
}

//------------------------------------------------------ About

const _about = document.getElementById("about");
if (_about) {
    const about_text = document.getElementById("about-text");
    const about_text_typewriter = new Typewriter(about_text, { delay: 0 })
        .typeString("Experienced Back Office Specialist at Sales Buzz with a strong background in the outsourcing and offshoring industry. Skilled in ERP systems, computer software training, operations handling, and PHP development. Demonstrated ability to support and streamline backend processes with efficiency and precision.")
        .typeString("<br><br> Fluent in English and Arabic, with excellent communication skills that bridge technical and business needs across diverse teams and clients. Known for being a reliable team player and problem-solver, with hands-on experience navigating dynamic environments.")
        .typeString("<br><br> Proud holder of a Bachelor\\'s degree in Management Information Systems from Maadi Modern Academy, blending technical expertise with strategic thinking to deliver results.");

    ScrollTrigger.create({
        trigger: about_text,
        start: "top 80%",
        once: true,
        onEnter: () => {
            about_text_typewriter.start();
            sphereAnimation()
        },
    });

    function sphereAnimation() {
        const sphereEl = document.querySelector('#sphere-animation');
        const spherePathEls = sphereEl?.querySelectorAll('.sphere path');

        if (!spherePathEls || spherePathEls.length === 0) return;

        const breathTweens = Array.from(spherePathEls).map(el => {
            return gsap.fromTo(el,
                {
                    translateX: 2,
                    translateY: 2,
                    stroke: 'rgba(255,255,255,0.3)'
                },
                {
                    translateX: -4,
                    translateY: -4,
                    stroke: 'rgba(255,255,255,0.2)',
                    duration: 1,
                    paused: true,
                    ease: "power2.out"
                }
            );
        });

        gsap.ticker.add((time, deltaTime, frame) => {
            const timeInMs = Date.now();
            breathTweens.forEach((tween, i) => {
                const percent = (1 - Math.sin((i * 0.35) + (0.0022 * timeInMs))) / 2;
                tween.progress(percent);
            });
        });

        spherePathEls.forEach(el => {
            const len = el.getTotalLength();
            gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
        });

        gsap.to(spherePathEls, {
            strokeDashoffset: 0,
            duration: 3.9,
            ease: "circ.inOut",
            stagger: {
                each: 0.19,
                from: "end"
            }
        });

        gsap.to('#sphereGradient', {
            attr: { x1: '25%', x2: '25%', y1: '0%', y2: '75%' },
            duration: 30,
            ease: "power4.out"
        });
    }
}

//------------------------------------------------------ Experience

const _experiences = document.getElementById("experiences");
if (_experiences) {
    const experiencesCardGroup = document.querySelector("#experiences #timeline #card-group");
    experiences.map((ex, index) => {
        const isLeft = index % 2 === 0;
        if (experiencesCardGroup) experiencesCardGroup.innerHTML += `
        <div id="card" class="w-full lg:max-w-7xl relative ${isLeft ? 'pe-10 justify-start' : 'ps-10 justify-end'} flex items-center min-h-[40vh]">
          
          <!-- Card Content -->
          <div class="w-1/2">
            <div class="backdrop-blur-md border border-white/25 bg-white/5 p-6 rounded-lg shadow-all-md hover:shadow-all-lg transition-all duration-500">
              
              <h3 class="text-2xl font-en-heading font-semibold text-white">${ex.title}</h3>
              <h4 class="text-lg font-en-heading text-white/80">${ex.company}</h4>
              <p class="text-sm text-white/60">${ex.location || ''} ${ex.work_mode ? `• ${ex.work_mode}` : ''}</p>
              
              <div class="text-xs text-white/50 mt-2">
                ${ex.start_date} — ${ex.end_date}
              </div>
    
              <div class="mt-3 flex flex-wrap gap-2">
                ${ex.skills?.slice(0, 5).map(skill => `
                  <span class="px-2 py-1 text-xs rounded-full bg-white/10 border border-white/20">${skill}</span>
                `).join('')}
              </div>
            </div>
          </div>
    
          <!-- Timeline Line -->
          <div class="w-5 h-px absolute left-1/2 ${isLeft ? '-translate-x-full' : ''} bg-white/50 rounded-full"></div>
        </div>
      `;
    });

    const timelineLine = document.querySelector("#experiences #timeline-line");

    if (timelineLine && experiencesCardGroup) {
        timelineLine.style.height = `${experiencesCardGroup.offsetHeight}px`;
        window.addEventListener('resize', () => { timelineLine.style.height = `${experiencesCardGroup.offsetHeight}px`; })
    }

    let experiences_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#experiences',
            end: 'bottom 50%',
            scrub: 1,
        }
    });

    experiences_tl
        .to('#experiences #header h2', { letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)' }, 0)
        .from('#experiences #timeline', { y: '100%', overflow: 'hidden' }, "myLabel>+=1")
        .to('#experiences #timeline', { y: 0, overflow: 'auto' }, "myLabel+=1")
}

//------------------------------------------------------ Skills

const _skills = document.getElementById("skills");
if (_skills) {
    let skills_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#skills',
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
        }
    });

    skills_tl
        .to('#skills #window', { width: 0, height: '100vh' }, 0)
        .to('#skills #window', { width: '100vw' }, "myLabel>+=1")
        .to('#skills #window', { width: 0, height: '100vh' }, "+=5")
        .to('#skills #window', { width: 0, height: 0 }, "myLabel+=1")

    const space_canvas = document.getElementById('starfieldCanvas');
    const ctx = space_canvas.getContext('2d');

    space_canvas.width = window.innerWidth;
    space_canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        space_canvas.width = window.innerWidth;
        space_canvas.height = window.innerHeight;
    });

    class Star {
        constructor() {
            this.x = Math.random() * space_canvas.width - space_canvas.width / 2;
            this.y = Math.random() * space_canvas.height - space_canvas.height / 2;
            this.z = Math.random() * space_canvas.width;
            this.radius = 1;
            this.speed = 0.5;
        }

        update() {
            this.z -= this.speed;
            if (this.z < 1) {
                this.z = space_canvas.width;
                this.x = Math.random() * space_canvas.width - space_canvas.width / 2;
                this.y = Math.random() * space_canvas.height - space_canvas.height / 2;
            }
        }

        draw(ctx) {
            const scale = space_canvas.width / this.z;
            const screenX = this.x * scale + space_canvas.width / 2;
            const screenY = this.y * scale + space_canvas.height / 2;

            ctx.beginPath();
            ctx.arc(screenX, screenY, 0.5, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }

    const stars = [];
    const numStars = 1000;

    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }

    function animate() {
        ctx.clearRect(0, 0, space_canvas.width, space_canvas.height);

        stars.forEach(star => {
            star.update();
            star.draw(ctx);
        });

        requestAnimationFrame(animate);
    }

    animate();

    let space_canvas_names = _skills.querySelector('#plants');

    window.addEventListener('mousemove', e => {
        space_canvas.style.translate = `${((e.clientX - window.innerWidth / 2) * -0.1) - (space_canvas.width / 2)}px ${((e.clientY - window.innerHeight / 2) * -0.1) - (space_canvas.height / 2)}px`;
        space_canvas_names.style.translate = `${((e.clientX - window.innerWidth / 2) * -0.1) - (space_canvas.width / 2)}px ${((e.clientY - window.innerHeight / 2) * -0.1) - (space_canvas.height / 2)}px`;
    })

    const placed = [];
    const minDistance = 6;

    function addSkills(skill, i) {
        let x, y;
        let attempts = 0;
        const maxAttempts = 50;
        let collision = true;

        while (collision && attempts < maxAttempts) {
            x = 5 + Math.random() * 90;
            y = 5 + Math.random() * 90;
            collision = false;

            for (let pos of placed) {
                const dx = x - pos.x;
                const dy = y - pos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < minDistance) {
                    collision = true;
                    break;
                }
            }
            attempts++;
        }

        placed.push({ x, y });

        const point = document.createElement("div");
        point.className = `absolute z-10 cursor-pointer opacity-20 min-w-fit w-0 active:opacity-100 hover:opacity-100 whitespace-nowrap max-w-fit flex justify-center items-center group p-2 border duration-300 overflow-hidden rounded-full`;

        if (x > 50) point.dir = "rtl";

        x < 50 ? point.style.left = x + "%" : point.style.right = (100 - x) + "%";
        point.style.top = y + "%";

        const dot = document.createElement("div");
        dot.className = "size-3 bg-white rounded-full";
        point.appendChild(dot);

        const p = document.createElement("p");
        p.className = "opacity-0 w-0 max-w-0 group-hover:w-[1000px] group-active:w-[1000px] group-hover:max-w-fit group-active:max-w-fit group-hover:opacity-100 group-active:opacity-100 group-hover:ms-2 group-active:ms-2 duration-300 leading-0";
        p.textContent = skill;

        point.appendChild(p);
        space_canvas_names.appendChild(point);
    }

    allSkills.forEach(addSkills);
}

//------------------------------------------------------ Projects

const _projects = document.getElementById("projects");
if (_projects) {
    const ring = document.getElementById("ring");

    projects.forEach((p, i) => {
        const card = document.createElement("div");
        card.className = `min-w-md ${i % 2 === 0 ? 'lg:-translate-y-1/4' : 'lg:translate-y-1/4'} h-full lg:min-h-[40vh] lg:h-[40vh] backdrop-blur-xs bg-white/5 text-white p-5 rounded-xl shadow-xl flex flex-col gap-2.5 lg:gap-5`;

        card.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${p.companyLogo ?? ""}" class="w-10 h-10 rounded-full object-cover" onerror="this.onerror=null; this.src='Abdallh/media/linkedin.png';" />
                <div>
                    <h2 class="font-bold text-lg leading-tight">${p.title}</h2>
                    <p class="text-xs opacity-70">${p.company ?? ""}</p>
                </div>
            </div>
            <p class="text-sm opacity-80 line-clamp-4">${p.description ?? ""}</p>
            <div class="flex flex-wrap gap-2">
                ${p.skills && p.skills.map(skill => `<span class="px-2 py-1 text-xs rounded-full bg-white/10 border border-white/20">${skill}</span>`).join('')}
            </div>
            <p class="text-xs opacity-60 mt-auto">${p.date ?? ""}</p>
        `;

        ring.appendChild(card);
    });
}

//------------------------------------------------------ Recommendations

const _recommendations = document.getElementById("recommendations");
if (_recommendations) {
    const contentDiv = _recommendations.querySelector("#content");

    const cardsContainer = document.createElement("div");
    cardsContainer.id = "recommendations-cards";
    cardsContainer.className = "absolute w-1/2 h-full flex flex-col gap-10 items-center p-10 overflow-y-auto scrollbar-fit mask-y-from-90% mask-y-to-100%";

    recommendations.forEach((rec, i) => {
        const card = document.createElement("div");
        card.className = `w-[70%] max-w-2xl min-h-fit backdrop-blur-md bg-black border border-white/20 p-8 first:mt-[15vh] rounded-3xl flex flex-col gap-6 overflow-hidden group hover:border-white/40 transition-all duration-500 shadow-2xl`;
        card.style.zIndex = recommendations.length + i;
        // card.style.top = `${i*10}px`;

        card.innerHTML = `            
            <div class="flex items-start gap-5 z-10">
                <img src="${rec.imageUrl}" alt="${rec.name}" class="w-20 h-20 rounded-full object-cover border-4 border-white/30 shadow-lg shrink-0" onerror="this.src='https://via.placeholder.com/100'"/>
                <div class="grow">
                    <h3 class="text-2xl font-bold text-white mb-1">${rec.name}</h3>
                    <p class="text-xs text-white/70 line-clamp-2 leading-relaxed">${rec.headline}</p>
                </div>
            </div>

            <div class="grow z-10 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2 max-h-[40vh]">
                <div class="flex items-start gap-2 mb-3">
                    <i class="fas fa-quote-left text-3xl text-white/30 mt-1"></i>
                </div>
                <p class="text-base text-white/90 leading-relaxed italic">"${rec.recommendationText}"</p>
                <div class="flex justify-end mt-2">
                    <i class="fas fa-quote-right text-3xl text-white/30"></i>
                </div>
            </div>

            <div class="mt-auto pt-5 border-t border-white/20 z-10 space-y-2">
                <p class="text-xs text-white/50">${rec.relationship || 'Professional Connection'}</p>
                <a href="${rec.profileUrl}" target="_blank" class="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    <span>View LinkedIn Profile</span>
                    <i class="fas fa-external-link-alt text-xs"></i>
                </a>
            </div>
        `;
        cardsContainer.appendChild(card);
    });

    contentDiv.appendChild(cardsContainer);
}

//------------------------------------------------------ Contact

const _contact = document.getElementById("contact");
if (_contact) {
    let confettiFired = false;

    ScrollTrigger.create({
        trigger: "#contact",
        start: "top 70%",
        onEnter: () => {
            if (!confettiFired && typeof confetti === 'function') {
                const duration = 3 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

                function randomInRange(min, max) {
                    return Math.random() * (max - min) + min;
                }

                const interval = setInterval(function () {
                    const timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    const particleCount = 50 * (timeLeft / duration);

                    confetti(Object.assign({}, defaults, {
                        particleCount,
                        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                        colors: ['#ffffff']
                    }));
                    confetti(Object.assign({}, defaults, {
                        particleCount,
                        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                        colors: ['#ffffff']
                    }));
                }, 250);
            }
        }
    });
}
