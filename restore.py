import sys

input_file = r'd:\AIVATIKA_WORK\AIVATIKA_Website\html.txt'
output_file = r'd:\AIVATIKA_WORK\AIVATIKA_Website\index.html'

with open(input_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

with open(output_file, 'w', encoding='utf-8') as f:
    for i, line in enumerate(lines):
        line_num = i + 1
        
        # Change logo
        if '<div class="logo"><b>Ai</b>VATIKA</div>' in line:
            line = line.replace('<div class="logo"><b>Ai</b>VATIKA</div>', '<div class="logo"><b>AIVATIKA</b></div>')
        
        # Keep lines 1-187 (nav + hero background)
        if line_num <= 187:
            f.write(line)
        # Close hero after the background
        elif line_num == 188:
            f.write('</div>\n')
        # Include sections below hero (lines 223-283) and scripts (284+)
        elif line_num >= 223:
            f.write(line)
