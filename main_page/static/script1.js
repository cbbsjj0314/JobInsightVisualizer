
let myChart1; // 차트 인스턴스를 저장할 변수

/*
dummy data
const jsonData = [
    {'datetime': '2024-10-10', 'count': 100},
    {'datetime': '2024-10-11', 'count': 7},
    {'datetime': '2024-10-12', 'count': 10},
    {'datetime': '2024-10-13', 'count': 6},
    {'datetime': '2024-10-14', 'count': 4},
    {'datetime': '2024-10-15', 'count': 3},
    {'datetime': '2024-10-16', 'count': 2}
]
*/

/* 
/* data.map(data => data.count)

/* basic_기본 데이터 생성 */
function drawChart1(data) {
    if (myChart1 != null) {
        console.log('차트 제거');
        myChart1.destroy(); // 차트가 존재하면 제거
    }
    console.log("drawchart1 data: ", data);
    console.log("drawchart1 data type : ", typeof data);
    console.log("drawchart1 data.datetime : ", data.datetime);
    console.log("drawchart1 data.count : ", data.count);
    console.log(2);

    const ctx = document.getElementById('myChart1').getContext('2d');
    var maxDataValue = Math.max(...data.map(d => d.count));
    var yMax = maxDataValue * 1.3;

    // 링크드인 느낌의 그라데이션 생성
    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient.addColorStop(0, 'rgba(0, 119, 181, 1)'); // 위쪽 색상 (진한 파란색)
    gradient.addColorStop(0.5, 'rgba(0, 119, 181, 0.5)'); // 중간 색상
    gradient.addColorStop(1, 'rgba(0, 119, 181, 0.1)');   // 아래쪽 색상

    console.log(3);

    const config ={
        type : 'line',
        data: {
            labels: data.map(data => data.datetime),
            datasets: [{
                label: '일별 채용 공고 수',
                data: data.map(data => data.count),
                backgroundColor: gradient,
                fill: 'start',
                borderColor: 'rgba(0, 119, 181, 1)', // 경계선 부분의 색상 (진한 파란색)
                borderWidth: 4,
                pointBackgroundColor: 'rgba(255, 255, 255, 1)', // 데이터 포인트 배경색 (흰색)
                pointBorderColor: 'rgba(0, 119, 181, 1)', // 데이터 포인트 경계선 색상 (진한 파란색)
                pointBorderWidth: 4
            }]
        },

        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'yyyy-MM-dd'
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    beginAtZero: true,
                    max: yMax,
                    title: {
                        display: true,
                        text: 'count'
                    }
                }
            },
            elements : {
                line:{
                    tension: 0.4
                }
            }
        }
    }
    console.log(4);
    console.log(ctx);
    console.log(config);
    myChart1 = new Chart(ctx, config);
}


/* 
/* data.map(data => data.count)

/* basic_기본 데이터 생성 */
function updateChart(data) {
    if (myChart1 != null) {
        console.log('차트 제거');
        myChart1.destroy(); // 차트가 존재하면 제거
    }
    console.log("updatechart1 data: ", data);
    console.log("updatechart1 data type : ", typeof data);
    console.log("updatechart1 data.datetime : ", data.datetime);
    console.log("updatechart1 data.count : ", data.count);
    console.log(2);

    const ctx = document.getElementById('myChart1').getContext('2d');
    var maxDataValue = Math.max(...data.map(d => d.count));
    var yMax = maxDataValue * 1.3;

    // 링크드인 느낌의 그라데이션 생성
    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient.addColorStop(0, 'rgba(0, 119, 181, 1)'); // 위쪽 색상 (진한 파란색)
    gradient.addColorStop(0.5, 'rgba(0, 119, 181, 0.5)'); // 중간 색상
    gradient.addColorStop(1, 'rgba(0, 119, 181, 0.1)');   // 아래쪽 색상

    console.log(3);

    const config ={
        type : 'line',
        data: {
            labels: data.map(data => data.datetime),
            datasets: [{
                label: '일별 채용 공고 수',
                data: data.map(data => data.count),
                backgroundColor: gradient,
                fill: 'start',
                borderColor: 'rgba(0, 119, 181, 1)', // 경계선 부분의 색상 (진한 파란색)
                borderWidth: 4,
                pointBackgroundColor: 'rgba(255, 255, 255, 1)', // 데이터 포인트 배경색 (흰색)
                pointBorderColor: 'rgba(0, 119, 181, 1)', // 데이터 포인트 경계선 색상 (진한 파란색)
                pointBorderWidth: 4
            }]
        },

        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'yyyy-MM-dd'
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    beginAtZero: true,
                    max: yMax,
                    title: {
                        display: true,
                        text: 'count'
                    }
                }
            },
            elements : {
                line:{
                    tension: 0.4
                }
            }
        }
    }
    console.log(4);
    console.log(ctx);
    console.log(config);
    myChart1 = new Chart(ctx, config);
}
