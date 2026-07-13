#!/usr/bin/env python3
"""Build portfolio cover and hero images from a real app screenshot."""

import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ASSETS = Path(__file__).parent
APP_URL = "http://localhost:8080/"
SOURCE = ASSETS / "_capture_home.png"
COVER_OUT = ASSETS / "cover_filmfind.png"
HERO_OUT = ASSETS / "mockup_hero_filmfind.png"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

COVER_SIZE = (1280, 800)  # 16:10 portfolio card ratio
HERO_CANVAS = (1600, 1000)
BROWSER_BG = (247, 247, 245)  # portfolio surface
CHROME_BG = (236, 236, 234)
URL_BG = (255, 255, 255)
TEXT_MUTED = (120, 120, 118)


def capture_screenshot() -> None:
    subprocess.run(
        [
            CHROME,
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--window-size=1440,1600",
            "--virtual-time-budget=10000",
            f"--screenshot={SOURCE}",
            APP_URL,
        ],
        check=True,
    )


def crop_cover(source: Image.Image) -> Image.Image:
    target_w, target_h = COVER_SIZE
    src_w, src_h = source.size

    scale = target_w / src_w
    scaled_h = int(src_h * scale)
    scaled = source.resize((target_w, scaled_h), Image.Resampling.LANCZOS)

    if scaled_h >= target_h:
        return scaled.crop((0, 0, target_w, target_h))

    canvas = Image.new("RGB", COVER_SIZE, BROWSER_BG)
    canvas.paste(scaled, (0, 0))
    return canvas


def rounded_rect(draw, xy, radius, fill):
    x0, y0, x1, y1 = xy
    draw.rounded_rectangle(xy, radius=radius, fill=fill)


def build_hero(source: Image.Image) -> Image.Image:
    canvas = Image.new("RGB", HERO_CANVAS, BROWSER_BG)
    draw = ImageDraw.Draw(canvas)

    margin_x = 120
    margin_y = 80
    browser_w = HERO_CANVAS[0] - margin_x * 2
    chrome_h = 52
    radius = 16

    browser_x0 = margin_x
    browser_y0 = margin_y
    browser_x1 = browser_x0 + browser_w
    browser_y1 = HERO_CANVAS[1] - margin_y

    # Soft shadow
    shadow = Image.new("RGBA", HERO_CANVAS, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle(
        (browser_x0 + 4, browser_y0 + 8, browser_x1 + 4, browser_y1 + 8),
        radius=radius,
        fill=(42, 42, 42, 36),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(12))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), shadow).convert("RGB")
    draw = ImageDraw.Draw(canvas)

    rounded_rect(
        draw,
        (browser_x0, browser_y0, browser_x1, browser_y1),
        radius,
        (255, 255, 255),
    )

    chrome_bottom = browser_y0 + chrome_h
    rounded_rect(
        draw,
        (browser_x0, browser_y0, browser_x1, chrome_bottom + 8),
        radius,
        CHROME_BG,
    )
    draw.rectangle(
        (browser_x0, chrome_bottom - 8, browser_x1, chrome_bottom),
        fill=CHROME_BG,
    )

    dot_y = browser_y0 + 26
    for i, color in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        draw.ellipse((browser_x0 + 20 + i * 22, dot_y - 6, browser_x0 + 32 + i * 22, dot_y + 6), fill=color)

    url_x0 = browser_x0 + 110
    url_y0 = browser_y0 + 14
    url_x1 = browser_x1 - 20
    url_y1 = browser_y0 + chrome_h - 14
    rounded_rect(draw, (url_x0, url_y0, url_x1, url_y1), 10, URL_BG)

    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 15)
    except OSError:
        font = ImageFont.load_default()

    draw.text((url_x0 + 14, url_y0 + 9), "localhost:8080", fill=TEXT_MUTED, font=font)

    content_x0 = browser_x0 + 1
    content_y0 = chrome_bottom
    content_x1 = browser_x1 - 1
    content_y1 = browser_y1 - 1
    content_w = content_x1 - content_x0
    content_h = content_y1 - content_y0

    src_w, src_h = source.size
    scale = content_w / src_w
    shot_h = int(src_h * scale)
    screenshot = source.resize((content_w, shot_h), Image.Resampling.LANCZOS)

    if shot_h > content_h:
        screenshot = screenshot.crop((0, 0, content_w, content_h))

    canvas.paste(screenshot, (content_x0, content_y0))

    mask = Image.new("L", (browser_x1 - browser_x0, browser_y1 - browser_y0), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle((0, 0, mask.size[0], mask.size[1]), radius=radius, fill=255)

    framed = Image.new("RGB", (browser_x1 - browser_x0, browser_y1 - browser_y0), BROWSER_BG)
    framed.paste(canvas.crop((browser_x0, browser_y0, browser_x1, browser_y1)), (0, 0))
    framed.putalpha(mask)

    final = Image.new("RGBA", HERO_CANVAS, (*BROWSER_BG, 255))
    final.paste(framed, (browser_x0, browser_y0), framed)
    return final.convert("RGB")


def main():
    capture_screenshot()
    source = Image.open(SOURCE).convert("RGB")
    crop_cover(source).save(COVER_OUT, optimize=True)
    build_hero(source).save(HERO_OUT, optimize=True)
    SOURCE.unlink(missing_ok=True)
    print(f"Wrote {COVER_OUT}")
    print(f"Wrote {HERO_OUT}")


if __name__ == "__main__":
    main()
