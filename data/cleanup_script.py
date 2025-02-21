import os
import json
import subprocess
import re

sorted_data_path = os.path.join(os.path.dirname(__file__), 'sorted_data.json')
collected_data_path = os.path.join(os.path.dirname(__file__), 'collected_data.txt')

def read_sorted_data():
    """sorted_data.jsonからデータを読み込む"""
    try:
        if os.path.exists(sorted_data_path):
            with open(sorted_data_path, 'r', encoding='utf-8') as file:
                data = json.load(file)
                print(f"既存データ: {data}")
                return data
        else:
            print(f"{sorted_data_path} が見つかりません。")
            return {}
    except (json.JSONDecodeError, IOError) as e:
        print(f"既存データの読み込みに失敗しました: {e}")
        return {}

def read_collected_data():
    """collected_data.txtからデータを読み込み"""
    new_data = {}
    seen_lines = set()
    if os.path.exists(collected_data_path):
        try:
            with open(collected_data_path, 'r', encoding='utf-8') as file:
                for line in file:
                    line = line.strip()
                    if not line or line in seen_lines:
                        continue
                    seen_lines.add(line) 
                    
                    words = re.split(r'[ 　]+', line)
                    
                    main_word = words[0]
                    if main_word.endswith("用") and len(words) > 1:
                        main_word += words[1] 
                        words = [main_word] + words[2:]
                    else:
                        main_word = words[0]
                    
                    new_data.setdefault(main_word, {})
                    for word in words[1:]:
                        new_data[main_word][word] = new_data[main_word].get(word, 0) + 1

            print(f"追加されたデータ: {new_data}")
        except IOError as e:
            print(f"新規データの読み込みに失敗しました: {e}")
    else:
        print(f"{collected_data_path} が見つかりません。")
    return new_data

def update_data(sorted_data, new_data):
    """既存データに新しいデータを統合"""
    for main_word, sub_words in new_data.items():
        sorted_data.setdefault(main_word, {})
        for sub_word, count in sub_words.items():
            sorted_data[main_word][sub_word] = sorted_data[main_word].get(sub_word, 0) + count
    print(f"更新後のデータ: {sorted_data}")

def write_sorted_data(data):
    """更新されたデータをsorted_data.jsonに書き込む"""
    try:
        with open(sorted_data_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=2)
        print(f"{sorted_data_path} にデータを書き込みました。")
    except IOError as e:
        print(f"データの書き込みに失敗しました: {e}")

def clear_collected_data():
    """collected_data.txtを空にする"""
    try:
        with open(collected_data_path, 'w', encoding='utf-8') as file:
            file.truncate(0)  
        print(f"{collected_data_path} を空にしました。")
    except IOError as e:
        print(f"collected_data.txtの削除に失敗しました: {e}")

def configure_git():
    """Gitのユーザー名とメールアドレスを設定する"""
    try:
        subprocess.run(['git', 'config', '--global', 'user.name', 'NEL227'], check=True)
        subprocess.run(['git', 'config', '--global', 'user.email', 'no-reply@example.com'], check=True)
        print("Gitのユーザー名とメールアドレスを設定しました。")
    except subprocess.CalledProcessError as e:
        print(f"Gitの設定に失敗しました: {e}")

def git_commit_and_push():
    """変更をコミットし、リモートリポジトリにプッシュする"""
    try:
        subprocess.run(['git', 'add', sorted_data_path], check=True)
        subprocess.run(['git', 'add', collected_data_path], check=True)
        
        subprocess.run(['git', 'commit', '-m', 'Update sorted_data.json and clear collected_data.txt'], check=True)
        
        subprocess.run(['git', 'push'], check=True)
        print("変更をコミットし、プッシュしました。")
    except subprocess.CalledProcessError as e:
        print(f"コミットまたはプッシュに失敗しました: {e}")

def main():
    configure_git()

    print(f"{sorted_data_path} の既存の内容を読み込んでいます...")
    sorted_data = read_sorted_data()
    
    print(f"{collected_data_path} の内容を読み込んでいます...")
    new_data = read_collected_data()
    
    if new_data:
        print(f"結果を {sorted_data_path} に書き込んでいます...")
        update_data(sorted_data, new_data)
        write_sorted_data(sorted_data)
    
        print(f"{collected_data_path} を空にしています...")
        clear_collected_data()

        git_commit_and_push()
    else:
        print("新規データがないため、処理をスキップしました。")
    
    print("スクリプトの実行が完了しました。")

if __name__ == '__main__':
    main()
