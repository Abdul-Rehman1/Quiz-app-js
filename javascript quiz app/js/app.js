var counteropt=0;
var  quizCounter = 0;
var quesAppearNo=0;
var mints=1;
var correctAnswers=[];
var pickSelcted="";
var selectedOptions=[];
function addQuestion(ques,opts)
{
    var quiz = {
    question : ques,
    options : opts
    }
    var retrievedObject = localStorage.getItem('quizes');
    if(!retrievedObject)
    {
        var quizArray=[];
    }
    else
    {
        var quizArray= JSON.parse(retrievedObject);
    } 
    quizArray.push(quiz);      
    localStorage.setItem('quizes', JSON.stringify(quizArray));
}
function getAllQuestions()
{
    var retrievedObject = localStorage.getItem('quizes');
    var quizArray= JSON.parse(retrievedObject);
    return quizArray;
}

function editquestion(quizCounter)
{
    
    var quizNode=document.getElementById('quiz-'+quizCounter);
    var quiztext=quizNode.getElementsByTagName('span')[0].innerText;
    quizNode.innerHTML="";
    quizNode.innerHTML='<textarea >'+quiztext+'</textarea>';
    var options=document.getElementById("quesiton-container"+quizCounter).querySelectorAll(".opt-"+quizCounter);
    for(var i=0;i<options.length;i++)
    {
       if(options[i].getAttribute("data")=="InCorrect"){
            options[i].innerHTML='<input type="text" value="'+options[i].innerHTML+'" >'+
                             '<select name="iscr-'+i+'" >'+
                             '<option value"true">Correct</option>'+
                             '<option value"false" selected >InCorrect</option>'+
                             '</select>'  ;
        }
        else if((options[i].getAttribute("data")=="Correct"))
        {
            options[i].innerHTML='<input type="text" value="'+options[i].innerHTML+'" >'+
                             '<select name="issssscr-'+i+'" id="iscr-'+i+'">'+
                             '<option value"true" selected >Correct</option>'+
                             '<option value"false" >InCorrect</option>'+
                             '</select>'  ;
        }
    }
    var btn = document.getElementById("quesiton-container"+quizCounter).getElementsByTagName('button')[0];
    btn.innerHTML="Done";
    btn.removeEventListener("click", editquestion);
    btn.addEventListener("click", doneEditing);
    
    
}
function doneEditing(){
    var retrievedObject = localStorage.getItem('quizes');
    var quizArray= JSON.parse(retrievedObject);
    var x=this.getAttribute("data-edit");
    var quizNode=document.getElementById('quiz-'+x);
    var quiztext =quizNode.getElementsByTagName('textarea')[0].value;
    optArr=[];
    quizNode.innerHTML ="";
    quizNode.innerHTML = '<span>'+quiztext+'</span>';
    quizArray[x].question= quizNode.innerHTML;
    var options=document.getElementById("quesiton-container"+x).querySelectorAll(".opt-"+x);
    
    for(var i=0;i<options.length;i++)
    {
       console.log(options[i].getElementsByTagName('select')[0].value); 
       options[i].setAttribute("data",options[i].getElementsByTagName('select')[0].value);
       quizArray[x].options[i].isCorrect=options[i].getElementsByTagName('select')[0].value;
    }
    for(var i=0;i<options.length;i++)
    {
       
              quizArray[x].options[i].opt= options[i].innerHTML = options[i].getElementsByTagName('input')[0].value;
        
    }
    
    
    localStorage.setItem('quizes', JSON.stringify(quizArray));
    var btn = document.getElementById("quesiton-container"+x).getElementsByTagName('button')[0];
    btn.innerHTML="Edit";
    btn.removeEventListener("click", doneEditing);
    btn.addEventListener("click", editquestion);
}
function delquestion(loc){
    var retrievedObject = localStorage.getItem('quizes');
    var quizArray= JSON.parse(retrievedObject);
    quizArray.splice(loc, 1);
    localStorage.setItem('quizes', JSON.stringify(quizArray));
    alert("Question record deleted");
    window.location = "admin.html";
}

