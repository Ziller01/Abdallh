AOS.init();

//------------------ Header


document.addEventListener("mousemove", e => {
    const hero = document.querySelector(".grid-bg-move");
    hero.style.setProperty("--x", `${e.clientX}px`);
    hero.style.setProperty("--y", `${e.clientY + window.scrollY}px`);
});


//------------------ About

const about_text = document.getElementById("about-text");
const about_text_typewriter = new Typewriter(about_text, { delay: 25 })
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
        sphereAnimation2()
    },
});


// function skip_about() {
//     about_text_typewriter.start();
//     about_text.innerHTML = `
//         Experienced Back Office Specialist at Sales Buzz with a strong background in the outsourcing and offshoring industry. Skilled in ERP systems, computer software training, operations handling, and PHP development. Demonstrated ability to support and streamline backend processes with efficiency and precision.
//         <br><br> Fluent in English and Arabic, with excellent communication skills that bridge technical and business needs across diverse teams and clients. Known for being a reliable team player and problem-solver, with hands-on experience navigating dynamic environments.
//         <br><br> Proud holder of a Bachelor’s degree in Management Information Systems from Maadi Modern Academy, blending technical expertise with strategic thinking to deliver results.
//         <span class="Typewriter__cursor">|</span>`;
// }

function fitElementToParent(el, padding) {
    let timeout = null;
    function resize() {
        if (timeout) clearTimeout(timeout);
        anime.set(el, { scale: 1 });
        let pad = padding || 0;
        let parentEl = el.parentNode;
        let elOffsetWidth = el.offsetWidth - pad;
        let parentOffsetWidth = parentEl.offsetWidth;
        let ratio = parentOffsetWidth / elOffsetWidth;
        timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
    }
    resize();
    window.addEventListener('resize', resize);
}

function sphereAnimation() {

    let sphereEl = document.querySelector('#sphere-animation');
    let spherePathEls = sphereEl.querySelectorAll('.sphere path');
    let pathLength = spherePathEls.length;
    let hasStarted = false;
    let aimations = [];

    fitElementToParent(sphereEl);

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

function sphereAnimation2() {

    let sphereEl = document.querySelector('#sphere-animation2');
    let spherePathEls = sphereEl.querySelectorAll('.sphere path');
    let pathLength = spherePathEls.length;
    let hasStarted = false;
    let aimations = [];

    // fitElementToParent(sphereEl);

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
//------------------
//------------------
//------------------
//------------------