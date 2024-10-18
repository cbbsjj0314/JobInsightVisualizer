// let myChart1; // 첫 번째 차트 인스턴스
// let myChart2; // 두 번째 차트 인스턴스

/**
 * 서버에서 보내는 Json 형식에 따른 script 
 */
// 서버에서 오는 데이터 (예시)
// const responseData = [
//     { "location_name": "강원", "experience_level": "신입", "rate": 30 },
//     { "location_name": "강원", "experience_level": "경력", "rate": 40 },
//     { "location_name": "강원", "experience_level": "경력무관", "rate": 30 },
//     { "location_name": "경기", "experience_level": "신입", "rate": 35 },
//     { "location_name": "경기", "experience_level": "경력", "rate": 40 },
//     { "location_name": "경기", "experience_level": "경력무관", "rate": 25 },
//     { "location_name": "경남", "experience_level": "신입", "rate": 40 },
//     { "location_name": "경남", "experience_level": "경력", "rate": 35 },
//     { "location_name": "경남", "experience_level": "경력무관", "rate": 25 },
//     { "location_name": "경북", "experience_level": "신입", "rate": 45 },
//     { "location_name": "경북", "experience_level": "경력", "rate": 30 },
//     { "location_name": "경북", "experience_level": "경력무관", "rate": 25 },
//     { "location_name": "광주", "experience_level": "신입", "rate": 50 },
//     { "location_name": "광주", "experience_level": "경력", "rate": 30 },
//     { "location_name": "광주", "experience_level": "경력무관", "rate": 20 },
//     { "location_name": "대구", "experience_level": "신입", "rate": 55 },
//     { "location_name": "대구", "experience_level": "경력", "rate": 30 },
//     { "location_name": "대구", "experience_level": "경력무관", "rate": 15 },
//     { "location_name": "대전", "experience_level": "신입", "rate": 40 },
//     { "location_name": "대전", "experience_level": "경력", "rate": 40 },
//     { "location_name": "대전", "experience_level": "경력무관", "rate": 20 },
//     { "location_name": "부산", "experience_level": "신입", "rate": 30 },
//     { "location_name": "부산", "experience_level": "경력", "rate": 50 },
//     { "location_name": "부산", "experience_level": "경력무관", "rate": 20 },
//     { "location_name": "서울", "experience_level": "신입", "rate": 40 },
//     { "location_name": "서울", "experience_level": "경력", "rate": 30 },
//     { "location_name": "서울", "experience_level": "경력무관", "rate": 30 },
//     { "location_name": "세종", "experience_level": "신입", "rate": 45 },
//     { "location_name": "세종", "experience_level": "경력", "rate": 30 },
//     { "location_name": "세종", "experience_level": "경력무관", "rate": 25 },
//     { "location_name": "울산", "experience_level": "신입", "rate": 50 },
//     { "location_name": "울산", "experience_level": "경력", "rate": 30 },
//     { "location_name": "울산", "experience_level": "경력무관", "rate": 20 },
//     { "location_name": "인천", "experience_level": "신입", "rate": 35 },
//     { "location_name": "인천", "experience_level": "경력", "rate": 40 },
//     { "location_name": "인천", "experience_level": "경력무관", "rate": 25 },
//     { "location_name": "전북", "experience_level": "신입", "rate": 40 },
//     { "location_name": "전북", "experience_level": "경력", "rate": 35 },
//     { "location_name": "전북", "experience_level": "경력무관", "rate": 25 },
//     { "location_name": "제주", "experience_level": "신입", "rate": 30 },
//     { "location_name": "제주", "experience_level": "경력", "rate": 40 },
//     { "location_name": "제주", "experience_level": "경력무관", "rate": 30 },
//     { "location_name": "충남", "experience_level": "신입", "rate": 50 },
//     { "location_name": "충남", "experience_level": "경력", "rate": 30 },
//     { "location_name": "충남", "experience_level": "경력무관", "rate": 20 },
//     { "location_name": "충북", "experience_level": "신입", "rate": 40 },
//     { "location_name": "충북", "experience_level": "경력", "rate": 35 },
//     { "location_name": "충북", "experience_level": "경력무관", "rate": 25 },
//     { "location_name": "해외", "experience_level": "신입", "rate": 20 },
//     { "location_name": "해외", "experience_level": "경력", "rate": 60 },
//     { "location_name": "해외", "experience_level": "경력무관", "rate": 20 },
// ]; // 더미데이터 