function createOptions(){
    var  optDiv = document.getElementById('optns');
    var noOfOptions = document.getElementById("noofoptns").value;
    //var optDivElemlength=optDiv.getElementsByTagName('div').length;
   // alert(optDiv.lastElementChild);
       
        for(var i=1;i<=noOfOptions;i++)
        {   
           if(noOfOptions>0) 
        counteropt++;
            optDiv.innerHTML+= '<div data-optnum="'+(counteropt)+'" onmouseover="showClosebtn(this)" onmouseout="hideClosebtn(this)">'+
                               '<label >Enter option number '+(counteropt)+'</label>'+
                               '<input type="text" name="opt-'+counteropt+'" >'+
                               '<select name="iscr-'+counteropt+'" >'+
                               '<option value"true">Correct</option>'+
                               '<option value"false">InCorrect</option>'+
                               '</select>'+
                               '<span id="closebtn-'+(counteropt)+'" onclick="delOpt(this)" style="display:none; opacity:0;">x</span>'+
                               '</div>';                          
        }
}
function showClosebtn(x){
    var atr=x.getAttribute('data-optnum');
    document.getElementById("closebtn-"+atr).style.display="inline";
    document.getElementById("closebtn-"+atr).style.opacity="1";
    document.getElementById("closebtn-"+atr).style.transition ="all ease 1s";
}
function hideClosebtn(x){
    var atr=x.getAttribute('data-optnum');
    document.getElementById("closebtn-"+atr).style.opacity="0";
    document.getElementById("closebtn-"+atr).style.transition ="all ease 1s";
    document.getElementById("closebtn-"+atr).style.display="none";
}
function delOpt(x){
    var  optDiv = document.getElementById('optns');
    var getTarget = x.getAttribute('id').slice(parseInt(x.getAttribute('id').indexOf('-')+1));
    var getDiv=optDiv.getElementsByTagName('div');
    for(i=0;i<getDiv.length;i++){
        if(getDiv[i].getAttribute('data-optnum') == getTarget)
        {
            getDiv = getDiv[i];
            break;
        }
    }
    optDiv.removeChild(getDiv);
    getOptionsLabel=optDiv.getElementsByTagName('label');
    if(getOptionsLabel.length==0)
    {
        counteropt=0;    
    } 
    else{
        for(var i=0;i<getOptionsLabel.length;i++)
        {
           getOptionsLabel[i].innerHTML = "Enter option number " + (i+1);
        }
         counteropt--;
    }
       
}

