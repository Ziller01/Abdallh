AOS.init();

//------------------------------------------------------ Header


document.addEventListener("mousemove", e => {
    const hero = document.querySelector(".grid-bg-move");
    hero.style.setProperty("--x", `${e.clientX}px`);
    hero.style.setProperty("--y", `${e.clientY + window.scrollY}px`);
});


//------------------------------------------------------ About

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
        // spaceAnimation()
    },
});

function sphereAnimation() {

    let sphereEl = document.querySelector('#sphere-animation');
    let spherePathEls = sphereEl.querySelectorAll('.sphere path');
    let pathLength = spherePathEls.length;
    let aimations = [];


    let breathAnimation = anime({
        begin: function () {
            for (let i = 0; i < pathLength; i++) {
                aimations.push(anime({
                    targets: spherePathEls[i],
                    stroke: { value: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)'], duration: 500 },
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

//------------------------------------------------------ Experience


const experiencesCardGroup = document.querySelector("#experiences #timeline #card-group");
experiences.toReversed().map((ex, index) => {
    const isLeft = index % 2 === 0;
    experiencesCardGroup.innerHTML += `
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


gsap.registerPlugin(ScrollTrigger);

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



// let experiences_cards_tl = gsap.timeline({
//     scrollTrigger: {
//         trigger: '#experiences #timeline #card-group',
//         scrub: 1,
//     }
// });
// let experiences_cards = document.querySelectorAll('#experiences #timeline #card');
// experiences_cards.forEach((card, index) => {
//     const isLeft = index % 2 === 0;
//     gsap.fromTo(card,
//         {
//             opacity: 0,
//             rotateY: isLeft ? 90 : -90,
//             transformOrigin: isLeft ? 'right' : 'left'
//         },
//         {
//             opacity: 1,
//             rotateY: 0,
//             duration: 1,
//             ease: 'power2.out',
//             scrollTrigger: {
//                 trigger: card,
//                 start: 'center center',
//                 toggleActions: 'play none none reverse',
//                 markers: true,
//             }
//         }
//     );
// });


//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------