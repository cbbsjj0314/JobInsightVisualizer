const colorPalette = [
    "#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF",
    "#FFC3BA", "#FFABAB", "#FFC3A0", "#FF677D", "#D4A5A5",
    "#392F5A", "#F9C74F", "#90BE6D", "#43AA8B", "#577590",
    "#F3722C", "#F94144", "#F9AFAF", "#F9C2C2", "#FCE38A",
    "#FFAAE1", "#FFC97B", "#F9F5EB", "#A9E5BB", "#A0D5E6",
    "#D9B4F5", "#FFC4B0", "#B3D8C5", "#E9AFA3", "#BDA0D8",
    "#F5E1C0", "#FFB2A1",
];
const url = window.location.origin + '/api/stat/job_need_skills/';
// chart3 data 가져오기
function fetchChart3Data() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('응답이 정상적이지 않음');
            }
            return response.json();
        })
        .then(data => {
            // job_title만 가져오기
            const jobTitles = data.map(item => item.job_title);
            updateJobTitleDropdown(jobTitles);
            window.jobTechStacksData = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// data의 "job_title"로 드롭다운 메뉴 생성
function updateJobTitleDropdown(jobTitles) {
    const dropdown = document.getElementById('chart3-job-dropdown');
    // 기존 목록 초기화 (= showChart(3) 누를 시, 데이터 갱신)
    // 초기화 안 하면 showChart(3) 누를 때마다 job_title을 불러와서 계속 새로 쌓음
    dropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = '직업 목록';
    dropdown.appendChild(defaultOption);

    // 각 직업 이름을 드롭다운에 순서대로 표시
    jobTitles.forEach(jobTitle => {
        const option = document.createElement('option');
        option.value = jobTitle; // 직업 이름을 값으로 설정
        option.textContent = jobTitle; // 드롭다운 표시 이름
        dropdown.appendChild(option);
    });
}

// tech_stacks 데이터 뽑기
function generateJobTechStacksTreemap(selectedJobTitle) {
    const selectedJobData = window.jobTechStacksData.find(job => job.job_title === selectedJobTitle);

    if (selectedJobData) {
        createEntryTreemap(selectedJobData.entry_tech_stacks);
        createExperiencedTreemap(selectedJobData.experienced_tech_stacks);
    }
}

// 트리맵 생성
function createTreemap(containerId, techStacks, colors, treemapType) {
    // 트리맵을 표시할 컨테이너 선택
    const treemapContainer = d3.select(containerId)
        .html(""); // 기존 내용 지우기

    const size = Math.min(treemapContainer.node().clientWidth, 800);
    const width = 800;
    const height = 400;

    // techStacks가 비어 있는 경우, "공고 없음" 텍스트를 표시
    if (techStacks.length === 0) {
        const noDataMessage = "공고 없음";
        treemapContainer.append("div")
            .style("width", `${width}px`)
            .style("height", `${height}px`)
            .style("display", "flex")
            .style("align-items", "center")
            .style("justify-content", "center")
            .style("font-size", "24px")
            .text(noDataMessage);
        return; // 함수 종료
    }

    // 트리맵 데이터 준비
    const treemapData = techStacks.map((stack, index) => ({
        name: stack.tech_name,
        value: stack.percentage,
        color: colors[index % colors.length]
    }));

    const root = d3.hierarchy({ children: treemapData })
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);

    d3.treemap()
        .size([width, height])
        .padding(1)(root);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');

    const fontSize = 15;
    context.font = `${fontSize}px Arial`;
    context.textAlign = "left";
    context.textBaseline = "top";

    root.leaves().forEach(d => {
        context.fillStyle = d.data.color || "#69b3a2";
        context.fillRect(d.x0, d.y0, d.x1 - d.x0, d.y1 - d.y0);

        context.fillStyle = "#000";
        const textX = d.x0 + 5; // 텍스트 여백
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
    img.alt = `${treemapType} Level Tech Stacks Treemap`;

    // 트리맵 컨테이너에 이미지 추가
    treemapContainer.html("").append(() => img);
}

function createEntryTreemap(entryTechStacks) {
    createTreemap("#entry-treemap", entryTechStacks, colorPalette, "Entry");
}

function createExperiencedTreemap(experiencedTechStacks) {
    const reversedColors = [...colorPalette].reverse();
    createTreemap("#experienced-treemap", experiencedTechStacks, reversedColors, "Experienced");
}