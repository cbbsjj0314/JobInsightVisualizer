// const pastelColors = [
//     "#FFB3BA", // 파스텔 핑크
//     "#FFDFBA", // 파스텔 오렌지
//     "#FFFFBA", // 파스텔 노란색
//     "#BAFFC9", // 파스텔 민트
//     "#BAE1FF", // 파스텔 하늘색
//     "#FFC3BA", // 파스텔 복숭아
//     "#FFABAB", // 연한 빨간색
//     "#FFC3A0", // 부드러운 코랄
//     "#FF677D", // 파스텔 장미
//     "#D4A5A5", // 파스텔 그레이
//     "#392F5A", // 파스텔 보라색
//     "#F9C74F", // 파스텔 올리브
//     "#90BE6D", // 파스텔 녹색
//     "#43AA8B", // 파스텔 청록색
//     "#577590", // 파스텔 회색
//     "#F3722C", // 파스텔 주황색
//     "#F94144", // 파스텔 빨강
//     "#F9AFAF", // 연한 핑크
//     "#F9C2C2", // 연한 살구
//     "#FCE38A", // 파스텔 레몬
//     "#FFAAE1", // 파스텔 자주색
//     "#FFC97B", // 파스텔 금색
//     "#F9F5EB", // 부드러운 베이지
//     "#A9E5BB", // 파스텔 연두
//     "#A0D5E6", // 파스텔 라벤더
//     "#D9B4F5", // 파스텔 보라
//     "#FFC4B0", // 파스텔 크림
//     "#B3D8C5", // 파스텔 민트 그린
//     "#E9AFA3", // 파스텔 피치
//     "#BDA0D8", // 부드러운 보라색
//     "#F5E1C0", // 파스텔 누드
//     "#FFB2A1", // 부드러운 핑크
// ];

function fetchChartData() {
    fetch('http://127.0.0.1:8000/main_page/chart3_data/')
        .then(response => {
            if (!response.ok) {
                throw new Error('응답이 정상적이지 않음');
            }
            return response.json();
        })
        .then(data => {
            // job_title만 가져오기
            const jobTitleList = data.map(item => item.job_title);
            updateJobTitleDropdown(jobTitleList);
            window.chart3_data_dummy = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updateJobTitleDropdown(jobTitles) {
    const dropdown = document.getElementById('job-dropdown');
    dropdown.innerHTML = ''; // 기존 목록 초기화

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = '직업 목록';
    dropdown.appendChild(defaultOption);

    jobTitles.forEach(jobTitle => {
        const option = document.createElement('option');
        option.value = jobTitle; // 직업 제목을 값으로 설정
        option.textContent = jobTitle; // 드롭다운 표시 이름
        dropdown.appendChild(option);
    });
}

function showJobChart(selectedJobTitle) {
    console.log('선택한 직업:', selectedJobTitle);
    const selectedJobData = window.chart3_data_dummy.find(job => job.job_title === selectedJobTitle);

    if (selectedJobData) {
        createEntryTreemap(selectedJobData.entry_tech_stacks);
        createExperiencedTreemap(selectedJobData.experienced_tech_stacks);
    }
}

function createEntryTreemap(entryTechStacks) {
    // 트리맵 데이터 준비
    const entryData = entryTechStacks.map(stack => ({
        name: stack.tech_name,
        value: stack.percentage,
        color: getRandomColor()
    }));

    // D3.js를 사용한 트리맵 생성 코드
    const entryTreemapContainer = d3.select("#entry-treemap")
        .html(""); // 기존 내용 지우기

    const size = Math.min(entryTreemapContainer.node().clientWidth, 800); // 최대 400px 정사각형

    const root = d3.hierarchy({ children: entryData })
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);

    d3.treemap()
        .size([size, size]) // 정사각형 설정
        .padding(1)(root);

    // 캔버스 생성
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');

    // 텍스트 크기 설정
    const fontSize = 12;
    context.font = `${fontSize}px Arial`;
    context.textAlign = "left";
    context.textBaseline = "top";

    // 트리맵 요소를 그립니다.
    root.leaves().forEach(d => {
        context.fillStyle = d.data.color || "#69b3a2";
        context.fillRect(d.x0, d.y0, d.x1 - d.x0, d.y1 - d.y0);

        context.fillStyle = "#000";
        const textX = d.x0 + 5;
        const textY = d.y0 + 5;
        const text = `${d.data.name} (${d.data.value}%)`;

        if (context.measureText(text).width < (d.x1 - d.x0 - 10)) {
            context.fillText(text, textX, textY);
        } else {
            context.fillText(d.data.name, textX, textY);
        }
    });

    const img = new Image();
    img.src = canvas.toDataURL();
    img.alt = "Entry Level Tech Stacks Treemap";

    // 기존의 트리맵 컨테이너에 이미지 추가
    entryTreemapContainer.html("").append(() => img);
}

function createExperiencedTreemap(experiencedTechStacks) {
    // 트리맵 데이터 준비
    const experiencedData = experiencedTechStacks.map(stack => ({
        name: stack.tech_name,
        value: stack.percentage,
        color: getRandomColor()
    }));

    // D3.js를 사용한 트리맵 생성 코드
    const experiencedTreemapContainer = d3.select("#experienced-treemap")
        .html(""); // 기존 내용 지우기

    const size = Math.min(experiencedTreemapContainer.node().clientWidth, 800); // 최대 400px 정사각형

    const root = d3.hierarchy({ children: experiencedData })
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);

    d3.treemap()
        .size([size, size]) // 정사각형 설정
        .padding(1)(root);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');

    const fontSize = 12;
    context.font = `${fontSize}px Arial`;
    context.textAlign = "left";
    context.textBaseline = "top";

    root.leaves().forEach(d => {
        context.fillStyle = d.data.color || "#69b3a2";
        context.fillRect(d.x0, d.y0, d.x1 - d.x0, d.y1 - d.y0);

        context.fillStyle = "#000";
        const textX = d.x0 + 5;
        const textY = d.y0 + 5;
        const text = `${d.data.name} (${d.data.value}%)`;

        if (context.measureText(text).width < (d.x1 - d.x0 - 10)) {
            context.fillText(text, textX, textY);
        } else {
            context.fillText(d.data.name, textX, textY);
        }
    });

    const img = new Image();
    img.src = canvas.toDataURL();
    img.alt = "Experienced Level Tech Stacks Treemap";

    experiencedTreemapContainer.html("").append(() => img);
}

// 처음 페이지 로딩 시 차트 데이터 가져오기
document.addEventListener("DOMContentLoaded", fetchChartData);
