
#!/bin/bash

# 设定起始和结束章节
START=51
END=100
# 设定超时时间（10分钟 = 600秒）
TIMEOUT_DURATION="10m"

# 构建提示文本的函数
build_prompt() {
    local chapter=$1
    local prev=$((chapter-1))
    local next=$((chapter+1))
    local filename=$(printf 'chapters/%03d_*.md' "$chapter")
    
    echo "ulw 你是一位爽文小说写作专家，请根据以下要求完善第${chapter}章。"
    echo "第一步：上下文检索"
    echo "1. 读取 章节大纲.md 中第${chapter}章的设定"
    echo "2. 读取 workspace/summary.md 中第${prev}章的剧情总结（确保剧情衔接）"
    echo "3. 读取 workspace/summary.md 中第${next}章的剧情总结（确保伏笔埋设）"
    echo "4. 读取 ${filename} 中的原始章节内容"
    echo "第二步：写作规范"
    echo "**篇幅要求**："
    echo "- 每章约 5000 字左右，不得少于 4000 字"
    echo "**风格要求**："
    echo "- 用词犀利，节奏紧凑。多用短句"
    echo "- 爽点密度达标：每章至少3个小爽点，1个大高潮"
    echo "- 技术流：在装逼打脸时，适当插入\"不明觉厉\"的技术名词（如：零日漏洞、量子纠缠、汇编注入）"
    echo "**核心设定**："
    echo "- 主角：林峰（重生者，外表冷酷但内心保留人性，拒绝成神，选择成人）"
    echo "- 金手指：超脑黑客系统（绝对理智、万物代码化、虚空编译）"
    echo "- 核心主题：技术与人性的平衡"
    echo "**禁忌事项**："
    echo "- 禁止虐主"
    echo "- 禁止现实人名"
    echo "- 禁止烂尾（每章结束时必须留钩子）"
    echo "- 禁止吃书（严格遵守 workspace/summary.md 中的已写剧情）"
    echo "- 禁止成神（林峰最终选择拒绝创世者权限，保持人性）"
    echo "- 禁止元引用（小说内容中严禁引用自身章节号）"
    echo "第三步：剧情连贯性检查"
    echo "在完善前，请检查："
    echo "- [ ] 人物性格与前文一致（林峰、苏晓晓、李薇、赵晴等）"
    echo "- [ ] 超脑能力使用符合设定（每日超频不超过4小时）"
    echo "- [ ] 技术名词使用恰当，不与前文冲突"
    echo "- [ ] 时间线连贯"
    echo "- [ ] 没有出现现实人名或公司名"
    echo "- [ ] 没有出现元引用"
    echo "- [ ] 爽点密度达标"
    echo "- [ ] 结尾留有钩子"
    echo "第四步：完善章节"
    echo "请根据以上要求，完善第${chapter}章。确保："
    echo "1. 与第${prev}章结尾完美衔接"
    echo "2. 为第${next}章埋设必要伏笔"
    echo "3. 保持爽文节奏和风格"
    echo "4. 字数达到 4000-5000 字"
    echo "5. 符合所有设定和规范"
    echo "第五步：更新 summary.md"
    echo "完善章节后，请更新 workspace/summary.md 中第${chapter}章的剧情总结，确保与新内容一致。"
}

echo "开始执行自动化任务：从第 $START 章到第 $END 章"
echo "每个任务的最大执行时间为：$TIMEOUT_DURATION"
echo "------------------------------------------------"

for (( index=$START; index<=$END; index++ ))
do
    echo "[$(date '+%H:%M:%S')] 正在处理第 ${index} 章..."

    # 使用 timeout 命令执行 opencode
    # -s 9 表示如果超时则发送 SIGKILL 信号（强制杀死）
    prompt=$(build_prompt "$index")
    timeout -s 9 "$TIMEOUT_DURATION" opencode run "$prompt"

    # 获取命令执行后的状态码
    EXIT_CODE=$?

    if [ "$EXIT_CODE" -eq 124 ] || [ "$EXIT_CODE" -eq 137 ]; then
        echo "警告：第 ${index} 章执行超时（已超过 10 分钟），已自动强制跳过。"
    elif [ "$EXIT_CODE" -ne 0 ]; then
        echo "错误：第 ${index} 章执行失败，退出码：$EXIT_CODE"
    else
        echo "成功：第 ${index} 章执行完毕。"
    fi

    # 适当休眠 2 秒，防止操作过快导致接口并发问题（可选）
    sleep 2
done

echo "------------------------------------------------"
echo "所有任务处理完成！"
