const 정답 = "APPLE" ;

let attempts = 0; 
let index = 0;
let timer

function appStart(){

    const displayGameover = () => {
        const div = document.createElement("div");
        div.innerText = "게임이 종료됬습니다."
        div.style = "position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); padding:40px; background:#fff;";
        document.body.appendChild(div)

        clearInterval(timer);
    };

    const nextLine = () =>  {
        
        attempts += 1; //줄을 나타내는 중이었는데 +=1로 올려줌
        index = 0; // 행? 을 나타내는 중이었는데 이것은 초기화 

    };

    const gameover = () => {
        window.removeEventListener("keydown", handleKeydown);
        displayGameover();
    };

    const handleEnterKey = () => { //엔터키일때
        let 맞은갯수 = 0;
        
        for(let i = 0; i<5; i++){ //for문은 특정횟수를 반복하면서 0부터 시작 5개미만까지 
            const block = document.querySelector(
                `.line span[data-index='${attempts}${i}']`
            );
            const 입력한_글자 = block.innerText; //블럭에서 입력한값
            const 정답글자 = 정답[i]; //정답글자에서 [0],[1] 숫자의 위치의 단어를 골라낸다
            
            if(입력한_글자 === 정답글자){
                맞은갯수 += 1;
                block.style.background = "#6aaa64"
            }else if(정답.includes(입력한_글자)){ // includes('a') a가 포함된 글자인가 
                block.style.background = "#c9b458"
            }else{
                block.style.background = "#999"
            }
            block.style.color = "#fff"
        }

        if(맞은갯수 === 5) gameover();
        else nextLine(); //위의 이벤트 다 동작했으면 이 동작으로 넘어가세요.  // 한줄에 쓸수있으면 {} 이거 안써도됨
    }
    
    const handleBackspace = () => {
        
        if(index>0){
            const preBlock = document.querySelector(  //이전블럭
                `.line span[data-index='${attempts}${index - 1}']`
            ) 
            preBlock.innerText = "";
        }
        if(index !== 0) index -= 1; // 1을 뺌
    }

    const handleKeydown = (event) => {
        const key = event.key;

        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(
            `.line span[data-index='${attempts}${index}']`
        ) //블록선택 몇번째시도에 몇번쨰 인덱스인지 
        
        console.log(key, keyCode) // 키코드확인방법
        
        if(key === 'Backspace'){
            handleBackspace();
        }

        // if(index === 5){
        //     if(event.key === "Enter"){
        //         handleEnterKey();
        //     } else retrun
            
        // }  <- 아래랑 같은 내용인거같음
        else if (event.key === "Enter"){
            handleEnterKey();
        }
        else if (index === 5) return;// 해당조건을 충족하면 아무것도 안하고 리턴한다 = 아래의 함수가 주석처리되는거와 마찬가지  === 일때, !== 아닐때
        else if (65 <= keyCode && keyCode <= 90){
            thisBlock.innerText = key;
            index += 1; // 인덱스에 +1 해주세요 같은뜻인 다른 표기법  index = index + 1, index++ 
        }
    };

    window.addEventListener("keydown", handleKeydown) //key를 눌렀을때 자동적으로 어떤 키를 눌렀는지 이벤트가 넘어감 (e) = (event) 이거 다 통일해서써주셈 console에서 정보확인 가능


    const startTimer = () => {

        const startTime = new Date();

        function setTime(){
            const nowTime = new Date();
            const ingTime = new Date(nowTime - startTime);
            const min = ingTime.getMinutes().toString().padStart(2, "0");
            const sec = ingTime.getSeconds().toString().padStart(2, "0");
            const timeH1 = document.querySelector(".time");
            timeH1.innerText = `time ${min}:${sec}`;

        }

    timer = setInterval(setTime, 1000);

    }

    startTimer();
}

appStart();