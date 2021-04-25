/* eslint-disable no-undef */
const maxLengthOfTextarea = 200;



class LabelComponent {

    constructor(labelTitle, forId){
  
      let _label = document.createElement("label");
      _label.className = "label-component";
        
      _label.htmlFor = forId;
      _label.textContent = labelTitle;
  
      this.HTMLElement = _label;
    }
  
    // Change the label text after it has been created.
    changeLblTxt(newTxt) {
      this.HTMLElement.textContent = newTxt;
    }
  
   
} 

class TextareaComponent {

constructor(textareaId,rowNumber){
    
    let textareaElement = document.createElement("textarea");
    textareaElement.id = textareaId;
    textareaElement.rows = rowNumber;

    textareaElement.maxLength = maxLengthOfTextarea;
    
    textareaElement.className = "textarea-description textarea-resize-vertically"
    
    this.HTMLElement = textareaElement;


}

// register an event
onEvent(eventName,fn){
    this.HTMLElement.addEventListener(eventName,fn);
}

getTextValue(){
    return this.HTMLElement.value;
}
setTextValue(_value){
    this.HTMLElement.value = _value;
}
clearValues(){
    this.HTMLElement.value="";
}

//Sets whether the contents of a text area is read-only
readOnly(value){
    this.HTMLElement.readOnly = value;
}

// Sets the placeholder property
setPlaceHolder(txt){
    this.HTMLElement.placeholder = txt;
}

selectAll(){
    this.HTMLElement.select();
}

// insert a specific string into the current cursor position
insertAt(str){
                
    let startPos = this.HTMLElement.selectionStart;
    let endPos = this.HTMLElement.selectionEnd;

    this.HTMLElement.value = this.HTMLElement.value.substring(0, startPos) + str + this.HTMLElement.value.substring(endPos, this.HTMLElement.value.length);

}

// replace a value _val (all) within the component text with a new value _newVal
replaceAll( _val, _newVal){
    
    this.HTMLElement.value =  this.HTMLElement.value.split(_val).join(_newVal);

}
// get an object made of the id of the node and the text content
getObj (){
    return {id:this.HTMLElement.id, txt:this.HTMLElement.value};
}
}

class TextareaWithLabel {

    constructor (textareaId, labelTitle,rowNumber){
      
      let divWrapper = document.createElement("div");
      this.lbltitle = new LabelComponent(labelTitle,textareaId);
      this.txt = new TextareaComponent(textareaId,rowNumber);
      
      divWrapper.classList.add("component-container--vertical");
       
      divWrapper.appendChild(this.lbltitle.HTMLElement);
      divWrapper.appendChild(this.txt.HTMLElement);
    
      this.HTMLElement = divWrapper;
    
    }
        
}

class ButtonComponent {

    constructor(btnId, txt){
  
      let btn = document.createElement("button");
      btn.type="button";
      btn.id=btnId;
      btn.className = "add-btn";
      
      let btnText = document.createTextNode(txt);
      btn.appendChild(btnText);
  
      this.HTMLElement = btn;
  
    }
  
    onClick(fn){
        
      this.HTMLElement.addEventListener('click', function (e) {
          fn(e);       
      });
    }
  
    changeTxtvalue(_txt){
        this.HTMLElement.textContent = _txt;
    }
  
}

class CloseBoxComponent {
  
    constructor(id_c){
  
      let close_button = new ButtonComponent(`c-${id_c}`, "");
      addCssClass(close_button.HTMLElement, 'small-close', true);
      
      this.HTMLElement = close_button.HTMLElement;
    }
  
    onClick(fn){
        
        this.HTMLElement.addEventListener('click', function (e) {
            fn(e);
            
            
        });
    }
  
}  
  

class TabsetClass {

    constructor(tabText, tabsetId){
      this.tabLabel = document.createElement("button");
      this.tabLabel.className = "tab-label-component";
      
      this.tabLabel.id = tabsetId;
         
      this.tabLabel.textContent=tabText;
  
      this.HTMLElement= this.tabLabel;
   
    }
  
