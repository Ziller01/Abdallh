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
        .typeString('Experienced Back Office Specialist at Sales Buzz with a strong background in the outsourcing and offshoring industry. Skilled in ERP systems, computer software training, operations handling, and PHP development. Demonstrated ability to support and streamline backend processes with efficiency and precision.')
        .typeString('<br><br> Fluent in English and Arabic, with excellent communication skills that bridge technical and business needs across diverse teams and clients. Known for being a reliable team player and problem-solver, with hands-on experience navigating dynamic environments.')
        .typeString('<br><br> Proud holder of a Bachelor’s degree in Management Information Systems from Maadi Modern Academy, blending technical expertise with strategic thinking to deliver results.');

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

        let sphereEl = document.querySelector('#sphere-animation');
        let spherePathEls = sphereEl?.querySelectorAll('.sphere path');
        let pathLength = spherePathEls?.length;
        let aimations = [];


        let breathAnimation = anime({
            begin: function () {
                for (let i = 0; i < pathLength; i++) {
                    aimations.push(anime({
                        targets: spherePathEls[i],
                        stroke: { value: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.2)'], duration: 500 },
                        translateX: [2, -4],
                        translateY: [2, -4],
                        easing: 'easeOutQuad',
                        autoplay: false
                    }));
                }
            },
            update: function (ins) {
                aimations.forEach(function (animation, i) {
                    let percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
                    animation.seek(animation.duration * percent);
                });
            },
            duration: Infinity,
            autoplay: false
        });

        let introAnimation = anime.timeline({
            autoplay: false
        })
            .add({
                targets: spherePathEls,
                strokeDashoffset: {
                    value: [anime.setDashoffset, 0],
                    duration: 3900,
                    easing: 'easeInOutCirc',
                    delay: anime.stagger(190, { direction: 'reverse' })
                },
                duration: 2000,
                delay: anime.stagger(60, { direction: 'reverse' }),
                easing: 'linear'
            }, 0);

        let shadowAnimation = anime({
            targets: '#sphereGradient',
            x1: '25%',
            x2: '25%',
            y1: '0%',
            y2: '75%',
            duration: 30000,
            easing: 'easeOutQuint',
            autoplay: false
        }, 0);

        function init() {
            introAnimation.play();
            breathAnimation.play();
            shadowAnimation.play();
        }

        init();

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

    let experiences_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#experiences',
            end: 'bottom 50%',
            scrub: 1,
            // markers: true,
            onEnter: () => {
                timelineLine.classList.remove('h-screen');
                timelineLine.style.height = `${experiencesCardGroup.offsetHeight}px`;
            },
            onEnterBack: () => {
                timelineLine.style.height = `${experiencesCardGroup.offsetHeight}px`;
            }
        }
    });

    experiences_tl
        .to('#experiences #header h2', { letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)' })
        .from('#experiences #timeline', { y: '100%', overflow: 'hidden' })
        .to('#experiences #timeline', { y: 0, overflow: 'auto' })
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
            // markers: true
        }
    });

    skills_tl
        // .to('#skills #window', { width: '100vw' })
        // .to('#skills #window', { width: '0vw', height: '100vh' }, "+=5")
        // .to('#skills #window', { height: 0 }, "myLabel+=1")
        .to('#skills #window', { width: 0, height: '100vh' }, 0)
        .to('#skills #window', { width: '100vw' }, "myLabel>+=1")
        .to('#skills #window', { width: 0, height: '100vh' }, "+=5")
        .to('#skills #window', { width: 0, height: 0 }, "myLabel+=1")



    // ----- Space Effect

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
            this.x = Math.random() * space_canvas.width - space_canvas.width / 2; // Relative to center
            this.y = Math.random() * space_canvas.height - space_canvas.height / 2;
            this.z = Math.random() * space_canvas.width; // Depth
            this.radius = 1;
            this.speed = 0.5;
        }

        update() {
            this.z -= this.speed;
            if (this.z < 1) { // Reset if star goes "past" the viewer
                this.z = space_canvas.width;
                this.x = Math.random() * space_canvas.width - space_canvas.width / 2;
                this.y = Math.random() * space_canvas.height - space_canvas.height / 2;
            }
        }

        draw(ctx) {
            const scale = space_canvas.width / this.z; // Perspective scaling
            const screenX = this.x * scale + space_canvas.width / 2;
            const screenY = this.y * scale + space_canvas.height / 2;

            ctx.beginPath();
            ctx.arc(screenX, screenY, this.radius * (scale / 2), 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }

    const stars = [];
    const numStars = 1000; // Adjust as needed

    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }

    function animate() {
        ctx.clearRect(0, 0, space_canvas.width, space_canvas.height); // Clear space_canvas

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


    // store placed positions
    const placed = [];
    const minDistance = 0.05; // %


    function addSkills(skill, i) {
        // random positions
        let x = 5 + Math.random() * 90;
        let y = 5 + Math.random() * 90;

        // let passed = false
        // if (placed.length > 0) {
        //     for (let pos of placed) {
        //         console.log(pos);
        //         if (((x + minDistance) < (pos.x - minDistance) || (x - minDistance) < (pos.x + minDistance)) && ((y + minDistance) < (pos.y - minDistance) || (y - minDistance) < (pos.y + minDistance))) {
        //         }else{
        //             passed = true;
        //             console.log({ x, y }, {pos});
        //             break

        //         };
        //     }
        //     if (!passed) {

        //         return addSkills(skill, i)
        //     }
        // }
        // placed.push({ x, y });

        // parent
        const point = document.createElement("div");
        point.className = `absolute cursor-pointer opacity-20 min-w-fit w-0 hover:opacity-100 whitespace-nowrap hover:w-[3000px] max-w-fit flex justify-center items-center group p-2 border duration-300 overflow-hidden rounded-full`;
        if (x > 50) point.dir = "rtl";

        // random position
        x < 50 ? point.style.left = x + "%" : point.style.right = (100 - x) + "%";
        point.style.top = y + "%";

        // small circle
        const dot = document.createElement("div");
        dot.className = "size-3 bg-white rounded-full";
        point.appendChild(dot);

        // text
        const p = document.createElement("p");
        p.className = "opacity-0 w-0 max-w-0 group-hover:w-[1000px] group-hover:max-w-fit group-hover:opacity-100 group-hover:ms-2 duration-300 leading-0";
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

    let cards = [];

    projects.forEach((p, i) => {
        const card = document.createElement("div");
        card.className = `min-w-md ${i % 2 === 0 ? 'lg:-translate-y-1/4' : 'lg:translate-y-1/4'}  h-full lg:min-h-[40vh] lg:h-[40vh] backdrop-blur-xs bg-white/5 text-white p-5 rounded-xl shadow-xl flex flex-col gap-2.5 lg:gap-5`;

        card.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${p.companyLogo ?? ""}" class="w-10 h-10 rounded-full object-cover" onerror="this.onerror=null; this.src='../media/linkedin.png';" />
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

        ring.appendChild(card)
        cards.push(card);

    });

    // cards.forEach((card, i) => {
    //     const cardMove = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: card,
    //             start: "left 70%",
    //             end: "left 20%",
    //             scrub: 1,
    //             containerAnimation: scrollTween,
    //             markers: true
    //         },
    //     });
    //     cardMove.to(card, { scale: 2, rotation: 360, duration: 3 });
    // })

}

//------------------------------------------------------ Recommendations
//------------------------------------------------------ Contact
//------------------------------------------------------ Footer