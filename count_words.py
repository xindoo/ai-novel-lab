#!/usr/bin/env python3
import os
import re
import sys

def count_chinese_words(text):
    """统计中文字数（包括标点）"""
    # 去除Markdown标题和注释
    lines = text.split('\n')
    cleaned = []
    for line in lines:
        if line.startswith('#') or line.startswith('<!--') or line.startswith('（本章约'):
            continue
        cleaned.append(line)
    text = '\n'.join(cleaned)
    # 统计字符数（中文字符、标点、数字、英文字母都算一个字）
    # 简单统计：非空白字符数
    return len(re.findall(r'\S', text))

def main():
    chapter_dir = 'chapter'
    if not os.path.exists(chapter_dir):
        print(f"目录 {chapter_dir} 不存在")
        sys.exit(1)
    
    files = sorted([f for f in os.listdir(chapter_dir) if f.endswith('.md')])
    results = []
    for filename in files:
        path = os.path.join(chapter_dir, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        word_count = count_chinese_words(content)
        results.append((filename, word_count))
    
    # 输出结果
    print("章节字数统计：")
    print("=" * 50)
    total = 0
    short_chapters = []
    for filename, count in results:
        total += count
        status = "✓" if count >= 4000 else "✗"
        if count < 4000:
            short_chapters.append((filename, count))
        print(f"{filename:<30} {count:>6} 字 {status}")
    print("=" * 50)
    print(f"总章节数：{len(results)}")
    print(f"总字数：{total}")
    print(f"小于4000字的章节数：{len(short_chapters)}")
    
    if short_chapters:
        print("\n需要重写的章节：")
        for filename, count in short_chapters:
            print(f"  {filename} ({count} 字)")
    
    # 写入文件以便后续使用
    with open('word_counts.txt', 'w', encoding='utf-8') as f:
        for filename, count in results:
            f.write(f"{filename}\t{count}\n")
    
    return short_chapters

if __name__ == '__main__':
    main()