    changeLbl(newLbl) {
      this.tabLabel.firstChild.textContent = newLbl;
    }
    addClose(func_close, extra_close_work = null){
  
        let closeBtn = new CloseBoxComponent(this.tabLabel.id);
        closeBtn.onClick(func_close);
  
        if (extra_close_work) {
            closeBtn.onClick(extra_close_work);
        }
            
  
        this.tabLabel.appendChild(closeBtn.HTMLElement);
    }
  
  
  
}
  
  class TabPanelClass {
    constructor(tabPanelId, component = null){
  
      this.tabSection = document.createElement("section");
      this.tabSection.id=tabPanelId;
      this.tabSection.className= "tab-panel-component";
      if (component) {
        this.fillPanel(component);
        this.component = component;
      }
      
  
      this.HTMLElement = this.tabSection;
    }
  
    fillPanel(component) {
      if (component) {
        this.tabSection.appendChild(component.HTMLElement);
      }
    }
  
  }

   
class TabComponent {

    constructor(tabId = "tab-", maxTabNo = 4) {
  
  
        // the main div container
        let divWrapper = document.createElement("div");
        divWrapper.classList.add("component-container--vertical");  
  
  
        // the tab headers text container div
        this.divTabset = document.createElement("div");
        this.divTabset.classList.add("tabset-component");
  
        // the tab panels container div
        this.divTapanels = document.createElement("div");
        this.divTapanels.classList.add("tab-panels-component");
  
        // if there are any additional controls to be included (e.g. button)
        this.divExtraControls = null;
  
        // the stem of the tab component to be used later for creating
        // ids of tab headers buttons and panels.
        this.stemId = tabId;
  
        // the maximum number of the tab header buttons.
        this.maxTabsetNo = maxTabNo;
  
        // The label text would be displayed above the tab component
        this.tabLabel="";
  
  
        
        // tab headers buttons
        this.tabSets=[];
  
        // tab panels
        this.tabPanels=[];
  
  
        // the index Where the new tabset and tabPanel must inserted
        this.index = 0;
        this.selectedIndex = -1;
  
        divWrapper.appendChild(this.divTabset);
        divWrapper.appendChild(this.divTapanels);
  
    
        this.HTMLElement=divWrapper;
  
    
  
    }
    
    changeTabPanelCss(newCss) {
        this.tabPanels.forEach (item => addCssClass(item.HTMLElement, newCss, true));
    }
  
    changeTabLblCss(cssArr){
  
        if (cssArr.length <= 0) {
            throw Error('Must specify at least one css class!')
        }
  
        if (!Array.isArray(cssArr)) {
            this.tabSets.forEach(item => {
                item.HTMLElement.className = cssArr;
            })
        }
  
        this.tabSets.forEach((value,index)=>{
  
            
            if (cssArr[index]) {
  
                addCssClass(this.tabSets[index].HTMLElement, cssArr[index], true);
                
            }else 
            {
                addCssClass(this.tabSets[index].HTMLElement, cssArr[0], true);
  
            }
  
        });
    }
  
  
    // To add a label component (or change the current label text) to the tab component.
    addLabel(labelTitle){
                
        if (this.tabLabel ===""){
        
        this.tabLabel= new LabelComponent(labelTitle, "");
        this.HTMLElement.prepend(this.tabLabel.HTMLElement);
  
        } else{
  
        this.tabLabel.changeLblTxt(labelTitle);
        }
        
    }
  