//
// /**
//  * @function drawChart 막대그래프 그리는 메소드
//  * @author dhshin
//  * @param {*} responseData 지역별 채용공고로 신입/경력 비중 data  .json 형식
//  */
// function drawChart(responseData) {
//     console.log(responseData)
//
//     const labels = [...new Set(responseData.map(data => data.location_name))];
//
//     const 신입비율 = labels.map(label => {
//         const found = responseData.find(data => data.location_name === label && data.experience_level === "신입");
//         return found ? found.rate : 0;
//     });
//
//     const 경력비율 = labels.map(label => {
//         const found = responseData.find(data => data.location_name === label && data.experience_level === "경력");
//         return found ? found.rate : 0;
//     });
//
//     const 경력무관비율 = labels.map(label => {
//         const found = responseData.find(data => data.location_name === label && data.experience_level === "경력무관");
//         return found ? found.rate : 0;
//     });
//
//     const trace1 = {
//         x: labels,
//         y: 신입비율,
//         name: '신입 비율',
//         type: 'bar',
//         marker: {
//             color: '#4CAF50', // Green
//             line: { width: 1.5 }
//         }
//     };
//
//     const trace2 = {
//         x: labels,
//         y: 경력비율,
//         name: '경력 비율',
//         type: 'bar',
//         marker: {
//             color: '#2196F3', // Blue
//             line: { width: 1.5 }
//         }
//     };
//
//     const trace3 = {
//         x: labels,
//         y: 경력무관비율,
//         name: '경력무관 비율',
//         type: 'bar',
//         marker: {
//             color: '#FFC107', // Amber
//             line: { width: 1.5 }
//         }
//     };
//
//     const data = [trace1, trace2, trace3];
//
//     const layout = {
//         title: '지역별 신입/경력 비율',
//         barmode: 'group',
//         xaxis: {
//             title: '지역',
//             showgrid: false,
//             zeroline: false,
//             showline: true
//         },
//         yaxis: {
//             title: '비율 (%)',
//             showgrid: true,
//             zeroline: false,
//             showline: true
//         },
//         legend: {
//             orientation: 'h',
//             yanchor: 'bottom',
//             y: 1.02,
//             xanchor: 'right',
//             x: 1
//         },
//         paper_bgcolor: '#f4f4f4',
//         plot_bgcolor: '#f4f4f4'
//     };
//
//     Plotly.newPlot('myDiv', data, layout);
//
// }
// /**
//  * @function
//  * @author
//  * @param {*} responseData
//  */
// function drawChart2(responseData) {
//     // 각 경험 유형별 데이터 생성
//     const location_names = [...new Set(responseData.map(data => data.location_name))];
//     const newbieRates = location_names.map(location_name => responseData.find(data => data.location_name === location_name && data.experience_level === "신입").rate);
//     const experience_leveldRates = location_names.map(location_name => responseData.find(data => data.location_name === location_name && data.experience_level === "경력").rate);
//     const nonexperience_leveldRates = location_names.map(location_name => responseData.find(data => data.location_name === location_name && data.experience_level === "경력무관").rate);
//
//     // 꺽은선 그래프 데이터
//     const trace1 = {
//         x: location_names,
//         y: newbieRates,
//         mode: 'lines+markers',
//         name: '신입 비율',
//         line: { shape: 'spline', width: 2, color: '#1f77b4' }
//     };
//
//     const trace2 = {
//         x: location_names,
//         y: experience_leveldRates,
//         mode: 'lines+markers',
//         name: '경력 비율',
//         line: { shape: 'spline', width: 2, color: '#ff7f0e' }
//     };
//
//     const trace3 = {
//         x: location_names,
//         y: nonexperience_leveldRates,
//         mode: 'lines+markers',
//         name: '경력무관 비율',
//         line: { shape: 'spline', width: 2, color: '#2ca02c' }
//     };
//
//     const data = [trace1, trace2, trace3];
//
//     const layout = {
//         title: '지역별 신입/경력 비율',
//         xaxis: {
//             title: '지역',
//             tickangle: -45
//         },
//         yaxis: {
//             title: '비율 (%)',
//             showgrid: true,
//             zeroline: false
//         },
//         legend: {
//             x: 0,
//             y: 1,
//             bgcolor: 'rgba(255, 255, 255, 0.8)',
//             bordercolor: 'black',
//             borderwidth: 1
//         },
//         paper_bgcolor: '#f5f5f5',
//         plot_bgcolor: '#f5f5f5'
//     };
//
//     // 그래프 그리기
//     Plotly.newPlot('lineChart', data, layout);
//
// }


