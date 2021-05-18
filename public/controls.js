/* eslint-disable no-undef */
function addNoReact() {


    const divWrapper = document.createElement('div');
    divWrapper.id = "noReact";
    divWrapper.className = "box-no-react";


    const header_noreact = document.createElement('h2');
    header_noreact.textContent = "Vanilla Javascript.."

    let mChoice = new MChoiceInputView(4);


    const generateBtn =new ButtonComponent('gen_btn',"Generate JSON Obj");
    addCssClass(generateBtn.HTMLElement, ["margin-top--10"], false);


    generateBtn.onClick(()=> {

        quiz$ = mChoice.getValues();
        mChoice.clearValues();

        document.getElementById('json_id').innerHTML = library.json.prettyPrint(quiz$);
        
        quiz$.answers = shuffleArray(quiz$.answers);
        
        
        let customEvent = new CustomEvent('pushed',{detail:quiz$});
        window.dispatchEvent(customEvent);



    });

 

    
    divWrapper.appendChild(header_noreact);
    divWrapper.appendChild(mChoice.HTMLElement);
    divWrapper.appendChild(generateBtn.HTMLElement);

    // add MChoice Quiz
    

    document.body.insertBefore(divWrapper,document.getElementById('root'));
}


function addJSON() {

    const divWrapper = document.createElement('div');
    divWrapper.id = "json_obj";
    divWrapper.className = "box-no-react margin-top--20 margin-bottom--20";


    const header_json = document.createElement('h2');
    header_json.textContent = "JSON Object..";

    const preHtml = document.createElement('pre');
    const codeHtml = document.createElement('code');
    codeHtml.id = "json_id";


    codeHtml.innerHTML = library.json.prettyPrint(quiz$);
    
    
    preHtml.appendChild(codeHtml);
    divWrapper.appendChild(header_json);
    divWrapper.appendChild(preHtml);
    

    document.body.insertBefore(divWrapper,document.getElementById('root'));

}

function addCharts() {
    console.log('addCharts')
};



addNoReact();
addJSON();
addCharts();