    // to add a new control (e.g. extra button) to the tab component
    addControl(control, cssClasses ){
  
        if (!this.divExtraControls) {
            this.divExtraControls = document.createElement("div");
            this.HTMLElement.appendChild(this.divExtraControls);
        }
    
        this.divExtraControls.appendChild(control.HTMLElement);
        if (cssClasses) {
          if (Array.isArray(cssClasses)) {
              cssClasses.forEach( cssClass => control.HTMLElement.classList.add(cssClass));
          }else {
            control.HTMLElement.className = cssClasses;
          }
            
        }
        
    }
  
  
    addTab(tbSet, tbPnl, closeFunction){
  
  
        tbSet.index = this.index;
  
     
       
        if (closeFunction) {
            tbSet.addClose((e)=> {
                e.stopPropagation();
                let removed = (e.target).parentNode;
                if (removed) {
  
                    let _index = tbSet.index;
                  
                    
                    for (let tabetIndex = _index + 1; tabetIndex <= this.tabSets.length -1 ; tabetIndex++) {
  
                     
                        this.tabSets[tabetIndex].index -= 1;
                        this.tabPanels[tabetIndex].index = this.tabSets[tabetIndex].index;
  
                    }
  
  
                    this.divTabset.removeChild(this.tabSets[_index].HTMLElement);
                    this.divTapanels.removeChild(this.tabPanels[_index].HTMLElement);
  
                    this.tabSets[_index] = null;
                    this.tabSets = this.tabSets.filter( tabset => tabset != null)
                    
                    this.tabPanels[_index] = null;
                    this.tabPanels = this.tabPanels.filter( tabpnl => tabpnl != null)
                    
                 
                    this.index -=1;
                 
                    if (this.selectedIndex === _index) {
                        
                        if (((_index - 1) < 0) &&  (this.tabSets[1]))
                            this.tabSets[1].HTMLElement.click();
                        else if ((_index - 1) === 0) 
                            this.tabSets[0].HTMLElement.click();
                        else if ((_index - 1) > 0) 
                            this.tabSets[_index - 1].HTMLElement.click();
  
                    }else {
                        this.selectedIndex -= 1;
                    }
                    
                    
                }
              }, closeFunction);
        }
        
        tbSet.HTMLElement.addEventListener("click", ()=> {
            
            this.selectedIndex = tbSet.index;
            this.resetSelected();
            tbSet.HTMLElement.classList.add(tbSet.HTMLElement.classList[0] + "--selected");
            this.tabPanels[tbSet.index].HTMLElement.classList.add("tab-panel-show");
            this.tabPanels[tbSet.index].HTMLElement.lastElementChild.focus();
            
  
        });
  
        this.tabSets.push(tbSet);
  
        tbPnl.index = this.index;
        this.tabPanels.push(tbPnl);
    
        this.index = this.tabSets.length;
  
        this.divTabset.appendChild(tbSet.HTMLElement);
        this.divTapanels.appendChild(tbPnl.HTMLElement);
    
        tbSet.HTMLElement.click();
    }
  
  
    addTxtTab(txtHeader, lblCaption, closeFunction){
  
        let tabSet = new TabsetClass(txtHeader, `${this.stemId}-tabSet-${this.index}` );
  
        let txtArea;
        if (lblCaption) {
            txtArea = new TextareaWithLabel(`${this.stemId}-txtArea-${this.index}`, lblCaption, 5);
        }else {
            txtArea = new TextareaComponent(`${this.stemId}-txtArea-${this.index}`,  5);
        }
        
        let tabPnl = new TabPanelClass(`${this.stemId}-tabPnl-${this.index}`,txtArea);
  
  
        this.addTab(tabSet, tabPnl, closeFunction);
    }
  
    resetSelected(){
  
        this.tabSets.forEach( tabset => {
            let found = null;
            tabset.HTMLElement.classList.forEach ( 
               (cssFile) => {
                    if (cssFile.includes('--selected')) {
                        found = cssFile;
                    }
                });
            if (found) { 
                tabset.HTMLElement.classList.remove(found); 
            }
        });
  
        
        //make the tabPanel visible and hide the others  
        this.tabPanels.forEach((item)=>{
          item.HTMLElement.classList.remove("tab-panel-show");
        })
    
    }
  
    clearTabs(){
        removeAllChildNodes(this.divTabset);
        removeAllChildNodes(this.divTapanels);
  
        this.index = 0;
        this.selectedIndex = -1;
        this.tabSets.length = 0;
        this.tabPanels.length = 0;
  
  
    }
    
  }