function drawCombinedChart(responseData) {
    // 지역 라벨 생성
    const labels = [...new Set(responseData.map(data => data.location_name))];

    // 비율 계산
    const 신입비율 = labels.map(label => {
        const found = responseData.find(data => data.location_name === label && data.experience_level === "신입");
        return found ? found.rate : 0;
    });

    const 경력비율 = labels.map(label => {
        const found = responseData.find(data => data.location_name === label && data.experience_level === "경력");
        return found ? found.rate : 0;
    });

    const 경력무관비율 = labels.map(label => {
        const found = responseData.find(data => data.location_name === label && data.experience_level === "경력무관");
        return found ? found.rate : 0;
    });

    // 막대 그래프 데이터
    // 막대 그래프 데이터 (연한 색상)
    const trace1 = {
        x: labels,
        y: 신입비율,
        name: '신입 비율',
        type: 'bar',
        marker: {
            color: 'rgba(173, 216, 230, 0.3)', // 연한 파란색
            line: { width: 1.5 }
        }
    };

    const trace2 = {
        x: labels,
        y: 경력비율,
        name: '경력 비율',
        type: 'bar',
        marker: {
            color: 'rgba(174, 238, 174, 0.3)', // 연한 녹색
            line: { width: 1.5 }
        }
    };

    const trace3 = {
        x: labels,
        y: 경력무관비율,
        name: '경력무관 비율',
        type: 'bar',
        marker: {
            color: 'rgba(230, 230, 250, 0.3)', // 연한 라벤더
            line: { width: 1.5 }
        }
    };

    // 꺽은선 그래프 데이터 (진한 색상)
    const lineTrace1 = {
        x: labels,
        y: 신입비율,
        mode: 'lines+markers',
        name: '신입 비율 (꺽은선)',
        line: { shape: 'spline', width: 3, color: '#1f77b4' } // 진한 파란색
    };

    const lineTrace2 = {
        x: labels,
        y: 경력비율,
        mode: 'lines+markers',
        name: '경력 비율 (꺽은선)',
        line: { shape: 'spline', width: 3, color: '#ff7f0e' } // 진한 주황색
    };

    const lineTrace3 = {
        x: labels,
        y: 경력무관비율,
        mode: 'lines+markers',
        name: '경력무관 비율 (꺽은선)',
        line: { shape: 'spline', width: 3, color: '#2ca02c' } // 진한 녹색
    };

    const data = [trace1, trace2, trace3, lineTrace1, lineTrace2, lineTrace3];

    const layout = {
        title: '지역별 신입/경력 비율',
        barmode: 'group',
        xaxis: {
            title: '지역',
            showgrid: false,
            zeroline: false,
            showline: true,
            tickangle: -45 // 꺽은선 그래프 x축 각도 조정
        },
        yaxis: {
            title: '비율 (%)',
            showgrid: true,
            zeroline: false,
            showline: true
        },
        legend: {
            orientation: 'h',
            yanchor: 'bottom',
            y: 1.02,
            xanchor: 'right',
            x: 1
        },
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#ffffff'
    };

    // 그래프 그리기
    Plotly.newPlot('myDiv2', data, layout);
}

