"""Genera un isométrico técnico de galpón industrial en SVG.

Salida: public/img/iso-galpon.svg (fondo transparente, líneas claras para fondo azul)
"""
import math, os

COS30 = math.cos(math.radians(30))
SIN30 = math.sin(math.radians(30))

# dimensiones del galpón (metros)
L = 24.0      # largo
W = 12.0      # ancho
H = 5.6       # altura al hombro
RISE = 1.9    # altura de cumbrera sobre el hombro
BAY = 4.0     # separación entre pórticos

SCALE = 26.0

def iso(x, y, z):
    return ((x - y) * COS30 * SCALE, ((x + y) * SIN30 - z) * SCALE)

def pl(pts, **attrs):
    """polilínea/polígono a partir de puntos 3D"""
    coords = " ".join(f"{iso(*p)[0]:.2f},{iso(*p)[1]:.2f}" for p in pts)
    return coords, attrs

parts = []
def line3(p1, p2, stroke, w=1.2, op=1.0, dash=None):
    a, b = iso(*p1), iso(*p2)
    d = f' stroke-dasharray="{dash}"' if dash else ""
    parts.append(
        f'<line x1="{a[0]:.2f}" y1="{a[1]:.2f}" x2="{b[0]:.2f}" y2="{b[1]:.2f}" '
        f'stroke="{stroke}" stroke-width="{w}" opacity="{op}"{d} />'
    )

def poly3(pts, fill, stroke="none", w=1, op=1.0):
    coords = " ".join(f"{iso(*p)[0]:.2f},{iso(*p)[1]:.2f}" for p in pts)
    parts.append(
        f'<polygon points="{coords}" fill="{fill}" stroke="{stroke}" '
        f'stroke-width="{w}" opacity="{op}" />'
    )

n_bays = int(round(L / BAY))
xs = [i * (L / n_bays) for i in range(n_bays + 1)]

# --- suelo
poly3([(0, 0, 0), (L, 0, 0), (L, W, 0), (0, W, 0)], "rgba(244,239,229,.05)")

# --- grilla de suelo cada 4 m
for x in xs:
    line3((x, 0, 0), (x, W, 0), "#8C836C", 0.7, .45)
for i in range(4):
    y = W * i / 3
    line3((0, y, 0), (L, y, 0), "#8C836C", 0.7, .35)

# --- relleno de fachada trasera (y = W)
poly3([(0, W, 0), (L, W, 0), (L, W, H), (0, W, H)], "rgba(244,239,229,.06)")

# --- faldones de cubierta (relleno suave)
poly3([(0, 0, H), (L, 0, H), (L, W / 2, H + RISE), (0, W / 2, H + RISE)], "rgba(244,239,229,.09)")
poly3([(0, W / 2, H + RISE), (L, W / 2, H + RISE), (L, W, H), (0, W, H)], "rgba(244,239,229,.05)")

# --- pórticos
for x in xs:
    # columnas
    line3((x, 0, 0), (x, 0, H), "#F4EFE5", 2.0)
    line3((x, W, 0), (x, W, H), "#F4EFE5", 2.0)
    # dintel
    line3((x, 0, H), (x, W / 2, H + RISE), "#F4EFE5", 2.0)
    line3((x, W / 2, H + RISE), (x, W, H), "#F4EFE5", 2.0)
    # montante central
    line3((x, W / 2, H), (x, W / 2, H + RISE), "#B3A98F", 1.0, .9)
    line3((x, W / 2, H), (x, W / 2, H), "#B3A98F", 1.0)
    # diagonales del dintel
    line3((x, 0, H), (x, W / 2, H), "#B3A98F", 1.0, .85)
    line3((x, W / 2, H), (x, W, H), "#B3A98F", 1.0, .85)

# --- correas longitudinales sobre la cubierta
for i in range(1, 6):
    y = W * i / 6
    z = H + RISE * (1 - abs(y - W / 2) / (W / 2))
    line3((0, y, z), (L, y, z), "#C7BDA5", 0.9, .75)

# --- arriostramientos en el plano de cubierta (zigzag entre pórticos)
for i in range(n_bays):
    x1, x2 = xs[i], xs[i + 1]
    line3((x1, 0, H), (x2, W / 2, H + RISE), "#8C836C", 0.8, .35)
    line3((x2, 0, H), (x1, W / 2, H + RISE), "#8C836C", 0.8, .35)

