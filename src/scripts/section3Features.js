import { study_features } from "../utils";

export const section3Features = ()=>{

    const section3Features = document.querySelector(".section3-features");

    study_features.map(({code , title , description})=> {

        const mainContainer = document.createElement('div');


        const codeDiv = document.createElement('div');
        const titleDiv = document.createElement('div');
        const descriptionDiv = document.createElement('div');

        codeDiv.innerText = `[ ${code} ]`;
        titleDiv.innerText = `\ ${title}`;
        descriptionDiv.innerText = description;

        codeDiv.classList.add('code');
        titleDiv.classList.add('title');
        descriptionDiv.classList.add('description');
        mainContainer.classList.add('section3-features-subcontainer')

        mainContainer.appendChild(codeDiv);
        mainContainer.appendChild(titleDiv);
        mainContainer.appendChild(descriptionDiv);

        section3Features.appendChild(mainContainer);

    })
}