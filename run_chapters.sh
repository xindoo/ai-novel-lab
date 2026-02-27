
#!/bin/bash

# 设定起始和结束章节
START=51
END=100
# 设定超时时间（10分钟 = 600秒）
TIMEOUT_DURATION="10m"

echo "开始执行自动化任务：从第 $START 章到第 $END 章"
echo "每个任务的最大执行时间为：$TIMEOUT_DURATION"
echo "------------------------------------------------"

for (( index=$START; index<=$END; index++ ))
do
    echo "[$(date '+%H:%M:%S')] 正在处理第 ${index} 章..."

    # 使用 timeout 命令执行 opencode
    # -s 9 表示如果超时则发送 SIGKILL 信号（强制杀死）
    timeout -s 9 $TIMEOUT_DURATION opencode run "ulw 现在请写下第${index}章，注意剧情要和之前延续,如果已经写过了，就看下是否有需要优化的地方"
    
    # 获取命令执行后的状态码
    EXIT_CODE=$?

    if [ $EXIT_CODE -eq 124 ] || [ $EXIT_CODE -eq 137 ]; then
        echo "警告：第 ${index} 章执行超时（已超过 10 分钟），已自动强制跳过。"
    elif [ $EXIT_CODE -ne 0 ]; then
        echo "错误：第 ${index} 章执行失败，退出码：$EXIT_CODE"
    else
        echo "成功：第 ${index} 章执行完毕。"
    fi

    # 适当休眠 2 秒，防止操作过快导致接口并发问题（可选）
    sleep 2
done

echo "------------------------------------------------"
echo "所有任务处理完成！"