# --- arriostramiento lateral en la fachada frontal (y = 0)
line3((xs[0], 0, 0), (xs[2], 0, H), "#D9A036", 0.9, .35, dash="5 5")
line3((xs[2], 0, 0), (xs[0], 0, H), "#D9A036", 0.9, .35, dash="5 5")

# --- nodos
for x in xs:
    for p in [(x, 0, H), (x, W, H), (x, W / 2, H + RISE)]:
        cx, cy = iso(*p)
        parts.append(f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="2.6" fill="#D9A036" />')

# --- cota del largo
a, b = iso(0, W, 0), iso(L, W, 0)
oy = 34
parts.append(
    f'<line x1="{a[0]:.2f}" y1="{a[1]+oy:.2f}" x2="{b[0]:.2f}" y2="{b[1]+oy:.2f}" stroke="#A79E8B" stroke-width="1" opacity=".8" />'
    f'<line x1="{a[0]:.2f}" y1="{a[1]+oy-5:.2f}" x2="{a[0]:.2f}" y2="{a[1]+oy+5:.2f}" stroke="#A79E8B" stroke-width="1" opacity=".8" />'
    f'<line x1="{b[0]:.2f}" y1="{b[1]+oy-5:.2f}" x2="{b[0]:.2f}" y2="{b[1]+oy+5:.2f}" stroke="#A79E8B" stroke-width="1" opacity=".8" />'
)
parts.append(
    f'<text x="{(a[0]+b[0])/2:.2f}" y="{(a[1]+b[1])/2+oy-10:.2f}" text-anchor="middle" '
    f'fill="#F4EFE5" font-family="IBM Plex Mono, monospace" font-size="11" letter-spacing="1.4">24,00 m</text>'
)

# --- cota de altura (columna izquierda)
p0, p1 = iso(0, 0, 0), iso(0, 0, H)
parts.append(
    f'<line x1="{p0[0]-62:.2f}" y1="{p0[1]:.2f}" x2="{p1[0]-62:.2f}" y2="{p1[1]:.2f}" stroke="#A79E8B" stroke-width="1" opacity=".8" />'
    f'<line x1="{p0[0]-67:.2f}" y1="{p0[1]:.2f}" x2="{p0[0]-57:.2f}" y2="{p0[1]:.2f}" stroke="#A79E8B" stroke-width="1" opacity=".8" />'
    f'<line x1="{p1[0]-67:.2f}" y1="{p1[1]:.2f}" x2="{p1[0]-57:.2f}" y2="{p1[1]:.2f}" stroke="#A79E8B" stroke-width="1" opacity=".8" />'
)
parts.append(
    f'<text x="{p0[0]-74:.2f}" y="{(p0[1]+p1[1])/2:.2f}" text-anchor="middle" fill="#F4EFE5" '
    f'font-family="IBM Plex Mono, monospace" font-size="11" letter-spacing="1.4" '
    f'transform="rotate(-90 {p0[0]-74:.2f} {(p0[1]+p1[1])/2:.2f})">5,60 m</text>'
)

# --- calcular viewBox
import re
xs_all, ys_all = [], []
for m in re.finditer(r'(?:x|cx)="(-?[\d.]+)"[^>]*?(?:y|cy)="(-?[\d.]+)"', " ".join(parts)):
    xs_all.append(float(m.group(1))); ys_all.append(float(m.group(2)))
for m in re.finditer(r'points="([^"]+)"', " ".join(parts)):
    for pair in m.group(1).split():
        x, y = pair.split(",")
        xs_all.append(float(x)); ys_all.append(float(y))

pad = 26
vb = (min(xs_all) - pad, min(ys_all) - pad,
      max(xs_all) - min(xs_all) + pad * 2, max(ys_all) - min(ys_all) + pad * 2)

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb[0]:.1f} {vb[1]:.1f} {vb[2]:.1f} {vb[3]:.1f}" '
    f'width="{vb[2]:.0f}" height="{vb[3]:.0f}">\n'
    "<title>Isométrico de galpón industrial 24 × 12 m</title>\n"
    + "\n".join(parts)
    + "\n</svg>\n"
)

os.makedirs("public/img", exist_ok=True)
with open("public/img/iso-galpon.svg", "w", encoding="utf-8") as f:
    f.write(svg)
print("ok", vb, len(svg), "bytes")
