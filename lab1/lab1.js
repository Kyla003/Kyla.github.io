function findMeanGreater(){
    var array = []
    var totNum = 0;
    var count = 0;

    for(i = 0; i < 5 ; i++){
        var ranNum = Math.floor(Math.random() * 100)
        array.push(ranNum) //Math.random() - 0.0 부터 1.0 까지 사이의 랜덤 숫자
        totNum += ranNum
        count += 1
    }

    var avg = totNum / count
    var greater = []

    array.forEach(function(num){
        if(num > avg){
            greater.push(num)
        }
    })
    
    var text = document.getElementById('text');
    var button = document.getElementById('button');
    text.innerHTML = "The Array is:" + array + "<br> The mean is:" + avg + "<br> Greater:" + greater
}

