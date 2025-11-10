AOS.init();

//------------------ Navbar

// const nav = document.getElementById("navbar");
// let lastScroll = 0;

// window.addEventListener("scroll", () => {
//     const curr = window.scrollY;
//     if (curr <= 0) nav.style.transform = "translateY(0)";
//     else if (curr > lastScroll) nav.style.transform = "translateY(-200%)";
//     else nav.style.transform = "translateY(0)";
//     lastScroll = curr;
// });

//------------------ Header


document.addEventListener("mousemove", e => {
    const hero = document.querySelector(".grid-bg-move");
    hero.style.setProperty("--x", `${e.clientX}px`);
    hero.style.setProperty("--y", `${e.clientY + window.scrollY}px`);
});


// const lines = [
//     {
//         id: "#hero-line1",
//         set: { position: 'absolute', left: '50%', x: '-50%', y: window.innerHeight, opacity: 0, display: 'block' },
//         to: [
//             { position: 'absolute', left: '50%', x: '-50%', y: 0, opacity: 100, fontSize: '12vw' },
//             { opacity: 0.5, fontSize: '2.25rem' },
//             { left: 0, x: 0, position: 'static' },
//         ]
//     },
//     {
//         id: "#hero-line2",
//         set: { position: 'absolute', left: '50%', x: '-50%', y: window.innerHeight, opacity: 0, display: 'block' },
//         to: [
//             { position: 'absolute', left: '50%', x: '-50%', y: 0, opacity: 100, fontSize: '9vw' },
//             { opacity: 1, fontSize: '4.5rem' },
//             { left: 0, x: 0, position: 'static' },
//         ]
//     },
//     {
//         id: "#hero-line3",
//         set: { position: 'absolute', left: '50%', x: '-50%', y: window.innerHeight, opacity: 0, display: 'block' },
//         to: [
//             { position: 'absolute', left: '50%', x: '-50%', y: 0, opacity: 100, fontSize: '4vw' },
//             { opacity: 0.80, fontSize: '2.25rem' },
//             { left: 0, x: 0, position: 'static' },
//         ]
//     },
//     // {
//     //     id: "#hero-img1",
//     //     set: { position: 'absolute', translateZ: -100, opacity: 0, display: 'block' },
//     //     to: [
//     //         { position: 'absolute', translateZ: 0, opacity: 100 },
//     //         { position: 'static', },
//     //     ]
//     // },

// ];

// gsap.registerPlugin(ScrollTrigger);

// const tl = gsap.timeline({
//     scrollTrigger: {
//         trigger: '#hero-content',
//         start: "top top",
//         // end: "+=2000",
//         scrub: 1,
//         pin: true,
//     },
//     duration: 1,
// });

// lines.forEach((line, i) => {
//     if (line.set) tl.set(line.id, line.set);
//     if (line.from) line.from.forEach(step => tl.from(line.id, step));
//     if (line.to) line.to.forEach(step => tl.to(line.id, step));
// });

//------------------ About

const about_text = document.getElementById("about-text");
const about_text_typewriter = new Typewriter(about_text, { delay: 25 })
    .typeString('Experienced Back Office Specialist at Sales Buzz with a strong background in the outsourcing and offshoring industry. Skilled in ERP systems, computer software training, operations handling, and PHP development. Demonstrated ability to support and streamline backend processes with efficiency and precision.')
    .typeString('<br><br> Fluent in English and Arabic, with excellent communication skills that bridge technical and business needs across diverse teams and clients. Known for being a reliable team player and problem-solver, with hands-on experience navigating dynamic environments.')
    .typeString('<br><br> Proud holder of a Bachelor’s degree in Management Information Systems from Maadi Modern Academy, blending technical expertise with strategic thinking to deliver results.')
    // .start();

ScrollTrigger.create({
    trigger: about_text,
    start: "top 80%",
    onEnter: () => about_text_typewriter.start(),
});


//------------------ 
//------------------ 
//------------------ 
//------------------ 