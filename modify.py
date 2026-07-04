import sys

file_path = r'd:\AIVATIKA_WORK\AIVATIKA_Website\index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

with open(file_path, 'w', encoding='utf-8') as f:
    for i, line in enumerate(lines):
        line_num = i + 1
        
        # Change logo
        if '<div class="logo"><b>Ai</b>VATIKA</div>' in line:
            line = line.replace('<div class="logo"><b>Ai</b>VATIKA</div>', '<div class="logo"><b>AIVATIKA</b></div>')
        
        # Keep lines 1-187 and lines >= 284
        if line_num <= 187:
            f.write(line)
        elif line_num == 188:
            f.write('</div>\n')
        elif line_num >= 284:
            f.write(line)