function save(){
    var flag=true;
    var frmm=document.getElementById('createnewQ');
    var question = frmm.getElementsByTagName('textarea')[0];
    var inputs = frmm.getElementsByTagName('input');
    var optionInputs=[];
    
    for(var i=0;i<inputs.length;i++)
    {
        if(inputs[i].getAttribute("type")=="text")
          optionInputs.push(inputs[i]);
    }
    var iscorrect = frmm.getElementsByTagName('select');       
    if(question.value=="" ||question.value==null)
    {
        question.classList.add('wrong-validate');
        return;  
        
    }
    else if(optionInputs.length==0)
    {
        alert("Please add options");
        return;
    }
    else if(optionInputs.length==1)
    {
        alert("Please add atleast two options");
        return;
    }
    else{
    for(i=0;i<optionInputs.length;i++)
    {
        
        if(optionInputs[i].value=="" || optionInputs[i].value==null){
            optionInputs[i].classList.add('wrong-validate');
                   
            flag=false;
        }   
    }
    
    if(flag == false)
    {
        return;
    }
    }
    var optsArr=[];
       
    for(i=0;i<optionInputs.length;i++)
    {  
        
       optsArr.push({
            opt:  optionInputs[i].value ,
            isCorrect: iscorrect[i].options[iscorrect[i].selectedIndex].value
       }); 
    }
    addQuestion(question.value,optsArr);
    counteropt=0;
    window.location = "admin.html";
}
function savetime()
{
    mints=document.getElementById('timepick').value;
    localStorage.setItem('minutes',mints)
}
function admin_createQuestion(){
         var quizArray = getAllQuestions();
         var quizBox=document.getElementById('quiz-sec');
         //var frm=createForm("adminQuizForm",quizBox);
         //frm=document.getElementsByName(frm)[0];
         //var timestamp = new Date().getUTCMilliseconds();
         if(quizArray){
            quizArray.forEach(function(item) {                             
                //createLabel(,frm);
                var div=creatediv("quesiton-container"+quizCounter,quizBox);
                Container=document.getElementById(div);
                AppendInElement('<p id="quiz-'+quizCounter+'"><span>'+item.question+'</span><p> ',Container);    
                item.options.forEach(function(item,index){
                AppendInElement('<p>'+(index+1)+')<span class="opt-'+quizCounter+'" data="'+item.isCorrect+'"> '+item.opt+'</span></p>',Container);
                });
                AppendInElement('<button data-edit="'+quizCounter+'" onClick="editquestion('+quizCounter+')">edit</button>',Container);
                AppendInElement('<button onClick="delquestion('+quizCounter+')">Delete</button>',Container);
                AppendInElement("<br/>",Container );    
                quizCounter++;
            }); 
                
         }
                  
}
function getCorrectAnswrs()
{
    var quizArray = getAllQuestions();
           if(quizArray!=null){ 
            quizArray.forEach(function(item) {              
                item.options.forEach(function(item,index){
                    if(item.isCorrect=="Correct")
                    {
                        correctAnswers.push(item.opt)
                    }
                });
            }); 
             }   
}

function pickSelected(selectedval){
    pickSelcted=selectedval;
}

function index_showQusetion(firstTime,timer){
    var quizArray = getAllQuestions();
    var quizBox=document.getElementById('quiz-sec');
    if(firstTime==1)
    {
        countdownTimer("on",1);
    }
    if(quizArray!=null){
            if(quesAppearNo<quizArray.length && timer!=false){
                
                quizBox.innerHTML="";
                var frm=createForm("indexQuizForm",quizBox);
                frm=document.getElementsByName(frm)[0];
                AppendInElement('<p class="bot-border" > Question '+(quesAppearNo+1)+" out of "+quizArray.length+'<p> ',frm);
                AppendInElement('<p id="quiz-'+quesAppearNo+'"><span>'+quizArray[quesAppearNo].question+'</span><p> ',frm); 
                quizArray[quesAppearNo].options.forEach(function(item,index){
                AppendInElement('<p>'+(index+1)+')<input type="radio" name="option" onClick="pickSelected(this.nextSibling.innerHTML);"><span data="'+item.isCorrect+'"> '+item.opt+'</span></p>',frm);
                });
                AppendInElement("<br/>",frm); 1
            }
            else{
                correctAnswrCounter=0;
                for(var i=0;i<selectedOptions.length;i++)
                {
                    if(selectedOptions[i].trim()==correctAnswers[i].trim())
                    {
                        correctAnswrCounter++;   
                    }
                }
                var percentage=(correctAnswrCounter/quizArray.length)*100;
                quizBox.innerHTML="";
                quizBox.innerHTML="<p>Correct : "+correctAnswrCounter+" out of Total: "+quizArray.length+"</p>";
                quizBox.innerHTML+="<p>Your Percentage is "+percentage+"%</p>";
                if(percentage>=70)
                {
                    quizBox.setAttribute("data-final","true");
                }
                else{
                    quizBox.setAttribute("data-final","false");
                }
                var next = document.getElementById("next");
                next.parentNode.removeChild(next);
            }       
         }
         else{
            var next = document.getElementById("next");
                if(next)
                next.parentNode.removeChild(next);
                quizBox.innerHTML="<p>Quiz not added yet!</p>";
         }
}
function nextQuestion(){
    if(pickSelcted!=""){
        quesAppearNo++;
        selectedOptions.push(pickSelcted);
        pickSelcted="";
        index_showQusetion(2);
    }
    else{
        alert("Please select any option first")
    }
}
function authcheck()
{
    var uname=document.getElementById('uname');
    var pass=document.getElementById('password');
    if(uname.value=='admin' && pass.value=='admin')
    {
        alert("login success");
        location='admin.html';
    }
    else{
        alert('login failed');
    }
}

