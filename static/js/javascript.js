window.addEventListener('DOMContentLoaded', function () {

    getchartHandler(); //실행시 차트 뿌려주는 메소드 
    var chart; // 차트 
    let camera0 = document.querySelector("#camera0");
    let camera1 = document.querySelector("#camera1");
    let camera2 = document.querySelector("#camera2");
    let camera3 = document.querySelector("#camera3");

    let changevideo = document.querySelector("#changevideo");

    let initbtn1 = document.querySelector("#select1 > div > li:nth-child(1)");
    let initbtn2 = document.querySelector("#select2 > div > li:nth-child(1)");

    let lis1 = document.querySelector("#lis1");
    let lis2 = document.querySelector("#lis2");

    /* 처음 첫번째 목록에 green */
    initbtn1.classList.add("clicked");
    initbtn2.classList.add("clicked");
    /*-----------*/

    /*-------time--------*/
    let time = document.querySelector("#time"); //시간 

    function showDateMethod() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        //time.innerHTML = date;
        time.innerHTML = `${year}년 ${month}월 ${day}일 ${hour} : ${minutes} : ${seconds}`; //빽틱
    }
    showDateMethod();

    function init() {
        setInterval(showDateMethod, 1000);
    }
    init();

    /*-------time--------*/
    /*-------list1 click change green-------*/
    let cameralist = document.querySelectorAll(".list1");
    function unclicked() {
        for (let i = 0; i < cameralist.length; i++) {
            lis2.setAttribute("value", 0);
            cameralist[i].classList.remove("clicked");
        }
    }

    for (let i = 0; i < cameralist.length; i++) {
        cameralist[i].addEventListener("click", function () {
            lis1.setAttribute("value", i);
            unclicked();
            objUnclicked();
            cameralist[i].classList.add("clicked");
            initbtn2.classList.add("clicked");
            //ob.setAttribute("value");
        });
    }
    /*-------list1 click change green-------*/
    /*-------list2 click change green-------*/
    let objectlist = document.querySelectorAll(".list2");
    function objUnclicked() {
        for (let i = 0; i < objectlist.length; i++) {
            objectlist[i].classList.remove("clicked");
        }
    }

    for (let i = 0; i < objectlist.length; i++) {
        objectlist[i].addEventListener("click", function () {
            lis2.setAttribute("value", i);
            objUnclicked();
            objectlist[i].classList.add("clicked");
        });
    }
    /*-------list2 click change green-------*/

    /*--동영상 변경 --*/


    camera1.addEventListener("click", function () {
        changevideo.setAttribute("src", "static/project1.mp4");
    });
    camera2.addEventListener("click", function () {
        changevideo.setAttribute("src", "static/project2.mp4")
    });
    camera3.addEventListener("click", function () {
        changevideo.setAttribute("src", "static/project3.mp4")
    }); //이부분 플라스크 처리 난해;;

    /*
        동영상이 여러개면 for 문 , queryAll 로 받아서 처리하자 
        + 예외처리
        for(~ )
        cameralist[i].addEventListenr("click" , function){
            changevideo.setAttribute("src","video/project"+"[i]"+.mp4");
        });
    */


    /*--동영상 변경 --*/
    function getchartHandler() { //차트 호출 메소드
        var li1 = $('#lis1').val();
        var li2 = $('#lis2').val();

        $.ajax({
            type: 'POST',
            url: "/allexecute",
            data: {
                lis1: li1,
                lis2: li2
            },
            success: function (res) {

                res = res.replaceAll("[", "");
                res = res.replaceAll("]", "");

                var dt = [];
                res = res.split(',');

                while (res[0]) {
                    dt.push(res.splice(0, 4));
                }
                //값을 넘겨 받았으나 string 형태여서 2차원배열 억지로 변환
                if (chart) { // new chart 형식으로 사용시 이전 차트 부셔야함 
                    chart.destroy();
                }


                chart = new Chart($('#record'), {
                    type: "line",
                    data: {
                        labels: [
                            dt[0][0], dt[1][0], dt[2][0], dt[3][0], dt[4][0],
                            dt[5][0], dt[6][0], dt[7][0], dt[8][0], dt[9][0],
                            dt[10][0], dt[11][0], dt[12][0], dt[13][0], dt[14][0],
                            dt[15][0], dt[16][0], dt[17][0], dt[18][0], dt[19][0],
                            dt[20][0], dt[21][0], dt[22][0], dt[23][0], dt[24][0], dt[25][0]
                        ],
                        datasets: [{
                            label: 'activity',
                            data: [
                                dt[0][1], dt[1][1], dt[2][1], dt[3][1], dt[4][1],
                                dt[5][1], dt[6][1], dt[7][1], dt[8][1], dt[9][1],
                                dt[10][1], dt[11][1], dt[12][1], dt[13][1], dt[14][1],
                                dt[15][1], dt[16][1], dt[17][1], dt[18][1], dt[19][1],
                                dt[20][1], dt[21][1], dt[22][1], dt[23][1], dt[24][1], dt[25][1]

                            ],
                            backgroundColor: "black",
                            borderColor: "black",
                            borderWidth: 2,
                            pointRadius: 3,
                            pointHoverRadius: 8,
                            fill: false,
                        }, {
                            label: 'feed',
                            data: [
                                dt[0][2], dt[1][2], dt[2][2], dt[3][2], dt[4][2],
                                dt[5][2], dt[6][2], dt[7][2], dt[8][2], dt[9][2],
                                dt[10][2], dt[11][2], dt[12][2], dt[13][2], dt[14][2],
                                dt[15][2], dt[16][2], dt[17][2], dt[18][2], dt[19][2],
                                dt[20][2], dt[21][2], dt[22][2], dt[23][2], dt[24][2], dt[25][2]
                            ],
                            backgroundColor: "green",
                            borderColor: "green",
                            borderWidth: 2,
                            pointRadius: 3,
                            pointHoverRadius: 8,
                            fill: false,
                        }, {
                            label: 'drinking',
                            data: [
                                dt[0][3], dt[1][3], dt[2][3], dt[3][3], dt[4][3],
                                dt[5][3], dt[6][3], dt[7][3], dt[8][3], dt[9][3],
                                dt[10][3], dt[11][3], dt[12][3], dt[13][3], dt[14][3],
                                dt[15][3], dt[16][3], dt[17][3], dt[18][3], dt[19][3],
                                dt[20][3], dt[21][3], dt[22][3], dt[23][3], dt[24][3], dt[25][3]
                            ],
                            backgroundColor: "yellow",
                            borderColor: "yellow",
                            borderWidth: 2,
                            pointRadius: 3,
                            pointHoverRadius: 8,
                            fill: false,
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    fontSize: 14,
                                }
                            }]
                        }
                    }
                });
                //chart.update();
            },
            error: function () {
                console.log("실패");
            }
        });
    }
    $(function () {
        $(".btn").on("click", getchartHandler);
    });
});