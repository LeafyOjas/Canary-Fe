import { program_steps } from "../utils";

export const programFeaturesContent = ()=>{

    const featureContent = document.querySelector('.program_section_content');

    program_steps.map(({title , description } , index)=>{

        const stepItem = document.createElement('div');
        const titleContainer =  document.createElement('div');
        const titleDiv = document.createElement('div');
        const descriptionDiv = document.createElement('div');
        const stepIndex = document.createElement('div');


        stepIndex.innerText = `[ STEP ${index + 1 } ]`
        titleDiv.innerText = title;
        descriptionDiv.innerText = description;

        titleContainer.appendChild(stepIndex);
        titleContainer.appendChild(titleDiv);

        stepItem.classList.add('program_feature_item');
        titleContainer.classList.add('display-flex');
        titleDiv.classList.add('program_feature_title');
        descriptionDiv.classList.add('program_feature_description');


        stepItem.appendChild(titleContainer);
        stepItem.appendChild(descriptionDiv);

        featureContent.appendChild(stepItem);

    
    })

}