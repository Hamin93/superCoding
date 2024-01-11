let attempts = 0; 
let index = 0;

function appStart(){

    const handleEnterKey = () => {
        console.log("엔터키")

    }

    const handleKeydown = (event) => {
        const key = event.key;

        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(
            `.line span[data-index='${attempts}${index}']`
        ) //블록선택 몇번째시도에 몇번쨰 인덱스인지 
        

        if (event.key === "Enter"){
            handleEnterKey();
        }
        else if (index === 5) return;// 해당조건을 충족하면 아무것도 안하고 리턴한다 = 아래의 함수가 주석처리되는거와 마찬가지
        else if (65 <= keyCode && keyCode <= 90){
            thisBlock.innerText = key;
            index += 1; // 인덱스에 +1 해주세요 같은뜻인 다른 표기법  index = index + 1, index++ 
        }
        

    };

    window.addEventListener("keydown", handleKeydown) //key를 눌렀을때 자동적으로 어떤 키를 눌렀는지 이벤트가 넘어감 (e) = (event) 이거 다 통일해서써주셈 console에서 정보확인 가능


}

appStart();