var countdownTimer =  function (status,minutes) {

    var quizBox=document.getElementById('quiz-sec');
    var timeminutes=localStorage.getItem("minutes");
    if(timeminutes==null)
    var min = mints-1;
    else
    var min=parseInt(timeminutes)-1;
    var sec = 59;
    var time=document.getElementById('timeDiv');
    var int = setInterval(function () {
        if (min < 10 && sec < 10) {
            time.innerHTML = "0" + min + "m : " + "0" + sec+"s";
        }
        else if (min < 10) {
            time.innerHTML = "0" + min + "m : " + sec+"s";
        }
        else if (sec < 10) {
            time.innerHTML = min + "m : " + "0" + sec+"s";
        }

        else { time.innerHTML = min + "m : " + sec+"s"; }
        sec--;
        if(quizBox.hasAttribute("data-final"))
        {
            clearInterval(int);
            if(quizBox.getAttribute("data-final")=="true")
            time.innerHTML = "Pass";
            else
            time.innerHTML="fail";
        }
        if (min < 0) {
            clearInterval(int);
            index_showQusetion(2,false);
            time.innerHTML = "Time out";
            
        }
        else if (sec == 0) {
            min--;
            sec = 60;
        }
        if (min === 00) {
            time.style.color = 'red';
        }
    }, 1000);
}

function creatediv(id,container)
{
    //form
         var dynForm = document.createElement("div");
         dynForm.setAttribute("id",id);     //adminQuizForm
         container.appendChild(dynForm);
         return id; 
}
function createForm(name,container)
{
    //form
         var dynForm = document.createElement("form");
         dynForm.name=name;     //adminQuizForm
         container.appendChild(dynForm);
         return name; 
}
function createLabel(txt,container)
{
    //label
         var dynLabel = document.createElement("label");       
         var labelText = document.createTextNode(txt); //Enter question:       
         dynLabel.appendChild(labelText);                                
         container.appendChild(dynLabel);
         
}
function createTextArea(name,req,placeholdr,container)
{
    //textarea 
         var dynInput = document.createElement("textarea");
         dynInput.name=name;  // "quiz"+"- 1";
         if(req){
         dynInput.required="required";
         }
         dynInput.placeholder=placeholdr;         //"Enter your question here";
         //dynForm.innerHTML+="<br/>";
         container.appendChild(dynInput);
         return name;

}

function createInput(name,container){
    //Input
         var dynInputOption = document.createElement("INPUT");
         dynInputOption.setAttribute("type", "text");
         dynInputOption.name=name;         //"option-"+"1";
         //dynForm.innerHTML+="<br/>";
         container.appendChild(dynInputOption);
         return name;
}

function createRadioButton(name,txt,container){
    //Input
         var dynInputOption = document.createElement("INPUT");
         dynInputOption.setAttribute("type", "Radio");
         dynInputOption.name=name;         //"option-"+"1";
         //dynForm.innerHTML+="<br/>";
         container.appendChild(dynInputOption);
         container.innerHTML+="<span>"+txt+"</span>";
         return name;
}

function createSubmit(name,val,container){
    //submit button 
         var dynSubmit = document.createElement("INPUT");
         dynSubmit.setAttribute("type", "submit");
         dynSubmit.name="quizSubmitButton";
         dynSubmit.value="Save";
         //dynForm.innerHTML+="<br/>";
         container.appendChild(dynSubmit);
         return name;
}
function AppendInElement(element,container){
    container.innerHTML+=element;
}