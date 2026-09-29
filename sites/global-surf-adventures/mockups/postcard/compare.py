# side-by-side: the old site's first screen next to ours (look loop)
import sys
from PIL import Image
r=sys.argv[1]; A='dossier/global-surf-adventures/assets/'
def pair(a,b,h,out):
    a=Image.open(a).convert('RGB'); b=Image.open(b).convert('RGB')
    a=a.resize((round(a.width*h/a.height),h)); b=b.resize((round(b.width*h/b.height),h))
    c=Image.new('RGB',(a.width+b.width+20,h),'magenta'); c.paste(a,(0,0)); c.paste(b,(a.width+20,0)); c.save(out)
pair(A+'old-site-home-desktop-fold.png', f'{r}/desktop-00.png', 600, f'{r}/vs-old-desktop.png')
pair(A+'old-site-home-mobile-fold.png', f'{r}/mobile-00.png', 800, f'{r}/vs-old-mobile.png')
