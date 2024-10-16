import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os

#Seabron
# def save_programming_chart():
#     print("in")
#     # 데이터 생성
#     data = {
#         'Language': ['Java', 'Java', 'Java', 'Python', 'Python', 'Python', 'JavaScript', 'JavaScript', 'JavaScript', 'C', 'C', 'C'],

#         'Percentage': [30, 30, 40, 25, 35, 40, 50, 30, 20, 10, 50, 40]
#     }

#     # DataFrame 생성
#     df = pd.DataFrame(data)

#     # Seaborn을 사용하여 막대 차트 그리기
#     plt.figure(figsize=(10, 6))
#     sns.barplot(x='Language', y='Percentage', hue='Job', data=df)

#     # 그래프 저장 경로 설정
#     chart_dir = os.path.join('static', 'charts')
    
#     # 디렉토리가 없으면 생성
#     os.makedirs(chart_dir, exist_ok=True)

#     chart_path = os.path.join(chart_dir, 'programming_chart.png')
#     if os.path.exists(chart_path):
#         print(f"{chart_path} 파일이 존재합니다. 덮어씁니다.")
#     else:
#         print(f"{chart_path} 파일이 존재하지 않습니다. 새로 생성합니다.")

#     # 차트 이미지 저장
#     plt.savefig(chart_path)
#     plt.close()

#     return chart_path

# 2번 
response_data = [
        {"region": "Seoul", "experience": "enNewbie", "rate": 40},
        {"region": "Seoul", "experience": "Experienced", "rate": 30},
        {"region": "Seoul", "experience": "entryLevel", "rate": 30},
        {"region": "Busan", "experience": "enNewbie", "rate": 30},
        {"region": "Busan", "experience": "Experienced", "rate": 40},
        {"region": "Busan", "experience": "entryLevel", "rate": 30},
        {"region": "Deagu", "experience": "enNewbie", "rate": 50},
        {"region": "Deagu", "experience": "Experienced", "rate": 20},
        {"region": "Deagu", "experience": "entryLevel", "rate": 30},
        {"region": "Gwangju", "experience": "enNewbie", "rate": 20},
        {"region": "Gwangju", "experience": "Experienced", "rate": 50},
        {"region": "Gwangju", "experience": "entryLevel", "rate": 30},
        {"region": "Deajeon", "experience": "enNewbie", "rate": 60},
        {"region": "Deajeon", "experience": "Experienced", "rate": 30},
        {"region": "Deajeon", "experience": "entryLevel", "rate": 10}
    ]

# # 데이터프레임 생성
df = pd.DataFrame(response_data)

def draw_stacked_chart(df, filename='chart.png'):
    # region별 데이터를 그룹화
    grouped = df.groupby('region')

    # 필요한 데이터를 배열로 변환
    locations = grouped.size().index
    enNewbie = grouped.apply(lambda x: x[x['experience'] == 'enNewbie']['rate'].sum())
    Experienced = grouped.apply(lambda x: x[x['experience'] == 'Experienced']['rate'].sum())
    entryLevel = grouped.apply(lambda x: x[x['experience'] == 'entryLevel']['rate'].sum())

    # 막대 차트 생성
    bar_width = 0.35
    fig, ax = plt.subplots(figsize=(12, 6))

    # 스택된 바 차트 그리기
    ax.bar(locations, enNewbie, label='enNewbie')
    ax.bar(locations, Experienced, bottom=enNewbie, label='Experienced')
    ax.bar(locations, entryLevel, bottom=enNewbie + Experienced, label='entryLevel')

    ax.set_xlabel('region')
    ax.set_ylabel('rate (%)')
    ax.set_title('region per enNewbie/Experienced/entryLevel rate')
    ax.legend()

    # 그래프 저장 경로 설정
    chart_dir = os.path.join('main_page','static', 'charts')

    # 디렉토리가 없으면 생성
    os.makedirs(chart_dir, exist_ok=True)

    chart_path = os.path.join(chart_dir, filename)
    # plt.tight_layout()
    plt.savefig(chart_path)
    plt.close()

draw_stacked_chart(df, filename='chart1.png')
#4번 차트 그리는 
def save_programming_chart4():
    print("in")
    
    # 주어진 데이터
    data = [
        {
            "lang": "Java",
            "jobs": [
                { "job": "Backend engineer", "percentage": 30 },
                { "job": "java engineer", "percentage": 30 },
                { "job": "web engineer", "percentage": 40 }
            ]
        },
        {
            "lang": "Python",
            "jobs": [
                { "job": "Backend engineer", "percentage": 25 },
                { "job": "data engineer", "percentage": 35 },
                { "job": "frontend engineer", "percentage": 40 }
            ]
        },
        {
            "lang": "JavaScript",
            "jobs": [
                { "job": "frontend engineer", "percentage": 50 },
                { "job": "fullstack engineer", "percentage": 30 },
                { "job": "web publisher", "percentage": 20 }
            ]
        },
        {
            "lang": "C",
            "jobs": [
                { "job": "Embeded engineer", "percentage": 10 },
                { "job": "IOT engineer", "percentage": 50 },
                { "job": "coreBanking engineer", "percentage": 40 }
            ]
        }
    ]

    # 데이터프레임 생성
    records = []
    for language in data:
        for job_info in language["jobs"]:
            records.append({
                "Language": language["lang"],
                "Job": job_info["job"],
                "Percentage": job_info["percentage"],
            })

    df = pd.DataFrame(records)

    # Seaborn을 사용하여 막대 차트 그리기
    plt.figure(figsize=(10, 6))
    sns.barplot(x='Language', y='Percentage', hue='Job', data=df)

    # 그래프 저장 경로 설정
    chart_dir = os.path.join('main_page/static', 'charts')
    
    # 디렉토리가 없으면 생성
    os.makedirs(chart_dir, exist_ok=True)

    chart_path = os.path.join(chart_dir, 'programming_chart.png')
    if os.path.exists(chart_path):
        print(f"{chart_path} 파일이 존재합니다. 덮어씁니다.")
    else:
        print(f"{chart_path} 파일이 존재하지 않습니다. 새로 생성합니다.")
        
    # 차트 이미지 저장
    plt.savefig(chart_path)
    plt.close()

    return chart_path

# 함수 호출