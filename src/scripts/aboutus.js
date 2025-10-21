import { about_us } from "../utils";

export const aboutUs = ()=>{
    const aboutUs = document.querySelector('.about_us_container');
    
    about_us.map(({title , description})=>{
        const glassCard = document.createElement('div')
        const aboutTitle = document.createElement('div');
        const aboutDescription = document.createElement('div');

        aboutTitle.innerText = `/ ${title}`;
        aboutDescription.innerText = description;

        glassCard.append(aboutTitle);
        glassCard.append(aboutDescription);

        glassCard.classList.add("glass-card");
        aboutTitle.classList.add("about-card-title");
        aboutDescription.classList.add("about-card-description");

        aboutUs.append(glassCard)
    })
}