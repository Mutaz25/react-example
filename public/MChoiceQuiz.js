/* eslint-disable no-undef */

class Quiz {
    constructor(quizId, quizTxt, correctAnswer) {
        this.id = quizId;
        this.quizText = quizTxt;
        this.answers = [];
        this.correctAns = correctAnswer;
    }
}
class Answer {
    constructor(ansId, ansTxt) {
        this.id = ansId;
        this.ansText = ansTxt;
    }
}



class MChoiceInputView {

    constructor(maxNoOfAnswers){
              
          //Layout      
          let divWrapper = document.createElement("div");
          divWrapper.classList.add("component-container--vertical");
          
          this.quizTxt = new TextareaWithLabel("txt-quiz-id","The Question",5);
                    
          
          let innerWrapper = document.createElement("div");
          
          let answersTabset = new TabComponent('M-tab',maxNoOfAnswers);
  
          this.ansTabsets = answersTabset;
          answersTabset.addLabel ("The Answers");
          
  
          this.answerPnl_correct = new TextareaWithLabel('correctAns-', "Enter the correct answer",2);
          addCssClass(this.answerPnl_correct.HTMLElement,["tab-panel-component"],false);
          addCssClass(this.answerPnl_correct.lbltitle.HTMLElement,["label-component-small"], false);
  
          this.addCorrectTab(answersTabset, this.answerPnl_correct);
  
  
          let addAnswerBtn = new ButtonComponent('add-answer', 'Add answer');
  
  
          this.answers_incorrect = [];
          
          
            let remove_tab = ()=> {

                this.answers_incorrect.splice(answersTabset.tabSets.index - 1, 1);
                
                for (let index = 1; index <answersTabset.index ; index++) {
                    answersTabset.tabSets[index].changeLbl('Answer ' + (index + 1));
                    answersTabset.tabPanels[index].lbltitle.changeLblTxt(`Enter answer ${(index + 1)}`);
                }
        
            }

  
          addAnswerBtn.onClick(()=> {
            
 
            if (answersTabset.index >= maxNoOfAnswers) return;
  
            let incorrectAns = new TextareaWithLabel('incorrectAns-' + answersTabset.index,`Enter answer ${(answersTabset.index + 1)}` );
            addCssClass(incorrectAns.HTMLElement,["tab-panel-component"],false);
            addCssClass(incorrectAns.lbltitle.HTMLElement,["label-component-small"], false);

  
            
            this.answers_incorrect.push (incorrectAns);
  
 
            let incorrectBtn = new TabsetClass("Answer " + (answersTabset.index + 1),'incorrectBtn-'+answersTabset.index + 1);
            addCssClass(incorrectBtn.HTMLElement, ["tab-label-Incorrect-answer"], true);
  
            answersTabset.addTab( incorrectBtn,incorrectAns, remove_tab);
  
  
  
          });
  
          answersTabset.addControl(addAnswerBtn);
          
          innerWrapper.appendChild(answersTabset.HTMLElement);
          
  
  
  
          divWrapper.appendChild(this.quizTxt.HTMLElement);
          divWrapper.appendChild(innerWrapper);
  
        
          this.HTMLElement = divWrapper;
          
    }
    addCorrectTab(tabSet, tabpnl){
      let correctAnsBtn = new TabsetClass('The correct answer','ans-btn');
  
      tabSet.addTab(correctAnsBtn,tabpnl);
  
      tabSet.changeTabLblCss(['tab-label-correct-answer']);
  
      tabSet.tabSets[0].HTMLElement.dispatchEvent(new Event('click'));
  
    }
  
    getValues(){
  
        let _question = this.quizTxt.txt.getTextValue();

        let currentQuiz = new Quiz('quiz_id',_question,'correct_id');
        
        let _Ans_correct = this.answerPnl_correct.txt.getTextValue();
        currentQuiz.answers.push(new Answer('correct_id', _Ans_correct));
        
        this.answers_incorrect.forEach ( (item, index) => {
            currentQuiz.answers.push(new Answer('inc_id_' + index, item.txt.getTextValue()));
        });
  
  
        return currentQuiz;
    }
  
    clearValues(){
      
      this.quizTxt.txt.clearValues();
      this.answerPnl_correct.txt.clearValues();
      this.ansTabsets.clearTabs();
      this.addCorrectTab( this.ansTabsets , this.answerPnl_correct);
      this.answers_incorrect = [];
  
    }
  
  }